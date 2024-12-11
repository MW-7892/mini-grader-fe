'use client'

import { ApolloLink, from, HttpLink } from "@apollo/client";
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { setContext } from "apollo-link-context";

export const AUTH_TOKEN_NAME = 'minigrader-token'

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_SERVER,
  })

  const authMiddleware = setContext(async (_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME)

    return {
      headers: {
        ...headers,
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    }
  })

  return new ApolloClient({
    link: from([(authMiddleware as unknown) as ApolloLink, httpLink]),
    cache: new InMemoryCache(),
  })
}

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      { children }
    </ApolloNextAppProvider>
  )
}
