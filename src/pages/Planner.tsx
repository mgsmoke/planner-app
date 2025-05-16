import CalendarPopup from '../features/planner/components/CalendarPopup';
import DateStrip from '../features/planner/components/DateStrip';
import TodoList from '../features/planner/TodoList';
import HabitTracker from '../features/planner/HabitTracker';
import AddButton from '../features/planner/components/AddButton';


function Planner() {
  return (
    <div className="p-4">
      <div className="flex gap-2">
        <CalendarPopup />
        <DateStrip/>
      </div>
      <HabitTracker />
      <TodoList />
      <AddButton />
    </div>
  );
}

export default Planner;