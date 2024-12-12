import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTH_TOKEN_NAME } from "@/components/common/ApolloWrapper";
import { gql, useQuery } from "@apollo/client";
import Loading from "@/components/common/Loading";
import { ProfileAuthQuery } from "@/gql/graphql";
import { useAuth } from "./AuthProvider";

const GET_PROFILE_AUTH = gql`
  query ProfileAuth {
    me {
      id
      name
      role
    }
  }
`

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(AUTH_TOKEN_NAME) === null) {
      router.push('/login')
    }
  }, [router])

  const { loading } = useQuery<ProfileAuthQuery>(GET_PROFILE_AUTH, {
    onError: () => router.push('/login'),
    onCompleted: (data) => {
      setUser(data.me ?? null)
    }
  })

  return loading || user === null ? <Loading /> : (
    <>
      { children }
    </>
  ) 
}
