import { apiClient } from "@/http-commons";
import { categoryInterface, updateCategoryInterface, removeCategoryInterface } from "@/types/category/interface";


export const GetCategory = (user: string ) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }
    const result  = apiClient.get('/category/all', { headers }).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })

    return result
}
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
export const UpdateCategory = (payload: updateCategoryInterface) => {
  let params = {
    title: payload.title
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.patch(`/category/${payload.category_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}
export const RemoveCategory = (payload: removeCategoryInterface) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/category/${payload.category_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}
