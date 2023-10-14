import { apiClient } from "@/http-commons";
import { RegisterInterface, LoginInterface, UpdateUserInterface,  UpdateUserFormInterface} from "@/types/auth/interface";


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

export const GetUser = (user: string) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }
    const result  = apiClient.get('/users/me', { headers }).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })

    return result
}

export const UpdateUser = (payload: UpdateUserInterface ) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  let params: UpdateUserFormInterface = {}
  payload.username && (params.username = payload.username)
  payload.email && (params.email = payload.email)
  payload.password && (params.password = payload.password)

  
  const result = apiClient.patch('/users/update', params, { headers }).then(res => {
    return res.data
  })

  return result

}