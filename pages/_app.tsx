import '@/pages/global.css';
import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';
import Navbar from './components/Navbar';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
