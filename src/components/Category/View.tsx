
import { FC, useState } from "react"
import { categoryItemInterface } from "@/types/category/interface"
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { UseTaskStore } from "@/store/task";
import { taskItemInterface } from "@/types/task/interface";

// LIST COMPONENTS
import { TodoList } from "./Lists/TodoList";
import { OnProgressList } from "./Lists/OnProgressList";
import { CompletedList } from "./Lists/CompletedList";

// HELPERS
import { getCategoryTasks, getTodoTask, getOnProgressTask, getCompletedTask } from "@/helpers/helpers";


interface ReadCategoryInterface {
  category: categoryItemInterface
}

export const View:FC<ReadCategoryInterface> = ({ category }) => {
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  const [taskList, setTaskList] = useState<taskItemInterface[]>(getCategoryTasks(tasks, category.id))
  const [search, setSearchKeyword] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)

    const filteredItem = tasks.filter((item) => { 
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setTaskList(getCategoryTasks(filteredItem, category.id))

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

      <div className="w-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TodoList tasks={getTodoTask(taskList)} />
        <OnProgressList tasks={getOnProgressTask(taskList)} />
        <CompletedList tasks={getCompletedTask(taskList)} />
      </div>
      
    </div>
  )
}
