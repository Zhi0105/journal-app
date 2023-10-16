import { createContext } from 'react'
import { CategoryContextInterface } from '@/types/category/interface'

export const CategoryContext = createContext<CategoryContextInterface>({} as CategoryContextInterface)