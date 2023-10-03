import { apiClient } from "@/http-commons";
import { RegisterInterface } from "@/types/auth/interface";


export const Register = (payload: RegisterInterface) => {
  let params = {
    username: payload.username,
    email: payload.email,
    password: payload.password,
  }
  const result = apiClient.post('/auth/signup', params).then(res => {
    return res.data
  })

  return result
}