
import { FC, useState, useContext, useMemo } from "react"
import { categoryItemInterface } from "@/types/category/interface"
import { kanbanInterface } from "@/types/kanban/interface";
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { UseTaskStore } from "@/store/task";
import { taskItemInterface } from "@/types/task/interface";
import { TaskList } from "./Lists/TaskList";
import { TaskCard } from "../Partials/card/TaskCard";
import { TaskContext } from '@/contexts/TaskContext';
import { useUserStore } from "@/store/auth"
import _ from "lodash";

// HELPERS
import { getCategoryTasks, setNewTaskList } from "@/helpers/helpers";

// DND
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

interface ReadCategoryInterface {
  category: categoryItemInterface
}

export const View:FC<ReadCategoryInterface> = ({ category }) => {
  const { updateTaskStatus } = useContext(TaskContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  const [taskList, setTaskList] = useState<taskItemInterface[]>(getCategoryTasks(tasks, category.id))
  const [search, setSearchKeyword] = useState<string>('')
  const [activeTask, setActiveTask] = useState<taskItemInterface | null>(null)
  const [kanbanColumn, setKanbanColumn] = useState<kanbanInterface[]>(setNewTaskList(taskList))
  const column_id = useMemo(() => kanbanColumn.map((column) => column.id), [kanbanColumn])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value)

      const filteredItem = tasks.filter((item) => { 
        return item.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setTaskList(getCategoryTasks(filteredItem, category.id))
      setKanbanColumn(setNewTaskList(filteredItem))
    }

    const onDragStart = (event: DragStartEvent) => {
      if(event.active.data.current?.type === 'task') {
        console.log("@task:", event)
        setActiveTask(event.active.data.current.task)
        return;
      }
    }
    const onDragEnd = (event: DragEndEvent) => {
      setActiveTask(null)
      const { active, over } = event
      if(!over) return;
      if(active.id === over.id) return;
      if(active?.data.current?.type === 'column' && over?.data.current?.type === 'column') return;
      
      if(over?.data.current?.type === 'task') {
          const activeStatus = active.data.current?.task.status  
          const overStatus = over.data.current?.task.status  

          if(activeStatus.toLowerCase() === overStatus.toLowerCase()){
              setTaskList((tasks) => {
                const activeTaskIndex = tasks.findIndex(task => task.id === active.id)
                const overTaskIndex = tasks.findIndex(task => task.id === over.id)
                return arrayMove(tasks, activeTaskIndex, overTaskIndex)
              })
              setKanbanColumn(setNewTaskList(taskList))
          }
          
          if(activeStatus.toLowerCase() !== overStatus.toLowerCase()){
            handleUpdateStatus(overStatus, active.id)
          }
      }
      if(over?.data.current?.type === 'column') {
        const overID = over.id
        if(overID === 'A'){ handleUpdateStatus("open", active.id) }
        if(overID === 'B'){ handleUpdateStatus("pending", active.id) }
        if(overID === 'C'){ handleUpdateStatus("completed", active.id) }
      }
    }

    const handleUpdateStatus =  (status: string, active_id: number | string) => {
        const filteredItem:any = _.find(taskList, { id: active_id })
        const filteredTasks = _.filter(taskList, (task) => task.id !== active_id)
        filteredItem.status = status
        if(token && status) {
          const newTaskList = [...filteredTasks, {...filteredItem}]

          let payload = {
            category_id: Number(category.id),
            task_id: Number(active_id),
            status: status,
            user: token
          }
          updateTaskStatus(payload) 
          setTaskList(newTaskList)
          setKanbanColumn(setNewTaskList(taskList))
      }
      
    }

  return (
    <div className="category_detail_main w-full p-4 bg-gray-100">
      <div className='seach w-full'>
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12">
              <PiMagnifyingGlassDuotone />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              value={search}
              onChange={handleSearch}
              type="text"
              id="search"
              placeholder="Search something.." 
            /> 
        </div>
      </div>
      <h1 className="text-xl font-bold capitalize mt-12">{category.title}</h1>

        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
          <div className="w-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SortableContext items={column_id}>
            {kanbanColumn.map((column: kanbanInterface, index: number)  => {
              return (
                <TaskList data={column} key={index} />
              )
            })}
            </SortableContext>
          </div>
          {createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard task={activeTask}/>
            )}
          </DragOverlay>,
        document.body
        )}
        </DndContext>
    </div>
  )
}
