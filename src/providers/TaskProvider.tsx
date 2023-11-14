"use client"
import { useCallback } from "react";
import { TaskContext } from "@/contexts/TaskContext"
import { taskInterface, updateTaskInterface } from "@/types/task/interface"
import { GetTask, CreateTask, UpdateTask } from "@/services/task";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { useUserStore } from "@/store/auth";
import { UseTaskStore } from "@/store/task";
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
  const { mutate: handleUpdateTask } = useMutation({
    mutationFn: UpdateTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task'] });
        toast("item successfully updated", { type: "success" })
        router.push("/dashboard/category")
      }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  const { mutate: handleUpdateTaskStatus } = useMutation({
    mutationFn: UpdateTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task'] });
        console.log("status updated success!")
        // toast("status updated success!", { type: "success" })
      }, 
    onError: (err: any) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  const { mutate: handleUpdateTaskDates } = useMutation({ 
    mutationFn: UpdateTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task'] });
        console.log("dates updated!")
      }, 
    onError: (err: any) => {
      console.log(err)
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
      updateTask: (payload: updateTaskInterface) => { handleUpdateTask(payload) },
      updateTaskStatus: (payload: updateTaskInterface) => { handleUpdateTaskStatus(payload) },
      updateTaskDates: (payload: updateTaskInterface) => { handleUpdateTaskDates(payload) }

    }}
    >
      {children}
    </TaskContext.Provider>
  )
}
