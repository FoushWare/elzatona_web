'use client';

import { useState, useRef, useEffect } from 'react';

// Import Web Speech API types
import '@/types/speech-api';
import type { SpeechRecognition } from '@/types/speech-api';
import {
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Play,
  RotateCcw,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  VolumeX,
  Phone,
  PhoneOff,
  BookOpen,
  TrendingUp,
  Target,
  Brain,
  Zap,
  Star,
  Award,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isVoice?: boolean;
  audioUrl?: string;
  evaluation?: {
    score: number;
    feedback: string;
    concepts: string[];
    missing: string[];
  };
}

interface InterviewSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  messages: Message[];
  score?: number;
  feedback?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  adaptiveLevel: number; // 0-10 scale for adaptive difficulty
  conceptsCovered: string[];
  weakAreas: string[];
  strongAreas: string[];
  totalQuestions: number;
  correctAnswers: number;
  averageResponseTime: number;
  voiceModeEnabled: boolean;
}

interface FlashcardData {
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: string;
  tags: string[];
}

const interviewCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: '🎨',
    description: 'React, JavaScript, CSS, HTML',
    concepts: [
      'React',
      'JavaScript',
      'CSS',
      'HTML',
      'DOM',
      'State Management',
      'Performance',
      'Accessibility',
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: '⚙️',
    description: 'Node.js, APIs, Databases',
    concepts: [
      'Node.js',
      'APIs',
      'Databases',
      'Authentication',
      'Security',
      'Performance',
      'Scalability',
      'Testing',
    ],
  },
  {
    id: 'fullstack',
    name: 'Full Stack',
    icon: '🚀',
    description: 'Complete web development',
    concepts: [
      'Frontend',
      'Backend',
      'Integration',
      'Deployment',
      'CI/CD',
      'Monitoring',
      'Architecture',
      'DevOps',
    ],
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: '🏗️',
    description: 'Architecture and scalability',
    concepts: [
      'Architecture',
      'Scalability',
      'Performance',
      'Caching',
      'Load Balancing',
      'Microservices',
      'Databases',
      'Security',
    ],
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: '💬',
    description: 'Soft skills and culture fit',
    concepts: [
      'Leadership',
      'Communication',
      'Problem Solving',
      'Teamwork',
      'Adaptability',
      'Conflict Resolution',
      'Time Management',
      'Innovation',
    ],
  },
];

const difficultyLevels = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: '0-2 years experience',
    multiplier: 1.2,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: '2-5 years experience',
    multiplier: 1.0,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: '5+ years experience',
    multiplier: 0.8,
  },
];

const interviewModes = [
  {
    id: 'standard',
    name: 'Standard Interview',
    description: 'Traditional Q&A format',
    icon: '💼',
    duration: '15-20 minutes',
  },
  {
    id: 'technical-deep-dive',
    name: 'Technical Deep Dive',
    description: 'In-depth technical discussion',
    icon: '🔬',
    duration: '25-30 minutes',
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    description: 'Quick questions and answers',
    icon: '⚡',
    duration: '10-15 minutes',
  },
  {
    id: 'scenario-based',
    name: 'Scenario Based',
    description: 'Real-world problem solving',
    icon: '🎯',
    duration: '20-25 minutes',
  },
];

export default function AIMockInterviewPage() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedMode, setSelectedMode] = useState('standard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [interviewScore, setInterviewScore] = useState<number | null>(null);
  const [interviewFeedback, setInterviewFeedback] = useState<string>('');
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [adaptiveLevel, setAdaptiveLevel] = useState(5);
  const [conceptsCovered, setConceptsCovered] = useState<string[]>([]);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [strongAreas, setStrongAreas] = useState<string[]>([]);
  const [flashcardsToAdd, setFlashcardsToAdd] = useState<FlashcardData[]>([]);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [responseStartTime, setResponseStartTime] = useState<number | null>(
    null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Enhanced speech recognition with better error handling
    if (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 3;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setCurrentMessage(finalTranscript);
          setIsListening(false);
          // Auto-send message in voice mode
          if (isVoiceMode && isInterviewActive) {
            sendMessage(finalTranscript);
          }
        } else {
          setCurrentMessage(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);

        // Handle specific errors
        if (event.error === 'no-speech') {
          console.log('No speech detected, continuing to listen...');
          // Restart recognition after a short delay
          setTimeout(() => {
            if (isRecording && recognitionRef.current) {
              recognitionRef.current.start();
            }
          }, 1000);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isRecording && isVoiceMode) {
          // Restart recognition for continuous conversation
          setTimeout(() => {
            if (recognitionRef.current && isRecording) {
              recognitionRef.current.start();
            }
          }, 500);
        }
      };

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
    }
  }, [isVoiceMode, isInterviewActive, isRecording]);

  const startInterview = async () => {
    setIsInterviewActive(true);
    setShowResults(false);
    setMessages([]);
    setInterviewScore(null);
    setInterviewFeedback('');
    setAdaptiveLevel(5);
    setConceptsCovered([]);
    setWeakAreas([]);
    setStrongAreas([]);
    setFlashcardsToAdd([]);
    setResponseStartTime(Date.now());

    const newSession: InterviewSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      messages: [],
      category: selectedCategory,
      difficulty: selectedDifficulty as
        | 'beginner'
        | 'intermediate'
        | 'advanced',
      adaptiveLevel: 5,
      conceptsCovered: [],
      weakAreas: [],
      strongAreas: [],
      totalQuestions: 0,
      correctAnswers: 0,
      averageResponseTime: 0,
      voiceModeEnabled: isVoiceMode,
    };

    setSession(newSession);

    // Start with AI greeting
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          difficulty: selectedDifficulty,
          mode: selectedMode,
          adaptiveLevel: adaptiveLevel,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages([aiMessage]);
      newSession.messages = [aiMessage];
      newSession.totalQuestions = 1;
      setSession(newSession);

      // Auto-speak the greeting in voice mode
      if (isVoiceMode) {
        await speakText(data.message);
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const endInterview = async () => {
    if (!session) return;

    setIsInterviewActive(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-interview/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          messages: messages,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          mode: selectedMode,
          adaptiveLevel: adaptiveLevel,
          conceptsCovered: conceptsCovered,
          weakAreas: weakAreas,
          strongAreas: strongAreas,
          totalQuestions: session.totalQuestions,
          correctAnswers: session.correctAnswers,
          averageResponseTime: session.averageResponseTime,
        }),
      });

      const data = await response.json();
      setInterviewScore(data.score);
      setInterviewFeedback(data.feedback);
      setFlashcardsToAdd(data.flashcards || []);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to end interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || currentMessage;
    if (!messageToSend.trim() || !session) return;

    const responseTime = responseStartTime ? Date.now() - responseStartTime : 0;
    setResponseStartTime(Date.now());

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date(),
      isVoice: isVoiceMode,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          message: messageToSend,
          messages: newMessages,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          mode: selectedMode,
          adaptiveLevel: adaptiveLevel,
          responseTime: responseTime,
          conceptsCovered: conceptsCovered,
          weakAreas: weakAreas,
          strongAreas: strongAreas,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.message,
        timestamp: new Date(),
        isVoice: isVoiceMode,
        evaluation: data.evaluation,
      };

      setMessages([...newMessages, aiMessage]);

      // Update adaptive level and concepts
      if (data.evaluation) {
        setAdaptiveLevel(data.adaptiveLevel || adaptiveLevel);
        setConceptsCovered(prev => [
          ...prev,
          ...(data.evaluation.concepts || []),
        ]);
        if (data.evaluation.score < 60) {
          setWeakAreas(prev => [...prev, ...(data.evaluation.missing || [])]);
        } else {
          setStrongAreas(prev => [
            ...prev,
            ...(data.evaluation.concepts || []),
          ]);
        }
      }

      // Update session
      const updatedSession = {
        ...session,
        messages: [...newMessages, aiMessage],
        adaptiveLevel: data.adaptiveLevel || adaptiveLevel,
        conceptsCovered: [
          ...conceptsCovered,
          ...(data.evaluation?.concepts || []),
        ],
        totalQuestions: session.totalQuestions + 1,
        correctAnswers:
          data.evaluation?.score >= 60
            ? session.correctAnswers + 1
            : session.correctAnswers,
        averageResponseTime: (session.averageResponseTime + responseTime) / 2,
      };
      setSession(updatedSession);

      // Auto-speak AI response in voice mode
      if (isVoiceMode) {
        await speakText(data.message);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced voice functions with better error handling
  const speakText = async (text: string) => {
    if (!isVoiceMode) return;

    setIsSpeaking(true);
    try {
      // Use our enhanced TTS API for better quality
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: 'enhanced', // Request enhanced voice
          speed: 0.9, // Slightly slower for better comprehension
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.onended = () => setIsSpeaking(false);
          audioRef.current.onerror = () => setIsSpeaking(false);
          await audioRef.current.play();
        }
      } else {
        // Fallback to browser TTS with enhanced settings
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to use a better voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          voice =>
            voice.lang.startsWith('en') &&
            (voice.name.includes('Google') || voice.name.includes('Microsoft'))
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    }
  };

  const startVoiceConversation = () => {
    if (recognitionRef.current && !isRecording && isVoiceMode) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceConversation = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isRecording) {
      stopVoiceConversation();
    }
  };

  const startRecording = () => {
    if (isVoiceMode) {
      startVoiceConversation();
    } else {
      if (recognitionRef.current && !isRecording) {
        setIsRecording(true);
        recognitionRef.current.start();
      }
    }
  };

  const stopRecording = () => {
    if (isVoiceMode) {
      stopVoiceConversation();
    } else {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const resetInterview = () => {
    setIsInterviewActive(false);
    setMessages([]);
    setCurrentMessage('');
    setSession(null);
    setShowResults(false);
    setInterviewScore(null);
    setInterviewFeedback('');
    setAdaptiveLevel(5);
    setConceptsCovered([]);
    setWeakAreas([]);
    setStrongAreas([]);
    setFlashcardsToAdd([]);
    setShowFlashcards(false);
  };

  const addFlashcards = async () => {
    if (flashcardsToAdd.length === 0) return;

    try {
      const response = await fetch('/api/flashcards/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flashcards: flashcardsToAdd }),
      });

      if (response.ok) {
        setFlashcardsToAdd([]);
        alert(`Successfully added ${flashcardsToAdd.length} flashcards!`);
      }
    } catch (error) {
      console.error('Failed to add flashcards:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <AlertCircle className="w-6 h-6 text-red-600" />;
  };

  const getAdaptiveLevelColor = (level: number) => {
    if (level >= 7) return 'text-red-600';
    if (level >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getAdaptiveLevelText = (level: number) => {
    if (level >= 7) return 'Advanced';
    if (level >= 4) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI Mock Interview
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice with our AI interviewer. Get real-time feedback, adaptive
            questioning, and improve your interview skills with voice-based
            conversations.
          </p>
        </div>

        {!isInterviewActive && !showResults && (
          /* Interview Setup */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Choose Your Interview
              </h2>

              {/* Interview Mode Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Interview Mode
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interviewModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedMode === mode.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{mode.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {mode.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {mode.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {mode.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Interview Category
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interviewCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedCategory === category.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Difficulty Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {difficultyLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedDifficulty(level.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedDifficulty === level.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {level.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {level.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={startInterview}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Interview</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {isInterviewActive && (
          /* Interview Interface */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Interview Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      AI Interview in Progress
                    </h2>
                    <p className="text-blue-100">
                      {
                        interviewCategories.find(c => c.id === selectedCategory)
                          ?.name
                      }{' '}
                      •{' '}
                      {
                        difficultyLevels.find(d => d.id === selectedDifficulty)
                          ?.name
                      }{' '}
                      • {interviewModes.find(m => m.id === selectedMode)?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Adaptive Level Indicator */}
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span className="text-sm">
                        Level:{' '}
                        <span className={getAdaptiveLevelColor(adaptiveLevel)}>
                          {getAdaptiveLevelText(adaptiveLevel)}
                        </span>
                      </span>
                    </div>

                    {/* Voice Mode Toggle */}
                    <button
                      onClick={toggleVoiceMode}
                      className={`px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                        isVoiceMode
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-500 hover:bg-gray-600'
                      }`}
                      title={isVoiceMode ? 'Voice Mode ON' : 'Voice Mode OFF'}
                    >
                      {isVoiceMode ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {isVoiceMode ? 'Voice' : 'Text'}
                      </span>
                    </button>

                    {/* Voice Status Indicators */}
                    {isVoiceMode && (
                      <div className="flex items-center space-x-2">
                        {isSpeaking && (
                          <div className="flex items-center space-x-1 text-green-200">
                            <Volume2 className="w-4 h-4 animate-pulse" />
                            <span className="text-sm">AI Speaking</span>
                          </div>
                        )}
                        {isListening && (
                          <div className="flex items-center space-x-1 text-yellow-200">
                            <Mic className="w-4 h-4 animate-pulse" />
                            <span className="text-sm">Listening</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">
                        {session
                          ? Math.floor(
                              (Date.now() - session.startTime.getTime()) / 60000
                            )
                          : 0}
                        m
                      </span>
                    </div>
                    <button
                      onClick={endInterview}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                    >
                      End Interview
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'ai' && (
                          <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          {message.evaluation && (
                            <div className="mt-2 p-2 bg-white/10 rounded text-xs">
                              <div className="flex items-center space-x-2">
                                <Star className="w-3 h-3" />
                                <span>
                                  Score: {message.evaluation.score}/100
                                </span>
                              </div>
                              {message.evaluation.feedback && (
                                <p className="mt-1 text-xs opacity-90">
                                  {message.evaluation.feedback}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                {/* Voice Mode Status */}
                {isVoiceMode && (
                  <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Voice Mode Active
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        • Speak naturally, AI will respond with voice
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={e => setCurrentMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && sendMessage()}
                      placeholder={
                        isVoiceMode
                          ? 'Voice input active - speak or type here...'
                          : 'Type your answer or use voice input...'
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      disabled={isLoading}
                    />
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isRecording
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                          : isVoiceMode
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                      disabled={isLoading}
                      title={
                        isRecording
                          ? 'Stop recording'
                          : isVoiceMode
                            ? 'Start voice conversation'
                            : 'Start voice input'
                      }
                    >
                      {isRecording ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    disabled={!currentMessage.trim() || isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Voice Mode Instructions */}
                {isVoiceMode && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    💡 In voice mode: Speak naturally and the AI will respond
                    with voice.
                    {isRecording && ' Currently listening...'}
                    {isSpeaking && ' AI is speaking...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showResults && (
          /* Results */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Interview Complete! 🎉
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Here&apos;s your performance analysis and feedback.
                </p>
              </div>

              {/* Score */}
              {interviewScore !== null && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center space-x-4">
                    {getScoreIcon(interviewScore)}
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold ${getScoreColor(interviewScore)}`}
                      >
                        {interviewScore}/100
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Overall Score
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {session && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {session.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Questions Asked
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {session.correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Correct Answers
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(session.averageResponseTime / 1000)}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Response Time
                    </div>
                  </div>
                </div>
              )}

              {/* Concepts Covered */}
              {conceptsCovered.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Concepts Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {conceptsCovered.map((concept, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Weak Areas */}
              {weakAreas.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Areas for Improvement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {weakAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {interviewFeedback && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Detailed Feedback
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {interviewFeedback}
                    </p>
                  </div>
                </div>
              )}

              {/* Flashcards */}
              {flashcardsToAdd.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Flashcards Generated
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      We&apos;ve generated {flashcardsToAdd.length} flashcards
                      based on areas where you can improve. These will help you
                      study and prepare for future interviews.
                    </p>
                  </div>
                  <button
                    onClick={addFlashcards}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Add to Flashcards</span>
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetInterview}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Start New Interview</span>
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  View Conversation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
