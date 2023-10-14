import { Controller, useForm } from "react-hook-form";
import {  BsFillArrowRightCircleFill } from 'react-icons/bs'
import { TextField } from "./Partials/Input";
import Lottie from "lottie-react"
import account from '@_assets/account.json'

interface SetingInterface{
  username?: string,
  email?: string,
  password?: string
}

export const Setting = () => {
  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<SetingInterface>({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
  });
  const onSubmit = (data: SetingInterface): void => {
  }
  
  return (
    <div className="setting_main flex w-full justify-center items-center p-12">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <Lottie animationData={account}/>
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">User Information</h1>
                  <p className="text-sm">You can update your details here</p>
              </div>
              <div className="content text-sm">
                <form className="contact_form flex flex-col gap-4 px-8"  onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                          label='Username'
                          autoComplete="username"
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
                        />
                      )}
                      name="email"
                    />
                        { errors.email && <p className="text-red-400 indent-2 text-sm">email invalid*</p> }
                  </div>
                          
          <div className="password_textfield">
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
                    type="password"
                    id="password"
                    name="password"
                    label='Password (enter a value if you want to change password)'
                    autoComplete="password"
                  />
                )}
                name="password"
              />
          </div> 
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center gap-2">
                    Update information
                    <BsFillArrowRightCircleFill size={20} />      
                  </button>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
