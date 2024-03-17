import Footer from '@/app/(root)/components/Footer'
import Navbar from '@/app/(root)/components/Navbar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className='text-white'>
                {children}
            </main>
            <Footer />
        </>
    )
}
