'use client';
import '@mantine/core/styles.css';
import React, { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import useLoginStore from '@/Stores/LoginStore';
import useUserStore from '@/Stores/UserStore';
export default function RootLayout({ children }: { children: any }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const userDetailsString = localStorage.getItem('user');
    const profileDetailsString = localStorage.getItem('newProfile');
    if (profileDetailsString) {
      try {
        const profileDetails = JSON.parse(profileDetailsString);
        useUserStore.getState().updateUser(profileDetails);
      } catch (error) {
        console.error('Error parsing profile details:', error)
      }
    }
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