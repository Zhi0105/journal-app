import { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {  BsFillArrowRightCircleFill } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import { TextField } from "./Partials/Input";
import { useUserStore } from "@/store/auth";
import { getDecryptedUser, EncryptUser } from "@/helpers/helpers";
import { UpdateUserFormInterface, userInterface } from "@/types/auth/interface";
import { UpdateUser } from "@/services/authentications";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify"
import Lottie from "lottie-react"
import account from '@_assets/account.json'


export const Setting = () => {
  const { user, setUser, token } = useUserStore((state) => ({ user: state.user, setUser: state.setUser, token: state.token }));
  const queryClient = useQueryClient();
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    setValue,
    formState : { errors }
  } = useForm<UpdateUserFormInterface>({  
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
  });
  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: (data: userInterface) => {
        queryClient.invalidateQueries({ queryKey: ['update-user'] });
        const updated = EncryptUser(data)
        setUser(updated)
        setIsUpdate(false)
        toast("successfully updated!", { type: "success" })
      }, 
    onError: (err: any) => {  
      toast(err.response.data.message, { type: "warning" })
    },
});

  const onSubmit = (data: UpdateUserFormInterface) => {

    if(!data.email && !data.username && !data.password) {
      return toast("Please enter atleast one of the field", { type: "warning" })
    }
    
    if(token) { 
      let payload = {
        ...data,
        user: token
      }
      handleUpdateUser(payload)
    }
  }

  const updateUserDetail = useCallback((user: userInterface) => {
    !isUpdate ? setValue("username", user.username) : setValue("username", "") 
      !isUpdate ? setValue("email", user.email) : setValue("email", "") 
      isUpdate && setValue("password", "")
  }, [isUpdate, setValue])

  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(user){
      const userdetail = getDecryptedUser(user)
      updateUserDetail(userdetail)
  
    } 
  }, [user, updateUserDetail])


  return (
    <div className="setting_main flex w-full justify-center items-center p-12">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-white shadow-lg py-10 px-10">
            <Lottie animationData={account}/>
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">User Information</h1>
                  <p className="text-sm mt-2">You can update your details here. changing your password is optional.</p>
              </div>
              <div className="content text-sm">
                <form className="contact_form flex flex-col gap-4 px-8" onSubmit={handleSubmit((data) => onSubmit(data))}>
                  <div className="username_textfield">
                    <Controller
                      control={control}
                      rules={{
                        pattern : /[\S\s]+[\S]+/
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          onChange={onChange}
                          value={value}
                          type="username"
                          id="username"
                          name="username"
                          label='Your name'
                          autoComplete="username"
                          disabled={!isUpdate}
                        />
                      )}
                      name="username"
                    />
                  </div>

                  <div className="email_textfield">
                    <Controller 
                      control={control}
                      rules={{
                        pattern: /^\S+@\S+\.\S+$/
                      }}
                      render={( { field: { onChange, value } }) => (
                        <TextField
                          onChange={onChange}
                          value={value}
                          type="email"
                          id="email"
                          name="email"
                          label='Email'
                          autoComplete="email"
                          disabled={!isUpdate}
                        />
                      )}
                      name="email"
                    />
                        { errors.email && isUpdate && <p className="text-red-400 indent-2 text-sm">email invalid*</p> }
                  </div>
                          
                  {isUpdate &&
                  <div className="password_textfield">
                      <Controller
                        control={control}
                        rules={{
                          pattern : /[\S\s]+[\S]+/
                        }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            onChange={onChange}
                            value={value}
                            type="password"
                            id="password"
                            name="password"
                            label='Password (optional)'
                            autoComplete="password"
                          />
                        )}
                        name="password"
                      />
                  </div> 
                  }
                  {isUpdate ? (
                    <div className="w-full flex justify-evenly">
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
                      Update Information
                      <BsFillArrowRightCircleFill size={20} />      
                    </button>
                  )}
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
