'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2, Settings, Play, Pause } from 'lucide-react';

interface EnhancedTTSProps {
  text: string;
  className?: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

interface VoiceOption {
  name: string;
  lang: string;
  gender: 'male' | 'female';
  quality: 'high' | 'medium' | 'low';
  description: string;
}

export default function EnhancedTTS({
  text,
  className = '',
  autoPlay = false,
  onStart,
  onEnd,
}: EnhancedTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [useServerTTS, setUseServerTTS] = useState(false);
  const [serverTTSLoading, setServerTTSLoading] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Enhanced voice options with better quality voices
  const voiceOptions: VoiceOption[] = [
    {
      name: 'Google US English Female',
      lang: 'en-US',
      gender: 'female',
      quality: 'high',
      description: 'Natural, clear female voice',
    },
    {
      name: 'Google US English Male',
      lang: 'en-US',
      gender: 'male',
      quality: 'high',
      description: 'Natural, clear male voice',
    },
    {
      name: 'Microsoft Zira',
      lang: 'en-US',
      gender: 'female',
      quality: 'high',
      description: 'Professional female voice',
    },
    {
      name: 'Microsoft David',
      lang: 'en-US',
      gender: 'male',
      quality: 'high',
      description: 'Professional male voice',
    },
    {
      name: 'Alex',
      lang: 'en-US',
      gender: 'male',
      quality: 'medium',
      description: 'Standard male voice',
    },
    {
      name: 'Samantha',
      lang: 'en-US',
      gender: 'female',
      quality: 'medium',
      description: 'Standard female voice',
    },
  ];

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Auto-select the best available voice
      if (availableVoices.length > 0 && !selectedVoice) {
        const bestVoice = findBestVoice(availableVoices);
        setSelectedVoice(bestVoice);
      }
    };

    // Load voices immediately
    loadVoices();

    // Load voices when they become available
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  const findBestVoice = (
    availableVoices: SpeechSynthesisVoice[]
  ): SpeechSynthesisVoice => {
    // Priority order for voice selection
    const voicePriorities = [
      { name: 'Google US English Female', lang: 'en-US' },
      { name: 'Google US English Male', lang: 'en-US' },
      { name: 'Microsoft Zira', lang: 'en-US' },
      { name: 'Microsoft David', lang: 'en-US' },
      { name: 'Alex', lang: 'en-US' },
      { name: 'Samantha', lang: 'en-US' },
    ];

    // Try to find voices in priority order
    for (const priority of voicePriorities) {
      const voice = availableVoices.find(
        v => v.name.includes(priority.name) && v.lang === priority.lang
      );
      if (voice) return voice;
    }

    // Fallback to any English voice
    const englishVoice = availableVoices.find(v => v.lang.startsWith('en'));
    if (englishVoice) return englishVoice;

    // Final fallback to first available voice
    return availableVoices[0];
  };

  const cleanTextForTTS = (text: string): string => {
    return (
      text
        // Remove markdown code blocks but keep the content
        .replace(/```[\s\S]*?```/g, match => {
          const content = match.replace(/```/g, '').trim();
          return content;
        })
        // Remove inline code backticks but keep content
        .replace(/`([^`]+)`/g, '$1')
        // Remove markdown links but keep the text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove markdown bold/italic
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        // Remove HTML tags
        .replace(/<[^>]*>/g, '')
        // Clean up extra whitespace
        .replace(/\s+/g, ' ')
        .trim()
    );
  };

  const speakWithBrowserTTS = () => {
    if (!text || !selectedVoice) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanTextForTTS(text));
    utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      onStart?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onEnd?.();
    };

    utterance.onerror = event => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakWithServerTTS = async () => {
    if (!text) return;

    setIsLoading(true);
    setServerTTSLoading(true);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: cleanTextForTTS(text),
          voice: 'en-US',
          speed: rate,
          pitch: pitch,
        }),
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
        onStart?.();
      }
    } catch (error) {
      console.error('Server TTS error:', error);
      // Fallback to browser TTS
      speakWithBrowserTTS();
    } finally {
      setIsLoading(false);
      setServerTTSLoading(false);
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      if (useServerTTS) {
        speakWithServerTTS();
      } else {
        speakWithBrowserTTS();
      }
    }
  };

  const stopSpeaking = () => {
    if (useServerTTS && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && text && selectedVoice && !isPlaying) {
      const timer = setTimeout(() => {
        if (useServerTTS) {
          speakWithServerTTS();
        } else {
          speakWithBrowserTTS();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, text, selectedVoice, useServerTTS]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Audio element for server TTS */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          onEnd?.();
        }}
        onError={() => {
          setIsPlaying(false);
          setServerTTSLoading(false);
        }}
        style={{ display: 'none' }}
      />

      {/* Main TTS Button */}
      <button
        onClick={handlePlay}
        disabled={isLoading || serverTTSLoading || !text}
        className={`
          p-2 rounded-lg transition-all duration-200 hover:scale-105
          ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
          ${isLoading || serverTTSLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title={isPlaying ? 'Stop speaking' : 'Start speaking'}
      >
        {isLoading || serverTTSLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="ml-2 p-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        title="TTS Settings"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 min-w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            TTS Settings
          </h3>

          {/* Voice Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voice
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={e => {
                const voice = voices.find(v => v.name === e.target.value);
                setSelectedVoice(voice || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* TTS Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TTS Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ttsMethod"
                  checked={!useServerTTS}
                  onChange={() => setUseServerTTS(false)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Browser TTS (Faster, Local)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ttsMethod"
                  checked={useServerTTS}
                  onChange={() => setUseServerTTS(true)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Server TTS (Better Quality)
                </span>
              </label>
            </div>
          </div>

          {/* Speed Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Speed: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={e => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={e => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Volume Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Voice Quality Info */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>
              💡 Tip: Google and Microsoft voices typically sound more natural
            </p>
            <p>
              🎯 Server TTS may provide better quality but requires internet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
