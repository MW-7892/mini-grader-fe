"use client"

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"

type SnackbarContextProps = {
  message: string | null
  setMessage: Dispatch<SetStateAction<string | null>>
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined)

export const useSnackbar = () => {
  const snackbarContext = useContext(SnackbarContext)
  if (!snackbarContext) {
    throw new Error("You can only use snackbar inside SnackbarProvider")
  }
  return snackbarContext
}

export default function SnackbarProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null)

  return (
    <SnackbarContext.Provider value={{ message, setMessage }}>
      { children }
    </SnackbarContext.Provider>
  )
}
