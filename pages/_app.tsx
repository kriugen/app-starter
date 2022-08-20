import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0";

import AppBar from '../src/components/AppBar'

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <AppBar />
    <Component {...pageProps} />
  </UserProvider>
}

export default MyApp
