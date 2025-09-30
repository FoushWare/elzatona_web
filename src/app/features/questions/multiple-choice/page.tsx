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
import useUnifiedQuestions from '@/hooks/useUnifiedQuestions';

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

export default function MultipleChoiceQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | string[] | null
  >(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Use unified questions hook
  const {
    questions: allQuestions,
    isLoading,
    error,
    loadQuestions,
  } = useUnifiedQuestions();

  // Filter questions based on selected filters
  const filteredQuestions = allQuestions.filter(q => {
    const matchesCategory =
      !selectedCategory || q.category === selectedCategory;
    const matchesDifficulty =
      !selectedDifficulty || q.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty && q.isActive;
  });

  // Load questions when filters change
  useEffect(() => {
    loadQuestions({
      category: selectedCategory || undefined,
      difficulty: selectedDifficulty || undefined,
    });
  }, [selectedCategory, selectedDifficulty, loadQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
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
    const currentQuestion = filteredQuestions[currentQuestionIndex];
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
    }

    setTotalAnswered(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswerCorrect(null);
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

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsAnswerCorrect(null);
    setScore(0);
    setTotalAnswered(0);
  };

  const getUniqueCategories = () => {
    return Array.from(new Set(allQuestions.map(q => q.category))).sort();
  };

  const getUniqueDifficulties = () => {
    return Array.from(new Set(allQuestions.map(q => q.difficulty))).sort();
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

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No questions match your current filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedDifficulty('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
  const successRate =
    totalAnswered > 0 ? Math.round((score / (totalAnswered * 10)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Multiple Choice Quiz
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Test your knowledge with questions from all learning paths
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Target className="w-5 h-5 mr-2 inline" />
                Filters
              </button>
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <BarChart3 className="w-5 h-5 mr-2 inline" />
                Stats
              </button>
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
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span>
                Question {currentQuestionIndex + 1} of{' '}
                {filteredQuestions.length}
              </span>
              <span>Score: {score} points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Difficulties</option>
                  {getUniqueDifficulties().map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Panel */}
      {showStatistics && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredQuestions.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalAnswered}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Answered
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {score}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Points Earned
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {successRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {currentQuestion.type === 'single'
                    ? 'Single Choice'
                    : 'Multiple Choice'}
                </span>
              </div>
              {currentQuestion.timeLimit && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{currentQuestion.timeLimit}s</span>
                </div>
              )}
            </div>
          </div>

          {/* Question Content */}
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.content}
            </h2>

            {/* Audio Question */}
            {currentQuestion.audioQuestion && (
              <div className="mb-6">
                <audio controls className="w-full">
                  <source
                    src={currentQuestion.audioQuestion}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
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
                    key={option.id}
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

            {/* Answer Explanation */}
            {showExplanation && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  {isAnswerCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mr-3" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-2">{currentQuestion.explanation}</p>
                </div>

                {/* Audio Answer */}
                {currentQuestion.audioAnswer && (
                  <div className="mt-4">
                    <audio controls className="w-full">
                      <source
                        src={currentQuestion.audioAnswer}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
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
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Previous
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2 inline" />
                  Restart
                </button>
                {showExplanation && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {currentQuestionIndex === filteredQuestions.length - 1
                      ? 'Finish Quiz'
                      : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Complete Summary */}
        {currentQuestionIndex === filteredQuestions.length - 1 &&
          showExplanation && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Quiz Complete! 🎉
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {score}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total Points
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {totalAnswered}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Questions Answered
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {successRate}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Success Rate
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {filteredQuestions.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total Questions
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-2 inline" />
                  Restart Quiz
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
