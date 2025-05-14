import { useTodoStore } from '../../store/todoStore';
import Button from '../../components/AppButton';

function TodoList() {
  const { todos, toggleTodo, removeTodo} = useTodoStore();


  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">Ваши дела</h2>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={todo.done ? 'line-through text-gray-400' : ''}
            >
              {todo.text}
            </span>
            <Button onClick={() => removeTodo(todo.id)} label="✕" className="text-red-500 font-bold" />
          </li>
        ))}
      </ul>

    </div>
  );
}

export default TodoList;
