import React, { useEffect } from 'react';
import SearchIcon from '@/assets/icons/search.svg';
import XMarkIcon from '@/assets/icons/xmark.svg';
import MicIcon from '@/assets/icons/mic.svg';
import { Button } from '@mantine/core';
import Image from 'next/image';
import { useVoice } from '@/components/VoiceSearchButton/UseVoice';
import { FaMicrophone } from 'react-icons/fa6';

export default function SearchBar() {
  const [input, setInput] = React.useState('');
  const { text, isListening, listen, voiceSupported } = useVoice();

  useEffect(() => {
    if (text !== '') {
      setInput(text);
    }
  }, [text]);

  useEffect(() => {
    console.log('isListening', isListening);
  }, [isListening]);

  return (
    <div style={styles.container}>
      <label htmlFor="search" style={styles.searchLabel}>
        <Image src={SearchIcon} alt="search" style={styles.icon} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        style={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && <Image src={XMarkIcon} alt="X" style={styles.icon} onClick={() => setInput('')} />}
      <button style={styles.button} onClick={listen} type="button">
        <FaMicrophone
          style={{
            ...styles.mic,
            backgroundColor: isListening ? '#7011B6' : 'transparent',
            transition: 'background-color 0.3s ease',
            borderRadius: '50%',
            padding: '5px',
          }}
          size={48}
        />
      </button>
    </div>
  );
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
};
