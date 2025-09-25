'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Target,
  BookOpen,
  Loader2,
  TrendingUp,
} from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useSecureProgress } from '@/hooks/useSecureProgress';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface LearningPlan {
  id: string;
  days: number;
  title: string;
  sections: {
    name: string;
    questionsPerDay: number;
  }[];
}

function GuidedPracticeContent() {
  const { userType } = useUserType();
  const { isAuthenticated, isLoading: isAuthLoading } = useFirebaseAuth();
  const { saveProgress, progress: userProgress } = useSecureProgress();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now()
  );
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [sessionComplete, setSessionComplete] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && userType !== 'guided') {
      router.push('/learning-mode');
      return;
    }

    // Load current plan
    if (planId && typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('active-guided-plan');
      if (savedPlan) {
        try {
          const plan = JSON.parse(savedPlan);
          if (plan.id === planId) {
            setCurrentPlan(plan);
          } else {
            console.error('Plan ID mismatch:', plan.id, 'expected:', planId);
            router.push('/guided-learning');
          }
        } catch (error) {
          console.error('Error parsing saved plan:', error);
          localStorage.removeItem('active-guided-plan');
          router.push('/guided-learning');
        }
      } else {
        router.push('/guided-learning');
      }
    }
  }, [planId, userType, isAuthLoading, router]);

  // Fetch questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoadingQuestions(true);
        setQuestionsError(null);

        // Fetch questions from Firebase
        const response = await fetch('/api/questions/unified?isActive=true');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to load questions');
        }

        // Transform Firebase questions to our Question interface
        const transformedQuestions: Question[] = data.data.map((q: any) => ({
          id: q.id,
          question: q.content || q.title || q.question,
          options: q.options?.map((opt: any) => opt.text) || [],
          correctAnswer: q.options?.findIndex((opt: any) => opt.isCorrect) || 0,
          explanation: q.explanation || 'No explanation available.',
          section: q.category || q.section || 'General',
          difficulty: q.difficulty || 'medium',
        }));

        setQuestions(transformedQuestions);
      } catch (error: any) {
        console.error('Error fetching questions:', error);
        setQuestionsError(error.message || 'Failed to load questions');
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, []);

  // Load first question when questions are available
  useEffect(() => {
    if (questions.length > 0 && !currentQuestion) {
      loadNextQuestion();
    }
  }, [questions]);

  const loadNextQuestion = () => {
    // Check if session is complete (5 questions answered)
    if (sessionStats.total >= 5) {
      setSessionComplete(true);
      return;
    }

    // Get available questions (not yet used)
    const availableQuestions = questions.filter(q => !usedQuestions.has(q.id));

    // If no more questions available, complete the session
    if (availableQuestions.length === 0) {
      setSessionComplete(true);
      return;
    }

    // Select a random question from available ones
    const randomQuestion =
      availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    // Mark this question as used
    setUsedQuestions(prev => new Set([...prev, randomQuestion.id]));

    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Calculate time spent on this question
    const timeSpent = Date.now() - questionStartTime;

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));

    // Save progress securely
    if (isAuthenticated) {
      try {
        const success = await saveProgress({
          sessionId: `guided_${Date.now()}`,
          questionId: currentQuestion.id,
          answer: answerIndex,
          isCorrect: correct,
          timeSpent: Math.round(timeSpent / 1000), // Convert to seconds
          section: currentQuestion.section,
          difficulty: currentQuestion.difficulty,
          timestamp: Date.now(),
          learningMode: 'guided',
          planId: planId || undefined,
        });

        if (success) {
          console.log('✅ Progress saved successfully');
        } else {
          console.log('⚠️ Progress save failed, but continuing');
        }
      } catch (error) {
        console.error('❌ Error saving progress:', error);
        // Continue with the question flow even if progress save fails
      }
    }
  };

  const handleNextQuestion = () => {
    if (sessionComplete) {
      // Mark plan as completed
      if (planId && typeof window !== 'undefined') {
        const completedPlansData = localStorage.getItem(
          'completed-guided-plans'
        );
        let completedPlans = [];

        if (completedPlansData) {
          try {
            completedPlans = JSON.parse(completedPlansData);
          } catch (error) {
            console.error('Error parsing completed plans:', error);
            completedPlans = [];
          }
        }

        if (!completedPlans.includes(planId)) {
          completedPlans.push(planId);
          localStorage.setItem(
            'completed-guided-plans',
            JSON.stringify(completedPlans)
          );
        }
      }

      // Session is complete, redirect to results or learning page
      router.push('/guided-learning');
      return;
    }
    loadNextQuestion();
  };

  const getAccuracyPercentage = () => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (isAuthLoading || isLoadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
          {isAuthLoading
            ? 'Loading guided practice...'
            : 'Loading questions...'}
        </p>
      </div>
    );
  }

  if (questionsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {questionsError}
          </p>
          <button
            onClick={() => router.push('/guided-learning')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Learning Plans
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Questions Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no questions available for practice yet.
          </p>
          <button
            onClick={() => router.push('/guided-learning')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Learning Plans
          </button>
        </div>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Active Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to select a learning plan first.
          </p>
          <button
            onClick={() => router.push('/guided-learning')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Choose Learning Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/guided-learning')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Guided Practice Session
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {sessionStats.correct}/{sessionStats.total}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {getAccuracyPercentage()}% accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Question Card */}
        {currentQuestion && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {currentQuestion.section}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {currentQuestion.difficulty} difficulty
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Question {sessionStats.total + 1}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : selectedAnswer === index
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : selectedAnswer === index
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-300 dark:border-gray-600'
                          : selectedAnswer === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {showExplanation &&
                        index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      {showExplanation &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Explanation:
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <span>
                    {sessionStats.total >= 4
                      ? 'Complete Session'
                      : 'Next Question'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Session Completion */}
        {sessionComplete && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
            <div className="text-center">
              {/* Grade Display */}
              <div className="mb-8">
                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto mb-4 ${
                    getAccuracyPercentage() >= 80
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : getAccuracyPercentage() >= 60
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  <span
                    className={`text-4xl font-bold ${getGradeColor(getAccuracyPercentage())}`}
                  >
                    {getGradeLetter(getAccuracyPercentage())}
                  </span>
                  <span
                    className={`text-lg font-semibold ${getGradeColor(getAccuracyPercentage())}`}
                  >
                    {getAccuracyPercentage()}%
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Session Complete! 🎉
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {getAccuracyPercentage() >= 80
                    ? "Excellent work! You're mastering frontend concepts!"
                    : getAccuracyPercentage() >= 60
                      ? 'Good job! Keep practicing to improve your skills.'
                      : 'Keep studying! Practice makes perfect.'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {sessionStats.correct}/{sessionStats.total}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Correct Answers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getAccuracyPercentage()}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Accuracy Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentPlan?.title || 'Practice Session'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Plan Completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => router.push('/guided-learning')}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Other Plans</span>
                </button>
                <button
                  onClick={() => router.push('/progress')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>View Progress</span>
                </button>
                <button
                  onClick={() => {
                    setSessionComplete(false);
                    setUsedQuestions(new Set());
                    setSessionStats({ correct: 0, total: 0 });
                    loadNextQuestion();
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Target className="w-5 h-5" />
                  <span>Practice Again</span>
                </button>
              </div>

              {/* Encouragement Message */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  💡 <strong>Tip:</strong> Consistent practice is key to
                  mastering frontend development. Try different learning plans
                  to cover all topics comprehensively!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Session Stats */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Session Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sessionStats.total}/5
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questions Answered
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {getAccuracyPercentage()}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Accuracy Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuidedPracticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
            Loading guided practice...
          </p>
        </div>
      }
    >
      <GuidedPracticeContent />
    </Suspense>
  );
}
