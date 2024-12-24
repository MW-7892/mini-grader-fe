'use client'

import { CreateTaskMutation, CreateTaskMutationVariables } from "@/gql/graphql"
import { gql, useMutation } from "@apollo/client"
import { Field, Fieldset, Label, Input, Checkbox } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { MdMenu, MdOutlineAdd } from "react-icons/md"
import { useSnackbar } from "../common/SnackbarProvider"

const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $full_name: String!
    $statement: String
    $time_limit: Int!
    $memory_limit: Int!
    $is_public: Boolean!
  ) {
    createTask(input: {
      name: $name
      full_name: $full_name
      statement: $statement
      time_limit: $time_limit
      memory_limit: $memory_limit
      is_public: $is_public
    }){
      id
      name
      full_name
      statement
      time_limit
      memory_limit
      is_public
    }
  }
`

export default function TaskCreateEditForm() {
  const [createTask, { loading }] = useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CREATE_TASK)
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const snackbar = useSnackbar()
  const router = useRouter()

  const handleCreateTask = (event: any) => {
    event.preventDefault()
    const name = event.target.name.value
    const full_name = event.target.full_name.value
    const time_limit = event.target.time_limit.value
    const memory_limit = event.target.memory_limit.value

    createTask({
      variables: {
        name,
        full_name,
        statement: null,
        time_limit,
        memory_limit,
        is_public: isPublic
      },
    })
      .then(() => snackbar.setMessage("Task created successfully"))
      .then(() => router.push("/dashboard"))
      .catch((error) => console.log(error.message))
  }

  const toggleSidebar = () => {
    document.getElementById("sidebar")?.classList.toggle(`-translate-x-[320px]`)
    document.getElementById("inner-part")?.classList.toggle(`ml-[320px]`)
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
      <form onSubmit={handleCreateTask}>
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
              <Input required className="text-field w-full bg-white" name="name" placeholder="aplusb" />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Full Name*</Label>
              <Input
                required
                className="text-field w-full bg-white"
                name="full_name"
                placeholder="A + B"
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Time Limit (ms)*</Label>
              <Input
                required
                className="text-field w-full bg-white"
                name="time_limit"
                placeholder="1000"
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium">Memory Limit (MB)*</Label>
              <Input
                required
                className="text-field w-full bg-white"
                name="memory_limit"
                placeholder="32"
              />
            </Field>
            <Field className="flex justify-left items-center gap-x-3 mt-2">
              <Checkbox
                checked={isPublic}
                onChange={setIsPublic}
                className="group size-5 rounded-md bg-white duration-100 p-1
                  ring-inset data-[checked]:bg-gray-500"
              >
                <IoMdCheckmark className="hidden size-3 fill-white group-data-[checked]:block" />
              </Checkbox>
              <Label className="block text-sm font-medium">Accessible by URL</Label>
            </Field>
          </Fieldset>
        </aside>
        <div id="inner-part" className="ml-[320px] duration-300 ease-in-out pt-10">
          test
        </div>
        <button
          type="submit"
          className="fixed bottom-0 right-0 bg-black w-36 text-white py-2 m-10
            shadow-md hover:shadow-lg active:bg-black/60 rounded-md flex gap-x-2
            items-center justify-center pr-2"
          disabled={loading}
        >
          <MdOutlineAdd />
          Create Task
        </button>
      </form>
    </>
  )
}
