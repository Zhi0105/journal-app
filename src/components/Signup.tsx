import { useContext } from "react";
import Link from "next/link"
import Image from "next/image";
import book from '@_assets/books.webp'
import { BiLogIn } from 'react-icons/bi'
import { Controller, useForm } from "react-hook-form";
import { RegisterInterface } from "@/types/auth/interface";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Register } from "@/services/authentications";
import { AuthContext } from "@/contexts/Authcontext";


export const Signup = () => {
  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<RegisterInterface>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmpass: '',

    },
  });
  const queryClient = useQueryClient()
  const { authenticate } = useContext(AuthContext)  
  const { mutate: handleRegister, isLoading: registerLoading } = useMutation({
    mutationFn: Register,
      onSuccess: (data: { access_token: string }) => {
      queryClient.invalidateQueries({ queryKey: ['userRegister'] });
      authenticate(data.access_token)
      toast("User Successfully created!", { type: "success" })

    }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "error" })
    },
  });
  const onSubmit = (data: RegisterInterface): void => {
    data.password !== data.confirmpass ? toast('oops!, password mismatch', {type: "warning"}) : handleRegister(data)
  }
    
  return (
    <div className="register_main flex min-h-screen flex-col items-center justify-center mx-4">
    <section className="bg-gray-50 rounded-lg shadow-lg flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 my-12">
      <Image src={book} height={200} width={200} alt="book" priority />        
      <h1 className="mt-5">Sign up your account</h1>
      <div className="form_container w-full p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="form space-y-4 md:space-y-6">
          <div className="username_textfield">
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern : /[\S\s]+[\S]+/
                }}
                render={({ field: { onChange, value } }) => (
                  <input 
                    value={value}
                    onChange={onChange}
                    type="username" 
                    name="username" id="username" 
                    placeholder="username" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  />
                  
                )}
                name="username"
              />
              { errors.username && <p className="text-red-400 indent-2 text-sm">username invalid*</p> }

          </div>

          <div className="email_textfield">
            <Controller 
              control={control}
              rules={{
                required: true,
                pattern: /^\S+@\S+\.\S+$/
              }}
              render={( { field: { onChange, value } }) => (
                <input 
                value={value}
                onChange={onChange}
                type="email" 
                name="email" id="email" 
                placeholder="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
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
                  <input
                    value={value}
                    onChange={onChange} 
                    type="password" 
                    name="password" id="password" 
                    placeholder="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  />
                  
                )}
                name="password"
              />
              { errors.password && <p className="text-red-400 indent-2 text-sm">password invalid*</p> }
          </div> 
          
          <div className="cpassword_textfield">
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern : /[\S\s]+[\S]+/
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange} 
                    type="password" 
                    name="cpassword" id="cpassword" 
                    placeholder="confirm password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  />
                  
                )}
                name="confirmpass"
              />
              { errors.confirmpass && <p className="text-red-400 indent-2 text-sm">confirm password invalid*</p> }
          </div>     

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/login"
              className="w-full text-gray-900 underline flex justify-center items-center cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
            >
              Already Registered?
            </Link>
            <button 
              disabled={registerLoading}
              onClick={handleSubmit((data) => onSubmit(data))}
              type="button" 
              className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
            >
              <BiLogIn width={50} height={50} />
              {registerLoading ? "Please wait..." : "Register"}
            </button>
          </div>
        
        </div>
      </div>
    </section>
  </div>
  )
}
