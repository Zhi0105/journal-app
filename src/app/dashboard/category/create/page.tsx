"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { CreateCategory } from "@/components/Category/CreateCategory"

export default function Create() {
  return (
    <DashboardTemplates>
      <CreateCategory />
    </DashboardTemplates>
  )
}
