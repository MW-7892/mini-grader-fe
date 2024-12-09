'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import TasksList from "@/components/dashboard/TasksList"
import { DashboardQuery } from "@/gql/graphql"
import { gql, useQuery } from "@apollo/client"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin']
})

const GET_DASHBOARD_DATA = gql`
  query Dashboard {
    me {
      id
      name
      email
      role
    }
  }
`

export default function Dashboard() {
  const { data, error } = useQuery<DashboardQuery>(GET_DASHBOARD_DATA)

  console.log(error)
  console.log(data)

  return (
    <div className={`${inter.className} flex flex-col w-screen h-screen p-10 content-start`}>
      <DashboardHeader name={data?.me?.name ?? "user"} />
      <div className="grid grid-cols-10 grow">
        <div className="col col-span-3">
          Test
        </div>
        <div className="col col-span-7">
          <TasksList tasks={[]} />
        </div>
      </div>
    </div>
  )
}
