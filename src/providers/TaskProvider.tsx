"use client"
import { useCallback } from "react";
import { TaskContext } from "@/contexts/TaskContext"
import { taskInterface } from "@/types/task/interface"
import { GetTask, CreateTask } from "@/services/task";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { useUserStore } from "@/store/auth";
import { UseTaskStore } from "@/store/tasl";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setTasks } = UseTaskStore((state) => ({ setTasks: state.setTasks }));
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

  
 //  GET TASKS REQUEST
useQuery({
  queryKey: ["task"],
  queryFn: () => handleTask()
})

const handleTask:any = useCallback(async () => {
  if(token) {
    const tasks = await GetTask(token)
    if(tasks){
      setTasks(tasks)
      return tasks
    }
  }
}, [token, setTasks])


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
