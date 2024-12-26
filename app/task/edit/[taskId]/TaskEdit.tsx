"use client"

import AuthWrapper from "@/components/common/auth/AuthWrapper"
import { useSnackbar } from "@/components/common/SnackbarProvider"
import TaskCreateEditForm, { TaskCreateEditFormValues } from "@/components/task/TaskCreateEditForm"
import { EditTaskMutation, EditTaskMutationVariables, TaskEditDataQuery, TaskEditDataQueryVariables } from "@/gql/graphql"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Inter } from "next/font/google"
import { useRouter } from "next/navigation"

const inter = Inter({
  subsets: ['latin']
})

const EDIT_TASK = gql`
  mutation EditTask(
    $id: ID!
    $name: String
    $full_name: String
    $statement: String
    $time_limit: Int
    $memory_limit: Int
    $is_public: Boolean
  ) {
    updateTask(input: {
      id: $id
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

const GET_TASK_EDIT = gql`
  query TaskEditData($id: ID!) {
    task(id: $id) {
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

export default function TaskEdit({ taskId }: { taskId: string }) {
  const router = useRouter()
  const snackbar = useSnackbar()

  const { loading, data } = useQuery<TaskEditDataQuery, TaskEditDataQueryVariables>(GET_TASK_EDIT, {
    variables: { id: taskId ?? "" },
    skip: !taskId,
  })

  const [editTask] = useMutation<EditTaskMutation, EditTaskMutationVariables>(EDIT_TASK)

  const task = data?.task
  if (!task) return null

  const initialValues: TaskCreateEditFormValues = {
    name: task.name,
    full_name: task.full_name,
    statement: task.statement,
    memory_limit: task.memory_limit,
    time_limit: task.time_limit,
    is_public: task.is_public
  }


  const handleEditTask = (values: TaskCreateEditFormValues) => {
    editTask({
      variables: {
        ...values,
        id: taskId
      }
    })
      .then(() => snackbar.setMessage("Task updated successfully"))
      .then(() => router.push("/dashboard"))
      .catch((error) => console.log(error.message))
  }

  return (
    <AuthWrapper>
      <div className={`p-10 ${inter.className} dark:bg-slate-800 dark:text-white h-screen`}>
        <TaskCreateEditForm
          initialValues={initialValues}
          handleSubmitAction={handleEditTask}
          loading={loading}
        />
      </div>
    </AuthWrapper>
  )
}
