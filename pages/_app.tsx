import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import AppBar from '../src/components/AppBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <AppBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
