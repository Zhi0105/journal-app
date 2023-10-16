import { useState, useEffect } from "react";
import { UseCategoryStore } from "@/store/category";

export const Categories = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <div className="categories_main flex w-full justify-center items-center">
      <ul className="flex flex-col">
        {categories?.length && categories.map((item: any, index: number) => {
          return (
            <li key={index}>{item.title}</li>
          )
        })}
      </ul>
    </div>
  )
}
