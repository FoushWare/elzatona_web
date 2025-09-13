'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2, Play, Pause } from 'lucide-react';

interface EnhancedTTSProps {
  text: string;
  className?: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
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
  const [rate] = useState(0.8); // Slower for more natural pacing
  const [pitch] = useState(1.15); // Slightly higher pitch for warmth
  const [volume] = useState(0.95); // High volume for clarity
  const [useServerTTS] = useState(true); // Enable server TTS by default
  const [serverTTSLoading, setServerTTSLoading] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    // Advanced human-like voice selection with scoring system
    const scoreVoice = (voice: SpeechSynthesisVoice): number => {
      let score = 0;
      const name = voice.name.toLowerCase();
      
      // Highest priority: Neural and AI voices (most human-like)
      if (name.includes('neural')) score += 100;
      if (name.includes('google')) score += 90;
      if (name.includes('cloud')) score += 85;
      if (name.includes('aria')) score += 80;
      if (name.includes('jenny')) score += 75;
      
      // High priority: Premium voices
      if (name.includes('premium')) score += 70;
      if (name.includes('desktop')) score += 60;
      if (name.includes('enhanced')) score += 50;
      
      // Medium priority: Natural voices
      if (name.includes('alex')) score += 40;
      if (name.includes('samantha')) score += 40;
      if (name.includes('victoria')) score += 35;
      if (name.includes('daniel')) score += 35;
      if (name.includes('moira')) score += 30;
      if (name.includes('tessa')) score += 30;
      if (name.includes('karen')) score += 25;
      if (name.includes('fiona')) score += 25;
      if (name.includes('veena')) score += 25;
      
      // Prefer female voices for clarity
      if (name.includes('female')) score += 20;
      if (name.includes('aria') || name.includes('jenny') || name.includes('samantha')) score += 15;
      
      // Avoid robotic voices
      if (name.includes('compact')) score -= 50;
      if (name.includes('basic')) score -= 30;
      if (name.includes('standard')) score -= 20;
      
      // Language preference
      if (voice.lang === 'en-US') score += 10;
      if (voice.lang === 'en-GB') score += 8;
      if (voice.lang === 'en-AU') score += 6;
      
      return score;
    };

    // Sort voices by human-like quality score
    const sortedVoices = availableVoices
      .filter(voice => voice.lang.startsWith('en'))
      .sort((a, b) => scoreVoice(b) - scoreVoice(a));
    
    const bestVoice = sortedVoices[0];
    
    if (bestVoice) {
      console.log(`EnhancedTTS using voice: ${bestVoice.name} (Score: ${scoreVoice(bestVoice)})`);
      return bestVoice;
    }

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

    // Add natural pauses and emphasis for human-like speech
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Add subtle pauses between words for natural flow
        utterance.rate = Math.random() * 0.1 + 0.75; // Slight variation in rate
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakWithServerTTS = async () => {
    if (!text) return;

    setIsLoading(true);
    setServerTTSLoading(true);

    try {
      // Try OpenAI TTS first (most human-like)
      const response = await fetch('/api/tts/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: cleanTextForTTS(text),
          voice: 'nova', // Most natural OpenAI voice
          model: 'tts-1-hd', // High definition model
          speed: 1.0, // Normal speed for natural speech
          format: 'mp3'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.audioUrl) {
          if (audioRef.current) {
            audioRef.current.src = result.audioUrl;
            audioRef.current.play();
            setIsPlaying(true);
            onStart?.();
            console.log(`Using OpenAI TTS with voice: ${result.voice}`);
            return;
          }
        }
      }

      // If OpenAI TTS fails, try the old server TTS
      const fallbackResponse = await fetch('/api/tts', {
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

      if (fallbackResponse.ok) {
        const audioBlob = await fallbackResponse.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
          setIsPlaying(true);
          onStart?.();
          console.log('Using fallback server TTS');
          return;
        }
      }

      throw new Error('All server TTS methods failed');

    } catch (error) {
      console.error('Server TTS error:', error);
      console.log('Falling back to browser TTS');
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
    </div>
  );
}
