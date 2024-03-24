'use client'

import Link from 'next/link'
import React from 'react'
import { createStyles } from "@mantine/styles";
import themeOptions from '@/utils/colors';
import { FaSearch } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { ActionIcon, Divider } from '@mantine/core';
import { IoCloseOutline } from "react-icons/io5";
import NavSearch from '@/app/(root)/components/NavSearch';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const path = usePathname();
    const { classes } = useStyles();
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Rename state to indicate whether search is open

    const searchBoxRef = useRef<HTMLDivElement>(null); // UseRef with HTMLDivElement type

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleCloseClick = () => {
        setIsSearchOpen(false); // Close the search box
        setInput(''); // Clear input when closing search box
    };

    // const handleTyping = (typing) => {
    //     setIsTyping(typing);
    // };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
            // Click occurred outside the search box, so close it
            setIsSearchOpen(false);
            setInput(''); // Clear input when closing search box
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav>
            <div className={classes.container} style={{zIndex:'22'}}>
                {/* Logo */}
                <div className={classes.logoDiv}>
                    <img src="/logo.svg" alt="Logo" className={classes.logo} />
                </div>

                {/* Links */}
                <ul className={classes.links}>
                    <li>
                        {path !== '/' && ( // Check if current path is not the home page
                            <div>
                                {isSearchOpen ? (
                                    <>
                                        <div>
                                            <ActionIcon size={30} variant='transparent' onClick={handleCloseClick} style={{marginRight:'5px'}}>
                                                <IoCloseOutline color={themeOptions.color.divider} size={30}  />
                                            </ActionIcon>
                                            <div style={{ marginLeft: '-630px', marginTop:'-70px', width: '600px', height:'20px', position: 'absolute', zIndex:'40' }}>
                                                <NavSearch input={input} setInput={setInput} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <FaSearch className={classes.search} onClick={handleSearchClick} />
                                )}
                            </div>
                        )}
                    </li>
                    <li>
                        <Link href="#" className={classes.link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className={classes.link}>
                            Login
                        </Link>
                    </li>
                    <li className={classes.premium} >
                        <Link href="#" className={classes.link2}>
                            Premium
                        </Link>
                    </li>
                </ul>
            </div>
            <div style={{width:'100%', height:'50px'}}>

            </div>
        </nav>
    )
}

const useStyles = createStyles(() => ({

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:'50px',
        // padding: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '0rem',
        width: '100%',
        color: "white",
        background:themeOptions.color.black,
        opacity:'1',
        position:'fixed',
        // marginBottom:'500px',
    },
    search: {
        height: '20px',
        width: '50px',
        marginTop: '5px',
        '&:hover': {
            color: 'gray',
            cursor: 'pointer',
        }
    },
    icon: {
        width: '2rem',
        height: '1rem',
        color: themeOptions.color.divider,
        marginRight: '0.5rem'
    },
    logo: {
        height: '2rem',
        marginLeft: '1rem',
        marginRight: '3rem',
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
    premium: {
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        height: '2.3rem',
        width: '7rem',
        display: 'flex',
        transition: '0.3s',
        alignItems: 'center',
        '&:hover': {
            background: themeOptions.color.button,
            cursor: 'pointer',
        },
        border: '2px solid',
        borderRadius: '8px',
        borderColor: themeOptions.color.smallBox,
        color: themeOptions.color.smallBox,
    },
    link2: {
        textDecoration: 'none',
        fontSize: '1.25rem',
        marginLeft: '0.6rem',
        color: themeOptions.color.divider,
    }

}))