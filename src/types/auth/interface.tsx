export interface LoginInterface {
  email: string,
  password: string
}
export interface RegisterInterface {
  username: string,
  email: string,
  password: string,
  confirmpass?: string
}

export interface AuthContextInterface {
  login: (data:LoginInterface) => void,
  authenticate: (user: string) => void,
  logout: () => void
}