import { useTodoStore } from '../../../store/todoStore';

function CompletedList() {
  const { completed, restoreTodo, removeTodo } = useTodoStore();

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold my-4 ml-4">Выполненные задачи</h2>
      {completed.length === 0 ? (
        <p className="text-gray-500 my-4 ml-4">Нет выполненных задач</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {completed.map(todo => (
            <li
              onClick={() => restoreTodo(todo.id)}
              key={todo.id}
              className="flex items-center justify-between bg-gray-200 rounded-full px-4 py-3 max-h-[64px] cursor-pointer"
            >
              <span
                className="text-base"
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="ml-4 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center select-none"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedList;
