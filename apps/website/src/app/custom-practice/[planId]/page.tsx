'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  Target,
  BookOpen,
  BookmarkPlus,
  BookmarkCheck,
  Trophy,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { addFlashcard, isInFlashcards } from '@/lib/flashcards';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  section?: string;
  difficulty?: string;
}

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  sections: {
    id: string;
    name: string;
    selectedQuestions: string[];
  }[];
  totalQuestions: number;
  dailyQuestions: number;
  created_at: string;
  progress?: {
    completedQuestions: number;
    currentDay: number;
    lastActivity: string;
  };
}

export default function CustomPracticePage() {
  const params = useParams();
  const router = useRouter();
  const planId = params?.planId as string;

  const [plan, setPlan] = useState<CustomPlan | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [inFlashcards, setInFlashcards] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<{
    completedQuestions: string[];
    correctAnswers: string[];
    lastUpdated: string;
  } | null>(null);

  // Load plan and questions
  useEffect(() => {
    if (!planId) {
      router.push('/browse-practice-questions');
      return;
    }

    loadPlan();
  }, [planId]);

  const loadPlan = async () => {
    setIsLoading(true);
    try {
      // Load plan from localStorage
      const savedPlans = localStorage.getItem('userPlans');
      if (savedPlans) {
        const parsedPlans: CustomPlan[] = JSON.parse(savedPlans);
        const foundPlan = parsedPlans.find(p => p.id === planId);

        if (!foundPlan) {
          alert('Plan not found');
          router.push('/browse-practice-questions');
          return;
        }

        setPlan(foundPlan);

        // Load progress
        const progressKey = `custom-practice-progress-${planId}`;
        const savedProgress = localStorage.getItem(progressKey);
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
          const parsedProgress = JSON.parse(savedProgress);
          setAnsweredQuestions(
            new Set(parsedProgress.completedQuestions || [])
          );
        }

        // Fetch questions from API based on selected question IDs
        const questionIds = foundPlan.sections.flatMap(
          section => section.selectedQuestions
        );
        if (questionIds.length > 0) {
          await fetchQuestionsByIds(questionIds);
        }
      } else {
        alert('No plans found');
        router.push('/browse-practice-questions');
      }
    } catch (error) {
      console.error('Error loading plan:', error);
      alert('Error loading plan');
      router.push('/browse-practice-questions');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestionsByIds = async (questionIds: string[]) => {
    try {
      // Fetch all questions and filter client-side (or use individual API calls)
      // For now, fetch with a high limit and filter by IDs
      const response = await fetch(`/api/questions?limit=1000`);
      const data = await response.json();

      if (data.success && data.questions) {
        // Filter questions by IDs and transform
        const filteredQuestions = data.questions.filter((q: any) =>
          questionIds.includes(q.id)
        );

        // Maintain order based on questionIds array
        const orderedQuestions = questionIds
          .map(id => filteredQuestions.find((q: any) => q.id === id))
          .filter(Boolean);

        // Transform questions to match our Question interface
        const transformedQuestions: Question[] = orderedQuestions
          .map((q: any) => {
            let options: string[] = [];
            if (Array.isArray(q.options)) {
              options = q.options.map((opt: any) =>
                typeof opt === 'string' ? opt : opt.text || opt
              );
            } else if (typeof q.options === 'string') {
              try {
                const parsed = JSON.parse(q.options);
                if (Array.isArray(parsed)) {
                  options = parsed.map((opt: any) =>
                    typeof opt === 'string' ? opt : opt.text || opt
                  );
                }
              } catch {
                options = [];
              }
            }

            // Determine correct answer index
            let correctAnswerIndex = 0;
            if (typeof q.correct_answer === 'number') {
              correctAnswerIndex = q.correct_answer;
            } else if (typeof q.correct_answer === 'string') {
              // Check if it's a letter (a, b, c, d)
              const letter = q.correct_answer.toLowerCase().trim();
              if (letter.length === 1 && letter >= 'a' && letter <= 'z') {
                correctAnswerIndex = letter.charCodeAt(0) - 97; // a=0, b=1, c=2, etc.
              } else {
                // Try to parse as number
                const parsed = parseInt(letter, 10);
                if (!isNaN(parsed) && parsed >= 0 && parsed < options.length) {
                  correctAnswerIndex = parsed;
                } else {
                  // Try to find by option id if options are objects
                  if (Array.isArray(q.options) && q.options[0]?.id) {
                    const correctIndex = q.options.findIndex(
                      (opt: any) => opt.id?.toLowerCase() === letter
                    );
                    if (correctIndex >= 0) {
                      correctAnswerIndex = correctIndex;
                    }
                  }
                }
              }
            }

            return {
              id: q.id,
              question:
                q.question || q.question_text || q.title || q.content || '',
              options,
              correctAnswer:
                correctAnswerIndex >= 0 && correctAnswerIndex < options.length
                  ? correctAnswerIndex
                  : 0,
              explanation: q.explanation,
              section: q.section || '',
              difficulty: q.difficulty || 'medium',
            };
          })
          .filter((q: Question) => q.options.length > 0);

        setQuestions(transformedQuestions);

        // Load current question based on progress
        if (progress && progress.completedQuestions.length > 0) {
          const lastCompletedIndex = transformedQuestions.findIndex(q =>
            progress.completedQuestions.includes(q.id)
          );
          if (
            lastCompletedIndex >= 0 &&
            lastCompletedIndex < transformedQuestions.length - 1
          ) {
            setCurrentQuestionIndex(lastCompletedIndex + 1);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const loadQuestion = (question: Question) => {
    if (!question) return;

    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
    setInFlashcards(isInFlashcards(question.id));
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      loadQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Update stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    // Mark as answered
    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestion.id);
    setAnsweredQuestions(newAnswered);

    // Add to flashcards if wrong
    if (!correct) {
      addFlashcard({
        id: currentQuestion.id,
        question: currentQuestion.question,
        section: currentQuestion.section || '',
        difficulty: currentQuestion.difficulty || 'medium',
        addedAt: Date.now(),
      });
      setInFlashcards(true);
    }

    // Save progress
    const progressKey = `custom-practice-progress-${planId}`;
    const updatedProgress = {
      completedQuestions: Array.from(newAnswered),
      correctAnswers: correct
        ? [...(progress?.correctAnswers || []), currentQuestion.id]
        : progress?.correctAnswers || [],
      lastUpdated: new Date().toISOString(),
    };
    setProgress(updatedProgress);
    localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const allQuestionsAnswered =
    questions.length > 0 && answeredQuestions.size >= questions.length;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-300'>
            Loading your custom plan...
          </p>
        </div>
      </div>
    );
  }

  if (!plan || questions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4'>
        <div className='text-center max-w-md'>
          <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            No questions available
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            This plan doesn't have any questions yet.
          </p>
          <Link
            href='/browse-practice-questions'
            className='inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Browse</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <Link
            href='/browse-practice-questions'
            className='inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Browse</span>
          </Link>
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              {plan.name}
            </h1>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              {plan.description}
            </p>
            <div className='flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400'>
              <div className='flex items-center space-x-2'>
                <Target className='w-4 h-4' />
                <span>{questions.length} questions</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='w-4 h-4' />
                <span>{plan.duration} days</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Trophy className='w-4 h-4' />
                <span>
                  {sessionStats.correct}/{sessionStats.total} correct
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {allQuestionsAnswered && isLastQuestion && (
          <div className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 mb-6 text-white'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold mb-2 flex items-center space-x-2'>
                  <Trophy className='w-6 h-6' />
                  <span>Congratulations!</span>
                </h3>
                <p className='text-green-100'>
                  You've completed all questions in this plan!
                </p>
              </div>
              <Link
                href='/dashboard'
                className='inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-green-50 text-green-600 rounded-lg font-semibold transition-colors'
              >
                <BarChart3 className='w-4 h-4' />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        )}

        {/* Question Card */}
        {currentQuestion && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6'>
            <div className='flex items-start justify-between gap-3 mb-4'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white flex-1'>
                {currentQuestion.question}
              </h2>
              {inFlashcards && (
                <BookmarkCheck className='w-5 h-5 text-indigo-600 flex-shrink-0' />
              )}
            </div>

            <div className='space-y-3 mb-6'>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === currentQuestion.correctAnswer;
                let bgColor = 'bg-gray-50 dark:bg-gray-700';
                let borderColor = 'border-gray-200 dark:border-gray-600';
                const textColor = 'text-gray-900 dark:text-white';

                if (showExplanation && isSelected) {
                  bgColor = isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20';
                  borderColor = isCorrect
                    ? 'border-green-500'
                    : 'border-red-500';
                } else if (showExplanation && isCorrectOption) {
                  bgColor = 'bg-green-50 dark:bg-green-900/20';
                  borderColor = 'border-green-500';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bgColor} ${borderColor} ${textColor} ${
                      selectedAnswer === null
                        ? 'hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'cursor-not-allowed'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          showExplanation && isSelected
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : showExplanation && isCorrectOption
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6'>
                <div className='mb-3'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    {isCorrect ? (
                      <span className='text-green-600 dark:text-green-400 flex items-center gap-2'>
                        <CheckCircle className='w-5 h-5' />
                        Correct Answer!
                      </span>
                    ) : (
                      <span className='text-red-600 dark:text-red-400 flex items-center gap-2'>
                        <XCircle className='w-5 h-5' />
                        Incorrect
                      </span>
                    )}
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    The correct answer is{' '}
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {String.fromCharCode(65 + currentQuestion.correctAnswer)}:{' '}
                      {currentQuestion.options[currentQuestion.correctAnswer]}
                    </span>
                  </p>
                </div>
                {currentQuestion.explanation && (
                  <>
                    <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                      Explanation:
                    </h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      {currentQuestion.explanation}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className='flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Previous Question</span>
              </button>

              <div className='text-sm text-gray-600 dark:text-gray-400'>
                {currentQuestionIndex + 1} of {questions.length}
              </div>

              <button
                onClick={handleNext}
                disabled={!showExplanation || isLastQuestion}
                className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors'
              >
                <span>Next Question</span>
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        )}

        {/* Session Statistics */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Session Statistics
          </h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
                {sessionStats.total}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Questions Answered
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                {sessionStats.total > 0
                  ? Math.round(
                      (sessionStats.correct / sessionStats.total) * 100
                    )
                  : 0}
                %
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Accuracy Rate
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                {questions.length - answeredQuestions.size}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Remaining
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
