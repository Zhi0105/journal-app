import { taskItemInterface } from "../task/interface";

export interface kanbanInterface {
  id: string | number,
  title: string,
  data: taskItemInterface[]
}
