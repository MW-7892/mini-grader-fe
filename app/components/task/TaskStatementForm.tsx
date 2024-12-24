import { Textarea } from "@headlessui/react";
import { ChangeEvent } from "react";
import Markdown from "react-markdown";

export default function TaskStatementForm({
  statement,
  handleStatementChange
}: {
  statement: string | null,
  handleStatementChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-x-10 relative h-full">
      <Textarea
        name="statement"
        onChange={handleStatementChange}
        className="resize-none focus:outline-none border border-gray-200
          rounded-lg p-4"
      ></Textarea>
      <div className="absolute top-0 left-1/2 h-full border border-dashed border-l-gray-100"></div>
      <div>
        <Markdown>{ statement }</Markdown>
      </div>
    </div>
  )
}
