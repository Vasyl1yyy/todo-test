import { create } from 'zustand';

interface TaskStore {
  tasks: { id: number; title: string; done: boolean }[];
  setTasks: (tasks: { id: number; title: string; done: boolean }[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [] as { id: number; title: string; done: boolean }[],
  setTasks: (tasks: { id: number; title: string; done: boolean }[]) =>
    set({ tasks }),
}));
