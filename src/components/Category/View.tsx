import { categoryItemInterface } from "@/types/category/interface"
import { FC } from "react"

interface ReadCategoryInterface {
  category: categoryItemInterface
}

export const View:FC<ReadCategoryInterface> = ({ category }) => {
  return (
    <div>
      {category.title}
    </div>
  )
}
