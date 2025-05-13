import { create } from 'zustand';

type Habit = {
  id: number;
  name: string;
  days: number[]; // массив дней месяца, когда отмечено выполнение
};

type HabitStore = {
  habits: Habit[];
  addHabit: (name: string) => void;
  toggleHabitDay: (habitId: number, day: number) => void;
  removeHabit: (habitId: number) => void;
};

const loadHabits = (): Habit[] => {
  const stored = localStorage.getItem('habits');
  return stored ? JSON.parse(stored) : [];
};

export const useHabitStore = create<HabitStore>((set) => ({
  habits: loadHabits(),

  addHabit: (name) =>
    set((state) => {
      const newHabits = [
        ...state.habits,
        { id: Date.now(), name, days: [] },
      ];
      localStorage.setItem('habits', JSON.stringify(newHabits));
      return { habits: newHabits };
    }),

  toggleHabitDay: (habitId, day) =>
    set((state) => {
      const newHabits = state.habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        const days = habit.days.includes(day)
          ? habit.days.filter((d) => d !== day)
          : [...habit.days, day];
        return { ...habit, days };
      });
      localStorage.setItem('habits', JSON.stringify(newHabits));
      return { habits: newHabits };
    }),

  removeHabit: (habitId) =>
    set((state) => {
      const newHabits = state.habits.filter((h) => h.id !== habitId);
      localStorage.setItem('habits', JSON.stringify(newHabits));
      return { habits: newHabits };
    }),
}));