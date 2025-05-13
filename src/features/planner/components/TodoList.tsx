import { useTodoStore } from '../../../store/todoStore';
import { useState } from 'react';
import Button from '../../../components/Button';

function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      addTodo(input.trim());
      setInput('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">Ваши дела</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Введите задачу..."
        />
        <Button onClick={handleAdd}>Добавить</Button>
      </div>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={todo.done ? 'line-through text-gray-400' : ''}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;