import { FC, useContext } from "react"
import { Controller, useForm } from "react-hook-form";
import { TextField } from "../Partials/Input";
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { CategoryContext } from "@/contexts/CategoryContext";
import { categoryFormInterface, categoryItemInterface } from "@/types/category/interface";
import { useUserStore } from "@/store/auth"
import Image from "next/image";
import journal from '@_assets/books.webp'

interface EditCategoryInterface {
  category: categoryItemInterface
}

export const EditCategory:FC<EditCategoryInterface> = ({ category }) => {
  const { updateCategory } = useContext(CategoryContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<categoryFormInterface>({
    defaultValues: {
      title: category.title
    },
  });

  const onSubmit = (data: categoryFormInterface): void => {
    if(token) {
      let payload = {
        category_id: category.id,
        title: data.title,
        user: token
      }
      updateCategory(payload)
    }
  }
  // console.log(category)
  return (
    <div className="create_category_main w-full bg-white shadow-lg rounded-lg m-8 p-8 flex flex-col justify-center items-center">
    <div>
      <Image src={journal} alt="journal" width={150} height={150}/>
    </div>
    <div className="header text-lg font-bold"> Update journal: </div>
    <div className="content text-sm xs:w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5">
    <form className="flex xs:flex-col sm:flex-row gap-4 px-8" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="title_textfield w-full">
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
                id="title"
                name="title"
                label='Update journal title here:'
                autoComplete="title"
              />
            )}
            name="title"
          />
        { errors.title && <p className="text-red-400 indent-2 text-sm">journal title should not be empty*</p> }
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
