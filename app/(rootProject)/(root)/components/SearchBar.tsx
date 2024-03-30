"use client"
import React, { SetStateAction, useEffect } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'
import { createStyles } from '@mantine/styles';


export default function SearchBar({ input, setInput, onTyping, onSearch }: { input: string, setInput: React.Dispatch<SetStateAction<string>>, onTyping: (value: string) => void, onSearch: (input: string) => void }) {
    console.log("ontyping", onTyping);
    useEffect(() => {
        if (!input && typeof onTyping === 'function') {
            onTyping('');
        }
    }, [input, onTyping]);
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (input.length > 2) {
                onSearch(input);
            }
        }
    };
    const { classes, cx } = useStyles();
    return (
        <div style={styles.container}>
            <label htmlFor="search" style={styles.searchLabel}>
                <Image src={SearchIcon} alt="search" className={classes.icon}/>
            </label>
            <input
                id='search'
                type="text"
                placeholder="Search"
                autoComplete='off'
                style={styles.input}
                value={input as string}
                onChange={(e) => onTyping(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {input && <Image src={XMarkIcon} alt="X" style={styles.icon} onClick={() => {
                setInput('');
                onTyping('');
                console.log("clicked")
            }} />}
            <Image src={MicIcon} alt="Mic" className={classes.mic} />
        </div>
    )
}
const useStyles = createStyles(() => ({
  mic: {
    width: '2.5rem',
    height: '2.5rem',
    color: 'rgb(156, 163, 175)',
    marginRight: '0.5rem',
    backgroundColor: '#7011B6',
    padding: '0.5rem',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  icon: {
    width: '2rem',
    height: '2rem',
    color: 'rgb(156, 163, 175)',
    marginRight: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in',
    '&:hover': {
      transform: 'scale(1.1)',
    },
},
}));
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.375rem',
        overflow: 'hidden',
        backgroundColor: 'rgb(243, 244, 246)',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        height: '3.6rem',
    },
    input: {
        backgroundColor: 'transparent',
        outline: 'none',
        color: 'rgb(55, 65, 81)',
        width: '100%',
        border: 'none',
        fontSize: '1.25rem'
    },
    icon: {
        width: '2rem',
        height: '2rem',
        color: 'rgb(156, 163, 175)',
        marginRight: '0.5rem',
        cursor: 'pointer'
    },
    searchLabel: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
}