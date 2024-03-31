"use client"
import React, { SetStateAction, useEffect ,useState} from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import XMarkIcon from '@/assets/icons/xmark.svg'
import MicIcon from '@/assets/icons/mic.svg'
import Image from 'next/image'
import { createStyles } from '@mantine/styles';
import { FaMicrophone } from 'react-icons/fa6';
import { useVoice } from '@/components/VoiceSearchButton/UseVoice';
import { useRouter } from 'next/router';
export default function SearchBar({ input, setInput, onTyping, onSearch }: { input: string, setInput: React.Dispatch<SetStateAction<string>>, onTyping: (value: string) => void, onSearch: (input: string) => void }) {
    console.log("ontyping", onTyping);
    const { text, listen, isListening } = useVoice();
    const [listeningFront, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        if (!input && typeof onTyping === 'function') {
            onTyping('');
        }
    }, [input, onTyping]);
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
      };  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (input.length > 2) {
                onSearch(input);
            }
        }
    };
    const { classes, cx } = useStyles();
    return (
        <div className={classes.container}>
            <label htmlFor="search" className={classes.searchLabel}>
                <Image src={SearchIcon} alt="search" className={classes.icon}/>
            </label>
            <input
                id='search'
                type="text"
                placeholder="Search"
                autoComplete='off'
                className={classes.input}
                value={input as string}
                onChange={(e) => onTyping(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {input && <Image src={XMarkIcon} alt="X" className={classes.icon} onClick={() => {
                setInput('');
                onTyping('');
                console.log("clicked")
            }} />}
            {/* <Image src={MicIcon} alt="Mic" className={classes.mic} /> */}
            <button className={classes.button} onClick={handleListening} type="button">
        <FaMicrophone
        className={classes.mic}
          style={{
            backgroundColor: listeningFront ? '#00664A' : 'transparent',
          }}
          size={24}
        />
      </button>
        </div>
    )
}

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0.375rem',
    overflow: 'hidden',
    backgroundColor: 'rgb(243, 244, 246)',
    padding: '0.5rem 0.5rem 0.5rem 1rem',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  input: {
    backgroundColor: 'transparent',
    outline: 'none',
    color: 'rgb(55, 65, 81)',
    width: '100%',
    border: 'none',
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
