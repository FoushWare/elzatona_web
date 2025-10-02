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
import CelebrationModal from '@/components/ui/CelebrationModal';

interface Question {
  id: string;
  question: string;
  content?: string;
  title?: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  section: string;
  difficulty:
    | 'easy'
    | 'medium'
    | 'hard'
    | 'beginner'
    | 'intermediate'
    | 'advanced';
  type:
    | 'multiple-choice'
    | 'conceptual'
    | 'open-ended'
    | 'true-false'
    | 'multiple-select';
  answer?: string; // For conceptual/open-ended questions
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
  const planId = searchParams?.get('plan');

  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
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
  const [showCelebration, setShowCelebration] = useState(false);

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

  // Fetch questions from Firebase based on the current plan
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!currentPlan) {
        console.log('❌ No current plan, skipping question fetch');
        return;
      }

      try {
        console.log('🔄 Starting to fetch questions for plan:', planId);
        setIsLoadingQuestions(true);
        setQuestionsError(null);

        // First, get the plan details to understand its sections
        const planResponse = await fetch(
          `/api/guided-learning/plans/${planId}`
        );
        const planData = await planResponse.json();

        if (!planData.success) {
          throw new Error(planData.error || 'Failed to load plan details');
        }

        const planDetails = planData.data;
        console.log('📋 Plan details:', planDetails);

        // Get all question IDs from plan sections
        const allQuestionIds: string[] = [];
        if (planDetails.sections) {
          const sections = Array.isArray(planDetails.sections)
            ? planDetails.sections
            : Object.values(planDetails.sections);

          sections.forEach((section: any) => {
            if (section.questions && Array.isArray(section.questions)) {
              allQuestionIds.push(...section.questions);
            }
          });
        }

        console.log('🔍 Question IDs from plan sections:', allQuestionIds);

        // If no questions in plan sections, fetch questions by category
        let questionsToFetch = [];
        if (allQuestionIds.length > 0) {
          // Fetch specific questions by IDs
          const questionPromises = allQuestionIds.map(
            async (questionId: string) => {
              try {
                const response = await fetch(
                  `/api/questions/unified/${questionId}`
                );
                const data = await response.json();
                return data.success ? data.data : null;
              } catch (error) {
                console.error(`Error fetching question ${questionId}:`, error);
                return null;
              }
            }
          );

          const questionResults = await Promise.all(questionPromises);
          questionsToFetch = questionResults.filter(Boolean);
        } else {
          // Fallback: fetch questions by categories related to the plan
          const planCategories = getPlanCategories(planDetails);
          console.log('📚 Plan categories for fallback:', planCategories);

          // Fetch questions for each category separately and combine
          const questionPromises = planCategories.map(
            async (category: string) => {
              try {
                const response = await fetch(
                  `/api/questions/unified?isActive=true&category=${encodeURIComponent(category)}`
                );
                const data = await response.json();
                return data.success ? data.data : [];
              } catch (error) {
                console.error(
                  `Error fetching questions for category ${category}:`,
                  error
                );
                return [];
              }
            }
          );

          const questionResults = await Promise.all(questionPromises);
          questionsToFetch = questionResults.flat();
        }

        console.log('✅ Questions to use:', questionsToFetch.length);

        // Transform Firebase questions to our Question interface
        const transformedQuestions: Question[] = questionsToFetch.map(
          (q: any) => {
            // Handle different question types
            let options: string[] = [];
            let correctAnswer: number | string = 0;

            if (q.type === 'conceptual' || q.type === 'open-ended') {
              // For conceptual questions, we don't need options
              options = [];
              correctAnswer = q.answer || '';
            } else if (q.type === 'true-false') {
              options = ['True', 'False'];
              correctAnswer = q.correctAnswer === true ? 0 : 1;
            } else if (q.type === 'multiple-select') {
              options = q.options?.map((opt: any) => opt.text) || [];
              correctAnswer = q.correctAnswer || [];
            } else {
              // Multiple choice (default)
              options = q.options?.map((opt: any) => opt.text) || [];
              correctAnswer =
                q.options?.findIndex((opt: any) => opt.isCorrect) || 0;
            }

            return {
              id: q.id,
              question: q.content || q.title || q.question,
              content: q.content,
              title: q.title,
              options,
              correctAnswer,
              explanation: q.explanation || 'No explanation available.',
              section: q.category || q.section || 'General',
              difficulty: q.difficulty || 'medium',
              type: q.type || 'multiple-choice',
              answer: q.answer,
            };
          }
        );

        setQuestions(transformedQuestions);
        console.log(
          '✅ Successfully loaded questions:',
          transformedQuestions.length
        );
      } catch (error: any) {
        console.error('❌ Error fetching questions:', error);
        setQuestionsError(error.message || 'Failed to load questions');
      } finally {
        console.log('🏁 Finished loading questions');
        setIsLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [currentPlan, planId]);

  // Helper function to get plan categories based on plan details
  const getPlanCategories = (planDetails: any) => {
    const categories = new Set<string>();

    if (planDetails.sections) {
      const sections = Array.isArray(planDetails.sections)
        ? planDetails.sections
        : Object.values(planDetails.sections);

      sections.forEach((section: any) => {
        if (section.name) {
          // Map section names to categories - use exact matches first
          const sectionName = section.name;
          if (sectionName === 'HTML & CSS') {
            categories.add('HTML & CSS');
          } else if (sectionName === 'JavaScript') {
            categories.add('JavaScript (Core)');
          } else if (sectionName === 'React') {
            categories.add('React');
          } else if (sectionName === 'TypeScript') {
            categories.add('TypeScript');
          } else if (sectionName === 'CSS & Styling') {
            categories.add('CSS & Styling');
          } else if (sectionName === 'Performance') {
            categories.add('Performance');
          } else if (sectionName === 'Security') {
            categories.add('Security');
          } else if (sectionName === 'Testing') {
            categories.add('Testing');
          } else {
            // Fallback to partial matching
            const sectionNameLower = sectionName.toLowerCase();
            if (
              sectionNameLower.includes('html') ||
              sectionNameLower.includes('css')
            ) {
              categories.add('HTML & CSS');
              categories.add('CSS & Styling');
            } else if (
              sectionNameLower.includes('javascript') ||
              sectionNameLower.includes('js')
            ) {
              categories.add('JavaScript (Core)');
            } else if (sectionNameLower.includes('react')) {
              categories.add('React');
            } else if (sectionNameLower.includes('typescript')) {
              categories.add('TypeScript');
            }
          }
        }
      });
    }

    // If no categories found, use common ones
    if (categories.size === 0) {
      categories.add('JavaScript (Core)');
      categories.add('React');
      categories.add('HTML & CSS');
    }

    return Array.from(categories);
  };

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
      setShowCelebration(true);
      return;
    }

    // Get available questions (not yet used)
    const availableQuestions = questions.filter(q => !usedQuestions.has(q.id));

    // If no more questions available, complete the session
    if (availableQuestions.length === 0) {
      setSessionComplete(true);
      return;
    }

    // Smart question selection based on plan sections and difficulty
    let selectedQuestion;

    // Try to select questions from different sections to provide variety
    const usedSections = new Set();
    questions.forEach(q => {
      if (usedQuestions.has(q.id)) {
        usedSections.add(q.section);
      }
    });

    // First, try to find questions from sections not yet used
    const unusedSectionQuestions = availableQuestions.filter(
      q => !usedSections.has(q.section)
    );

    if (unusedSectionQuestions.length > 0) {
      selectedQuestion =
        unusedSectionQuestions[
          Math.floor(Math.random() * unusedSectionQuestions.length)
        ];
    } else {
      // If all sections used, select randomly from available questions
      selectedQuestion =
        availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ];
    }

    // Mark this question as used
    setUsedQuestions(prev => new Set([...prev, selectedQuestion.id]));

    setCurrentQuestion(selectedQuestion);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerSelect = async (answerIndex: number | string) => {
    if (showExplanation || !currentQuestion) return;

    if (typeof answerIndex === 'string') {
      setTextAnswer(answerIndex);
    } else {
      setSelectedAnswer(answerIndex);
    }

    // Check correctness based on question type
    let correct = false;
    if (
      currentQuestion.type === 'conceptual' ||
      currentQuestion.type === 'open-ended'
    ) {
      // For conceptual questions, we'll consider all answers as correct to show the explanation
      correct = true;
    } else if (currentQuestion.type === 'multiple-select') {
      const selectedArray = Array.isArray(answerIndex)
        ? answerIndex
        : [answerIndex];
      const correctArray = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer
        : [currentQuestion.correctAnswer];

      correct =
        selectedArray.length === correctArray.length &&
        selectedArray.every(answer => correctArray.includes(answer));
    } else {
      // Multiple choice, true-false
      correct = answerIndex === currentQuestion.correctAnswer;
    }

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
          answer:
            currentQuestion.type === 'conceptual' ||
            currentQuestion.type === 'open-ended'
              ? textAnswer.length > 0
                ? 1
                : 0
              : typeof answerIndex === 'string'
                ? parseInt(answerIndex, 10)
                : answerIndex,
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
      // Mark plan as completed and save grade
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

        // Save the grade for this plan
        const planGradesData = localStorage.getItem('plan-grades');
        let planGrades: Record<string, number> = {};

        if (planGradesData) {
          try {
            planGrades = JSON.parse(planGradesData);
          } catch (error) {
            console.error('Error parsing plan grades:', error);
            planGrades = {};
          }
        }

        planGrades[planId] = getAccuracyPercentage();
        localStorage.setItem('plan-grades', JSON.stringify(planGrades));
      }

      // Show celebration modal instead of redirecting immediately
      setShowCelebration(true);
      return;
    }
    loadNextQuestion();
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    router.push('/guided-learning');
  };

  const handleRetakeTest = () => {
    setShowCelebration(false);
    setSessionComplete(false);
    setUsedQuestions(new Set());
    setSessionStats({ correct: 0, total: 0 });
    loadNextQuestion();
  };

  const handleViewPlans = () => {
    setShowCelebration(false);
    // Clear the active plan from localStorage
    localStorage.removeItem('active-guided-plan');
    // Clear current plan state
    setCurrentPlan(null);
    router.push('/guided-learning');
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

            {/* Question Content */}
            {currentQuestion.content ? (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div
                  className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion.content
                      .replace(/\n/g, '<br>')
                      .replace(
                        /```([\s\S]*?)```/g,
                        '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>'
                      )
                      .replace(
                        /`([^`]+)`/g,
                        '<code class="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">$1</code>'
                      ),
                  }}
                />
              </div>
            ) : (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {currentQuestion.question}
              </h3>
            )}

            {/* Answer Options based on question type */}
            {currentQuestion.type === 'conceptual' ||
            currentQuestion.type === 'open-ended' ? (
              <div className="space-y-4 mb-6">
                <textarea
                  value={textAnswer}
                  onChange={e => setTextAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={4}
                  disabled={showExplanation}
                />
                {!showExplanation && (
                  <button
                    onClick={() => handleAnswerSelect(textAnswer)}
                    disabled={!textAnswer.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Answer
                  </button>
                )}
              </div>
            ) : (
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
            )}

            {showExplanation && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                {/* Show the correct answer for conceptual/open-ended questions */}
                {(currentQuestion.type === 'conceptual' ||
                  currentQuestion.type === 'open-ended') &&
                  currentQuestion.answer && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Correct Answer:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg">
                        {currentQuestion.answer}
                      </p>
                    </div>
                  )}

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Explanation:
                </h4>
                <div
                  className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion.explanation
                      .replace(/\n/g, '<br>')
                      .replace(
                        /```([\s\S]*?)```/g,
                        '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>'
                      )
                      .replace(
                        /`([^`]+)`/g,
                        '<code class="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">$1</code>'
                      ),
                  }}
                />
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

        {/* Celebration Modal */}
        <CelebrationModal
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          results={{
            correct: sessionStats.correct,
            total: sessionStats.total,
            percentage: getAccuracyPercentage(),
            grade: getGradeLetter(getAccuracyPercentage()),
            planName: currentPlan?.title || 'Practice Session',
          }}
          onRetake={handleRetakeTest}
          onViewPlans={handleViewPlans}
        />

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
