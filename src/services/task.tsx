import { apiClient } from "@/http-commons";
import { taskInterface, updateTaskInterface } from "@/types/task/interface";

export const GetTask = (user: string ) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }
    const result  = apiClient.get('/task/all', { headers }).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })

    return result
}
export const CreateTask = (payload: taskInterface) => {
  let params = {
    category_id: payload.category_id,
    name: payload.name,
    description: payload.description
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/task/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}
export const UpdateTask = (payload: updateTaskInterface) => {
  let params = {
    category_id: payload.category_id,
    name: payload.name,
    description: payload.description,
    status: payload.status
  }

  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.patch(`/task/${payload.task_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}