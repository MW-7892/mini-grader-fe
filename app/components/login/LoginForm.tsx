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
  const [ login, { loading } ] = useMutation<LoginMutation, LoginMutationVariables>(
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
      <Fieldset className="grid gap-y-4">
        <Field>
          <Label className="block text-sm font-medium">Username</Label>
          <Input
            required
            className="text-field"
            name="username"
            placeholder="Username"
          />
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
        <button
          type="submit"
          className="bg-black w-full text-white py-2 rounded-full mt-4 hover:bg-black/60 active:bg-black/30"
          disabled={loading}
        >
          Sign in
        </button>
      </Fieldset>
    </form>
  )

}
