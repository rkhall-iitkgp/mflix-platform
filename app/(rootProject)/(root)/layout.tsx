'use client';
import Footer from '@/app/(rootProject)/(root)/components/Footer';
import Navbar from '@/app/(rootProject)/(root)/components/Navbar';
import React from 'react';
import { createStyles } from '@mantine/styles';
import { ScrollArea } from '@mantine/core';
import Chatbot from './components/Chatbot';

export default function Layout({ children }: { children: React.ReactNode }) {
  const styles = createStyles(() => ({
    mainStyles: {
      color: 'white',
      overflow: 'hidden',
    },
  }));
  const { classes } = styles();
  return (
    <ScrollArea type="hover">
      <Navbar />
      <main className={classes.mainStyles}>
        {children}
        <Chatbot />
      </main>
      <Footer />
    </ScrollArea>
  );
}
