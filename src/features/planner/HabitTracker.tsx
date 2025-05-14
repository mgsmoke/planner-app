import { useHabitStore } from '../../store/habitStore';
import Button from '../../components/AppButton';

function HabitTracker() {
  const { habits, toggleHabitDay, removeHabit } = useHabitStore();
  const today = new Date().getDate();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Трекер привычек</h2>
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
              <Button
                className={`px-2 py-1 text-sm rounded ${
                  habit.days.includes(today) ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => toggleHabitDay(habit.id, today)}
                label={habit.days.includes(today) ? '✓' : 'Сегодня'}
              />
              <Button 
                onClick={() => removeHabit(habit.id)} 
                label="✕" 
                className="text-red-500 font-bold" 
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
