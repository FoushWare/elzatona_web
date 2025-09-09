'use client';

import { useState, useRef, useEffect } from 'react';

interface TextToSpeechProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

export default function TextToSpeech({
  text,
  className = '',
  disabled = false,
}: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check if speech synthesis is supported and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      // Load voices and select the best human-like voice
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();

        // Prefer human-like voices similar to ChatGPT
        const preferredVoices = [
          // Google voices (most human-like)
          'Google US English',
          'Google UK English Female',
          'Google UK English Male',
          'Google Australian English Female',
          'Google Australian English Male',
          // Microsoft voices
          'Microsoft Aria Online (Natural) - English (United States)',
          'Microsoft Jenny Online (Natural) - English (United States)',
          'Microsoft Guy Online (Natural) - English (United States)',
          // Apple voices (on macOS)
          'Samantha',
          'Alex',
          'Victoria',
          'Daniel',
          // Other high-quality voices
          'Microsoft Zira Desktop - English (United States)',
          'Microsoft David Desktop - English (United States)',
          'Microsoft Mark Desktop - English (United States)',
        ];

        // Find the best available voice
        let bestVoice = null;

        // First, try to find a preferred voice
        for (const preferredName of preferredVoices) {
          bestVoice = voices.find(
            voice =>
              voice.name.includes(preferredName) || voice.name === preferredName
          );
          if (bestVoice) break;
        }

        // If no preferred voice found, look for high-quality alternatives
        if (!bestVoice) {
          // Look for voices with "Natural" or "Neural" in the name
          bestVoice = voices.find(
            voice =>
              voice.name.toLowerCase().includes('natural') ||
              voice.name.toLowerCase().includes('neural') ||
              voice.name.toLowerCase().includes('premium')
          );
        }

        // If still no voice found, look for English voices with good quality indicators
        if (!bestVoice) {
          bestVoice = voices.find(
            voice =>
              voice.lang.startsWith('en') &&
              (voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('us') ||
                voice.name.toLowerCase().includes('uk'))
          );
        }

        // Fallback to any English voice
        if (!bestVoice) {
          bestVoice = voices.find(voice => voice.lang.startsWith('en'));
        }

        // Final fallback to default voice
        if (!bestVoice && voices.length > 0) {
          bestVoice = voices[0];
        }

        setSelectedVoice(bestVoice);
      };

      // Load voices immediately if available
      loadVoices();

      // Also listen for voice changes (some browsers load voices asynchronously)
      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = () => {
    if (!isSupported || disabled) return;

    // Stop any currently playing speech
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }

    // If the same text is already playing, just stop it
    if (isPlaying) {
      return;
    }

    try {
      // Create new speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;

      // Configure speech settings for human-like quality
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower for more natural speech
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 1.0; // Full volume

      // Use the selected human-like voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        speechSynthesisRef.current = null;
      };

      utterance.onerror = event => {
        console.error('Speech synthesis error:', event.error);
        setIsPlaying(false);
        speechSynthesisRef.current = null;
      };

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error with speech synthesis:', error);
      setIsPlaying(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSpeak();
    }
  };

  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={handleSpeak}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-full
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${
          isPlaying
            ? 'bg-blue-500 text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      aria-label={isPlaying ? 'Stop reading question' : 'Read question aloud'}
      title={isPlaying ? 'Stop reading question' : 'Read question aloud'}
    >
      {isPlaying ? (
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
  );
}
