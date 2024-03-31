

import '@mantine/core/styles.css';
import React, { useEffect } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: 'Mflix',
  description: 'Discover endless entertainment possibilities with Mflix, your go-to destination for all things streaming!',
};
export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
