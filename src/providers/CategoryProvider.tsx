"use client"
import { useCallback } from "react";
import { CategoryContext } from "@/contexts/CategoryContext";
import { categoryInterface, updateCategoryInterface, removeCategoryInterface } from "@/types/category/interface";
import { useUserStore } from "@/store/auth";
import { GetCategory, CreateCategory, UpdateCategory, RemoveCategory } from "@/services/category";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { UseCategoryStore } from "@/store/category";
import { useModalStore } from "@/store/modal"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const router = useRouter()
  const { setCategories } = UseCategoryStore((state) => ({ setCategories: state.setCategories }));
  const { setOpen } = useModalStore((state) => ({ setOpen: state.setOpen }));

  // CATEGORY MUTATION  
  const { mutate: handleCreateCategory } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("new journal created!", { type: "success" })
        router.push("/dashboard/category")
        setOpen(false)
      }, 
    onError: (err: any) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });
  const { mutate: handleUpdateCategory } = useMutation({
    mutationFn: UpdateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("item successfully updated", { type: "success" })
        router.push("/dashboard/category")
      }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  const { mutate: handleRemoveCategory } = useMutation({
    mutationFn: RemoveCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("item successfully removed", { type: "success" })
        router.push("/dashboard/category")
      }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  

  //  GET CATEGORIES REQUEST
  useQuery({
    queryKey: ["category"],
    queryFn: () => handleCategory()
  })

  const handleCategory:any = useCallback(async () => {
    if(token) {
      const categories = await GetCategory(token)
      if(categories){
        setCategories(categories)
        return categories
      }
    }
  }, [token, setCategories])
  
  return (
    <CategoryContext.Provider
      value={{
        createCategory: (payload: categoryInterface) => { handleCreateCategory(payload) },
        updateCategory: (payload: updateCategoryInterface) => { handleUpdateCategory(payload) },
        removeCategory: (payload: removeCategoryInterface) => { handleRemoveCategory(payload) }
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}