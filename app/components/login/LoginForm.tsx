'use client'

import { LoginMutation, LoginMutationVariables } from "@/gql/graphql"
import { gql, useMutation } from "@apollo/client"
import { Field, Fieldset, Input, Label } from "@headlessui/react"
import { useRouter } from "next/navigation"

const LOGIN = gql`
  mutation Login($username: String! $password: String!) {
    login(username: $username, password: $password)
  }
`

export default function LoginForm() {
  const router = useRouter()
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN,
    {
      onCompleted: (data) => localStorage.setItem('minigrader-token', data.login)
    }
  )

  const handleLogin = (event: any) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    login({
      variables: {
        username,
        password
      }
    })
      .then(() => router.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  return (
    <form onSubmit={handleLogin}>
      <Fieldset className="grid gap-y-5">
        <Field>
          <Label className="block text-sm font-medium">Username</Label>
          <Input
            className="text-field"
            name="username"
          />
        </Field>
        <Field>
          <Label className="block text-sm font-medium">Password</Label>
          <Input
            type="password"
            className="text-field"
            name="password"
          />
        </Field>
        <button type="submit" className="w-full bg-black text-white py-1 rounded-md mt-3">
          Sign in
        </button>
      </Fieldset>
    </form>
  )

}
