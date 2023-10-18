export interface categoryFormInterface {
  title: string
}
export interface categoryInterface extends categoryFormInterface {
  user: string
}
export interface updateCategoryInterface extends categoryInterface {
  category_id: number
}
export interface removeCategoryInterface {
  user: string,
  category_id: number
}
export interface CategoryContextInterface {
  createCategory: (payload: categoryInterface) => void
  updateCategory: (payload: updateCategoryInterface) => void
  removeCategory: (payload: removeCategoryInterface) => void
}
export interface categoryItemInterface {
  id: number,
  user_id: number,
  title: string,
  createdAt: string,
  updatedAt: string
}

