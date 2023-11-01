import React, { FC } from 'react'
import { taskItemInterface } from '@/types/task/interface'
import { encodeURL } from "@/helpers/helpers";
import { motion } from 'framer-motion'
import { BiSolidEdit } from 'react-icons/bi'
import Link from "next/link";

interface todoInterface {
  tasks: taskItemInterface[]
}

export const OnProgressList:FC<todoInterface> = ({ tasks }) => {

  const NoRecord = () => {
    return (
      <div> No record found</div>
    )
  }
  return (
    <div className="w-full mt-5 p-6 bg-blue-100 border border-gray-200 rounded-lg shadow">
      <div className="flex justify-between px-2"> 
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">On Progress</h5>
        <h1 className="text-gray-400">{tasks.length} result(s)</h1>
      </div>

      <div className="max-h-96 overflow-x-auto flex flex-col gap-4 p-4">
        {!tasks.length && <NoRecord />}
        {tasks.length != 0 && tasks.map((task: taskItemInterface, index: number) => {
          return (
            <div key={index} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between px-2"> 
                <h1 className="font-bold text-lg">{task.name}</h1>
                <motion.span
                    whileHover={{ scale: 1.5 }} 
                    transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                    className="font-bold text-green-700 cursor-pointer"
                  >
                    <Link href={`/dashboard/task/edit/${encodeURL(task)}`}>
                    <BiSolidEdit size={"1.2rem"}/>

                    </Link>
                </motion.span>
              </div>
              <p className="mb-3 mt-3 indent-5 text-sm text-gray-700 dark:text-gray-400">
              {task.description}
              </p>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}
