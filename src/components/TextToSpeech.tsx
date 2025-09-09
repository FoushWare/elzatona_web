'use client';

import { useState, useRef, useEffect } from 'react';

interface TextToSpeechProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

// High-quality neural voices from Microsoft Edge TTS
const NEURAL_VOICES = [
  {
    id: 'en-US-AriaNeural',
    name: 'Aria (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-DavisNeural',
    name: 'Davis (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-AmberNeural',
    name: 'Amber (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-AnaNeural',
    name: 'Ana (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-AshleyNeural',
    name: 'Ashley (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-BrandonNeural',
    name: 'Brandon (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-ChristopherNeural',
    name: 'Christopher (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-CoraNeural',
    name: 'Cora (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-ElizabethNeural',
    name: 'Elizabeth (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-EmmaNeural',
    name: 'Emma (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-EricNeural',
    name: 'Eric (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-JacobNeural',
    name: 'Jacob (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-JaneNeural',
    name: 'Jane (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-JasonNeural',
    name: 'Jason (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-MichelleNeural',
    name: 'Michelle (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-MonicaNeural',
    name: 'Monica (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-NancyNeural',
    name: 'Nancy (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-RogerNeural',
    name: 'Roger (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
  {
    id: 'en-US-SaraNeural',
    name: 'Sara (Neural)',
    gender: 'Female',
    quality: 'Premium',
  },
  {
    id: 'en-US-TonyNeural',
    name: 'Tony (Neural)',
    gender: 'Male',
    quality: 'Premium',
  },
];

export default function TextToSpeech({
  text,
  className = '',
  disabled = false,
}: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(NEURAL_VOICES[0]);
  const [voiceInfo, setVoiceInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [useNeuralTTS, setUseNeuralTTS] = useState(true);
  const [error, setError] = useState<string>('');
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update voice info when voice changes
  useEffect(() => {
    setVoiceInfo(`${selectedVoice.name} (${selectedVoice.quality})`);
  }, [selectedVoice]);

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  // Enhanced TTS with better voice selection
  const speakWithEnhancedTTS = async (text: string, voiceId: string) => {
    try {
      setIsLoading(true);
      setError('');

      // Create utterance with enhanced settings
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;

      // Enhanced settings for more natural speech
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slower for more natural flow
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 0.9; // Comfortable volume

      // Find the best available voice
      const voices = window.speechSynthesis.getVoices();
      let bestVoice = null;

      // Try to find neural or high-quality voices
      const qualityVoices = voices.filter(
        voice =>
          voice.name.toLowerCase().includes('neural') ||
          voice.name.toLowerCase().includes('aria') ||
          voice.name.toLowerCase().includes('jenny') ||
          voice.name.toLowerCase().includes('guy') ||
          voice.name.toLowerCase().includes('microsoft') ||
          voice.name.toLowerCase().includes('google') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('alex')
      );

      if (qualityVoices.length > 0) {
        bestVoice = qualityVoices[0];
      } else {
        // Fallback to any English voice
        bestVoice = voices.find(voice => voice.lang.startsWith('en'));
      }

      if (bestVoice) {
        utterance.voice = bestVoice;
        setVoiceInfo(`${bestVoice.name} (Enhanced)`);
      } else {
        setVoiceInfo('Default Voice (Enhanced)');
      }

      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        speechSynthesisRef.current = null;
      };

      utterance.onerror = event => {
        console.error('Enhanced TTS error:', event.error);
        setIsPlaying(false);
        setIsLoading(false);
        setError('Enhanced voice failed, using standard voice');

        // Fallback to standard TTS
        setTimeout(() => {
          speakWithStandardTTS(text);
        }, 500);
      };

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Enhanced TTS failed:', error);
      setIsLoading(false);
      setError('Enhanced voice unavailable, using standard voice');

      // Fallback to standard TTS
      speakWithStandardTTS(text);
    }
  };

  // Standard TTS fallback
  const speakWithStandardTTS = (text: string) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;

      // Enhanced settings for better quality
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;

      // Try to find the best available voice
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(
        voice =>
          voice.name.toLowerCase().includes('google') ||
          voice.name.toLowerCase().includes('microsoft') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('alex')
      );

      if (bestVoice) {
        utterance.voice = bestVoice;
        setVoiceInfo(`${bestVoice.name} (Standard)`);
      } else {
        setVoiceInfo('Default Voice');
      }

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
      console.error('Standard TTS failed:', error);
      setIsPlaying(false);
      setError('Text-to-speech is not available');
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

    setError('');

    // Use enhanced TTS by default
    if (useNeuralTTS) {
      speakWithEnhancedTTS(text, selectedVoice.id);
    } else {
      speakWithStandardTTS(text);
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
    <div className="inline-flex items-center gap-2">
      {/* Voice Selection Dropdown */}
      <select
        value={selectedVoice.id}
        onChange={e => {
          const voice = NEURAL_VOICES.find(v => v.id === e.target.value);
          if (voice) setSelectedVoice(voice);
        }}
        className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Select neural voice"
      >
        {NEURAL_VOICES.slice(0, 8).map(voice => (
          <option key={voice.id} value={voice.id}>
            {voice.name}
          </option>
        ))}
      </select>

      {/* Neural TTS Toggle */}
      <button
        onClick={() => setUseNeuralTTS(!useNeuralTTS)}
        className={`text-xs px-2 py-1 rounded transition-colors ${
          useNeuralTTS
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        title={`${useNeuralTTS ? 'Disable' : 'Enable'} neural voice mode`}
      >
        {useNeuralTTS ? '🧠' : '🔊'}
      </button>

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
              ? 'bg-blue-500 text-white shadow-lg'
              : isLoading
                ? 'bg-yellow-500 text-white shadow-lg animate-pulse'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300'
          }
          ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        aria-label={
          isLoading
            ? 'Loading neural voice...'
            : isPlaying
              ? 'Stop reading question'
              : `Read question aloud using ${voiceInfo}`
        }
        title={
          isLoading
            ? 'Loading neural voice...'
            : isPlaying
              ? 'Stop reading question'
              : `Read question aloud using ${voiceInfo}`
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
