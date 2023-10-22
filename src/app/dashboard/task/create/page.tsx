"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { CreateTask } from "@/components/Task/CreateTask"

export default function Create() {
  return (
    <DashboardTemplates>
      <CreateTask />
    </DashboardTemplates>
  )
}
