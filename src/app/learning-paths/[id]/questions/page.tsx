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
import CustomAudioPlayer from '@/components/CustomAudioPlayer';

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

  const learningPath = learningPaths.find(path => path.id === pathId);

  // Memoize initial filters to prevent unnecessary re-renders
  const initialFilters = useMemo(() => ({
    learningPath: learningPath?.id,
    isActive: true,
  }), [learningPath?.id]);

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

  const handleSubmitAnswer = () => {
    const currentQuestion = currentGroup?.questions[currentQuestionIndex];
    if (!currentQuestion || !selectedAnswer) return;

    const isCorrect = Array.isArray(selectedAnswer)
      ? selectedAnswer.every(answerId =>
          currentQuestion.correctAnswers.includes(answerId)
        ) && selectedAnswer.length === currentQuestion.correctAnswers.length
      : currentQuestion.correctAnswers.includes(selectedAnswer as string);

    setIsAnswerCorrect(isCorrect);
    setShowExplanation(true);

    if (isCorrect) {
      setScore(prev => prev + (currentQuestion.points || 10));
      showSuccess('Correct! 🎉');
    } else {
      showError('Incorrect. Check the explanation below.');
    }

    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
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
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {learningPath?.title || 'Learning Path'} Questions
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {currentGroup.title}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of{' '}
                  {currentGroup.questions.length}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Score: {score} points
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Question Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {currentQuestion.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {currentQuestion.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
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
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onStatusChange={(status) => {
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
            <div className="px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                <ExpandableText text={currentQuestion.question} />
              </h2>

              {/* Audio Question */}
              {currentQuestion.audioQuestion && (
                <div className="mb-6">
                  <CustomAudioPlayer src={currentQuestion.audioQuestion} />
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = Array.isArray(selectedAnswer)
                    ? selectedAnswer.includes(option.id)
                    : selectedAnswer === option.id;

                  return (
                    <button
                      key={option.id || `option-${index}`}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-3">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              {selectedAnswer && !showExplanation && (
                <div className="flex justify-center mb-6">
                  <button
                    onClick={handleSubmitAnswer}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <ExpandableText text={currentQuestion.explanation} />
                  </div>

                  {/* Audio Answer */}
                  {currentQuestion.audioAnswer && (
                    <div className="mt-4">
                      <CustomAudioPlayer src={currentQuestion.audioAnswer} />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>

                <div className="flex space-x-2">
                  {showExplanation && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </ErrorBoundary>
  );
}
