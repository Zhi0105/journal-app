"use client"
import React, { useState, useEffect, useCallback } from "react"
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
  const [enable, setEnable] = useState<boolean>(false)
  const [token, setToken] = useState<string>("") 
  const { data: userinfo } = GetUser(token, enable)
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
    router.push('/login')
    localStorage.removeItem('user')
    toast("logout success!", { type: "success" })
  }

  const authenticate = (user:string) => {
    setToken(user)
    setEnable(true)
  }

  const setAuthenticateUser = useCallback(() => {
    const user = AES.encrypt(JSON.stringify({ ...userinfo }), "user").toString()
    setUser(user)
    setEnable(false)
    router.push('/dashboard')
  }, [userinfo, router, setUser])

  useEffect(() => {
    userinfo && setAuthenticateUser()
  }, [userinfo, setAuthenticateUser])

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