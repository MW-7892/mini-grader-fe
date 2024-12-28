'use client'

import { Field, Fieldset, Label, Input, Checkbox } from "@headlessui/react"
import { ChangeEvent, useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { MdMenu, MdOutlineAdd, MdOutlineArrowBackIos } from "react-icons/md"
import TaskStatementForm from "./TaskStatementForm"
import parseIntNullCheck from "@/utils/parseIntNullCheck"
import { useRouter } from "next/navigation"

export type TaskCreateEditFormValues = {
  name?: string
  full_name?: string
  statement?: string | null
  time_limit?: number | null
  memory_limit?: number | null
  is_public?: boolean
}

export default function TaskCreateEditForm({
  handleSubmitAction,
  initialValues,
  loading
}: {
  handleSubmitAction: (values: TaskCreateEditFormValues) => void
  initialValues?: TaskCreateEditFormValues,
  loading: boolean
}) {
  const router = useRouter()

  const [values, setValues] = useState<TaskCreateEditFormValues>(initialValues ?? {})

  const toggleSidebar = () => {
    document.getElementById("sidebar")?.classList.toggle(`-translate-x-[320px]`)
    document.getElementById("inner-part")?.classList.toggle(`ml-[320px]`)
  }

  const handleStatementChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValues(p => ({ ...p, statement: event.target.value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleSubmitAction(values)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed inset-0 w-10 h-10 z-40 flex m-6 items-center
          justify-center hover:shadow-md duration-300 rounded-md text-xl
          active:bg-black/10"
      >
        <MdMenu />
      </button>
      <form className="h-full" onSubmit={handleSubmit}>
        <aside
          id="sidebar"
          className={`fixed inset-0 w-[320px] h-screen p-8 pt-20 bg-gray-100
            ease-in-out duration-300 hidden md:block dark:bg-gray-900 dark:text-white`}
        >
          <div className="mb-3 font-bold text-lg">
            General Information
          </div>
          <Fieldset className="grid gap-y-4">
            <Field>
              <Label className="block text-sm font-medium">Task Name*</Label>
              <Input
                required
                className="text-field w-full bg-white"
                name="name"
                placeholder="aplusb"
                value={values.name ?? ""}
                onChange={(event) => setValues(p => ({ ...p, name: event.target.value }))}
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Full Name*</Label>
              <Input
                required
                className="text-field w-full bg-white"
                onChange={(event) => setValues(p => ({ ...p, full_name: event.target.value }))}
                value={values.full_name ?? ""}
                name="full_name"
                placeholder="A + B"
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Time Limit (ms)*</Label>
              <Input
                required
                type="number"
                onChange={(event) => setValues(p => ({ ...p, time_limit: parseIntNullCheck(event.target.value) }))}
                value={values.time_limit ?? ""}
                className="text-field w-full bg-white"
                name="time_limit"
                placeholder="1000"
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Memory Limit (MB)*</Label>
              <Input
                required
                type="number"
                onChange={(event) => setValues(p => ({ ...p, memory_limit: parseIntNullCheck(event.target.value) }))}
                value={values.memory_limit ?? ""}
                className="text-field w-full bg-white"
                name="memory_limit"
                placeholder="32"
              />
            </Field>
            <Field className="flex justify-left items-center gap-x-3 mt-2">
              <Checkbox
                checked={values.is_public ?? false}
                onChange={(value) => setValues(p => ({ ...p, is_public: value }))}
                className="group size-5 rounded-md bg-white duration-100 p-1
                  ring-inset data-[checked]:bg-gray-500"
              >
                <IoMdCheckmark className="hidden size-3 fill-white group-data-[checked]:block" />
              </Checkbox>
              <Label className="block text-sm font-medium">Accessible by URL</Label>
            </Field>
          </Fieldset>
        </aside>
        <div id="inner-part" className="h-full ml-[320px] duration-300 ease-in-out">
          <TaskStatementForm
            full_name={values.full_name ?? ""}
            time_limit={values.time_limit ?? 0}
            memory_limit={values.memory_limit ?? 0}
            statement={values.statement ?? undefined}
            handleStatementChange={handleStatementChange}
          />
        </div>
        <div className="fixed bottom-0 right-0 flex m-10 gap-x-5">
          <button
            type="button"
            className="bg-white w-fit pl-3 pr-4 py-2
              shadow-md hover:shadow-lg hover:bg-gray-100 active:bg-black/60 rounded-md
              flex gap-x-2 items-center justify-center"
            onClick={router.back}
          >
            <MdOutlineArrowBackIos />
            Back
          </button>
          <button
            type="submit"
            className=" bg-black w-fit pl-3 pr-4 text-white py-2
              shadow-md hover:shadow-lg active:bg-black/60 rounded-md flex gap-x-2
              items-center justify-center"
            disabled={loading}
          >
            <MdOutlineAdd />
            { initialValues ? "Edit Task" : "Create Task" }
          </button>
        </div>
      </form>
    </>
  )
}
