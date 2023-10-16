import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { categoryItemInterface } from "@/types/category/interface";

interface categoryStoreInterface {
  categories: categoryItemInterface[] | null,
  setCategories:( data: categoryItemInterface[] ) => void,
  
}

const categoryStore = persist<categoryStoreInterface>(
  (set) => ({
    categories: null,
    setCategories: (data) => set(() => ({
      categories: [ ...data ] 
    })),
  }),
  {
    name: 'category', // name of the item in the storage (must be unique)
  }
);

export  const UseCategoryStore = create(categoryStore);
