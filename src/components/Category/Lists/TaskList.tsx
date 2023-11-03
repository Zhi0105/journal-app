import React, { FC, useMemo } from 'react'
import { kanbanInterface } from '@/types/kanban/interface'
import { taskItemInterface } from '@/types/task/interface'
import { TaskCard } from '@/components/Partials/card/TaskCard'
import { SortableContext } from '@dnd-kit/sortable'


interface taskListInterface {
  data: kanbanInterface,
}

export const TaskList:FC<taskListInterface> = ({ data }) => {

  const task_id = useMemo(() => data.data.map((task) => task.id), [data])
  const NoRecord = () => {
    return (
      <div> No record found</div>
    )
  }

  return (
    <div className={`w-full mt-5 p-6 
      ${data.id === 1 && 'bg-slate-100'} 
      ${data.id === 2 && 'bg-red-100'} 
      ${data.id === 3 && 'bg-green-100'} 
      border border-gray-200 rounded-lg shadow`}
    >
    <div className="flex justify-between px-2"> 
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
      <h1 className="text-gray-400">{data.data.length} result(s)</h1>
    </div>

    <div className="max-h-96 overflow-x-auto flex flex-col gap-4 p-4">
      {!data.data.length && <NoRecord />}
      <SortableContext items={task_id}>
        {data.data.length != 0 && data.data.map((task: taskItemInterface, index: number) => {
          return (
            <TaskCard task={task} key={index}/>
          )
        })}
      </SortableContext>
    </div>
  </div>
  )
}
