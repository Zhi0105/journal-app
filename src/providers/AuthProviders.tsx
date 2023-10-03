"use client"
import React from "react"
import { AuthContext } from "@/contexts/Authcontext"
import { LoginInterface } from "@/types/auth/interface"
import { Login } from "@/services/authentications"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify"

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {


  const queryClient = useQueryClient();
  const { mutate: handleLoginUser } = useMutation({
    mutationFn: Login,
    onSuccess: (data: { access_token: string }) => {
        queryClient.invalidateQueries({ queryKey: ['login'] });
        console.log(data)
    }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "warning" })
    },
});

  const login = (data:LoginInterface):void => {
    handleLoginUser(data)
  }

  const logout = ():void => {
    console.log(logout)
    // setUserLogout()
    // deleteCookie('user')
    // router.push("/login")

  }

  return (
    <AuthContext.Provider 
      value={{ 
        login: (data:LoginInterface) => { login(data) }, 
        logout: () => { logout() }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}