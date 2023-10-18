"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { EditCategory } from "@/components/Category/EditCategory"

export default function Page({params}: {params: {category: string}}) {
  return (
    <DashboardTemplates>
      <EditCategory 
        category={JSON.parse(decodeURIComponent(params.category))}
      />
    </DashboardTemplates>
  )
}
