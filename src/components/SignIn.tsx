import { useState, useEffect } from "react";
import { useContext } from "react";
import Link from "next/link"
import Image from "next/image";
import book from '@_assets/books.webp'
import { BiLogIn } from 'react-icons/bi'
import { PiKeyReturnFill } from 'react-icons/pi'
import { GiArchiveRegister } from 'react-icons/gi'
import { Controller, useForm } from "react-hook-form";
import { LoginInterface } from "@/types/auth/interface";
import { AuthContext } from "@/contexts/Authcontext";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  } from "@fortawesome/free-solid-svg-icons";
export const SignIn = () => {

  const {
    handleSubmit,
    control,
    formState : { errors }
  } = useForm<LoginInterface>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  const router = useRouter();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const { login, loginLoading } = useContext(AuthContext)
  const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
  const onSubmit = (data: LoginInterface): void => {
    login(data)
  }

  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(user) {
      router.push("/dashboard")
    }
  }, [user, router])
    
  const handlePasswordVisibility = (isVisible: boolean): void => {
    setisPasswordVisible(!isVisible);
  };
  return (
    <div className="login_main flex min-h-screen flex-col items-center justify-center mx-4">
      <section className="bg-gray-50 rounded-lg shadow-lg flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Image src={book} height={200} width={200} alt="book" priority />        
        <h1 className="mt-5">Login to your account</h1>
        <div className="form_container w-full p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="form space-y-4 md:space-y-6">
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
                  placeholder="enter your email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                />
                )}
                name="email"
              />
                  { errors.email && <p className="text-red-400 indent-2 text-sm">email invalid*</p> }
            </div>
            <div className="password_textfield relative">
                <FontAwesomeIcon
                  onClick={() => handlePasswordVisibility(isPasswordVisible)}
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute text-xl top-3 right-6 text-gray-500 z-50 cursor-pointer fa fa-eye"
                />
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
                      type={isPasswordVisible ? "text" : "password" }
                      name="password" id="password" 
                      placeholder="••••••••" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    />
                    
                  )}
                  name="password"
                />
                { errors.password && <p className="text-red-400 indent-2 text-sm">password invalid*</p> }
            </div>            
            <div className="grid grid-cols-3 gap-3">
              <button 
                disabled={loginLoading}
                onClick={handleSubmit((data) => onSubmit(data))}
                type="button" 
                className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
              >
                <BiLogIn width={50} height={50} />
                {loginLoading ? "Please wait..." : "Login"}
              </button>
              <Link href={"/register"}
                className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
              >
                <GiArchiveRegister width={50} height={50} />
                Register
              </Link>
              <Link href={"/"}
                className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
              >
                <PiKeyReturnFill width={50} height={50} />
                Back  
              </Link>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  )
}
