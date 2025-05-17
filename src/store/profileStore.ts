import { create } from 'zustand';

type ProfileState = {
  name: string;
  avatar: string;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  name: 'Имя профиля',
  avatar: '/placeholder-image.png',
  setName: (name) => set({ name }),
  setAvatar: (avatar) => set({ avatar }),
}));
