import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Habit = {
  id: string;
  name: string;
  days: string[];
  color: string;
  icon: string;
};

type HabitStore = {
  habits: Habit[];
  addHabit: (name: string, color: string, icon: string) => void;
  toggleHabitDay: (habitId: string, date: string) => void;
  removeHabit: (habitId: string) => void;
  editHabit: (id: string, name: string, color: string, icon: string) => void;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (name, color, icon) =>
        set((state) => ({
          habits: [...state.habits, { id: crypto.randomUUID(), name, days: [], color, icon }],
        })),

      toggleHabitDay: (habitId, date) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  days: habit.days.includes(date)
                    ? habit.days.filter((d) => d !== date)
                    : [...habit.days, date],
                }
              : habit
          ),
        })),

      removeHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== habitId),
        })),

      editHabit: (id, name, color, icon) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, name, color, icon } : habit
          ),
        })),
    }),
    {
      name: 'habit-storage',
    }
  )
);
