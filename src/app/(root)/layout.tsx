"use client"
import Footer from '@/app/(root)/components/Footer'
import Navbar from '@/app/(root)/components/Navbar'
import React from 'react'
import { createStyles } from '@mantine/styles'

export default function Layout({ children }: { children: React.ReactNode }) {
    const styles = createStyles(() => ({
        mainStyles:{
            color:'white',
        }
    }));
    const {classes}=styles();
    return (
        <>
            <Navbar />
            <main className={classes.mainStyles}>
                {children}
            </main>
            <Footer />
        </>
    )
}
