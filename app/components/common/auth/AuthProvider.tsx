'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type User = {
  id: string
  name: string
  role: string
}

type AuthContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  if (authContext === undefined) {
    throw new Error('useAuth must be inside AuthProvider')
  }
  return authContext
} 

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      { children }
    </AuthContext.Provider>
  )
}
