import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

function getSpeechRecognitionCtor(): typeof SpeechRecognition | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export interface UseSpeechRecognitionResult {
  isSupported: boolean;
  isListening: boolean;
  error: string | null;
  start: () => void;
  stop: () => void;
}

/**
 * Thin wrapper around the browser's (unprefixed or webkit-prefixed)
 * SpeechRecognition API. Feature-detected: `isSupported` is false in any
 * environment without it (jsdom, older/non-Chromium browsers), so callers
 * can hide the affordance entirely rather than offering a button that can't
 * work.
 */
export function useSpeechRecognition(
  onResult: (transcript: string) => void,
  lang = 'en-US',
): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onResultRef = useRef(onResult);
  useLayoutEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const isSupported = getSpeechRecognitionCtor() !== null;

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor || isListening) return;

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) onResultRef.current(transcript);
    };
    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    setError(null);
    setIsListening(true);
    recognition.start();
  }, [isListening, lang]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  return { isSupported, isListening, error, start, stop };
}
