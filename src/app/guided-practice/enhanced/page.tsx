'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
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
  Award,
  Clock,
  BarChart3,
  Trophy,
  CheckSquare,
  Square,
  ExternalLink,
  Lightbulb,
  Book,
  FileText,
  Play,
  Code,
  Link,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useSecureProgress } from '@/hooks/useSecureProgress';

interface Question {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'text' | 'code' | 'open-ended';
  options?: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit?: number;
  tags: string[];
  hints?: QuestionHint[];
}

interface QuestionHint {
  id: string;
  title: string;
  description?: string;
  url: string;
  type:
    | 'article'
    | 'documentation'
    | 'tutorial'
    | 'video'
    | 'example'
    | 'reference';
  category?: string;
  priority?: number;
}

interface QuestionOption {
  id: string;
  text: string;
}

interface LearningPlan {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
}

interface LearningSection {
  id: string;
  name: string;
  category: string;
  questions: string[];
  weight: number;
  order: number;
  description?: string;
}

interface UserProgress {
  planId: string;
  currentDay: number;
  currentSection: number;
  completedQuestions: string[];
  scores: Record<string, number>; // questionId -> score
  sectionProgress: Record<
    string,
    {
      completed: number;
      total: number;
      averageScore: number;
    }
  >;
  overallProgress: number;
  totalScore: number;
  averageScore: number;
  startDate: Date;
  lastActivity: Date;
  isCompleted: boolean;
  completionDate?: Date;
}

interface SessionStats {
  currentSessionScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
  startTime: Date;
}

function EnhancedGuidedPracticeContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useFirebaseAuth();
  const { saveProgress } = useSecureProgress();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  // State management
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [userPlanProgress, setUserPlanProgress] = useState<UserProgress | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionResult, setQuestionResult] = useState<
    'correct' | 'incorrect' | null
  >(null);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    currentSessionScore: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeSpent: 0,
    startTime: new Date(),
  });
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (!planId) {
      router.push('/guided-learning');
      return;
    }

    // Mock plan data
    const mockPlan: LearningPlan = {
      id: planId,
      name: '3 Day Comprehensive Plan',
      duration: 3,
      description: 'Balanced preparation covering all major topics',
      difficulty: 'Intermediate',
      totalQuestions: 150,
      dailyQuestions: 50,
      sections: [
        {
          id: 'html-css',
          name: 'HTML & CSS',
          category: 'html',
          questions: ['q1', 'q2', 'q3'],
          weight: 20,
          order: 1,
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'javascript',
          questions: ['q4', 'q5', 'q6', 'q7'],
          weight: 40,
          order: 2,
        },
        {
          id: 'react',
          name: 'React',
          category: 'react',
          questions: ['q8', 'q9', 'q10'],
          weight: 20,
          order: 3,
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'typescript',
          questions: ['q11', 'q12'],
          weight: 20,
          order: 4,
        },
      ],
      features: ['Balanced coverage', 'Daily milestones', 'TypeScript basics'],
      estimatedTime: '4-5 hours',
      isRecommended: true,
      isActive: true,
    };

    // Mock user progress
    const mockUserProgress: UserProgress = {
      planId,
      currentDay: 1,
      currentSection: 0,
      completedQuestions: ['q1'],
      scores: { q1: 85 },
      sectionProgress: {
        'html-css': { completed: 1, total: 3, averageScore: 85 },
        javascript: { completed: 0, total: 4, averageScore: 0 },
        react: { completed: 0, total: 3, averageScore: 0 },
        typescript: { completed: 0, total: 2, averageScore: 0 },
      },
      overallProgress: 8.3, // 1/12 questions
      totalScore: 85,
      averageScore: 85,
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      lastActivity: new Date(),
      isCompleted: false,
    };

    setCurrentPlan(mockPlan);
    setUserPlanProgress(mockUserProgress);

    // Load current question
    loadCurrentQuestion(mockPlan, mockUserProgress);
    setIsLoading(false);
  }, [planId, router, loadCurrentQuestion]);

  const loadCurrentQuestion = useCallback(
    (plan: LearningPlan, progress: UserProgress) => {
      const currentSection = plan.sections[progress.currentSection];
      if (!currentSection) return;

      const availableQuestions = currentSection.questions.filter(
        qId => !progress.completedQuestions.includes(qId)
      );

      if (availableQuestions.length === 0) {
        // Move to next section or complete plan
        if (progress.currentSection < plan.sections.length - 1) {
          // Move to next section
          const nextProgress = {
            ...progress,
            currentSection: progress.currentSection + 1,
          };
          setUserPlanProgress(nextProgress);
          loadCurrentQuestion(plan, nextProgress);
        } else {
          // Plan completed
          setShowResults(true);
        }
        return;
      }

      const currentQuestionId = availableQuestions[0];

      // Mock question data with hints
      const mockQuestion: Question = {
        id: currentQuestionId,
        title: 'What is JavaScript hoisting?',
        content:
          'Explain the concept of hoisting in JavaScript and provide an example.',
        type: 'single',
        options: [
          {
            id: 'a',
            text: 'Variables and functions are moved to the top of their scope',
          },
          {
            id: 'b',
            text: 'Variables are initialized with undefined before assignment',
          },
          { id: 'c', text: 'Functions can be called before they are declared' },
          { id: 'd', text: 'All of the above' },
        ],
        correctAnswers: ['d'],
        explanation:
          'Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation. This allows variables to be accessed before they are declared and functions to be called before they are defined.',
        category: 'javascript',
        difficulty: 'medium',
        points: 10,
        timeLimit: 120,
        tags: ['javascript', 'hoisting', 'scope'],
        hints: [
          {
            id: 'hint-1',
            title: 'JavaScript Hoisting Explained',
            description:
              'Comprehensive guide to understanding JavaScript hoisting',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting',
            type: 'documentation',
            category: 'javascript',
            priority: 1,
          },
          {
            id: 'hint-2',
            title: 'JavaScript Hoisting Tutorial',
            description:
              'Video tutorial explaining hoisting with practical examples',
            url: 'https://www.youtube.com/watch?v=example-hoisting',
            type: 'video',
            category: 'javascript',
            priority: 2,
          },
        ],
      };

      setCurrentQuestion(mockQuestion);
      setSelectedAnswers([]);
      setShowExplanation(false);
      setQuestionResult(null);
      setQuestionStartTime(new Date());
    },
    []
  );

  const handleAnswerSelect = (answerId: string) => {
    if (currentQuestion?.type === 'single') {
      setSelectedAnswers([answerId]);
    } else if (currentQuestion?.type === 'multiple') {
      setSelectedAnswers(prev =>
        prev.includes(answerId)
          ? prev.filter(id => id !== answerId)
          : [...prev, answerId]
      );
    }
  };

  const submitAnswer = () => {
    if (!currentQuestion || !userPlanProgress || selectedAnswers.length === 0)
      return;

    const isCorrect =
      selectedAnswers.every(answer =>
        currentQuestion.correctAnswers.includes(answer)
      ) && selectedAnswers.length === currentQuestion.correctAnswers.length;

    const timeSpent = (Date.now() - questionStartTime.getTime()) / 1000;
    const score = isCorrect ? currentQuestion.points : 0;
    const timeBonus = timeSpent < (currentQuestion.timeLimit || 120) ? 5 : 0;
    const finalScore = score + timeBonus;

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      currentSessionScore: prev.currentSessionScore + finalScore,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      timeSpent: prev.timeSpent + timeSpent,
    }));

    // Update user progress
    const updatedProgress = {
      ...userPlanProgress,
      completedQuestions: [
        ...userPlanProgress.completedQuestions,
        currentQuestion.id,
      ],
      scores: {
        ...userPlanProgress.scores,
        [currentQuestion.id]: finalScore,
      },
      sectionProgress: {
        ...userPlanProgress.sectionProgress,
        [currentQuestion.category]: {
          ...userPlanProgress.sectionProgress[currentQuestion.category],
          completed:
            userPlanProgress.sectionProgress[currentQuestion.category]
              .completed + 1,
          averageScore: calculateSectionAverageScore(
            userPlanProgress,
            currentQuestion.category,
            finalScore
          ),
        },
      },
      totalScore: userPlanProgress.totalScore + finalScore,
      averageScore: calculateOverallAverageScore(userPlanProgress, finalScore),
      overallProgress:
        ((userPlanProgress.completedQuestions.length + 1) /
          currentPlan!.totalQuestions) *
        100,
      lastActivity: new Date(),
    };

    setUserPlanProgress(updatedProgress);
    setQuestionResult(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);

    // Save progress to backend
    saveProgress({
      planId: currentPlan!.id,
      questionId: currentQuestion.id,
      score: finalScore,
      timeSpent,
      isCorrect,
    });
  };

  const calculateSectionAverageScore = (
    progress: UserProgress,
    sectionId: string,
    newScore: number
  ) => {
    const section = progress.sectionProgress[sectionId];
    const totalScore = section.averageScore * section.completed + newScore;
    return Math.round(totalScore / (section.completed + 1));
  };

  const calculateOverallAverageScore = (
    progress: UserProgress,
    newScore: number
  ) => {
    const totalQuestions = progress.completedQuestions.length + 1;
    const totalScore =
      progress.averageScore * progress.completedQuestions.length + newScore;
    return Math.round(totalScore / totalQuestions);
  };

  const nextQuestion = () => {
    if (!currentPlan || !userPlanProgress) return;
    loadCurrentQuestion(currentPlan, userPlanProgress);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeLetter = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (isLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading practice session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  if (!currentPlan || !userPlanProgress) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Plan Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The learning plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/guided-learning')}>
            Back to Learning Plans
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              You&apos;ve completed the {currentPlan.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {getGradeLetter(userPlanProgress.averageScore)}
                </h3>
                <p
                  className={`text-3xl font-bold ${getGradeColor(userPlanProgress.averageScore)}`}
                >
                  {userPlanProgress.averageScore}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Final Grade
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {userPlanProgress.completedQuestions.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Questions Completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {Math.round(sessionStats.timeSpent / 60)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Minutes Spent
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Section Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPlan.sections.map(section => {
                  const sectionProgress =
                    userPlanProgress.sectionProgress[section.category];
                  return (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {section.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {sectionProgress.completed}/{sectionProgress.total}{' '}
                          questions completed
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-2xl font-bold ${getGradeColor(sectionProgress.averageScore)}`}
                        >
                          {sectionProgress.averageScore}%
                        </p>
                        <Badge
                          className={getGradeColor(
                            sectionProgress.averageScore
                          )}
                        >
                          {getGradeLetter(sectionProgress.averageScore)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => router.push('/guided-learning')}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <Button onClick={() => router.push('/dashboard')}>
              <Trophy className="w-4 h-4 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentPlan.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Day {userPlanProgress.currentDay} •{' '}
                {currentPlan.sections[userPlanProgress.currentSection]?.name}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/guided-learning')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Overall Progress
                </h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(userPlanProgress.overallProgress)}%
                </span>
              </div>
              <Progress
                value={userPlanProgress.overallProgress}
                className="mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userPlanProgress.completedQuestions.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentPlan.totalQuestions}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className={`text-2xl font-bold ${getGradeColor(userPlanProgress.averageScore)}`}
                  >
                    {userPlanProgress.averageScore}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average Score
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sessionStats.correctAnswers}/
                    {sessionStats.questionsAnswered}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Session Score
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-2">
            {currentQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={getDifficultyColor(
                          currentQuestion.difficulty
                        )}
                      >
                        {currentQuestion.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {currentQuestion.points} points
                      </Badge>
                    </div>
                    {currentQuestion.timeLimit && (
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{currentQuestion.timeLimit}s</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">
                    {currentQuestion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentQuestion.content}
                  </p>

                  {currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                            selectedAnswers.includes(option.id)
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {currentQuestion.type === 'single' ? (
                              selectedAnswers.includes(option.id) ? (
                                <CheckCircle className="w-5 h-5 text-red-500" />
                              ) : (
                                <Square className="w-5 h-5 text-gray-400" />
                              )
                            ) : selectedAnswers.includes(option.id) ? (
                              <CheckSquare className="w-5 h-5 text-red-500" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400" />
                            )}
                            <span className="text-gray-900 dark:text-white">
                              {option.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {showExplanation && (
                    <div
                      className={`p-4 rounded-lg border-l-4 ${
                        questionResult === 'correct'
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {questionResult === 'correct' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {questionResult === 'correct'
                            ? 'Correct!'
                            : 'Incorrect'}
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Learning Hints Section */}
                  {currentQuestion.hints &&
                    currentQuestion.hints.length > 0 && (
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-blue-500" />
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            💡 Learn More About This Topic
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Explore these resources to deepen your understanding:
                        </p>
                        <div className="space-y-2">
                          {currentQuestion.hints
                            .sort(
                              (a, b) => (a.priority || 3) - (b.priority || 3)
                            )
                            .map(hint => {
                              const getIcon = () => {
                                switch (hint.type) {
                                  case 'article':
                                    return <FileText className="w-4 h-4" />;
                                  case 'documentation':
                                    return <Book className="w-4 h-4" />;
                                  case 'tutorial':
                                    return <Play className="w-4 h-4" />;
                                  case 'video':
                                    return <Play className="w-4 h-4" />;
                                  case 'example':
                                    return <Code className="w-4 h-4" />;
                                  case 'reference':
                                    return <Link className="w-4 h-4" />;
                                  default:
                                    return <ExternalLink className="w-4 h-4" />;
                                }
                              };

                              return (
                                <a
                                  key={hint.id}
                                  href={hint.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all duration-200 group"
                                >
                                  <div className="text-blue-500 group-hover:text-blue-600">
                                    {getIcon()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                      {hint.title}
                                    </h5>
                                    {hint.description && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {hint.description}
                                      </p>
                                    )}
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-2 py-0.5"
                                      >
                                        {hint.type}
                                      </Badge>
                                      {hint.category && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs px-2 py-0.5"
                                        >
                                          {hint.category}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    )}

                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      {currentQuestion.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      {!showExplanation ? (
                        <Button
                          onClick={submitAnswer}
                          disabled={selectedAnswers.length === 0}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <Button onClick={nextQuestion}>
                          Next Question
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Session Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Questions Answered
                  </span>
                  <span className="font-medium">
                    {sessionStats.questionsAnswered}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Correct Answers
                  </span>
                  <span className="font-medium text-green-600">
                    {sessionStats.correctAnswers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Session Score
                  </span>
                  <span className="font-medium">
                    {sessionStats.currentSessionScore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Time Spent
                  </span>
                  <span className="font-medium">
                    {Math.round(sessionStats.timeSpent / 60)}m
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Section Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Section Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentPlan.sections.map((section, index) => {
                  const sectionProgress =
                    userPlanProgress.sectionProgress[section.category];
                  const isCurrentSection =
                    index === userPlanProgress.currentSection;
                  return (
                    <div
                      key={section.id}
                      className={`p-3 rounded-lg ${
                        isCurrentSection
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {section.name}
                        </h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {sectionProgress.completed}/{sectionProgress.total}
                        </span>
                      </div>
                      <Progress
                        value={
                          (sectionProgress.completed / sectionProgress.total) *
                          100
                        }
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Average Score
                        </span>
                        <span
                          className={`font-medium ${getGradeColor(sectionProgress.averageScore)}`}
                        >
                          {sectionProgress.averageScore}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnhancedGuidedPracticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading practice session...
            </p>
          </div>
        </div>
      }
    >
      <EnhancedGuidedPracticeContent />
    </Suspense>
  );
}
