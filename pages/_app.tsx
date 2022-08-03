import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppBarContainer from '../src/components/AppBarContainer'

function MyApp({ Component, pageProps }: AppProps) {
  return <><AppBarContainer /><Component {...pageProps} /></>
}

export default MyApp
