'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Info,
} from 'lucide-react';
import EnhancedTTS from '@/components/EnhancedTTS';
import ErrorBoundary from '@/components/ErrorBoundary';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  learningPath: string;
  type: string;
}

export default function LearningPathQuestionsPage() {
  const params = useParams();
  const section = params.section as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Fetch questions from Firebase based on section
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Map section to learning path
      const sectionToLearningPath: { [key: string]: string } = {
        javascript: 'javascript-deep-dive',
        react: 'react-mastery',
        css: 'advanced-css',
        html: 'frontend-basics',
        git: 'git-version-control',
        'frontend-basics': 'frontend-basics',
        'advanced-css': 'advanced-css',
        'javascript-deep-dive': 'javascript-deep-dive',
        'react-mastery': 'react-mastery',
        'typescript-essentials': 'typescript-essentials',
        'performance-optimization': 'performance-optimization',
        security: 'security',
        'testing-strategies': 'testing-strategies',
        'system-design': 'system-design',
        accessibility: 'accessibility',
        'api-integration': 'api-integration',
        'git-version-control': 'git-version-control',
        'english-learning': 'english-learning',
      };

      const learningPath = sectionToLearningPath[section] || section;

      const response = await fetch(`/api/questions/${learningPath}`);
      const data = await response.json();

      if (data.success && data.questions) {
        // Filter for multiple-choice questions only
        const multipleChoiceQuestions = data.questions.filter(
          (q: Question) =>
            q.type === 'multiple-choice' && q.options && q.options.length > 0
        );
        setQuestions(multipleChoiceQuestions);
      } else {
        setError(data.error || 'Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to fetch questions from Firebase');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  }, [section]);

  // Load questions when component mounts or section changes
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQuestion = questions[currentQuestionIndex];
  const scorePercentage = totalAnswered > 0 ? (score / totalAnswered) * 100 : 0;

  const getSectionTitle = () => {
    const titles: { [key: string]: string } = {
      javascript: 'JavaScript Deep Dive',
      react: 'React Mastery',
      css: 'Advanced CSS',
      html: 'HTML Fundamentals',
      git: 'Git Version Control',
      'frontend-basics': 'Frontend Basics',
      'advanced-css': 'Advanced CSS',
      'javascript-deep-dive': 'JavaScript Deep Dive',
      'react-mastery': 'React Mastery',
      'typescript-essentials': 'TypeScript Essentials',
      'performance-optimization': 'Performance Optimization',
      security: 'Security',
      'testing-strategies': 'Testing Strategies',
      'system-design': 'System Design',
      accessibility: 'Accessibility',
      'api-integration': 'API Integration',
      'git-version-control': 'Git Version Control',
      'english-learning': 'English Learning',
    };
    return (
      titles[section] || section.charAt(0).toUpperCase() + section.slice(1)
    );
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowAnswer(true);
    setTotalAnswered(prev => prev + 1);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Loading questions from Firebase...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-red-800 dark:text-red-200 font-medium">
                Error Loading Questions
              </h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-2">{error}</p>
            <button
              onClick={fetchQuestions}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No Questions Available
            </h3>
            <p className="text-muted-foreground mb-4">
              No multiple-choice questions found for {section}. Questions may
              still be loading or this section might not have questions yet.
            </p>
            <button
              onClick={fetchQuestions}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/learning-paths"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning Paths
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {getSectionTitle()}
            </h1>
            <p className="text-muted-foreground text-lg">
              Practice questions to master {section} fundamentals
            </p>
          </div>

          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium text-muted-foreground">
                Progress
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium text-muted-foreground">
                Accuracy
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {scorePercentage.toFixed(1)}%
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium text-muted-foreground">
                Score
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {score} / {totalAnswered}
              </p>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 mb-8">
            {/* Question Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  Question {currentQuestion.id}
                </div>
                <div className="text-sm text-muted-foreground">
                  {section.charAt(0).toUpperCase() + section.slice(1)} Interview
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground flex-1">
                  {currentQuestion.question}
                </h3>
                <EnhancedTTS
                  text={currentQuestion.question}
                  className="flex-shrink-0 mt-1"
                />
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground">
                Select the correct answer:
              </h4>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showAnswer && isCorrect;
                const showIncorrect = showAnswer && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : showIncorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-border hover:border-blue-300 hover:bg-muted/50'
                    } ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                      {showCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showIncorrect && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!showAnswer && selectedAnswer !== null && (
              <button
                onClick={handleSubmitAnswer}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Answer
              </button>
            )}

            {/* Explanation */}
            {showAnswer && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Explanation:
                </h4>
                <p className="text-blue-800 dark:text-blue-200">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1} of {questions.length}
              </span>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
