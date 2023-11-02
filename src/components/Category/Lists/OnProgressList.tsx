import React, { FC, useMemo } from 'react'
import { taskItemInterface } from '@/types/task/interface'
import { TaskCard } from '@/components/Partials/card/TaskCard';
import { SortableContext } from '@dnd-kit/sortable'
import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom'
interface todoInterface {
  tasks: taskItemInterface[],
  activeTask: taskItemInterface | null
}

export const OnProgressList:FC<todoInterface> = ({ tasks, activeTask }) => {
  const task_id = useMemo(() => tasks.map((task: taskItemInterface) => task.id ), [tasks])

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
        <SortableContext items={task_id}>
        {tasks.length != 0 && tasks.map((task: taskItemInterface, index: number) => {
          return (
            <TaskCard task={task} key={index}/>
          )
        })}
        {createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard task={activeTask}/>
            )}
          </DragOverlay>,
          document.body
        )}
        </SortableContext>
      </div>
    </div>
  )
}
