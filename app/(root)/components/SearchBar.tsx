import React from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'

export default function SearchBar() {
    const [input, setInput] = React.useState('' as string)
    return (
        <div style={styles.container}>
            <label htmlFor="search" style={styles.searchLabel}>
                <Image src={SearchIcon} alt="search" style={styles.icon} />
            </label>
            <input
                id='search'
                type="text"
                placeholder="Search"
                style={styles.input}
                value={input as string}
                onChange={(e) => setInput(e.target.value)}
            />
            {input && <Image src={XMarkIcon} alt="X" style={styles.icon} onClick={() => setInput('')} />}
            <Image src={MicIcon} alt="Mic" style={styles.mic} />
        </div>
    )
}

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
        height: '7vh'
    },
    input: {
        backgroundColor: 'transparent',
        outline: 'none',
        color: 'rgb(55, 65, 81)',
        width: '100%',
        fontSize: '1.2rem',
        border: 'none'
    },
    icon: {
        width: '4vh',
        height: '4vh',
        color: 'rgb(156, 163, 175)',
        marginRight: '0.5rem'
    },
    mic: {
        width: '4vh',
        height: '4vh',
        color: 'rgb(156, 163, 175)',
        marginRight: '0.5rem',
        backgroundColor: '#7011B6',
        padding: '0.125rem',
        borderRadius: '50%'
    },
    searchLabel: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
}