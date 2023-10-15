"use client"
import { useEffect, useCallback } from "react";
import { useUserStore } from "@/store/auth";
import { GetCategory } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { data }:any = useQuery({
    queryKey: ["category"],
    queryFn: () => handleCategory()
  })

  const handleCategory = useCallback(async () => {
    if(token) {
      const categories = await GetCategory(token)
      if(categories){
        return categories
      }
    }
  }, [token])
  
  useEffect(() => {
    data && console.log(data)
  }, [data])
  return ( <>{children}</> )
}