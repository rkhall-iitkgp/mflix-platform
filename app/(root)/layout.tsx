"use client"
import Footer from '@/app/(root)/components/Footer'
import Navbar from '@/app/(root)/components/Navbar'
import React from 'react'
import { createStyles } from '@mantine/styles'
import { ScrollArea } from '@mantine/core'
import Search from './search/page'
import SearchBar from './components/NavSearch'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [semanticSearchResults, setSemanticSearchResults] = useState<any[]>([]);
    const [fuzzySearchResults, setFuzzySearchResults] = useState<any[]>([]);
    const [length, setLength] = useState<number>(0)

    const styles = createStyles(() => ({
        mainStyles: {
            color: 'white',
        }
    }));
    const { classes } = styles();
    return (
        <ScrollArea type='hover'>
            <SearchBar
                setSemanticSearchResults={setSemanticSearchResults}
                setFuzzySearchResults={setFuzzySearchResults}
                setLength={setLength}
            />
            <main className={classes.mainStyles}>
                {children}
            </main>
            <Footer />
        </ScrollArea>
    )
}
