'use client';

import { useState, useRef, useEffect } from 'react';

interface SimpleTTSProps {
  text: string;
  className?: string;
}

export default function SimpleTTS({ text, className = '' }: SimpleTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const speakWithBrowserTTS = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Try to find the best available voice
      const voices = speechSynthesis.getVoices();
      const preferredVoices = [
        'Google US English',
        'Microsoft Zira Desktop',
        'Microsoft David Desktop',
        'Alex',
        'Samantha',
        'Victoria',
        'Daniel',
        'Moira',
        'Tessa',
        'Karen',
        'Fiona',
        'Veena',
      ];

      let selectedVoice = null;
      for (const preferred of preferredVoices) {
        selectedVoice = voices.find(
          voice =>
            voice.name.includes(preferred) ||
            voice.name.toLowerCase().includes(preferred.toLowerCase())
        );
        if (selectedVoice) break;
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Optimize speech parameters
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
        setError(null);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        resolve();
      };

      utterance.onerror = event => {
        setIsPlaying(false);
        setIsLoading(false);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      speechSynthesis.speak(utterance);
    });
  };

  const speakWithAPI = async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: 'en-us',
          speed: 0.9,
          pitch: 1.0,
        }),
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      return new Promise((resolve, reject) => {
        audio.onloadeddata = () => {
          setIsLoading(false);
          setIsPlaying(true);
          setError(null);
        };

        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        audio.onerror = () => {
          setIsPlaying(false);
          setIsLoading(false);
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };

        audio.play().catch(reject);
      });
    } catch (error) {
      throw new Error(
        `API TTS failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const cleanTextForTTS = (text: string): string => {
    return (
      text
        // Extract content from code blocks (```code```) and keep the content
        .replace(/```[\s\S]*?```/g, match => {
          const content = match.replace(/```/g, '').trim();
          return content;
        })
        // Extract content from inline code (`code`) and keep the content
        .replace(/`([^`]*)`/g, '$1')
        // Remove markdown links [text](url) but keep the text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove markdown bold **text** but keep the text
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        // Remove markdown italic *text* but keep the text
        .replace(/\*([^*]+)\*/g, '$1')
        // Remove HTML tags but keep the content
        .replace(/<[^>]*>/g, '')
        // Clean up extra whitespace
        .replace(/\s+/g, ' ')
        .trim()
    );
  };

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError('No text to speak');
      return;
    }

    if (isPlaying) {
      stopCurrentAudio();
      return;
    }

    setIsLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    // Clean the text for better TTS
    const cleanText = cleanTextForTTS(text);

    try {
      // First try API-based TTS (better quality)
      await speakWithAPI(cleanText);
    } catch (apiError) {
      console.log('API TTS failed, falling back to browser TTS:', apiError);

      try {
        // Fallback to browser TTS
        await speakWithBrowserTTS(cleanText);
      } catch (browserError) {
        console.error('Browser TTS also failed:', browserError);
        setIsLoading(false);
        setError('Text-to-speech is not available. Please try again later.');
      }
    }
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={!text.trim()}
      className={`
        inline-flex items-center justify-center
        w-10 h-10 rounded-full
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
        ${
          isPlaying
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : isLoading
              ? 'bg-yellow-500 text-white animate-pulse'
              : error
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
        }
      `}
      title={
        isPlaying
          ? 'Stop speaking'
          : isLoading
            ? 'Loading...'
            : error
              ? `Error: ${error}`
              : 'Listen to this text'
      }
      aria-label={isPlaying ? 'Stop text-to-speech' : 'Start text-to-speech'}
    >
      {isLoading ? (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  );
}
