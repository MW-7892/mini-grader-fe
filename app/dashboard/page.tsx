'use client'

import { DashboardQuery } from "@/gql/graphql"
import { gql, useQuery } from "@apollo/client"

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

  return (
    <div className="grid w-screen h-screen justify-center content-center text-center">
      { error ? (<div>Error: { error.message }</div>) :
        (
          <>
            <div>Hello!</div>
            <div>{ data?.me?.name }</div>
            <div>{ data?.me?.email }</div>
            <div>{ data?.me?.role }</div>
          </>
        )
      }
    </div>
  )
}
