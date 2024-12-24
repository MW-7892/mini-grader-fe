"use client"

import AuthWrapper from "@/components/common/auth/AuthWrapper"
import TaskCreateEditForm from "@/components/task/TaskCreateEditForm"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin']
})

export default function TaskCreate() {
  return (
    <AuthWrapper>
      <div className={`p-10 ${inter.className} dark:bg-slate-800 dark:text-white h-screen`}>
        <TaskCreateEditForm />
      </div>
    </AuthWrapper>
  )
}
