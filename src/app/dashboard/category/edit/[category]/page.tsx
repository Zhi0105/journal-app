"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { decodeURL } from "@/helpers/helpers"
import { EditCategory } from "@/components/Category/EditCategory"

export default function Page({params}: {params: {category: string}}) {
  return (
    <DashboardTemplates>
      <EditCategory 
        category={decodeURL(params.category)}
      />
    </DashboardTemplates>
  )
}
