import CalendarSection from '../features/planner/CalendarSection';
import TodoList from '../features/planner/TodoList';
import HabitTracker from '../features/planner/HabitTracker';
import AddButton from '../features/planner/components/AddButton';


function Planner() {
  return (
    <div className="px-4">
      <CalendarSection />
      <HabitTracker />
      <TodoList />
      <AddButton />
    </div>
  );
};

export default Planner;