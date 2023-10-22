import { apiClient } from "@/http-commons";
import { taskInterface } from "@/types/task/interface";

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