"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { decodeURL } from "@/helpers/helpers"
import { EditTasks } from "@/components/Task/EditTasks"

export default function Page({params}: {params: {task: string}}) {
  return (
    <DashboardTemplates>
      <EditTasks 
        task={decodeURL(params.task)}
      />
      
    </DashboardTemplates>
  )
}
