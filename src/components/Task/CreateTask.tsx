import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "../Partials/Input";
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { taskFormInterface } from "@/types/task/interface";
import { useUserStore } from "@/store/auth"
import { UseCategoryStore } from "@/store/category";
import { DropDown } from "../Partials/Select";
import { TaskContext } from "@/contexts/TaskContext";
import Image from "next/image";
import journal from '@_assets/books.webp'

export const CreateTask = () => {
  const { createTask } = useContext(TaskContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<taskFormInterface>({
    defaultValues: {
      category_id: 0,
      name: ""
    },
  });

  const onSubmit = (data: taskFormInterface): void => {
    if(token) {
      let payload = {
        category_id: Number(data.category_id),
        name: data.name,
        user: token
      }
    
      createTask(payload)
    }
  }

  return (
    <div className="create_task_main w-full bg-white shadow-lg rounded-lg m-8 p-8 flex flex-col justify-center items-center">
    <div>
      <Image src={journal} alt="journal" width={150} height={150} priority/>
    </div>
    <div className="header text-lg font-bold"> Create your task: </div>
    <div className="content text-sm xs:w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5">
    <form className="flex xs:flex-col sm:flex-col gap-4 px-8" onSubmit={handleSubmit((data) => onSubmit(data))}>

    <div className="category_field">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDown
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              ariaPlaceHolder="Choose a category"
              label="category"
              required={true}
              category_data={categories}
            />
          )}
          name="category_id"
        />
      </div>

      <div className="name_textfield w-full">
          <Controller
            control={control}
            rules={{
              required: true,
              pattern : /[\S\s]+[\S]+/
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                type="text"
                id="name"
                name="name"
                label='Enter your journal task here'
                autoComplete="name"
              />
            )}
            name="name"
          />
        { errors.name && <p className="text-red-400 indent-2 text-sm">task name should not be empty*</p> }
      </div>
      
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center gap-2">
        submit
        <BsFillArrowRightCircleFill size={20} />      
      </button>
    </form>
    </div>
    </div>
  )
}
