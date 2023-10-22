import { createContext } from 'react'
import { TaskContextInterface } from '@/types/task/interface'

export const TaskContext = createContext<TaskContextInterface>({} as TaskContextInterface)
