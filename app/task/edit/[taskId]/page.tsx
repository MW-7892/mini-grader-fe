import TaskEdit from "./TaskEdit"

// TODO: Use this for taskId https://sqids.org/
export default async function TaskEditPage({
  params
}: {
  params: Promise<{ taskId: string }>
}) {
  const taskId = (await params).taskId

  return <TaskEdit taskId={taskId} />
}

