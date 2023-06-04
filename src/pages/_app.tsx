import '../styles/globals.scss';

import { AppProps } from 'next/app';

import { Header } from '../components';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
