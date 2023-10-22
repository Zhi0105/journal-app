"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { View } from "@/components/Category/View"

export default function Page({params}: {params: {category: string}}) {
  return (
    <DashboardTemplates>
      <View 
        category={JSON.parse(decodeURIComponent(params.category))}
      />
    </DashboardTemplates>
  )
}
