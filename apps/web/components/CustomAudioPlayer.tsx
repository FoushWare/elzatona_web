import React, { useState, useRef } from 'react';

interface CustomAudioPlayerProps {
  audioUrl?: string;
  fallbackText: string;
  className?: string;
}

export default function CustomAudioPlayer({
  audioUrl,
  fallbackText,
  className = '',
}: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (!audioUrl) {
      // No custom audio, fallback to TTS
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Stop any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set up event listeners
      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplay = () => setIsLoading(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsLoading(false);
        setIsPlaying(false);
      };

      // Play the audio
      await audio.play();
    } catch (error) {
      setError('Failed to play audio');
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // If no custom audio URL, show TTS button
  if (!audioUrl) {
    return (
      <button
        onClick={() => {
          // This will be handled by the parent component's TTS
          const event = new CustomEvent('playTTS', {
            detail: { text: fallbackText },
          });
          window.dispatchEvent(event);
        }}
        className={`p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 transition-colors ${className}`}
        title="Play with Text-to-Speech"
      >
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
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={isPlaying ? handleStop : handlePlay}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-colors ${
          isPlaying
            ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400'
            : 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isPlaying ? 'Stop Audio' : 'Play Custom Audio'}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
        ) : isPlaying ? (
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
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
            />
          </svg>
        )}
      </button>

      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}

      {/* Audio element for cleanup */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}
