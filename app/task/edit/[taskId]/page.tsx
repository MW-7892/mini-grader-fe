import { TaskQuery, TaskQueryVariables } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";

const GET_TASK_EDIT = gql`
  query Task($id: ID!) {
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

// TODO: Use this for taskId https://sqids.org/
export default async function TaskEdit({
  params
}: {
  params: Promise<{ taskId: string }>
}) {
  const taskId = (await params).taskId
  return (
    <div>
      { taskId }
    </div>
  )
}

