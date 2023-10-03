import { createContext } from 'react'
import { AuthContextInterface } from '@/types/auth/interface'

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)