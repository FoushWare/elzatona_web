'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';
import { useAudioCollection } from '@/hooks/useAudioCollection';
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

  // Audio collection hook
  const { getAudioMapping } = useAudioCollection();

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
        questions: pathQuestions.map((q, index) => ({
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
          // Use audio from question data or generate default paths
          audioQuestion: q.audioQuestion || `/audio/${learningPath?.id}/questions/question-${index + 1}.mp3`,
          audioAnswer: q.audioAnswer || `/audio/${learningPath?.id}/questions/answer-${index + 1}.mp3`,
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

    if (isCorrect) {
      setScore(prev => prev + 1);
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
      showSuccess(`Quiz completed! Final score: ${score}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    }
  };

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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
                  Score: {score}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Question Title */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {/* Beautiful Question Code Block */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="relative group"
                    >
                      {/* Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10 rounded-2xl blur-sm"></div>

                      {/* Main Code Block */}
                      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 rounded-2xl p-8 overflow-x-auto border border-gray-700/50 dark:border-gray-600/50 shadow-2xl backdrop-blur-sm">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/30 dark:border-gray-600/30">
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm text-gray-400 font-mono">
                              Question
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            {/* Audio Button */}
                            {currentQuestion.audioQuestion ? (
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
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
                                className="p-3 text-blue-400 hover:text-blue-200 transition-all duration-200 bg-blue-800/50 dark:bg-blue-700/50 rounded-xl hover:bg-blue-700/70 dark:hover:bg-blue-600/70 backdrop-blur-sm border border-blue-600/30 dark:border-blue-500/30 shadow-lg hover:shadow-xl"
                                title="Play question audio"
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </motion.button>
                            ) : (
                              <div className="p-3 text-gray-500 bg-gray-800/30 dark:bg-gray-700/30 rounded-xl opacity-50">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Copy Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-white transition-all duration-200 bg-gray-800/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-700/70 dark:hover:bg-gray-600/70 backdrop-blur-sm border border-gray-600/30 dark:border-gray-500/30"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  currentQuestion.question
                                );
                              }}
                              title="Copy question"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>

                        {/* Question Content */}
                        <pre className="text-gray-100 text-lg font-mono whitespace-pre-wrap leading-relaxed">
                          <code className="relative">
                            {/* Syntax highlighting effect */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></span>
                            <span className="relative z-10">
                              {currentQuestion.question}
                            </span>
                          </code>
                        </pre>

                        {/* Bottom accent */}
                        <div className="mt-6 pt-4 border-t border-gray-700/30 dark:border-gray-600/30">
                          <div className="flex items-center justify-end text-xs text-gray-500">
                            <span className="font-mono">
                              Question #{currentQuestionIndex + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Beautiful Answer Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className="relative group mb-6 sm:mb-8"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-pink-600/5 rounded-2xl blur-sm"></div>

                {/* Main Container */}
                <div className="relative space-y-4 sm:space-y-5 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-800/90 dark:via-gray-700/90 dark:to-gray-800/90 rounded-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-600/50 shadow-xl backdrop-blur-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Choose your answer:
                    </h3>
                    {selectedAnswer !== null && !showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        {(() => {
                          const isCorrect = Array.isArray(selectedAnswer)
                            ? selectedAnswer.every(answerId =>
                                currentQuestion.correctAnswers.includes(
                                  answerId
                                )
                              ) &&
                              selectedAnswer.length ===
                                currentQuestion.correctAnswers.length
                            : currentQuestion.correctAnswers.includes(
                                selectedAnswer as string
                              );

                          return (
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                isCorrect
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 mr-2 ${
                                  isCorrect
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                {isCorrect ? (
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                ) : (
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                )}
                              </svg>
                              {isCorrect ? 'Correct!' : 'Incorrect'}
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </div>
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = Array.isArray(selectedAnswer)
                      ? selectedAnswer.includes(option.id)
                      : selectedAnswer === option.id;

                    const isCorrect = currentQuestion.correctAnswers.includes(
                      option.id
                    );
                    const showCorrectness =
                      selectedAnswer !== null && !showExplanation;

                    return (
                      <motion.button
                        key={option.id || `option-${index}`}
                        onClick={() => handleAnswerSelect(index)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full text-left p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                          showCorrectness
                            ? isCorrect
                              ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg shadow-green-500/20'
                              : isSelected
                                ? 'border-red-400 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 shadow-lg shadow-red-500/20'
                                : 'border-gray-200 dark:border-gray-600 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-sm'
                            : isSelected
                              ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg shadow-blue-500/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg hover:shadow-blue-500/10'
                        }`}
                      >
                        <div className="flex items-center">
                          <motion.span
                            className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-5 sm:mr-6 transition-all duration-300 shadow-lg ${
                              showCorrectness
                                ? isCorrect
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30'
                                  : isSelected
                                    ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/30'
                                    : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 shadow-gray-500/20'
                                : isSelected
                                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                                  : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 shadow-gray-500/20'
                            }`}
                            animate={
                              isSelected
                                ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                                : {}
                            }
                            transition={{ duration: 0.4 }}
                          >
                            {String.fromCharCode(65 + index)}
                          </motion.span>
                          <div className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 font-semibold">
                            {option.text}
                          </div>
                          {isSelected && (
                            <motion.div
                              className="ml-auto"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {showCorrectness ? (
                                isCorrect ? (
                                  <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )
                              ) : (
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
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

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
                    className={`px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
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
                    className={`rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 border shadow-lg ${
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
                      {currentQuestion.audioAnswer ? (
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
                          className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-full transition-all duration-200 group shadow-lg hover:shadow-xl"
                          title="Play answer explanation audio"
                        >
                          <svg
                            className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full opacity-50">
                          <svg
                            className="w-6 h-6 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Beautiful Explanation Code Block */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: 0.2,
                      }}
                      className="relative group"
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-sm ${
                          isAnswerCorrect
                            ? 'bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-teal-600/10'
                            : 'bg-gradient-to-br from-red-600/10 via-rose-600/5 to-pink-600/10'
                        }`}
                      ></div>

                      {/* Main Code Block */}
                      <div
                        className={`relative rounded-2xl p-8 overflow-x-auto border shadow-2xl backdrop-blur-sm ${
                          isAnswerCorrect
                            ? 'bg-gradient-to-br from-green-900/90 via-emerald-900/80 to-teal-900/90 dark:from-green-950/90 dark:via-emerald-950/80 dark:to-teal-950/90 border-green-700/50 dark:border-green-600/50'
                            : 'bg-gradient-to-br from-red-900/90 via-rose-900/80 to-pink-900/90 dark:from-red-950/90 dark:via-rose-950/80 dark:to-pink-950/90 border-red-700/50 dark:border-red-600/50'
                        }`}
                      >
                        {/* Header Bar */}
                        <div
                          className={`flex items-center justify-between mb-6 pb-4 border-b ${
                            isAnswerCorrect
                              ? 'border-green-700/30 dark:border-green-600/30'
                              : 'border-red-700/30 dark:border-red-600/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  isAnswerCorrect
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                }`}
                              ></div>
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  isAnswerCorrect
                                    ? 'bg-emerald-500'
                                    : 'bg-rose-500'
                                }`}
                              ></div>
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  isAnswerCorrect
                                    ? 'bg-teal-500'
                                    : 'bg-pink-500'
                                }`}
                              ></div>
                            </div>
                            <span
                              className={`text-sm font-mono ${
                                isAnswerCorrect
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }`}
                            >
                              {isAnswerCorrect
                                ? 'Explanation ✓'
                                : 'Explanation ✗'}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            {/* Audio Button */}
                            {currentQuestion.audioAnswer ? (
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
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
                                className={`p-3 transition-all duration-200 rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl ${
                                  isAnswerCorrect
                                    ? 'text-green-400 hover:text-green-200 bg-green-800/50 dark:bg-green-700/50 hover:bg-green-700/70 dark:hover:bg-green-600/70 border-green-600/30 dark:border-green-500/30'
                                    : 'text-red-400 hover:text-red-200 bg-red-800/50 dark:bg-red-700/50 hover:bg-red-700/70 dark:hover:bg-red-600/70 border-red-600/30 dark:border-red-500/30'
                                }`}
                                title="Play answer audio"
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </motion.button>
                            ) : (
                              <div
                                className={`p-3 rounded-xl opacity-50 ${
                                  isAnswerCorrect
                                    ? 'text-green-500 bg-green-800/30 dark:bg-green-700/30'
                                    : 'text-red-500 bg-red-800/30 dark:bg-red-700/30'
                                }`}
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Copy Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`p-2 transition-all duration-200 rounded-lg backdrop-blur-sm border ${
                                isAnswerCorrect
                                  ? 'text-green-400 hover:text-green-200 bg-green-800/50 dark:bg-green-700/50 hover:bg-green-700/70 dark:hover:bg-green-600/70 border-green-600/30 dark:border-green-500/30'
                                  : 'text-red-400 hover:text-red-200 bg-red-800/50 dark:bg-red-700/50 hover:bg-red-700/70 dark:hover:bg-red-600/70 border-red-600/30 dark:border-red-500/30'
                              }`}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  currentQuestion.explanation
                                );
                              }}
                              title="Copy explanation"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>

                        {/* Explanation Content */}
                        <pre
                          className={`text-lg font-mono whitespace-pre-wrap leading-relaxed ${
                            isAnswerCorrect ? 'text-green-100' : 'text-red-100'
                          }`}
                        >
                          <code className="relative">
                            {/* Syntax highlighting effect */}
                            <span
                              className={`absolute inset-0 animate-pulse ${
                                isAnswerCorrect
                                  ? 'bg-gradient-to-r from-transparent via-green-500/10 to-transparent'
                                  : 'bg-gradient-to-r from-transparent via-red-500/10 to-transparent'
                              }`}
                            ></span>
                            <span className="relative z-10">
                              {currentQuestion.explanation}
                            </span>
                          </code>
                        </pre>

                        {/* Bottom accent */}
                        <div
                          className={`mt-6 pt-4 border-t ${
                            isAnswerCorrect
                              ? 'border-green-700/30 dark:border-green-600/30'
                              : 'border-red-700/30 dark:border-red-600/30'
                          }`}
                        >
                          <div
                            className={`flex items-center justify-between text-xs font-mono ${
                              isAnswerCorrect
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            <span>Frontend Learning Hub</span>
                            <span>
                              {isAnswerCorrect
                                ? 'Correct Answer'
                                : 'Incorrect Answer'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  ← Previous
                </button>

                <div className="flex space-x-3">
                  {showExplanation && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors"
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
