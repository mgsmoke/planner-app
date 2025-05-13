import { useHabitStore } from '../../../store/habitStore';
import { useState } from 'react';
import InputWithButton from '../../../components/InputWithButton';

function HabitTracker() {
  const { habits, addHabit, toggleHabitDay, removeHabit } = useHabitStore();
  const [input, setInput] = useState('');
  const today = new Date().getDate();

  const handleAdd = () => {
    if (input.trim()) {
      addHabit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Трекер привычек</h2>

      <InputWithButton
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClick={handleAdd}
        placeholder="Новая привычка"
      />


      <ul className="flex flex-col gap-3 mt-4">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="flex justify-between items-center border p-2 rounded w-full"
          >
            <div>
              <span>{habit.name}</span>
              <span className="ml-2 text-xs text-gray-500">
                Выполнено {habit.days.length} раз
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-2 py-1 text-sm rounded ${
                  habit.days.includes(today) ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => toggleHabitDay(habit.id, today)}
              >
                {habit.days.includes(today) ? '✓' : 'Сегодня'}
              </button>
              <button className="text-red-500" onClick={() => removeHabit(habit.id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
