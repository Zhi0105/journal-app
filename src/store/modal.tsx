import { create } from "zustand";
import { persist } from 'zustand/middleware';


interface categoryStoreInterface {
  open: boolean
  setOpen:( data: boolean) => void,
  
}

const modalStore = persist<categoryStoreInterface>(
  (set) => ({
    open: false,
    setOpen: (data) => set(() => ({
      open: data
    })),
  }),
  {
    name: 'modal', // name of the item in the storage (must be unique)
  }
);

export  const useModalStore = create(modalStore);
