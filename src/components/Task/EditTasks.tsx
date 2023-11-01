import React, { FC, useState, useCallback, useEffect, useContext } from 'react'
import { taskItemInterface, taskFormInterface } from '@/types/task/interface'
import { TaskContext } from '@/contexts/TaskContext';
import { Controller, useForm } from "react-hook-form";
import { TextField } from "../Partials/Input";
import { DropDown } from "../Partials/Select";
import { UseCategoryStore } from "@/store/category";
import { useUserStore } from "@/store/auth"
import { TextAreaField } from "../Partials/TextArea";
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import Image from "next/image";
import journal from '@_assets/books.webp'

interface editTaskInterface {
  task: taskItemInterface
}

export const EditTasks:FC<editTaskInterface> = ({ task }) => {
  const { updateTask } = useContext(TaskContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    setValue,
    formState : { errors }
  } = useForm<taskFormInterface>({
    defaultValues: {
      category_id: task.category_id,
      name: task.name,
      description: task.description
    },
  });

  const onSubmit = (data: taskFormInterface): void => {
    if(token) {
      let payload = {
        category_id: Number(data.category_id),
        task_id: task.id,
        name: data.name,
        description: data.description,
        user: token
      }
      updateTask(payload)
    }
  }

  const updateTaskDetail = useCallback((task: taskItemInterface) => {
    !isUpdate ? setValue("category_id", task.category_id) : setValue("category_id", 0) 
      !isUpdate ? setValue("name", task.name) : setValue("name", "") 
        !isUpdate ? setValue("description", task.description) : setValue("description", "") 
  }, [isUpdate, setValue])

  
  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(task){
      updateTaskDetail(task)
    } 
  }, [task, updateTaskDetail])

  return (
    <div className="edit_task_main w-full bg-white shadow-lg rounded-lg m-8 p-8 flex flex-col justify-center items-center">
    <div>
      <Image src={journal} alt="journal" width={150} height={150} priority/>
    </div>
    <div className="header text-lg font-bold"> Update your task: </div>
    <div className="content text-sm xs:w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5">
    <form className="flex xs:flex-col sm:flex-col gap-4 px-8" onSubmit={handleSubmit((data) => onSubmit(data))}>

      <div className="category_field">
        {!isUpdate && <span className='font-bold text-xs'>category</span>}
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
              disabled={!isUpdate}
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
                label='update your journal task here'
                autoComplete="name"
                disabled={!isUpdate}
              />
            )}
            name="name"
          />
        { errors.name && <p className="text-red-400 indent-2 text-sm">task name should not be empty*</p> }
      </div>

      <div className="textarea_textfield w-full">
        {!isUpdate && <span className='font-bold text-xs'>Description</span>}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern : /[\S\s]+[\S]+/
            }}
            render={({ field: { onChange, value } }) => (
              <TextAreaField
                onChange={onChange}
                value={value}
                id="description"
                name="description"
                label="Description"
                autoComplete="description"
                required={true}
                disabled={!isUpdate}
              />
            )}
            name="description"
          />
        { errors.description && <p className="text-red-400 indent-2 text-sm">description should not be empty*</p> }
      </div>
      {isUpdate ? (
        <div className="w-full flex flex-col gap-2">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center gap-2">
            Submit
            <BsFillArrowRightCircleFill size={20} />      
          </button>
          <button type="button" onClick={() => setIsUpdate(false)} className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center gap-2">
            Cancel
            <GiCancel size={20} />
          </button>
        </div>
      ) : (
        
      <button type="button" onClick={() => setIsUpdate(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center gap-2">
          Update
        <BsFillArrowRightCircleFill size={20} />      
      </button>
      )}

    </form>
    </div>
    </div>
  )
}
