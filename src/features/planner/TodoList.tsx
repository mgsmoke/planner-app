import React from 'react';
import { isSameDay, isBefore, addDays, parseISO, format } from 'date-fns';
import { useTodoStore } from '../../store/todoStore';
import { useSelectedDateStore } from '../../store/dateStore';
import SwipeActions from './components/SwipeActions';
import EditTodoModal from './components/EditTodoModal';
import { useRef } from 'react';

function TodoList() {
  const { todos, removeTodo, } = useTodoStore();
  const { selectedDate } = useSelectedDateStore();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);

  const parseDate = (str?: string) => (str ? parseISO(str) : undefined);

  const getDisplayInfo = (todoDate?: Date) => {
    if (!todoDate) return null;
    if (isSameDay(todoDate, today)) return { text: 'Сегодня', className: 'text-blue-500 text-xs' };
    if (isSameDay(todoDate, tomorrow)) return { text: 'Завтра', className: 'text-gray-500 text-xs' };
    const yesterday = addDays(today, -1);
    if (isSameDay(todoDate, yesterday)) return { text: 'Вчера', className: 'text-red-500 text-xs' };
    if (isBefore(todoDate, yesterday)) return { text: format(todoDate, 'dd.MM.yyyy'), className: 'text-red-500 text-xs' };
    return { text: format(todoDate, 'dd.MM.yyyy'), className: 'text-gray-400 text-xs' };
  };

  const pendingIdsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const toggleDone = (id: number) => {
    const store = useTodoStore.getState();
    const todo = store.todos.find((t) => t.id === id);
    if (!todo) return;

    const timeout = pendingIdsRef.current.get(id);

    if (timeout) {
      clearTimeout(timeout);
      pendingIdsRef.current.delete(id);
      store.toggleTodo(id); // вернёт done в false
      return;
    }

    if (!todo.done) {
      store.toggleTodo(id); // done: true
      const t = setTimeout(() => {
        store.moveToCompleted(id);
        pendingIdsRef.current.delete(id);
      }, 2500);
      pendingIdsRef.current.set(id, t);
    } else {
      // если вдруг уже в completed
      store.restoreTodo(id);
    }
  };


  const renderTodoItem = (todo: typeof todos[0]) => {
    const display = getDisplayInfo(parseDate(todo.date));
    return (
        <SwipeActions
          onEdit={() => setEditTodoId(todo.id)}
          onDelete={() => removeTodo(todo.id)}
          onComplete={() => toggleDone(todo.id)}
        >
          <img 
          src={todo.done ? 'img/check-circle.png' : 'img/circle.png'}
          className="w-10 h-10 cursor-pointer mr-2"></img>
          <li 
          className={`w-full h-11 overflow-hidden rounded-full cursor-pointer flex p-4 ${
            todo.done ? 'bg-[#e0e0ff]' : 'bg-gray-200'
          }`}
          >
            <div className="flex flex-col justify-center">
              <span className={todo.done ? 'text-gray-500' : ''}>
                {todo.text}
              </span>
              {display && (
                <span className={todo.done ? 'text-gray-500 text-xs' : `${display.className}`}>
                  {display.text}
                </span>
              )}
            </div>
          </li>
        </SwipeActions>
    );
  };

  const filteredTodos = todos
    .map(todo => ({
      ...todo,
      dateObj: parseDate(todo.date),
    }))
    .filter(todo => {
      if (!todo.date) {
        return isSameDay(selectedDate, today);
      }
      const { dateObj } = todo;
      if (!dateObj) return false;
      if (isSameDay(selectedDate, today)) {
        return (
          isBefore(dateObj, today) ||
          isSameDay(dateObj, today) ||
          isSameDay(dateObj, tomorrow)
        );
      }
      return isSameDay(dateObj, selectedDate);
    })
    .sort((a, b) => {
      const aDate = a.dateObj || today;
      const bDate = b.dateObj || today;
      const aIsPast = a.dateObj ? isBefore(a.dateObj, today) : false;
      const bIsPast = b.dateObj ? isBefore(b.dateObj, today) : false;
      if (aIsPast && !bIsPast) return -1;
      if (!aIsPast && bIsPast) return 1;
      return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="pb-20">
      <h2 className="text-lg font-bold mb-4">Напоминания</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">Нет запланированных дел</p>
      ) : (
        <div>
          
          <ul className="flex flex-col gap-3">
            {filteredTodos.map((todo) => (
              <React.Fragment key={todo.id}>
                {renderTodoItem(todo)}
              </React.Fragment>
            ))}
          </ul>
          {editTodoId !== null && (
            <EditTodoModal
              todoId={editTodoId}
              onClose={() => setEditTodoId(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TodoList;
