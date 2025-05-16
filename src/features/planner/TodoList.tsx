import { useTodoStore } from '../../store/todoStore';
import Button from '../../components/AppButton';
import { useSelectedDateStore } from '../../store/dateStore';
import {
  isSameDay,
  isBefore,
  addDays,
  parseISO,
  format,
} from 'date-fns';

function TodoList() {
  const { todos, toggleTodo, removeTodo } = useTodoStore();
  const { selectedDate } = useSelectedDateStore();
  const today = new Date();
  const tomorrow = addDays(today, 1);

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


  const renderTodoItem = (todo: typeof todos[0]) => {
    const display = getDisplayInfo(parseDate(todo.date));
    return (
      <li key={todo.id} className="flex flex-col border p-2 rounded">
        <div className="flex justify-between items-center">
          <span
            onClick={() => toggleTodo(todo.id)}
            className={todo.done ? 'line-through text-gray-400 cursor-pointer' : 'cursor-pointer'}
          >
            {todo.text}
          </span>
          <Button onClick={() => removeTodo(todo.id)} label="✕" className="text-red-500 font-bold" />
        </div>
        {display && <span className={`text-xs ${display.className}`}>{display.text}</span>}
      </li>
    );
  };

  const filteredTodos = todos
    .map(todo => ({
      ...todo,
      dateObj: parseDate(todo.date),
    }))
    .filter(todo => {
      if (!todo.date) {
        return isSameDay(selectedDate, today); // без даты только для сегодня
      }
      const { dateObj } = todo;
      if (!dateObj) return false;
      if (isSameDay(selectedDate, today)) {
        return (
          isBefore(dateObj, today) || // просроченные
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
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">Ваши дела</h2>
      <ul className="flex flex-col gap-2">
        {filteredTodos.map(renderTodoItem)}
      </ul>
    </div>
  );
}

export default TodoList;
