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

export interface userInterface {
  id: number,
  email: string,
  username: string
}

export interface UpdateUserFormInterface {
  username?: string,
  email?: string,
  password?: string
}

export interface UpdateUserInterface extends UpdateUserFormInterface {
  user: string
}