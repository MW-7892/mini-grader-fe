'use client'

import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`

const LOGIN = gql`
  mutation Login($username: String! $password: String!) {
    login(username: $username, password: $password)
  }
`
export default function Home() {
  const { data } = useQuery(GET_USERS)
  const [login] = useMutation(
    LOGIN,
    {
      onCompleted: (data) => localStorage.setItem('minigrader-token', data.login)
    }
  )
  console.log(data)

  const handleLogin = () => {
    login({
      variables: {
        username: "test7",
        password: "password"
      }
    })
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={handleLogin}> Login </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
