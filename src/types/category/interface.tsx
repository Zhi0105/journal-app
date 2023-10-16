export interface categoryFormInterface {
  title: string
}
export interface categoryInterface extends categoryFormInterface {
  user: string
}
export interface CategoryContextInterface {
  createCategory: (payload: categoryInterface) => void
}
export interface categoryItemInterface {
  id: number,
  user_id: number,
  title: string,
  createdAt: string,
  updatedAt: string
}

