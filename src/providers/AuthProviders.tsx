"use client"
import { AuthContext } from "@/contexts/Authcontext"
import { LoginInterface } from "@/types/auth/interface"
import { Login, GetUser } from "@/services/authentications"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify"
import { useUserStore } from "@/store/auth"
import { AES } from 'crypto-js';
import { useRouter } from "next/navigation"

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { user, setUser, setUserLogout } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setUserLogout: state.setUserLogout
  }));
  const { mutate: handleLoginUser } = useMutation({
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

  const logout = ():void => {
    setUserLogout()
    toast("logout success!", { type: "success" })
    router.push('/login')
  }

  const authenticate = async(user:string) => {
    const userdetails = await GetUser(user)
    const AuthenticatedUser = AES.encrypt(JSON.stringify({ ...userdetails }), "user").toString()
    setUser(AuthenticatedUser)
    router.push('/dashboard')
  }

  return (
    <AuthContext.Provider 
      value={{ 
        login: (data:LoginInterface) => { login(data) }, 
        authenticate: (user: string) => { authenticate(user) },
        logout: () => { logout() }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}