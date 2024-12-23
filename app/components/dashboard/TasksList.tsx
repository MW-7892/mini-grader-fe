"use client"

import { DeleteTaskMutation, DeleteTaskMutationVariables, TasksQuery } from "@/gql/graphql"
import { gql, useMutation, useQuery } from "@apollo/client"
import { MdDelete } from "react-icons/md"
import { useSnackbar } from "../common/SnackbarProvider"

export const GET_TASKS = gql`
  query Tasks {
    me {
      id
      tasks {
        id
        name
        full_name
        time_limit
        memory_limit
        is_public
      }
    }
  }
`

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`

export default function TasksList() {
  const { data } = useQuery<TasksQuery>(GET_TASKS)
  const snackbar = useSnackbar()
  const tasks = data?.me?.tasks ?? []

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
          key={task.id}
          className="h-fit bg-gray-50 py-3 px-4 rounded-md flex justify-between"
        >
          <div>
            <div className="text-xs font-light">{ task.name }</div>
            <div>{ task.full_name }</div>
          </div>
          <div className="flex items-center pr-2">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="flex justify-center items-center hover:bg-black/10 size-8 rounded-full duration-200"
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) 
}
