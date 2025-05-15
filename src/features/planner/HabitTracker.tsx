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
            className={`flex justify-between items-center border p-2 rounded-full w-full ${
              habit.days.includes(today) 
                ? 'bg-green-500 text-white border-green-500' 
                : 'border-green-500'
            }`}
            onClick={() => toggleHabitDay(habit.id, today)}
          >
            <div>
              <span>{habit.name}</span>
              <span className="ml-2 text-xs opacity-80">
                Выполнено {habit.days.length} раз
              </span>
            </div>
            <Button 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                removeHabit(habit.id);
              }} 
              label="✕" 
              className="text-red-500 font-bold px-2 py-1 rounded-full" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;