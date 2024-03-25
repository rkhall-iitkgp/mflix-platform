'use client'

import Link from 'next/link'
import React from 'react'
import { createStyles } from "@mantine/styles";
import searchMsApiUrls from '../../api/searchMsApi';
import themeOptions from '../../../utils/colors';

export default function Navbar() {

    const handleLogOut = async () => {
        const values = {
            "flag": 1,
        }
        const base_url = searchMsApiUrls()
        const token = sessionStorage.getItem('accessToken');
        await fetch(`${base_url}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                ...values,
            }),
        }).then(async (res) => {
            let jsonData = await res.json();
            if (!res.ok) {
                console.log(jsonData);
            }
            //   setLoading(false);
            else {
                sessionStorage.removeItem('accessToken');
                console.log("Logout successful");
                // console.log(jsonData);
                // sessionStorage.setItem('accessToken', jsonData.user.accessToken);
                // sessionStorage.setItem('token', jsonData.user.token);
            }
        });
    }


    const { classes } = useStyles()
    return (
        <nav className={classes.container}>
            {/* Logo */}
            <div className={classes.logoDiv}>
                <img src="/logo.svg" alt="Logo" className={classes.logo} />
            </div>

            {/* Links CSSPropertyRule*/}
            <ul className={classes.links}>
                <li>
                    <Link href="/" className={classes.link}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/login" className={classes.link}>
                        Login
                    </Link>
                </li>
                <li className={classes.premium} >
                    <Link href="#" className={classes.link2}>
                        Premium
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const useStyles = createStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '0rem',
        width: '100vw',
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
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        textDecoration: 'none',
        fontSize: '1.25rem',
        color: 'white',
        '&:hover': {
            color: 'rgb(156, 163, 175)'
        },
        alignItems: 'center',
    },
    link2: {
        padding: '0.5rem',
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        textDecoration: 'none',
        fontSize: '1.25rem',
        '&:hover': {
            color: 'rgb(156, 163, 175)'
        },
        alignItems: 'center',
        border: '2px solid white',
        borderRadius: '8px',
        borderColor: themeOptions.color.smallBox,
        color: themeOptions.color.smallBox,

    }
}))