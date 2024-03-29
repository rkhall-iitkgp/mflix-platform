'use client';
import '@mantine/core/styles.css';
import React, { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export default function RootLayout({ children }: { children: any }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return <div>{children}</div>;
}
