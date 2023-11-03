import { FC } from "react"
import { taskItemInterface } from "@/types/task/interface"
import { motion } from 'framer-motion'
import { encodeURL } from "@/helpers/helpers";
import { BiSolidEdit } from 'react-icons/bi'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from "next/link";


interface taskCardInterface {
  task: taskItemInterface,
}

export const TaskCard:FC<taskCardInterface> = ({ task }) => {

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if(isDragging) {
    return(
      <div 
        ref={setNodeRef} 
        style={style} 
        className="w-full p-4 bg-white opacity-60 border-2 border-gray-200 rounded-lg shadow"
      >  
      </div>
    )
  }

  return (
    <div
      { ...attributes }
      { ...listeners }
      ref={setNodeRef} 
      style={style} 
      className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow"
    >
      <div 
        className="flex justify-between px-2"
      > 
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
      <p className="mb-3 mt-3 indent-5 text-sm text-gray-700">
      {task.description}
      </p>
    </div>
  )
}
