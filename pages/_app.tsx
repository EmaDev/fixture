import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';
import { CreatorProvider } from '../context/CreatorContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
      <CreatorProvider>
        <Component {...pageProps} />
      </CreatorProvider>
    </AuthContextProvider>
  )
}

export default MyApp
