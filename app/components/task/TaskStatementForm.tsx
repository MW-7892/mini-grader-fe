import { Textarea } from "@headlessui/react";
import { Roboto_Mono } from "next/font/google";
import { ChangeEvent } from "react";
import TaskStatement from "./TaskStatement";

const editorFont = Roboto_Mono({
  subsets: ["latin"],
  weight: "400"
})

export default function TaskStatementForm({
  full_name,
  time_limit,
  memory_limit,
  statement,
  handleStatementChange
}: {
  full_name: string
  time_limit: number,
  memory_limit: number
  statement?: string,
  handleStatementChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-x-10 relative h-full">
      <Textarea
        name="statement"
        value={statement}
        onChange={handleStatementChange}
        className={`resize-none focus:outline-none border border-gray-200
          rounded-lg p-4 ${editorFont.className}`}
      ></Textarea>
      <div className="absolute top-0 left-1/2 h-full border border-dashed border-l-gray-100"></div>
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
