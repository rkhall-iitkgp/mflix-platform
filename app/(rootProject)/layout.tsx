'use client';
import '@mantine/core/styles.css';
import React, { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import useLoginStore from '@/Stores/LoginStore';

export default function RootLayout({ children }: { children: any }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const userDetailsString = localStorage.getItem('user');
    if (userDetailsString) {
      try {
        const userDetails = JSON.parse(userDetailsString);
        useLoginStore.getState().updateUser(userDetails);
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);
  if (!isMounted) return null;

  return <div>{children}</div>;
}
