'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Target,
  Clock,
  BarChart3,
} from 'lucide-react';

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

export default function MultipleChoiceQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  // Fetch questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from all learning paths that have multiple-choice questions
        const learningPaths = [
          'frontend-basics',
          'advanced-css',
          'javascript-deep-dive',
          'react-mastery',
          'typescript-essentials',
          'performance-optimization',
          'security',
          'testing-strategies',
          'system-design',
          'accessibility',
          'api-integration',
          'git-version-control',
          'english-learning',
        ];

        const allQuestions: Question[] = [];

        for (const learningPath of learningPaths) {
          try {
            const response = await fetch(`/api/questions/${learningPath}`);
            const data = await response.json();

            if (data.success && data.questions) {
              const multipleChoiceQuestions = data.questions.filter(
                (q: Question) =>
                  q.type === 'multiple-choice' &&
                  q.options &&
                  q.options.length > 0
              );
              allQuestions.push(...multipleChoiceQuestions);
            }
          } catch (err) {
            console.warn(`Failed to fetch questions for ${learningPath}:`, err);
          }
        }

        if (allQuestions.length > 0) {
          setQuestions(allQuestions);
        } else {
          setError('No questions available');
        }
      } catch (err) {
        setError('Failed to fetch questions from Firebase');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  // Filter questions based on selections
  const filteredQuestions = questions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory)
      return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty)
      return false;
    return true;
  });

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(answerIndex);
    setTotalAnswered(prev => prev + 1);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setTotalAnswered(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'css':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'javascript':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'html':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'websockets':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const accuracy =
    totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Error Loading Questions
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show no questions state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No Questions Available
          </h2>
          <p className="text-muted-foreground">
            No multiple choice questions found in the database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Multiple Choice Quiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your frontend knowledge with these interview-style questions
          </p>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex gap-4 mb-6">
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            {showStatistics ? 'Hide Stats' : 'Show Stats'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Target className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Statistics Section */}
        <div className={`${showStatistics ? 'block' : 'hidden md:block'} mb-8`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredQuestions.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Questions
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {totalAnswered}
              </div>
              <div className="text-sm text-muted-foreground">Answered</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-8`}>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="all">All Categories</option>
                  {[...new Set(questions.map(q => q.category))].map(
                    category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="all">All Difficulties</option>
                  {[...new Set(questions.map(q => q.difficulty))].map(
                    difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        {filteredQuestions.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of{' '}
                  {filteredQuestions.length}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
                >
                  {currentQuestion.difficulty}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentQuestion.category)}`}
                >
                  {currentQuestion.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>1 min</span>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === null
                      ? 'border-border hover:border-primary hover:bg-muted/50'
                      : selectedAnswer === index
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-border bg-muted/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === null
                          ? 'border-border'
                          : selectedAnswer === index
                            ? index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-red-500 bg-red-500'
                            : index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-border'
                      }`}
                    >
                      {selectedAnswer !== null &&
                        (index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-4 h-4 text-white" />
                        ) : null)}
                    </div>
                    <span className="font-medium text-foreground">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && showExplanation && (
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Explanation
                </h4>
                <p className="text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="flex gap-2">
                {selectedAnswer !== null && !showExplanation && (
                  <button
                    onClick={handleShowExplanation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show Explanation
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex === filteredQuestions.length - 1
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Questions Message */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Questions Found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
