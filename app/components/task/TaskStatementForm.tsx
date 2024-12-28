import { Textarea } from "@headlessui/react"
import { Roboto_Mono } from "next/font/google"
import { ChangeEvent } from "react"
import TaskStatement from "./TaskStatement"
import "highlight.js/styles/default.css"

const editorFont = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
})

export default function TaskStatementForm({
  full_name,
  time_limit,
  memory_limit,
  statement,
  handleStatementChange,
}: {
  full_name: string
  time_limit: number
  memory_limit: number
  statement?: string
  handleStatementChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="grid md:grid-cols-2 gap-x-10 relative h-full">
      <Textarea
        name="statement"
        value={statement}
        onChange={handleStatementChange}
        className={`resize-none focus:outline-none border border-gray-200 dark:bg-dark language-markdown
          rounded-lg p-4 ${editorFont.className} h-screen md:h-full mb-6 md:mb-0 dark:text-gray-300`}
      ></Textarea>
      <div className="hidden md:block absolute top-0 left-1/2 h-full border border-dashed border-l-gray-100"></div>
      <div>
        <TaskStatement
          full_name={full_name}
          time_limit={time_limit}
          memory_limit={memory_limit}
          statement={statement}
        />
      </div>
    </div>
  )
}
