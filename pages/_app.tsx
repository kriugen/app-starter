import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0";

import AppBarContainer from '../src/components/AppBarContainer'

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <AppBarContainer />
    <Component {...pageProps} />
  </UserProvider>
}

export default MyApp
