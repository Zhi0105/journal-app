import { apiClient } from "@/http-commons";
import { taskInterface } from "@/types/task/interface";

export const CreateTask = (payload: taskInterface) => {
  let params = {
    category_id: payload.category_id,
    name: payload.name
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/task/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}