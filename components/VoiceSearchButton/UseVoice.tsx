import { useState, useEffect } from 'react';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

type SpeechRecognition = {
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
};

const useVoice = (): {
  text: string;
  isListening: boolean;
  listen: () => void;
  voiceSupported: boolean;
} => {
  let speech: SpeechRecognition | null;

  if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    speech = new SpeechRecognition();
    if (speech) speech.continuous = true;
  } else {
    speech = null;
  }

  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech?.stop();
    } else {
      
      speech?.start();
    }
  };

  useEffect(() => {
    if (!speech) {
      return;
    }

    speech.onresult = (event) => {
      console.log(event.results[event.results.length - 1][0].transcript)
      setText(event.results[event.results.length - 1][0].transcript);
      setIsListening(false);
      if (speech) speech.stop();
    };

    // Cleanup function
    return () => {
      if (speech) {
        speech.stop();
      }
    };
  }, [speech]);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null,
  };
};

export { useVoice };
