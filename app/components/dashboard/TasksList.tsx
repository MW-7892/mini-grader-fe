"use client"

import { DeleteTaskMutation, DeleteTaskMutationVariables, TasksQuery } from "@/gql/graphql"
import { gql, useMutation, useQuery } from "@apollo/client"
import { MdDelete } from "react-icons/md"
import { useSnackbar } from "../common/SnackbarProvider"
import { useRouter } from "next/navigation"

export const GET_TASKS = gql`
  query Tasks {
    tasks(
      permissions: [read, write]
    ) {
      display_id
      name
      full_name
      time_limit
      statement
      memory_limit
      is_public
    }
  }
`

const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(display_id: $id) {
      display_id
    }
  }
`

export default function TasksList() {
  const { data } = useQuery<TasksQuery>(GET_TASKS)
  const router = useRouter()
  const snackbar = useSnackbar()
  const tasks = data?.tasks ?? []

  const [deleteTask] = useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DELETE_TASK)

  const handleDeleteTask = (id: string) => {
    deleteTask({ variables: { id } })
      .then(() => snackbar.setMessage("Task Deleted Successfully"))
      .catch(error => console.log(error))
  }

  return (
    <div
      className="grid bg-white items-start content-start rounded-lg
        w-full drop-shadow-md p-4 gap-y-4 overflow-y-hidden"
    >
      { tasks.map( task => (
        <div
          key={task.display_id}
          onClick={() => router.push(`/task/edit/${task.display_id}`)}
          className="h-fit bg-gray-50 py-3 px-4 rounded-md flex justify-between
            cursor-pointer hover:bg-gray-100 active:bg-gray-200"
        >
          <div>
            <div className="text-xs font-light">{ task.name }</div>
            <div>{ task.full_name }</div>
          </div>
          <div className="flex items-center pr-2">
            <button
              onClick={() => handleDeleteTask(task.display_id)}
              className="flex justify-center items-center hover:bg-red-500 hover:text-white
                size-8 rounded-full duration-100"
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) 
}
