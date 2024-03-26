'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useVoice } from './UseVoice';

export default function VoiceSearchButton() {
  const [searchText, setSearchText] = useState('');

  const { text, isListening, listen, voiceSupported } = useVoice();

  useEffect(() => {
    if (text !== '') {
      setSearchText(text);
    }
  }, [text]);
  return (
    <div>
      <h3>Click the Button and speak</h3>
      <Button onClick={listen}>start</Button>
      <p>{searchText}</p>
    </div>
  );
}
