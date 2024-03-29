'use client'
import React, { SetStateAction } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'
import { useState } from 'react'

const url = "http://localhost:5000"

interface SearchBarProps {
    input:string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setSemanticSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    setFuzzySearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    setLength: React.Dispatch<React.SetStateAction<number>>;
}
export default function SearchBar({input,setInput,setSemanticSearchResults, setFuzzySearchResults, setLength }: SearchBarProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    // const [input, setInput] = useState<string>('');
    const fetchAutocompleteSuggestions = async (query: string) => {
        // console.log(`${url}/search/autocomplete?query=${query}&count=2`)

        try {
            const response = await fetch(`${url}/search/autocomplete?query=${query}&count=2`);
            if (response.ok) {
                const data = await response.json();
                // Assuming 'result' is the key containing the array of suggestions
                const suggestions = data.result.map((item: { title: string }) => item.title);
                console.log(suggestions);
                setSuggestions(suggestions);
            } else {
                console.error('Failed to fetch autocomplete suggestions');
            }
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };
    const fetchSemanticSearchResults = async (query: string) => {

        try {
            const querystring = encodeURIComponent(query)
            console.log(`${url}/search/semantic?query=${querystring}&count=10&page=1`)
            const response = await fetch(`${url}/search/semantic?query=${querystring}&count=10&page=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query
                })
            });


            if (response.ok) {
                const data = await response.json();
                setSemanticSearchResults(data.results);
                // Process the semantic search results here
                console.log(data.results, 'semantic');
            } else {
                console.error('Failed to fetch semantic search results');
            }
        } catch (error) {
            console.error('Error fetching semantic search results:', error);
        }
    };
    const fetchFuzzySearchResults = async (query: string) => {
        try {
            const response = await fetch(`${url}/search/fuzzy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    count: 10,
                    page: 1
                })
            });
            if (response.ok) {
                const data = await response.json();
                setFuzzySearchResults(data.results);
                console.log(data.results, 'fuzzy')
            } else {
                console.error('Failed to fetch fuzzy search results');
            }
        } catch (error) {
            console.error('Error fetching fuzzy search results:', error);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        fetchAutocompleteSuggestions(value);
        fetchSemanticSearchResults(value);
        fetchFuzzySearchResults(value);
        const words = value.split(/\s+/);
        // Count the number of words
        const wordCount = words.length;
        setLength(wordCount);
        // console.log('Word count:', wordCount);
    };
    return (
        <div style={styles.container}>
            <label htmlFor="search" style={styles.searchLabel}>
                <Image src={SearchIcon} alt="search" style={styles.icon} />
            </label>
            <input
                id="search"
                type="text"
                placeholder="Search"
                style={styles.input}
                value={input}
                onChange={handleInputChange}
            />
            {input && <Image src={XMarkIcon} alt="X" style={styles.icon} onClick={() => setInput('')} />}
            <Image src={MicIcon} alt="Mic" style={styles.mic} />
            {suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1999,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    width: 'calc(100% - 2px)', // Adjust width to account for border
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    listStyleType: 'none',
                    margin: 0,
                }}>
                    {suggestions.map((item, index) => (
                        <li key={index} onClick={() => setInput(item)}>{item}</li>
                    ))}
                </ul>
            )}
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
        height: '2.6rem',
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
        marginRight: '0.5rem'
    },
    mic: {
        width: '2rem',
        height: '2rem',
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
    },
    logoDiv: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem'
    },
    logo: {
        height: '2rem',
        marginLeft: '1rem'
    },
}