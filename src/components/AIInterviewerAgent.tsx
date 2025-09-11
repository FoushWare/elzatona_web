'use client';

import { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface AIInterviewerAgentProps {
  roomUrl: string;
  onAgentReady: () => void;
  onAgentError: (error: string) => void;
}

interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedKeywords: string[];
  followUpQuestions: string[];
}

export const AIInterviewerAgent: React.FC<AIInterviewerAgentProps> = ({
  roomUrl,
  onAgentReady,
  onAgentError,
}) => {
  const iframeRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<InterviewQuestion | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [agentStatus, setAgentStatus] = useState<
    'connecting' | 'ready' | 'speaking' | 'listening' | 'thinking'
  >('connecting');

  // Sample interview questions
  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 'react-1',
      question:
        'Can you explain the difference between useState and useRef in React?',
      category: 'React',
      difficulty: 'intermediate',
      expectedKeywords: ['state', 're-render', 'persistence', 'DOM', 'mutable'],
      followUpQuestions: [
        'When would you use useRef instead of useState?',
        'Can you give an example of a use case for useRef?',
      ],
    },
    {
      id: 'js-1',
      question: 'What is a closure in JavaScript and why is it useful?',
      category: 'JavaScript',
      difficulty: 'intermediate',
      expectedKeywords: ['function', 'scope', 'variable', 'access', 'private'],
      followUpQuestions: [
        'Can you write a simple example of a closure?',
        'How do closures help with data privacy?',
      ],
    },
    {
      id: 'css-1',
      question: 'Explain the CSS Box Model and how it affects layout.',
      category: 'CSS',
      difficulty: 'beginner',
      expectedKeywords: [
        'content',
        'padding',
        'border',
        'margin',
        'width',
        'height',
      ],
      followUpQuestions: [
        'What happens when you set box-sizing: border-box?',
        'How does the box model affect element sizing?',
      ],
    },
  ];

  useEffect(() => {
    if (!iframeRef.current || !roomUrl) return;

    const iframe = DailyIframe.createFrame(iframeRef.current, {
      showLeaveButton: false,
      showFullscreenButton: false,
      showLocalVideo: false, // AI agent doesn't need video
      showParticipantsBar: false,
      userName: 'AI Interviewer',
      theme: {
        accent: '#10b981',
        accentText: '#ffffff',
        background: '#f8fafc',
        backgroundAccent: '#e2e8f0',
        baseText: '#1e293b',
        border: '#cbd5e1',
        mainAreaBg: '#ffffff',
        supportiveText: '#64748b',
      },
    });

    // Event listeners for AI agent
    iframe
      .on('joined-meeting', () => {
        console.log('🤖 AI Interviewer joined the meeting');
        setIsConnected(true);
        setAgentStatus('ready');
        onAgentReady();

        // Start the interview after a short delay
        setTimeout(() => {
          startInterview();
        }, 2000);
      })
      .on('left-meeting', () => {
        console.log('🤖 AI Interviewer left the meeting');
        setIsConnected(false);
      })
      .on('error', event => {
        console.error('❌ AI Agent error:', event);
        onAgentError(event.errorMsg || 'AI Agent failed to connect');
      })
      .on('participant-joined', event => {
        console.log('👤 Participant joined:', event.participant);
        if (event.participant.local === false) {
          // Human participant joined, start listening
          setIsListening(true);
          setAgentStatus('listening');
        }
      })
      .on('participant-left', event => {
        console.log('👤 Participant left:', event.participant);
        if (event.participant.local === false) {
          setIsListening(false);
          setAgentStatus('ready');
        }
      });

    // Join as AI agent
    iframe.join({
      url: roomUrl,
      userName: 'AI Interviewer',
      startVideoOff: true,
      startAudioOff: false,
    });

    return () => {
      iframe.destroy();
    };
  }, [roomUrl, onAgentReady, onAgentError]);

  const startInterview = () => {
    if (interviewQuestions.length === 0) return;

    const randomQuestion =
      interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setAgentStatus('speaking');

    // Simulate AI speaking the question
    speakQuestion(randomQuestion.question);
  };

  const speakQuestion = (question: string) => {
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setAgentStatus('speaking');
      };

      utterance.onend = () => {
        setAgentStatus('listening');
        setIsListening(true);
      };

      speechSynthesis.speak(utterance);
    } else {
      // Fallback: just log the question
      console.log('🤖 AI Interviewer:', question);
      setTimeout(() => {
        setAgentStatus('listening');
        setIsListening(true);
      }, 3000);
    }
  };

  const evaluateAnswer = (answer: string) => {
    if (!currentQuestion) return;

    setAgentStatus('thinking');

    // Simple keyword-based evaluation
    const answerLower = answer.toLowerCase();
    const matchedKeywords = currentQuestion.expectedKeywords.filter(keyword =>
      answerLower.includes(keyword.toLowerCase())
    );

    const score =
      (matchedKeywords.length / currentQuestion.expectedKeywords.length) * 100;

    let feedback = '';
    if (score >= 70) {
      feedback = `Excellent! You covered ${matchedKeywords.length} out of ${currentQuestion.expectedKeywords.length} key concepts. `;
    } else if (score >= 40) {
      feedback = `Good effort! You mentioned ${matchedKeywords.length} key concepts. `;
    } else {
      feedback = `Let me help you with this concept. `;
    }

    // Add follow-up question
    const followUp = currentQuestion.followUpQuestions[0];
    const fullFeedback =
      feedback + (followUp ? `Here's a follow-up: ${followUp}` : '');

    setTimeout(() => {
      speakQuestion(fullFeedback);
    }, 1000);
  };

  // This would be called when the human participant speaks
  const processHumanSpeech = (transcript: string) => {
    if (isListening && transcript.trim()) {
      setIsListening(false);
      evaluateAnswer(transcript);
    }
  };

  return (
    <div className="hidden">
      {/* Hidden iframe for AI agent */}
      <div ref={iframeRef} className="w-0 h-0" />

      {/* AI Agent Status Indicator */}
      <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              agentStatus === 'speaking'
                ? 'bg-yellow-400'
                : agentStatus === 'listening'
                  ? 'bg-blue-400'
                  : agentStatus === 'thinking'
                    ? 'bg-purple-400'
                    : 'bg-green-400'
            }`}
          />
          <span className="text-sm font-medium">
            AI Interviewer:{' '}
            {agentStatus === 'speaking'
              ? 'Speaking'
              : agentStatus === 'listening'
                ? 'Listening'
                : agentStatus === 'thinking'
                  ? 'Thinking'
                  : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};
