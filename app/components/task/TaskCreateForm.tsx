"use client"

import React from "react"
import { Field, Fieldset, Label, Input, Checkbox } from "@headlessui/react"
import { useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { MdOutlineAdd } from "react-icons/md"
import parseIntNullCheck from "@/utils/parseIntNullCheck"

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
  loading,
  onCloseAction,
}: {
  handleSubmitAction: (values: TaskCreateEditFormValues) => void
  initialValues?: TaskCreateEditFormValues
  loading: boolean
  onCloseAction: () => void
}) {
  const [values, setValues] = useState<TaskCreateEditFormValues>(initialValues ?? {})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleSubmitAction(values)
  }

  return (
    <>
      <form className="h-full min-w-[320px] text-gray-600" onSubmit={handleSubmit}>
        <Fieldset className="grid gap-y-4">
          <Field>
            <Label className="block text-sm font-medium">Task Name*</Label>
            <Input
              required
              className="text-field w-full bg-white"
              name="name"
              placeholder="aplusb"
              value={values.name ?? ""}
              onChange={(event) => setValues((p) => ({ ...p, name: event.target.value }))}
            />
          </Field>
          <Field>
            <Label className="block text-sm font-medium">Full Name*</Label>
            <Input
              required
              className="text-field w-full bg-white"
              onChange={(event) => setValues((p) => ({ ...p, full_name: event.target.value }))}
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
              onChange={(event) =>
                setValues((p) => ({ ...p, time_limit: parseIntNullCheck(event.target.value) }))
              }
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
              onChange={(event) =>
                setValues((p) => ({ ...p, memory_limit: parseIntNullCheck(event.target.value) }))
              }
              value={values.memory_limit ?? ""}
              className="text-field w-full bg-white"
              name="memory_limit"
              placeholder="32"
            />
          </Field>
          <Field className="flex justify-left items-center gap-x-3 mt-2">
            <Checkbox
              checked={values.is_public ?? false}
              onChange={(value) => setValues((p) => ({ ...p, is_public: value }))}
              className="group size-5 rounded-md bg-white p-1
                ring-inset data-[checked]:bg-gray-500 border cursor-pointer"
            >
              <IoMdCheckmark className="hidden size-3 fill-white group-data-[checked]:block" />
            </Checkbox>
            <Label className="block text-sm font-medium">Accessible by URL</Label>
          </Field>
        </Fieldset>
        <div className="h-full flex justify-end gap-x-3 pt-2 mt-3">
          <button
            type="submit"
            className=" bg-black w-fit pl-3 pr-4 text-white py-2
              shadow-md hover:shadow-lg active:bg-black/60 rounded-md flex gap-x-2
              items-center justify-center"
            disabled={loading}
          >
            <MdOutlineAdd />
            {initialValues ? "Edit Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={onCloseAction}
            className="rounded-md text-gray-600 px-3 hover:bg-gray-200 py-2 duration-100"
          >
            Close
          </button>
        </div>
      </form>
    </>
  )
}
