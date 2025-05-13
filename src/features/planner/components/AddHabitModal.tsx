import { useState } from 'react';
import { useHabitStore } from '../../../store/habitStore';

export default function AddHabitModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const { addHabit } = useHabitStore();

  const handleAdd = () => {
    if (input.trim() !== '') {
      addHabit(input.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-2">Новая привычка</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите привычку..."
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
