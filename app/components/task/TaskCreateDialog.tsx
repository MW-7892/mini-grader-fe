import Dialog from "@/components/common/Dialog"
import TaskCreateForm, { TaskCreateEditFormValues } from "./TaskCreateForm"
import { gql, useMutation } from "@apollo/client"
import { useSnackbar } from "@/components/common/SnackbarProvider"
import { useRouter } from "next/navigation"
import { CreateTaskMutation, CreateTaskMutationVariables } from "@/gql/graphql"

const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $full_name: String!
    $time_limit: Int!
    $memory_limit: Int!
    $is_public: Boolean!
  ) {
    createTask(
      input: {
        name: $name
        full_name: $full_name
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

export default function TaskCreateDialog({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean
  onClose: () => void
}) {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [createTask, { loading }] = useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CREATE_TASK,
  )

  const handleCreateTask = (values: TaskCreateEditFormValues) => {
    createTask({
      variables: {
        name: values.name ?? "",
        full_name: values.full_name ?? "",
        time_limit: values.time_limit ?? 0,
        memory_limit: values.memory_limit ?? 0,
        is_public: values.is_public ?? false,
      },
      refetchQueries: ["Tasks"],
    })
      .then(() => onClose())
      .then(() => snackbar.setMessage("Task created successfully"))
      .then(() => router.push("/dashboard"))
      .catch((error) => console.log(error.message))
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={"Create Task"}>
      <TaskCreateForm
        loading={loading}
        handleSubmitAction={handleCreateTask}
        onCloseAction={onClose}
      />
    </Dialog>
  )
}
