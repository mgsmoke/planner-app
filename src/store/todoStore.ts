import { create } from 'zustand';

type Todo = {
  id: number;
  text: string;
  done: boolean;
  date?: string;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string, date?: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

const loadTodos = (): Todo[] => {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : [];
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: loadTodos(),

  addTodo: (text: string, date?: string) =>
  set((state) => {
    const newTodos = [...state.todos, { id: Date.now(), text, done: false, date }];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));