import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"
import { AUTH_TOKEN_NAME } from "@/components/common/ApolloWrapper"
import { gql, useQuery } from "@apollo/client"
import Loading from "@/components/common/Loading"
import { ProfileAuthQuery } from "@/gql/graphql"
import { useAuth } from "./AuthProvider"
import { redirect } from "next/navigation"

const GET_PROFILE_AUTH = gql`
  query ProfileAuth {
    me {
      id
      name
      role
    }
  }
`

export default function AuthWrapper({ children }: PropsWithChildren) {
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (localStorage.getItem(AUTH_TOKEN_NAME) === null) {
      redirect('/login')
    }
  }, [])

  const { loading } = useQuery<ProfileAuthQuery>(GET_PROFILE_AUTH, {
    onError: () => redirect("/login"),
    onCompleted: (data) => {
      setUser(data.me ?? null)
    },
  })

  return loading || user === null ? <Loading /> : <>{children}</>
}
