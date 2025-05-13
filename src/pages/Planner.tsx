import TodoList from '../features/planner/components/TodoList';
import HabitTracker from '../features/planner/components/HabitTracker';

function Planner() {
  return (
    <div className="p-4">
      <HabitTracker />
      <TodoList />
    </div>
  );
}

export default Planner;