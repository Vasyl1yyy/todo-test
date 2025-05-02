import { create } from 'zustand';

interface UserStore {
  user: { id: number; username: string } | null;
  setUser: (user: { id: number; username: string } | null) => void;
}

export const useStore = create<UserStore>((set) => ({
  user: null as { id: number; username: string } | null,
  setUser: (user: { id: number; username: string } | null) => set({ user }),
}));
