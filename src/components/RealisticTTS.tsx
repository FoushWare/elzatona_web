'use client';

import { useState, useRef, useEffect } from 'react';

interface RealisticTTSProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

// Enhanced TTS service voices (more realistic, human-like)
const REALISTIC_VOICES = [
  {
    id: 'en',
    name: 'English (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
  {
    id: 'en-us',
    name: 'English US (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
  {
    id: 'en-gb',
    name: 'English UK (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
  {
    id: 'en-au',
    name: 'English AU (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
  {
    id: 'en-ca',
    name: 'English CA (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
  {
    id: 'en-in',
    name: 'English IN (Enhanced)',
    gender: 'Neutral',
    provider: 'Google Enhanced',
    quality: 'High',
  },
];

export default function RealisticTTS({
  text,
  className = '',
  disabled = false,
}: RealisticTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(REALISTIC_VOICES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Free TTS using a public API
  const speakWithRealisticTTS = async (text: string, voiceId: string) => {
    try {
      setIsLoading(true);
      setError('');

      // Use a free TTS service (TTSMaker or similar)
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: voiceId,
          speed: 0.9,
          pitch: 1.0,
        }),
      });

      if (!response.ok) {
        throw new Error('TTS service unavailable');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        setError('Audio playback failed');
      };

      await audio.play();
    } catch (error) {
      console.error('Realistic TTS failed:', error);
      setIsLoading(false);
      setError('Realistic TTS unavailable');
    }
  };

  const handleSpeak = () => {
    if (disabled) return;

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    // If the same text is already playing, just stop it
    if (isPlaying) {
      return;
    }

    setError('');
    speakWithRealisticTTS(text, selectedVoice.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSpeak();
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {/* Voice Selection Dropdown */}
      <select
        value={selectedVoice.id}
        onChange={e => {
          const voice = REALISTIC_VOICES.find(v => v.id === e.target.value);
          if (voice) setSelectedVoice(voice);
        }}
        className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Select realistic voice"
      >
        {REALISTIC_VOICES.map(voice => (
          <option key={voice.id} value={voice.id}>
            {voice.name}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && (
        <span className="text-xs text-red-500 dark:text-red-400" title={error}>
          ⚠️
        </span>
      )}

      {/* Main TTS Button */}
      <button
        onClick={handleSpeak}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center
          w-8 h-8 rounded-full
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${
            isPlaying
              ? 'bg-green-500 text-white shadow-lg'
              : isLoading
                ? 'bg-yellow-500 text-white shadow-lg animate-pulse'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-600 dark:hover:text-green-300'
          }
          ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        aria-label={
          isLoading
            ? 'Loading realistic voice...'
            : isPlaying
              ? 'Stop reading question'
              : `Read question aloud using ${selectedVoice.name}`
        }
        title={
          isLoading
            ? 'Loading realistic voice...'
            : isPlaying
              ? 'Stop reading question'
              : `Read question aloud using ${selectedVoice.name}`
        }
      >
        {isLoading ? (
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
