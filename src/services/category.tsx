import { apiClient } from "@/http-commons";
import { categoryInterface } from "@/types/category/interface";

export const CreateCategory = (payload: categoryInterface) => {
  
  let params = {
    title: payload.title
  }

  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.post('/category/create', params, { headers }).then(res => {
    return res.data
  })

  return result
}