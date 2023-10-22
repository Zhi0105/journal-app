import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { taskItemInterface } from "@/types/task/interface";

interface taskStoreInterface {
  tasks: taskItemInterface[],
  setTasks:( data: taskItemInterface[] ) => void,
  
}

const taskStore = persist<taskStoreInterface>(
  (set) => ({
    tasks: [],
    setTasks: (data) => set(() => ({
      tasks: [ ...data ] 
    })),
  }),
  {
    name: 'task'
  }
);

export  const UseTaskStore = create(taskStore);
