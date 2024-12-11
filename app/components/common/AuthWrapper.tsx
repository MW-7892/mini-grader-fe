import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_TOKEN_NAME } from "./ApolloWrapper";
import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";

type AuthContextProps = {
  user: any
}

const AuthContext = createContext<AuthContextProps>({ user: null })

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
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(AUTH_TOKEN_NAME) === null) {
      router.push('/login')
    }
  }, [router])

  const { loading } = useQuery(GET_PROFILE_AUTH, {
    onError: () => router.push('/login'),
    onCompleted: (data) => {
      setUser(data.me)
    }
  })

  return loading || user === null ? <Loading /> : (
    <AuthContext.Provider
      value={{ user }}
    >
      { children }
    </AuthContext.Provider>
  ) 
}

export const useAuth = () => useContext(AuthContext)
