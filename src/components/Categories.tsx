import { useContext } from "react"
import { categoryItemInterface } from "@/types/category/interface";
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useUserStore } from "@/store/auth"
import { UseCategoryStore } from "@/store/category";
import { CategoryContext } from "@/contexts/CategoryContext";

import Link from "next/link";
import Lottie from "lottie-react";
import book from '@_assets/book.json'

export const Categories = () => {
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeCategory } = useContext(CategoryContext)

  const handleRemoveCategory = (category_id: number) => {
    if(token) {
      let payload = {
        category_id,
        user: token
      }
      removeCategory(payload)
    }
  }

  if(!categories?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no categories yet!  
      </div>
    )
  }

  return  (
    <div className="categories_main w-full p-20">
      <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 w-full gap-4">
      {categories?.length && categories.map((category: categoryItemInterface, index: number) => {
          return (
            <div key={index} className="rounded overflow-hidden shadow-lg xs:text-xs sm:text-md md:text-md lg:text-lg">
              <div className="px-6 py-4">
                <div className="font-bold mb-2 text-center">
                    <Lottie animationData={book}/>
                  {category.title}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <motion.span 
                    whileHover={{ scale: 1.5 }} 
                    transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                    className="font-bold text-blue-500 cursor-pointer"
                  >
                    <Link href={`/dashboard/category/${encodeURIComponent(JSON.stringify(category))}`}>
                      <FaEye size={"1.2rem"}/>
                    </Link>
                  </motion.span>
                  
                  <motion.span
                    whileHover={{ scale: 1.5 }} 
                    transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                    className="font-bold text-green-700 cursor-pointer"
                  >
                    <Link href={`/dashboard/category/edit/${encodeURIComponent(JSON.stringify(category))}`}>
                      <BiSolidEdit size={"1.2rem"}/>
                    </Link>
                  </motion.span>
                  <motion.span
                    onClick={() => handleRemoveCategory(category.id)} 
                    whileHover={{ scale: 1.5 }} 
                    transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                    className="font-bold text-red-400 cursor-pointer"
                  >
                    <AiFillDelete size={"1.2rem"}/>
                  </motion.span>          
                </div>
              </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
