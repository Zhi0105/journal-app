export interface taskItemInterface {
  id: number,
  category_id: number,
  user_id: number,
  name: string,
  createdAt: string,
  updatedAt: string
}
export interface taskFormInterface {
  category_id: number,
  name: string
}
export interface taskInterface extends taskFormInterface {
  user: string
}
export interface updateTaskInterface extends taskInterface {
  task_id: number,
  category_id: number
}
export interface TaskContextInterface {
  createTask: (payload: taskInterface) => void,
  updateTask: (payload: updateTaskInterface) => void
}

