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
  onend: (event: any) => void;
  onstart: () => void;
  interimResults: boolean;
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
    if (speech) {
      speech.continuous = true;
      speech.interimResults = false;
    }
  } else {
    speech = null;
  }

  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const listen = () => {
    if (!speech) return;
    speech.start();
    setTimeout(() => {
      setIsListening(false);
      speech?.stop();
    }, 3000);

  };

  useEffect(() => {
    if (!speech) return;

    speech.onresult = (event) => {
      console.log(event.results[event.results.length - 1][0].transcript);
      setText(event.results[event.results.length - 1][0].transcript);
      console.log("use state text: ",text)
      setIsListening(false);
    };

    return () => {
      if (speech) {
        speech.stop();
      }
    };
  }, [isListening, speech]);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null,
  };
};

export { useVoice };