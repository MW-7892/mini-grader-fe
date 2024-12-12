"use client"

import { LoginMutation, LoginMutationVariables } from "@/gql/graphql"
import { gql, useMutation } from "@apollo/client"
import { Field, Fieldset, Input, Label } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CgSpinner } from "react-icons/cg"
import { RiErrorWarningLine } from "react-icons/ri"

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export default function LoginForm() {
  const router = useRouter()
  const [isError, setIsError] = useState<boolean>(false)
  const [login, { loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
    onCompleted: (data) => localStorage.setItem("minigrader-token", data.login),
  })

  const handleLogin = (event: any) => {
    event.preventDefault()
    setIsError(false)
    const username = event.target.username.value
    const password = event.target.password.value

    login({
      variables: {
        username,
        password,
      },
    })
      .then(() => router.push("/dashboard"))
      .catch(() => {
        setIsError(true)
      })
  }

  return (
    <form onSubmit={handleLogin}>
      <Fieldset className="grid gap-y-4">
        <Field>
          <Label className="block text-sm font-medium">Username</Label>
          <Input required className="text-field" name="username" placeholder="Username" />
        </Field>
        <Field>
          <Label className="block text-sm font-medium">Password</Label>
          <Input
            required
            type="password"
            className="text-field"
            name="password"
            placeholder="********"
          />
        </Field>
        {isError && (
          <div className="flex text-sm text-red-500 items-center gap-x-1">
            <RiErrorWarningLine />
            <span>{error?.message}</span>
          </div>
        )}
        <button
          type="submit"
          className="bg-black flex items-center w-full text-white py-2
            rounded-full mt-4 hover:bg-black/60 active:bg-black/30
            justify-center gap-x-3"
          disabled={loading}
        >
          {loading && <CgSpinner className="animate-spin" />}
          <span>Sign in</span>
        </button>
      </Fieldset>
    </form>
  )
}
