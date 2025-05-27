import { useState } from 'react'
import { useHabitStore } from '../../store/habitStore';
import { useSelectedDateStore } from '../../store/dateStore';
import SwipeActions from './components/SwipeActions';
import EditHabitModal from './components/EditHabitModal';

const colorMap: Record<string, string> = {
  red: 'bg-red-500 text-white border-red-500',
  blue: 'bg-blue-500 text-white border-blue-500',
  green: 'bg-green-500 text-white border-green-500',
  yellow: 'bg-yellow-500 text-white border-yellow-500',
  purple: 'bg-purple-500 text-white border-purple-500',
  pink: 'bg-pink-500 text-white border-pink-500',
  gray: 'bg-gray-500 text-white border-gray-500',
};

const borderMap: Record<string, string> = {
  red: 'border border-red-500',
  blue: 'border border-blue-500',
  green: 'border border-green-500',
  yellow: 'border border-yellow-500',
  purple: 'border border-purple-500',
  pink: 'border border-pink-500',
  gray: 'border border-gray-500',
};

function HabitTracker() {
  const { habits, toggleHabitDay, removeHabit } = useHabitStore();
  const { selectedDate } = useSelectedDateStore();

  const formattedDate = selectedDate.toISOString().split('T')[0];

  const [editHabitId, setEditHabitId] = useState<string | null>(null);

  const habitToEdit = habits.find((h) => h.id === editHabitId) || null;

  return (
    <div className="my-4">
      <h2 className="text-lg font-bold mb-4">Ваши привычки</h2>
      <ul className="flex flex-col gap-3">
        {habits.map((habit) => {
          const isActive = habit.days.includes(formattedDate);
          const colorClass = isActive
            ? colorMap[habit.color] || 'bg-green-500 text-white border-green-500'
            : borderMap[habit.color] || 'border border-green-500';

          return (
            <SwipeActions
              key={habit.id}
              onDelete={() => removeHabit(habit.id)}
              onEdit={() => setEditHabitId(habit.id)}
            >
            <li
              onClick={() => toggleHabitDay(habit.id, formattedDate)}
              className={`flex items-center p-2 rounded-full w-full transition-colors cursor-pointer ${colorClass}`}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="ml-2 text-xl">{habit.icon}</span>
                <span className="ml-4 text-xl">{habit.name}</span>
              </div>
              <span className="mx-2">🔥{habit.days.length}</span>
            </li>
            </SwipeActions>
          );
        })}
      </ul>
      {editHabitId && habitToEdit && (
        <EditHabitModal
          habitId={editHabitId}
          onClose={() => setEditHabitId(null)}
        />
      )}
    </div>
  );
}

export default HabitTracker;
