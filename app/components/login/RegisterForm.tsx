'use client'

import { RegisterUserMutation, RegisterUserMutationVariables } from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { Field, Fieldset, Label, Input } from "@headlessui/react";
import { useRouter } from "next/navigation";

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUser(input: {
      name: $username 
      email: $email
      password: $password
      role: "user"
    }) {
      id
      name
      email
    }
  }
`

export default function RegisterForm() {
  const [registerUser, { loading }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(REGISTER_USER)
  const router = useRouter()

  const handleLogin = (event: any) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const email = event.target.email.value

    registerUser({
      variables: {
        username,
        password,
        email,
      }
    })
      .then(() => router.push('/login'))
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
        <Field>
          <Label className="block text-sm font-medium">Email</Label>
          <Input
            required
            type="email"
            className="text-field"
            name="email"
            placeholder="test@example.com"
          />
        </Field>
        <button
          type="submit"
          className="bg-black w-full text-white py-2 rounded-full mt-4 hover:bg-black/60 active:bg-black/30"
          disabled={loading}
        >
          Register
        </button>
      </Fieldset>
    </form>
  )

}
