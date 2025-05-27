import React from 'react';
import { useTodoStore } from '../../store/todoStore';
import { useSelectedDateStore } from '../../store/dateStore';
import SwipeActions from './components/SwipeActions';
import { isSameDay, isBefore, addDays, parseISO, format } from 'date-fns';
import EditTodoModal from './components/EditTodoModal';

function TodoList() {
  const { todos, removeTodo, moveToCompleted } = useTodoStore();
  const setTodos = useTodoStore.setState;
  const { selectedDate } = useSelectedDateStore();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);

  const parseDate = (str?: string) => (str ? parseISO(str) : undefined);

  const getDisplayInfo = (todoDate?: Date) => {
    if (!todoDate) return null;
    if (isSameDay(todoDate, today)) return { text: 'Сегодня', className: 'text-blue-500' };
    if (isSameDay(todoDate, tomorrow)) return { text: 'Завтра', className: 'text-gray-400' };
    const yesterday = addDays(today, -1);
    if (isSameDay(todoDate, yesterday)) return { text: 'Вчера', className: 'text-red-500' };
    if (isBefore(todoDate, yesterday)) return { text: format(todoDate, 'dd.MM.yyyy'), className: 'text-red-500' };
    return { text: format(todoDate, 'dd.MM.yyyy'), className: 'text-gray-400' };
  };

  const handleToggle = (id: number) => {
  const todo = useTodoStore.getState().todos.find(t => t.id === id);
  if (!todo) return;

  // Если сейчас не выполнено — ставим done: true и запускаем таймер
  if (!todo.done) {
    setTodos((state) => {
      const updated = state.todos.map(todo =>
        todo.id === id ? { ...todo, done: true } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updated));
      return { todos: updated };
    });

    setTimeout(() => {
      // Через 3 секунды снова получаем состояние, если задача всё ещё выполнена — переносим в completed
      const currentTodo = useTodoStore.getState().todos.find(t => t.id === id);
      if (currentTodo?.done) {
        moveToCompleted(id);
      }
    }, 3000);
  } else {
    // Если сейчас выполнено — снимаем отметку (done: false) и не трогаем таймер
    setTodos((state) => {
      const updated = state.todos.map(todo =>
        todo.id === id ? { ...todo, done: false } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updated));
      return { todos: updated };
    });
  }
};

  const renderTodoItem = (todo: typeof todos[0]) => {
    const display = getDisplayInfo(parseDate(todo.date));
    return (
      <SwipeActions
        onEdit={() => setEditTodoId(todo.id)}
        onDelete={() => removeTodo(todo.id)}
      >
        <li
          key={todo.id}
          onClick={() => handleToggle(todo.id)}
          className="w-full overflow-hidden p-4 bg-gray-200 rounded-full cursor-pointer"
        >
          <div className="flex flex-col justify-center">
            <span className={todo.done ? 'line-through text-gray-400 text-base' : 'text-base'}>
              {todo.text}
            </span>
            {display && <span className={`text-xs ${display.className}`}>{display.text}</span>}
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
      <h2 className="text-lg font-bold mb-4">Ваши дела</h2>
      <ul className="flex flex-col gap-3">
        {filteredTodos.map(renderTodoItem)}
      </ul>

      {editTodoId !== null && (
        <EditTodoModal
          todoId={editTodoId}
          onClose={() => setEditTodoId(null)}
        />
      )}
    </div>
  );
}

export default TodoList;
