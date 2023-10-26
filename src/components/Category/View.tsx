
import { FC, useEffect } from "react"
import { categoryItemInterface } from "@/types/category/interface"
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { UseTaskStore } from "@/store/task";
import { taskItemInterface } from "@/types/task/interface";

interface ReadCategoryInterface {
  category: categoryItemInterface
}

export const View:FC<ReadCategoryInterface> = ({ category }) => {
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  return (
    <div className="category_detail_main w-full p-4 bg-gray-100">
      <div className='seach w-full'>
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12">
              <PiMagnifyingGlassDuotone />
            </div>

            <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.." /> 
        </div>
      </div>
      
      <h1 className="text-xl font-bold capitalize mt-12">{category.title}</h1>
      
      <div className="w-full mt-5 p-6 bg-green-100 border border-gray-200 rounded-lg shadow">
        <div className="flex justify-between px-2"> 
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">To do</h5>
          <h1 className="text-gray-400">{tasks.length} result(s)</h1>
        </div>

        <div className="max-h-96 overflow-x-auto flex flex-col gap-4 p-4">
          {tasks.length && tasks.map((task: taskItemInterface, index: number) => {
            return (
              <div key={index} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="font-bold text-lg">{task.name}</h1>
                <p className="mb-3 mt-3 indent-5 text-sm text-gray-700 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus perspiciatis voluptas ab, tenetur, repudiandae accusantium sequi laborum iure velit eum beatae ipsam facere corporis rerum, est voluptatibus fuga earum. Perferendis, nostrum reiciendis! Delectus quia doloremque placeat odit eligendi possimus asperiores nemo. Quia beatae a aliquid quasi consequatur maxime voluptatem eaque?
                </p>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}
