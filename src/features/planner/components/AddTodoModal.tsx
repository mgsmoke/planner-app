import { useState } from 'react';
import { useTodoStore } from '../../../store/todoStore';

export default function AddTodoModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const { addTodo } = useTodoStore();

  const handleAdd = () => {
    if (input.trim() !== '') {
      addTodo(input.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-2">Новая задача</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите задачу..."
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
