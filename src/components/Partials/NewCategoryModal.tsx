import { Controller, useForm } from "react-hook-form";
import { TextField } from "./Input";
import {  BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategory } from "@/services/category";
import { categoryFormInterface } from "@/types/category/interface";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/auth"

export const NewCategoryModal = ({ close }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { mutate: handleCreateCategory } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['create-journal'] });
        toast("new journal created!", { type: "success" })
        router.push("/dashboard/category")
        close()
      }, 
    onError: (err: any) => {  
      toast(err.response.data.message, { type: "warning" })
    },
});
  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<categoryFormInterface>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: categoryFormInterface): void => {
    if(token) {
      let payload = {
        title: data.title,
        user: token
      }
      handleCreateCategory(payload)
    }
  }

  return (
    <div className="modal">
      <button onClick={close} className="close text-black">
        &times;
      </button>
      <div className="header text-lg font-bold"> Create journal </div>
      <div className="content text-sm">
      <form className="contact_form flex xs:flex-col sm:flex-row gap-4 px-8"  onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                  label='Enter your journal title here'
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
