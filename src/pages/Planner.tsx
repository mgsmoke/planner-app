import TodoList from '../features/planner/components/TodoList';
import HabitTracker from '../features/planner/components/HabitTracker';
import FloatingActionButton from '../features/planner/components/FloatingActionButton';

function Planner() {
  return (
    <div className="p-4">
      <HabitTracker />
      <TodoList />
      <FloatingActionButton />
    </div>
  );
}

export default Planner;