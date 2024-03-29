import React, { useEffect, useState } from 'react';
import SearchIcon from '@/assets/icons/search.svg';
import XMarkIcon from '@/assets/icons/xmark.svg';
import { FaMicrophone } from 'react-icons/fa6';
import Image from 'next/image';
import { useVoice } from '@/components/VoiceSearchButton/UseVoice';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const { text, listen, isListening } = useVoice();
  const [listeningFront, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

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

  const redirectToSearchPage = () => {
    if (!isTyping && input.trim() !== '') {
      router.push(`/search?q=${input}`);
    }
  };

  useEffect(() => {
    const typingTimer = setTimeout(redirectToSearchPage, 2000);
    return () => clearTimeout(typingTimer);
  }, [input, isTyping]);

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
        onChange={(e) => {
          setInput(e.target.value);
          setIsTyping(true);
        }}
      />
      {input && <Image src={XMarkIcon} alt="X" style={styles.icon} onClick={() => setInput('')} />}
      <button style={styles.button} onClick={handleListening} type="button">
        <FaMicrophone
          style={{
            ...styles.mic,
            backgroundColor: listeningFront ? '#7011B6' : 'transparent',
          }}
          size={24}
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
