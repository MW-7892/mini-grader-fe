import TaskCreateForm from "@/components/task/TaskCreateForm"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin']
})

export default function TaskCreate() {
  return (
    <div className={`p-10 ${inter.className}`}>
      <TaskCreateForm />
    </div>
  )
}
