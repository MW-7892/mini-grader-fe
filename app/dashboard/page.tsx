"use client"

import { useAuth } from "@/components/common/auth/AuthProvider"
import AuthWrapper from "@/components/common/auth/AuthWrapper"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import TasksList from "@/components/dashboard/TasksList"
import { DashboardQuery } from "@/gql/graphql"
import { gql, useQuery } from "@apollo/client"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
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
  const auth = useAuth()
  const { data } = useQuery<DashboardQuery>(GET_DASHBOARD_DATA, {
    skip: !auth.user,
  })

  return (
    <AuthWrapper>
      <div
        className={`${inter.className} flex flex-col w-screen h-screen
          pt-10 px-10 content-start`}
      >
        <DashboardHeader name={data?.me?.name ?? "user"} />
        <div className="grid grid-cols-10 overflow-y-scroll">
          <div className="col col-span-3">Test</div>
          <div className="col col-span-7 overflow-y-scroll">
            <TasksList />
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
