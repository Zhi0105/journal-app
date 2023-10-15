"use client"
import { Panel } from "@/components/Panel"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { CategoryProvider } from "@/providers/CategoryProvider"

export default function Dashboard() {
  return (
    <DashboardTemplates>
      <CategoryProvider>
        <Panel />  
      </CategoryProvider>
    </DashboardTemplates>
  )
}
