import { create } from 'zustand';

type Todo = {
  id: number;
  text: string;
  done: boolean;
  date?: string;
};

type TodoStore = {
  todos: Todo[];
  completed: Todo[];
  addTodo: (text: string, date?: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string, date?: string) => void;
  moveToCompleted: (id: number) => void;
  restoreTodo: (id: number) => void;
};

const load = (key: string): Todo[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const save = (key: string, data: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: load('todos'),
  completed: load('completedTodos'),

  addTodo: (text, date) =>
    set((state) => {
      const newTodos = [...state.todos, { id: Date.now(), text, done: false, date }];
      save('todos', newTodos);
      return { todos: newTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      save('todos', newTodos);
      return { todos: newTodos };
    }),

  removeTodo: (id) =>
  set((state) => {
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    const newCompleted = state.completed.filter((todo) => todo.id !== id);
    save('todos', newTodos);
    save('completedTodos', newCompleted);
    return { todos: newTodos, completed: newCompleted };
  }),

  editTodo: (id, text, date) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text, date } : todo
      );
      save('todos', newTodos);
      return { todos: newTodos };
    }),

  moveToCompleted: (id) =>
    set((state) => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return {};
      const updatedTodos = state.todos.filter((t) => t.id !== id);
      const updatedCompleted = [...state.completed, todo];
      save('todos', updatedTodos);
      save('completedTodos', updatedCompleted);
      return {
        todos: updatedTodos,
        completed: updatedCompleted,
      };
    }),

  restoreTodo: (id) =>
    set((state) => {
      const todo = state.completed.find((t) => t.id === id);
      if (!todo) return {};
      const updatedCompleted = state.completed.filter((t) => t.id !== id);
      const updatedTodos = [...state.todos, { ...todo, done: false }];
      save('todos', updatedTodos);
      save('completedTodos', updatedCompleted);
      return {
        todos: updatedTodos,
        completed: updatedCompleted,
      };
    }),
}));
