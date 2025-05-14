import TodoList from '../features/planner/TodoList';
import HabitTracker from '../features/planner/HabitTracker';
import AddButton from '../features/planner/components/AddButton';

function Planner() {
  return (
    <div className="p-4">
      <HabitTracker />
      <TodoList />
      <AddButton />
    </div>
  );
}

export default Planner;