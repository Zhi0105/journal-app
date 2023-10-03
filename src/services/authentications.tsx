import { apiClient } from "@/http-commons";
import { RegisterInterface, LoginInterface } from "@/types/auth/interface";


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

export const Login = (payload: LoginInterface) => {
  const result = apiClient.post('auth/signin', payload).then(res => {
    return res.data
  })

  return result
}