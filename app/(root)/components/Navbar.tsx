'use client'

import Link from 'next/link'
import React from 'react'
import { createStyles } from "@mantine/styles";

export default function Navbar() {
    const {classes} = useStyles()
    return (
        <nav className={classes.container}>
            {/* Logo */}
            <div className={classes.logoDiv}>
                <img src="/logo.svg" alt="Logo" className={classes.logo} />
            </div>

            {/* Links CSSPropertyRule*/}
            <ul className={classes.links}>
                <li>
                    <Link href="#" className={classes.link}>
                        Movies
                    </Link>
                </li>
                <li>
                    <Link href="#" className={classes.link}>
                        Shows
                    </Link>
                </li>
                <li>
                    <Link href="#" className={classes.link}>
                        Drama
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const useStyles = createStyles(() => ({
    container : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        width: '100%',
        color: "white"
    },
    logo: {
        height: '2rem',
        marginLeft: '1rem'
    },
    logoDiv: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem'
    },
    links: {
        display: 'flex',
        padding: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        listStyle: 'none',
    },
    link: {
        padding: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: 'rgb(156, 163, 175)'
        }
    }
}))