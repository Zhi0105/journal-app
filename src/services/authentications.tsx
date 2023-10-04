import { apiClient } from "@/http-commons";
import { RegisterInterface, LoginInterface } from "@/types/auth/interface";
import { useQuery } from "@tanstack/react-query";


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

export const GetUser = (user: string, enable: boolean) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const result  = apiClient.get('/users/me', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    },
    enabled: Boolean(enable), // Enable the query when token is available
  })
}