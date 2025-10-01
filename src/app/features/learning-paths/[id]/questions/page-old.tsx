'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';

// Define QuestionGroup type locally
interface QuestionGroup {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

import { useFirebaseQuestions } from '@/hooks/useFirebaseQuestions';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { flashcardService } from '@/lib/firebase-flashcards';
import AddToFlashcard from '@/components/AddToFlashcard';
import EnhancedTTS from '@/components/EnhancedTTS';
import ExpandableText from '@/components/ExpandableText';
import ToastContainer, { useToast } from '@/components/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import CustomAudioPlayer from '@/components/CustomAudioPlayer';

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params?.id as string;
  const { user } = useFirebaseAuth();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});

  const learningPath = learningPaths.find(path => path.id === pathId);

  // Enhanced TTS function with OpenAI fallback
  const speakWithEnhancedTTS = async (text: string) => {
    if (!text || typeof window === 'undefined') return;

    try {
      // Try OpenAI TTS first (most human-like)
      const response = await fetch('/api/tts/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: 'nova', // Most natural OpenAI voice
          model: 'tts-1-hd', // High definition model
          speed: 1.0, // Normal speed for natural speech
          format: 'mp3',
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.audioUrl) {
          const audio = new Audio(result.audioUrl);
          audio.play();
          console.log(`🎙️ Using OpenAI TTS with voice: ${result.voice}`);
          return;
        }
      }

      // Fallback to enhanced browser TTS
      console.log('🎙️ Using enhanced browser TTS');
      speakWithBrowserTTS(text);
    } catch (error) {
      console.error('TTS error:', error);
      // Final fallback to browser TTS
      speakWithBrowserTTS(text);
    }
  };

  // Enhanced browser TTS with intelligent voice selection
  const speakWithBrowserTTS = (text: string) => {
    if (
      !text ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    )
      return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();

    // Function to score voice quality for human-like speech
    const scoreVoice = (voice: SpeechSynthesisVoice) => {
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

      // Prefer female voices for clarity
      if (name.includes('female')) score += 20;
      if (
        name.includes('aria') ||
        name.includes('jenny') ||
        name.includes('samantha')
      )
        score += 15;

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
    const sortedVoices = voices
      .filter(voice => voice.lang.startsWith('en'))
      .sort((a, b) => scoreVoice(b) - scoreVoice(a));

    const selectedVoice = sortedVoices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(
        `🎙️ Using browser voice: ${selectedVoice.name} (Score: ${scoreVoice(selectedVoice)})`
      );
    }

    // Optimize speech parameters for human-like sound
    utterance.rate = 0.8; // Slower for more natural pacing
    utterance.pitch = 1.15; // Slightly higher pitch for warmth
    utterance.volume = 0.95; // High volume for clarity
    utterance.lang = 'en-US';

    // Add natural pauses and emphasis
    utterance.onboundary = event => {
      if (event.name === 'word') {
        // Add subtle pauses between words for natural flow
        utterance.rate = Math.random() * 0.1 + 0.75; // Slight variation in rate
      }
    };

    speechSynthesis.speak(utterance);
  };

  // Use Firebase questions hook
  const { questions: firebaseQuestions, loading } =
    useFirebaseQuestions(pathId);

  // Convert Firebase questions to the expected format
  const questionsData = useMemo(() => {
    if (!firebaseQuestions || firebaseQuestions.length === 0) {
      return null;
    }

    // Filter only multiple-choice questions and ensure they have required fields
    const multipleChoiceQuestions = firebaseQuestions.filter(
      (q: any) =>
        q.type === 'multiple-choice' &&
        q.question &&
        q.options &&
        q.options.length > 0 &&
        typeof q.correctAnswer === 'number'
    );

    // Group questions by category or create a single group
    const groups: QuestionGroup[] = [
      {
        id: 'main',
        title: 'Multiple Choice Questions',
        questions: multipleChoiceQuestions.map((q: any) => ({
          id: q.id,
          title: q.title,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          category: q.category || 'General',
          difficulty: q.difficulty || 'intermediate',
          codeExample: q.codeExample,
        })),
      },
    ];

    return {
      groups,
      totalQuestions: multipleChoiceQuestions.length,
    };
  }, [firebaseQuestions, learningPath]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Questions...
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we fetch the questions for you.
          </p>
        </div>
      </div>
    );
  }

  if (!learningPath || !questionsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The questions for this learning path could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Learning Path
              </button>
            </div>

            {/* Centered Title and Description */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {learningPath.title} - Practice Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Test your knowledge with interactive questions
              </p>

              {/* Overall Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      All Questions
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {answeredQuestions.size} of{' '}
                      {questionsData?.groups.reduce(
                        (total, group) => total + group.questions.length,
                        0
                      ) || 0}{' '}
                      answered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-green-600 mr-2">🏆</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Score: {score} / {answeredQuestions.size}
              </span>
            </div>
          </div>

          {/* All Questions List */}
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {questionsData?.groups.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {group.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {group.questions.length} questions
                    </p>
                  </div>

                  <div className="space-y-4">
                    {group.questions.map((question, questionIndex) => {
                      const isAnswered = answeredQuestions.has(question.id);

                      const handleLocalSubmit = (selectedAnswer: string) => {
                        const isCorrect =
                          parseInt(selectedAnswer) === question.correctAnswer;
                        if (isCorrect) {
                          setScore(prev => prev + 1);
                        }
                        setAnsweredQuestions(
                          prev => new Set([...prev, question.id])
                        );
                      };

                      return (
                        <div
                          key={question.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                  Question {questionIndex + 1}
                                </span>
                                {isAnswered && (
                                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                    ✓ Answered
                                  </span>
                                )}
                              </div>

                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {question.title}
                              </h3>

                              <div className="text-gray-700 dark:text-gray-300 mb-4">
                                <ExpandableText
                                  text={
                                    question.question || 'No question available'
                                  }
                                  maxLength={200}
                                  className="whitespace-pre-wrap"
                                  expandText="Read more"
                                  collapseText="Read less"
                                />
                              </div>

                              {/* Code Example */}
                              {question.codeExample && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Code Example:
                                  </h4>
                                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                                    <pre className="text-xs">
                                      <code>{question.codeExample}</code>
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              <CustomAudioPlayer
                                audioUrl={question.questionAudio}
                                fallbackText={question.question}
                              />
                              <AddToFlashcard
                                question={question.question}
                                answer={
                                  question.explanation ||
                                  'No explanation available'
                                }
                                category={question.category || 'General'}
                                difficulty={
                                  question.difficulty || 'intermediate'
                                }
                                source="learning-path"
                                onStatusChange={status => {
                                  if (status === 'added') {
                                    showSuccess(
                                      'Question Bookmarked',
                                      'Question saved to your flashcard deck'
                                    );
                                  } else if (status === 'removed') {
                                    showSuccess(
                                      'Bookmark Removed',
                                      'Question removed from your flashcard collection'
                                    );
                                  } else if (status === 'error') {
                                    if (!user) {
                                      showError(
                                        'Authentication Required',
                                        'Please sign in to bookmark questions'
                                      );
                                    } else {
                                      showError(
                                        'Error',
                                        'Failed to update bookmark. Please try again.'
                                      );
                                    }
                                  }
                                }}
                                className="!p-2"
                              />
                            </div>
                          </div>

                          {/* Answer Options */}
                          <div className="space-y-2 mb-4">
                            {question.options?.map(
                              (option: unknown, index: number) => {
                                const isCorrect =
                                  index === question.correctAnswer;
                                const isSelected =
                                  selectedAnswers[question.id] === index;
                                const showResult = isAnswered;

                                let buttonClass =
                                  'w-full text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm ';

                                if (showResult) {
                                  if (isCorrect) {
                                    buttonClass +=
                                      'border-green-500 bg-green-50 dark:bg-green-900/20';
                                  } else if (isSelected && !isCorrect) {
                                    buttonClass +=
                                      'border-red-500 bg-red-50 dark:bg-red-900/20';
                                  } else {
                                    buttonClass +=
                                      'border-gray-200 dark:border-gray-600';
                                  }
                                } else {
                                  buttonClass += isSelected
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500';
                                }

                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (!showResult) {
                                        setSelectedAnswers(prev => ({
                                          ...prev,
                                          [question.id]: index,
                                        }));
                                        handleLocalSubmit(index.toString());
                                      }
                                    }}
                                    className={buttonClass}
                                    disabled={showResult}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <span className="flex-shrink-0 w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {String.fromCharCode(65 + index)}
                                      </span>
                                      <span className="text-gray-900 dark:text-white">
                                        {option as string}
                                      </span>
                                      {showResult && isCorrect && (
                                        <span className="flex-shrink-0 text-green-600 dark:text-green-400">
                                          ✓
                                        </span>
                                      )}
                                      {showResult &&
                                        isSelected &&
                                        !isCorrect && (
                                          <span className="flex-shrink-0 text-red-600 dark:text-red-400">
                                            ✗
                                          </span>
                                        )}
                                    </div>
                                  </button>
                                );
                              }
                            )}
                          </div>

                          {/* Answer Explanation */}
                          {isAnswered && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                  Answer Explanation:
                                </h4>
                                <CustomAudioPlayer
                                  audioUrl={question.answerAudio}
                                  fallbackText={
                                    question.explanation ||
                                    'No explanation available.'
                                  }
                                />
                              </div>
                              <div className="text-blue-800 dark:text-blue-200 text-sm">
                                <ExpandableText
                                  text={
                                    question.explanation ||
                                    'No explanation available.'
                                  }
                                  maxLength={200}
                                  className="whitespace-pre-wrap"
                                  expandText="Read more"
                                  collapseText="Read less"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toast Container */}
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
