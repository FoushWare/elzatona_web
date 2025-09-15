'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { flashcardService } from '@/lib/firebase-flashcards';
import AddToFlashcard from '@/components/AddToFlashcard';
import ExpandableText from '@/components/ExpandableText';
import ToastContainer, { useToast } from '@/components/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';

// Define QuestionGroup type locally
interface QuestionGroup {
  id: string;
  title: string;
  questions: UnifiedQuestion[];
}

interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  learningPath: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswers: string[];
  explanation: string;
  audioQuestion?: string;
  audioAnswer?: string;
  tags: string[];
  points: number;
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isComplete: boolean;
}

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;
  const { user } = useFirebaseAuth();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [score, setScore] = useState(0);
  const [, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [currentGroup, setCurrentGroup] = useState<QuestionGroup | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | string[] | null
  >(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const learningPath = learningPaths.find(path => path.id === pathId);

  // Memoize initial filters to prevent unnecessary re-renders
  const initialFilters = useMemo(
    () => ({
      learningPath: learningPath?.id,
      isActive: true,
    }),
    [learningPath?.id]
  );

  // Use unified questions hook
  const {
    questions: unifiedQuestions,
    isLoading,
    error,
  } = useUnifiedQuestions({
    initialFilters,
  });

  // Convert unified questions to the expected format
  const questionsData = useMemo(() => {
    if (!unifiedQuestions || unifiedQuestions.length === 0) {
      return null;
    }

    // Filter questions for this learning path
    const pathQuestions = unifiedQuestions.filter(
      q => q.learningPath === learningPath?.id && q.isActive
    );

    if (pathQuestions.length === 0) {
      return null;
    }

    // Group questions by category or create a single group
    const groups: QuestionGroup[] = [
      {
        id: 'main',
        title: `${learningPath?.title || 'Learning Path'} Questions`,
        questions: pathQuestions.map(q => ({
          ...q,
          // Convert unified format to expected format
          question: q.content,
          answer: q.explanation,
          options: q.options, // Keep full option structure with id, text, isCorrect
          correctAnswer:
            q.type === 'single'
              ? q.options.findIndex(opt => opt.isCorrect)
              : q.options
                  .map((opt, index) => (opt.isCorrect ? index : -1))
                  .filter(i => i !== -1),
        })),
      },
    ];

    return {
      groups,
      totalQuestions: pathQuestions.length,
    };
  }, [unifiedQuestions, learningPath]);

  // Set current group when questions are loaded
  useEffect(() => {
    if (questionsData && questionsData.groups.length > 0) {
      setCurrentGroup(questionsData.groups[0]);
      setCurrentQuestionIndex(0);
    }
  }, [questionsData]);

  // Auto play uploaded audio when question changes
  useEffect(() => {
    if (currentGroup && currentGroup.questions[currentQuestionIndex]) {
      const currentQuestion = currentGroup.questions[currentQuestionIndex];
      if (currentQuestion.audioQuestion) {
        // Play uploaded audio question if available
        const audio = new Audio(currentQuestion.audioQuestion);
        audio.play().catch(console.error);
      }
      // No TTS fallback - only use uploaded audio files
    }
  }, [currentQuestionIndex, currentGroup]);

  const handleAnswerSelect = (answerIndex: number) => {
    const currentQuestion = currentGroup?.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    if (currentQuestion.type === 'single') {
      setSelectedAnswer(currentQuestion.options[answerIndex].id);
    } else {
      // Multiple choice - toggle selection
      const currentAnswers = Array.isArray(selectedAnswer)
        ? selectedAnswer
        : [];
      const answerId = currentQuestion.options[answerIndex].id;

      if (currentAnswers.includes(answerId)) {
        setSelectedAnswer(currentAnswers.filter(id => id !== answerId));
      } else {
        setSelectedAnswer([...currentAnswers, answerId]);
      }
    }
  };

  const handleSubmitAnswer = async () => {
    const currentQuestion = currentGroup?.questions[currentQuestionIndex];
    if (!currentQuestion || !selectedAnswer || isSubmitting) return;

    setIsSubmitting(true);

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const isCorrect = Array.isArray(selectedAnswer)
      ? selectedAnswer.every(answerId =>
          currentQuestion.correctAnswers.includes(answerId)
        ) && selectedAnswer.length === currentQuestion.correctAnswers.length
      : currentQuestion.correctAnswers.includes(selectedAnswer as string);

    setIsAnswerCorrect(isCorrect);
    setShowExplanation(true);
    setShowHint(false);

    if (isCorrect) {
      setScore(prev => prev + (currentQuestion.points || 10));
      showSuccess('Correct! 🎉');
    } else {
      showError('Incorrect. Check the explanation below.');
    }

    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    setIsSubmitting(false);
  };

  const handleNextQuestion = () => {
    if (!currentGroup) return;

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentGroup.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    } else {
      // All questions completed
      showSuccess(`Quiz completed! Final score: ${score} points`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
      setShowHint(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts

      switch (e.key.toLowerCase()) {
        case '1':
        case '2':
        case '3':
        case '4':
          const optionIndex = parseInt(e.key) - 1;
          if (
            currentGroup &&
            optionIndex <
              currentGroup.questions[currentQuestionIndex]?.options.length
          ) {
            handleAnswerSelect(optionIndex);
          }
          break;
        case 'enter':
          if (selectedAnswer && !showExplanation) {
            handleSubmitAnswer();
          } else if (showExplanation) {
            handleNextQuestion();
          }
          break;
        case 'arrowleft':
          handlePreviousQuestion();
          break;
        case 'arrowright':
          if (showExplanation) {
            handleNextQuestion();
          }
          break;
        case 'h':
          if (!showExplanation) {
            setShowHint(!showHint);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    selectedAnswer,
    showExplanation,
    currentQuestionIndex,
    currentGroup,
    showHint,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!questionsData || !currentGroup) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This learning path doesn&apos;t have any questions yet.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = currentGroup.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / currentGroup.questions.length) * 100;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {learningPath?.title || 'Learning Path'} Questions
                </h1>
                <p className="text-blue-100 text-lg">{currentGroup.title}</p>
              </div>
              <div className="text-right">
                <div className="text-blue-100 text-sm mb-1">
                  Question {currentQuestionIndex + 1} of{' '}
                  {currentGroup.questions.length}
                </div>
                <div className="text-2xl font-bold text-white">
                  Score: {score} points
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-blue-100 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="bg-blue-800/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Question Header */}
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                      currentQuestion.difficulty === 'easy'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : currentQuestion.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}
                  >
                    {currentQuestion.difficulty?.charAt(0).toUpperCase() +
                      currentQuestion.difficulty?.slice(1)}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {currentQuestion.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    {currentQuestion.points} points
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {user && (
                    <AddToFlashcard
                      question={currentQuestion.question}
                      answer={currentQuestion.explanation || ''}
                      category={currentQuestion.category || 'General'}
                      difficulty={currentQuestion.difficulty || 'beginner'}
                      source={`Learning Path: ${learningPath?.title || 'Unknown'}`}
                      className="p-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md"
                      onStatusChange={status => {
                        if (status === 'added') {
                          // Optional: Show success message
                          console.log('Question added to flashcards');
                        } else if (status === 'error') {
                          // Optional: Show error message
                          console.error('Failed to add question to flashcards');
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="px-8 py-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Question Title */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {currentQuestion.question.includes('```') ? (
                      <div className="space-y-4">
                        {currentQuestion.question
                          .split('```')
                          .map((part, index) => {
                            if (index % 2 === 0) {
                              // Regular text - preserve newlines
                              return (
                                <div
                                  key={index}
                                  className="whitespace-pre-wrap text-2xl text-gray-900 dark:text-gray-100 font-semibold leading-relaxed"
                                >
                                  {part.trim()}
                                </div>
                              );
                            } else {
                              // Code block
                              return (
                                <div
                                  key={index}
                                  className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 overflow-x-auto border border-gray-800 dark:border-gray-700 relative shadow-lg"
                                >
                                  <button
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors bg-gray-800 dark:bg-gray-700 rounded-lg"
                                    onClick={() => {
                                      navigator.clipboard.writeText(part);
                                    }}
                                    title="Copy code"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                                    </svg>
                                  </button>
                                  <pre className="text-gray-100 text-base font-mono whitespace-pre-wrap leading-relaxed pr-12">
                                    <code>{part}</code>
                                  </pre>
                                </div>
                              );
                            }
                          })}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-2xl text-gray-900 dark:text-gray-100 font-semibold leading-relaxed">
                        <ExpandableText text={currentQuestion.question} />
                      </div>
                    )}
                  </div>

                  {/* Audio Question Button */}
                  {currentQuestion.audioQuestion && (
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          const audio = new Audio(
                            currentQuestion.audioQuestion
                          );
                          audio
                            .play()
                            .catch(e =>
                              console.error('Error playing audio:', e)
                            );
                        }}
                        className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-full transition-colors duration-200 group"
                        title="Play question audio"
                      >
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Hint System */}
              {showHint && !showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                >
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                        Hint
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Think about the order of variable declarations and
                        hoisting behavior in JavaScript.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Answer Options */}
              <div className="space-y-4 mb-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Choose your answer:
                  </h3>
                  {!showExplanation && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  )}
                </div>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = Array.isArray(selectedAnswer)
                    ? selectedAnswer.includes(option.id)
                    : selectedAnswer === option.id;

                  return (
                    <motion.button
                      key={option.id || `option-${index}`}
                      onClick={() => handleAnswerSelect(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center">
                        <motion.span
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 transition-colors ${
                            isSelected
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {String.fromCharCode(65 + index)}
                        </motion.span>
                        <div className="text-lg text-gray-800 dark:text-gray-200 font-medium">
                          {option.text}
                        </div>
                        {isSelected && (
                          <motion.div
                            className="ml-auto"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <svg
                              className="w-5 h-5 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Submit Button */}
              {selectedAnswer && !showExplanation && (
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 flex items-center gap-3 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Answer
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`rounded-xl p-8 mb-8 border shadow-lg ${
                      isAnswerCorrect
                        ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-300 dark:border-green-700'
                        : 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-300 dark:border-red-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${
                            isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></div>
                        <h3
                          className={`text-lg font-semibold ${
                            isAnswerCorrect
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-red-700 dark:text-red-300'
                          }`}
                        >
                          {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                        </h3>
                      </div>

                      {/* Audio Answer Button */}
                      {currentQuestion.audioAnswer && (
                        <button
                          onClick={() => {
                            const audio = new Audio(
                              currentQuestion.audioAnswer
                            );
                            audio
                              .play()
                              .catch(e =>
                                console.error('Error playing audio:', e)
                              );
                          }}
                          className="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 rounded-full transition-colors duration-200 group"
                          title="Play answer explanation audio"
                        >
                          <svg
                            className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      )}
                    </div>
                     <div
                       className={`text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium ${
                         isAnswerCorrect
                           ? 'text-green-800 dark:text-green-200'
                           : 'text-red-800 dark:text-red-200'
                       }`}
                     >
                      <ExpandableText text={currentQuestion.explanation} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Keyboard Shortcuts Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keyboard Shortcuts
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      1-4
                    </kbd>{' '}
                    Select answer
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      Enter
                    </kbd>{' '}
                    Submit/Next
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      ←
                    </kbd>{' '}
                    Previous
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      H
                    </kbd>{' '}
                    Toggle hint
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  ← Previous
                </button>

                <div className="flex space-x-3">
                  {showExplanation && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      {currentQuestionIndex ===
                      currentGroup.questions.length - 1
                        ? 'Finish Quiz'
                        : 'Next Question →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ErrorBoundary>
  );
}
