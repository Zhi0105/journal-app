"use client"
import { TaskContext } from "@/contexts/TaskContext"
import { taskInterface } from "@/types/task/interface"
import { CreateTask } from "@/services/task";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter()


  const { mutate: handleCreateTask } = useMutation({
    mutationFn: CreateTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task'] });
        toast("new task created!", { type: "success" })
        router.push("/dashboard/category")
      }, 
    onError: (err: any) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  return (
    <TaskContext.Provider
    value={{
      createTask: (payload: taskInterface) => { handleCreateTask(payload) },
    }}
    >
      {children}
    </TaskContext.Provider>
  )
}
