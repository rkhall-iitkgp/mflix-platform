import '@/pages/global.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Navbar from './components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorSchemeScript />
      <Navbar />
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
