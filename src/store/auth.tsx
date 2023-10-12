import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface userStoreInterface {
  user: string | null
  token: string | null,
  setUser:( data: string ) => void,
  setToken: ( data: string ) => void,
  setUserLogout: () => void,
}

const userStore = persist<userStoreInterface>(
  (set) => ({
  user: null, // USER
  token: null,
  setUser: (data) => set(() => ({
    user: data
  })),
  setToken: (data) => set(() => ({
    token: data
  })),
  setUserLogout: () => set(() => ({ user: null })),
  }),
  {
    name: 'user', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  }
);

export  const useUserStore = create(userStore);
