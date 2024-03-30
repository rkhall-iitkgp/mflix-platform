'use client'
import React, { SetStateAction } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import searchMsApiUrls from '@/app/api/searchMsApi';
import { Menu } from '@mantine/core'
import { useEventListener } from '@mantine/hooks'
import { createStyles } from '@mantine/styles';
import { FaMicrophone } from 'react-icons/fa6';
import { useVoice } from '@/components/VoiceSearchButton/UseVoice';
export default function SearchBar() {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const { text, listen, isListening } = useVoice();
    const [listeningFront, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
   
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (input.length > 2) {
                window.location.href = `/search?query=${input}`;
            }
        }
    };
    useEffect(() => {
        if (listeningFront && text !== '') {
          setInput(text);
        }
      }, [text]);
      const handleListening = () => {
        if (!listeningFront) {
          listen();
          setIsTyping(false);
          setIsListening(true);
          setTimeout(() => {
            setIsListening(false);
          }, 5000);
        }
        else if (text !== '') {
            console.log("text: ",text)
            console.log("voice: autocomplete")
            fetchAutocompleteSuggestions(text);
        }
      };  
    const fetchAutocompleteSuggestions = async (query: string) => {
        try {
            const response = await fetch(`${searchMsApiUrls()}search/autocomplete?query=${query}`);
            if (response.ok) {
                const data = await response.json();
                // Assuming 'result' is the key containing the array of suggestions
                const suggestions = data.result.map((item: { title: string }) => item.title);
                console.log(suggestions);
                setSuggestions(suggestions);
            } else {
                setSuggestions([]);
                console.error('Failed to fetch autocomplete suggestions');
            }
        } catch (error) {
            setSuggestions([]);
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
     
        fetchAutocompleteSuggestions(value);
    };
    const { classes} = useStyles();
    return (
        <Menu opened={suggestions.length !== 0} offset={0} width='target' trapFocus={false} closeOnClickOutside={true}>
            <Menu.Target>
                <div className={classes.container}>
                    <label htmlFor="search" className={classes.searchLabel}>
                        <Image src={SearchIcon} alt="search" className={classes.icon} />
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        className={classes.input}
                        value={input}
                        onChange={handleInputChange}
                        autoComplete='off'
                        onKeyPress={handleKeyPress}
                    />
                    {input && <Image src={XMarkIcon} alt="X" className={classes.icon} onClick={() => {setInput(''); setSuggestions([]);}} />}
                    <button className={classes.button} onClick={handleListening} type="button">
        <FaMicrophone
        className={classes.mic}
          style={{
            backgroundColor: listeningFront ? '#7011B6' : 'transparent',
          }}
          size={24}
        />
      </button>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {suggestions.map((item, index) => (
                    <Menu.Item key={index} component='a' href={`/search?query=${item}`} style={{
                       
                    }}>
                        {item}
                    </Menu.Item>
            ))}
            </Menu.Dropdown>
        </Menu>
    )
}

const useStyles  =createStyles(() => ( {

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
        width: '1.5rem',
        height: '1.5rem',
        color: 'rgb(156, 163, 175)',
        marginRight: '0.5rem',
      },
    mic: {
        width: '1.5rem',
        height: '1.5rem',
        color: 'rgb(156, 163, 175)',
        marginRight: '0.5rem',
        padding: '0.125rem',
        borderRadius: '50%',
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
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: '0',
      },
     
}))