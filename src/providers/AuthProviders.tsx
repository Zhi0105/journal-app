"use client"
import { useEffect } from "react"
import { AuthContext } from "@/contexts/Authcontext"
import { LoginInterface } from "@/types/auth/interface"
import { Login, GetUser } from "@/services/authentications"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify"
import { useUserStore } from "@/store/auth"
import { UseCategoryStore } from "@/store/category"
import { UseTaskStore } from "@/store/task"
import { EncryptUser } from "@/helpers/helpers"
import { useRouter } from "next/navigation"
import { setCookie, deleteCookie } from 'cookies-next';
import _ from "lodash"


export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { user, setUser, setToken, setUserLogout } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setToken: state.setToken,
    setUserLogout: state.setUserLogout
  }));
  const { resetCategory} = UseCategoryStore((state) => ({
    resetCategory: state.resetCategory,
  }));
  const { resetTasks} = UseTaskStore((state) => ({
    resetTasks: state.resetTasks,
  }));

  useEffect(() => { // IF HAS SESSION OR NOT!
    if(user) {
      setCookie("user", "true")
    }
    if(!user) {
      deleteCookie("user")
    }
  }, [user])
  
  const { mutate: handleLoginUser, isLoading: LoginLoading } = useMutation({
    mutationFn: Login,
    onSuccess: (data: { access_token: string }) => {
        queryClient.invalidateQueries({ queryKey: ['login'] });
        authenticate(data.access_token)
        toast("Login success!", { type: "success" })
      }, 
    onError: (err: any) => {  
      toast(err.response.data.message, { type: "warning" })
    },
});

  const login = (data:LoginInterface):void => {
    handleLoginUser(data)
  }

  const logout_debounce = _.debounce(() => {
    resetCategory()
    resetTasks()
  }, 1000)


  const logout = ():void => {
    router.push('/login')
    setUserLogout()
    deleteCookie('user')
    toast("logout success!", { type: "success" })
    logout_debounce()
  }

  const authenticate = async(user:string) => {
    const userdetails = await GetUser(user)
    const AuthenticatedUser = EncryptUser(userdetails)
    setToken(user)
    setUser(AuthenticatedUser)
    setCookie("user", "true")
    router.push('/dashboard')
  }

  
  return (
    <AuthContext.Provider 
      value={{ 
        login: (data:LoginInterface) => { login(data) }, 
        authenticate: (user: string) => { authenticate(user) },
        logout: () => { logout() },
        loginLoading: LoginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}