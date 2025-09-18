'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Lightbulb,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CHATGPT_CONFIG, ChatMessage } from '@/lib/chatgpt-config';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
    speechSynthesis: SpeechSynthesis;
  }
}

export default function ChatGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: CHATGPT_CONFIG.WELCOME_MESSAGE,
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (
      !speechEnabled ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    )
      return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the Qwen AI API (free alternative)
      const response = await fetch('/api/qwen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages
            .map(msg => ({ role: msg.role, content: msg.content }))
            .concat({ role: 'user', content: inputValue }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);

      // Speak the AI response if speech is enabled
      if (speechEnabled) {
        setTimeout(() => {
          speakText(data.choices[0].message.content);
        }, 500);
      }
    } catch (error) {
      console.error('ChatGPT API error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error
            ? error.message
            : CHATGPT_CONFIG.ERROR_MESSAGES.API_ERROR,
        role: 'assistant',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 flex items-center justify-center group"
        aria-label="Open AI Chat Assistant"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

        {/* Main button content */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageCircle size={24} className="drop-shadow-lg sm:w-7 sm:h-7" />
        </div>

        {/* Floating notification dot */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-bounce shadow-lg"
          role="status"
          aria-label="New message notification"
        >
          <div className="w-full h-full bg-white rounded-full animate-ping"></div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-500"></div>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:p-2 md:p-4 lg:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleChat}
          />

          {/* Chat Window */}
          <div className="relative w-full h-full sm:max-w-md sm:h-[600px] md:max-w-lg md:h-[700px] lg:h-[700px] bg-white dark:bg-gray-900 rounded-none sm:rounded-t-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="relative flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-none sm:rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    AI Learning Assistant
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by Qwen AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Speech Toggle */}
                <button
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`p-2 rounded-full transition-colors ${
                    speechEnabled
                      ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  title={speechEnabled ? 'Disable speech' : 'Enable speech'}
                >
                  {speechEnabled ? (
                    <Volume2 size={18} />
                  ) : (
                    <VolumeX size={18} />
                  )}
                </button>
                {/* Stop Speaking */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Stop speaking"
                  >
                    <VolumeX size={18} />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 dark:bg-gray-800">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : message.isError
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {message.role === 'assistant' && speechEnabled && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                          title="Speak this message"
                        >
                          <Volume2 size={12} />
                          Speak
                        </button>
                      )}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      💡 Try asking:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {CHATGPT_CONFIG.SUGGESTED_QUESTIONS.slice(0, 3).map(
                      (question, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputValue(question);
                            // Auto-submit the suggested question
                            setInputValue(question);
                            setTimeout(() => {
                              const userMessage: ChatMessage = {
                                id: Date.now().toString(),
                                content: question,
                                role: 'user',
                                timestamp: new Date(),
                              };
                              setMessages(prev => [...prev, userMessage]);
                              setInputValue('');
                              setIsLoading(true);

                              // Call Qwen AI API with the suggested question
                              fetch('/api/qwen', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  messages: [
                                    { role: 'user', content: question },
                                  ],
                                }),
                              })
                                .then(response => response.json())
                                .then(data => {
                                  const aiResponse: ChatMessage = {
                                    id: (Date.now() + 1).toString(),
                                    content: data.choices[0].message.content,
                                    role: 'assistant',
                                    timestamp: new Date(),
                                  };
                                  setMessages(prev => [...prev, aiResponse]);
                                })
                                .catch(error => {
                                  const errorMessage: ChatMessage = {
                                    id: (Date.now() + 1).toString(),
                                    content:
                                      error.message ||
                                      CHATGPT_CONFIG.ERROR_MESSAGES.API_ERROR,
                                    role: 'assistant',
                                    timestamp: new Date(),
                                    isError: true,
                                  };
                                  setMessages(prev => [...prev, errorMessage]);
                                })
                                .finally(() => setIsLoading(false));
                            }, 100);
                          }}
                          className="group text-left p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-xl transition-all duration-300 text-sm text-blue-700 dark:text-blue-300 hover:shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Lightbulb size={16} className="text-white" />
                            </div>
                            <span className="font-medium leading-relaxed">
                              {question}
                            </span>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
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
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder="Ask me anything about frontend development..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm resize-none min-h-[48px] max-h-32"
                      disabled={isLoading}
                      rows={1}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />

                    {/* Voice Input Button */}
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isLoading}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                        isListening
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                      title={
                        isListening ? 'Stop listening' : 'Start voice input'
                      }
                    >
                      {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
                  >
                    <Send size={18} />
                  </button>
                </div>

                {/* Voice Status Indicator */}
                {isListening && (
                  <div className="absolute -top-8 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    Listening...
                  </div>
                )}
              </form>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                💬 Type your message or 🎤 use voice input • Press Enter to send
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
