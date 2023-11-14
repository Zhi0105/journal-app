import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { taskItemInterface } from "@/types/task/interface";

interface taskStoreInterface {
  tasks: taskItemInterface[],
  setTasks:( data: taskItemInterface[] ) => void,
  resetTasks: () => void
}

const taskStore = persist<taskStoreInterface>(
  (set) => ({
    tasks: [],
    setTasks: (data) => set(() => ({
      tasks: [ ...data ] 
    })),
    resetTasks: () => set(() => ({ tasks: [] })),
  }),
  {
    name: 'task'
  }
);

export  const UseTaskStore = create(taskStore);
