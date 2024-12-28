"use client"

import AuthWrapper from "@/components/common/auth/AuthWrapper"
import { useSnackbar } from "@/components/common/SnackbarProvider"
import TaskCreateEditForm, { TaskCreateEditFormValues } from "@/components/task/TaskCreateEditForm"
import { CreateTaskMutation, CreateTaskMutationVariables } from "@/gql/graphql"
import { gql, useMutation } from "@apollo/client"
import { Inter } from "next/font/google"
import { useRouter } from "next/navigation"

const inter = Inter({
  subsets: ["latin"],
})

const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $full_name: String!
    $statement: String
    $time_limit: Int!
    $memory_limit: Int!
    $is_public: Boolean!
  ) {
    createTask(
      input: {
        name: $name
        full_name: $full_name
        statement: $statement
        time_limit: $time_limit
        memory_limit: $memory_limit
        is_public: $is_public
      }
    ) {
      display_id
      name
      full_name
      statement
      time_limit
      memory_limit
      is_public
    }
  }
`

export default function TaskCreate() {
  const [createTask, { loading }] = useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CREATE_TASK,
  )
  const snackbar = useSnackbar()
  const router = useRouter()

  const handleCreateTask = (values: TaskCreateEditFormValues) => {
    createTask({
      variables: {
        name: values.name ?? "",
        full_name: values.full_name ?? "",
        statement: values.statement,
        time_limit: values.time_limit ?? 0,
        memory_limit: values.memory_limit ?? 0,
        is_public: values.is_public ?? false,
      },
      refetchQueries: ["Tasks"],
    })
      .then(() => snackbar.setMessage("Task created successfully"))
      .then(() => router.push("/dashboard"))
      .catch((error) => console.log(error.message))
  }

  return (
    <AuthWrapper>
      <div className={`p-10 ${inter.className} dark:bg-dark dark:text-white h-screen`}>
        <TaskCreateEditForm handleSubmitAction={handleCreateTask} loading={loading} />
      </div>
    </AuthWrapper>
  )
}
