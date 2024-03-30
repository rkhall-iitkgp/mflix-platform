'use client';
import '@mantine/core/styles.css';
import React, { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import useLoginStore from '@/Stores/LoginStore';

export default function RootLayout({ children }: { children: any }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    const userDetailsStirng = localStorage.getItem('user')
    if (userDetailsStirng) {
      const userDetails = JSON.parse(userDetailsStirng);
      useLoginStore.getState().updateUser(userDetails);
    }
  }, []);
  if (!isMounted) return null;

  return <div>{children}</div>;
}
