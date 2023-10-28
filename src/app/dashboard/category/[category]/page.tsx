"use client"
import { DashboardTemplates } from "@/components/Templates/DashboardTemplates"
import { decodeURL } from "@/helpers/helpers"
import { View } from "@/components/Category/View"

export default function Page({params}: {params: {category: string}}) {
  return (
    <DashboardTemplates>
      <View 
        category={decodeURL(params.category)}
      />
    </DashboardTemplates>
  )
}
