import { create } from 'zustand';

type ProfileState = {
  name: string;
  avatar: string;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
};

const getInitialProfile = () => {
  const stored = localStorage.getItem('profile');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { name: 'Имя профиля', avatar: '/placeholder-image.png' };
    }
  }
  return { name: 'Имя профиля', avatar: '/placeholder-image.png' };
};

export const useProfileStore = create<ProfileState>((set) => ({
  ...getInitialProfile(),
  setName: (name) => {
    set((state) => {
      const updated = { ...state, name };
      localStorage.setItem('profile', JSON.stringify(updated));
      return updated;
    });
  },
  setAvatar: (avatar) => {
    set((state) => {
      const updated = { ...state, avatar };
      localStorage.setItem('profile', JSON.stringify(updated));
      return updated;
    });
  },
}));
