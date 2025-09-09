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
  const [voiceInfo, setVoiceInfo] = useState<string>('');
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
          // Google voices (most human-like and free)
          'Google US English',
          'Google UK English Female',
          'Google UK English Male',
          'Google Australian English Female',
          'Google Australian English Male',
          'Google US English Female',
          'Google US English Male',
          // Microsoft voices (Windows)
          'Microsoft Aria Online (Natural) - English (United States)',
          'Microsoft Jenny Online (Natural) - English (United States)',
          'Microsoft Guy Online (Natural) - English (United States)',
          'Microsoft Zira Desktop - English (United States)',
          'Microsoft David Desktop - English (United States)',
          'Microsoft Mark Desktop - English (United States)',
          // Apple voices (macOS - very natural)
          'Samantha',
          'Alex',
          'Victoria',
          'Daniel',
          'Karen',
          'Moira',
          'Tessa',
          // Chrome/Edge voices
          'Microsoft Zira - English (United States)',
          'Microsoft David - English (United States)',
          'Microsoft Mark - English (United States)',
          // Additional high-quality voices
          'Hazel',
          'Susan',
          'Tom',
          'Veena',
        ];

        // Find the best available voice with improved algorithm
        let bestVoice = null;

        // First, try to find an exact match from preferred voices
        for (const preferredName of preferredVoices) {
          bestVoice = voices.find(voice => voice.name === preferredName);
          if (bestVoice) break;
        }

        // If no exact match, try partial matches
        if (!bestVoice) {
          for (const preferredName of preferredVoices) {
            bestVoice = voices.find(voice =>
              voice.name.toLowerCase().includes(preferredName.toLowerCase())
            );
            if (bestVoice) break;
          }
        }

        // Look for high-quality voices with specific keywords
        if (!bestVoice) {
          const qualityKeywords = [
            'natural',
            'neural',
            'premium',
            'enhanced',
            'hd',
          ];
          bestVoice = voices.find(voice =>
            qualityKeywords.some(keyword =>
              voice.name.toLowerCase().includes(keyword)
            )
          );
        }

        // Look for Google voices (usually the best free quality)
        if (!bestVoice) {
          bestVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('google')
          );
        }

        // Look for Microsoft voices (good quality on Windows)
        if (!bestVoice) {
          bestVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('microsoft')
          );
        }

        // Look for Apple voices (excellent quality on macOS)
        if (!bestVoice) {
          bestVoice = voices.find(
            voice =>
              voice.name.toLowerCase().includes('samantha') ||
              voice.name.toLowerCase().includes('alex') ||
              voice.name.toLowerCase().includes('victoria') ||
              voice.name.toLowerCase().includes('daniel')
          );
        }

        // Look for any English voice with good quality indicators
        if (!bestVoice) {
          bestVoice = voices.find(
            voice =>
              voice.lang.startsWith('en') &&
              (voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('us') ||
                voice.name.toLowerCase().includes('uk') ||
                voice.name.toLowerCase().includes('australia'))
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

        // Set voice info for debugging/display
        if (bestVoice) {
          setVoiceInfo(`${bestVoice.name} (${bestVoice.lang})`);
          console.log(
            '🎤 Selected voice:',
            bestVoice.name,
            'Language:',
            bestVoice.lang
          );
        } else {
          setVoiceInfo('Default voice');
          console.log('🎤 Using default voice');
        }
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

  const retryWithFallbackVoice = () => {
    if (!text || disabled) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;

      // Use default voice without any specific voice selection
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slower for better clarity
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        speechSynthesisRef.current = null;
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        speechSynthesisRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Fallback speech synthesis failed:', error);
      setIsPlaying(false);
    }
  };

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

      // Optimize speech parameters based on the selected voice
      if (selectedVoice) {
        // Google voices work best with these settings
        if (selectedVoice.name.toLowerCase().includes('google')) {
          utterance.rate = 0.9; // Slightly slower for natural flow
          utterance.pitch = 1.0; // Natural pitch
          utterance.volume = 0.9; // Slightly lower for comfort
        }
        // Apple voices (Samantha, Alex, etc.) work well with these settings
        else if (
          selectedVoice.name.toLowerCase().includes('samantha') ||
          selectedVoice.name.toLowerCase().includes('alex') ||
          selectedVoice.name.toLowerCase().includes('victoria') ||
          selectedVoice.name.toLowerCase().includes('daniel')
        ) {
          utterance.rate = 0.85; // Slower for more natural speech
          utterance.pitch = 1.0; // Natural pitch
          utterance.volume = 0.95; // High volume for clarity
        }
        // Microsoft voices
        else if (selectedVoice.name.toLowerCase().includes('microsoft')) {
          utterance.rate = 0.9; // Good balance for Microsoft voices
          utterance.pitch = 1.0; // Natural pitch
          utterance.volume = 0.9; // Comfortable volume
        }
        // Default settings for other voices
        else {
          utterance.rate = 0.85; // Slightly slower for more natural speech
          utterance.pitch = 1.0; // Natural pitch
          utterance.volume = 0.9; // Comfortable volume
        }
      } else {
        // Fallback settings when no voice is selected
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 0.9;
      }

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

        // Try to retry with a different voice if available
        if (event.error === 'not-allowed' || event.error === 'audio-busy') {
          console.log('🔄 Retrying with fallback voice...');
          setTimeout(() => {
            retryWithFallbackVoice();
          }, 1000);
        }
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
      aria-label={
        isPlaying
          ? 'Stop reading question'
          : `Read question aloud using ${voiceInfo}`
      }
      title={
        isPlaying
          ? 'Stop reading question'
          : `Read question aloud using ${voiceInfo}`
      }
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
