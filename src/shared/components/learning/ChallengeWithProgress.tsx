// v1.0 - Example Challenge Component with Progress Tracking
'use client';

import { useState, useEffect } from 'react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import {
  Code,
  Clock,
  CheckCircle,
  Trophy,
  Star,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  maxScore: number;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    description: string;
  }>;
}

interface ChallengeWithProgressProps {
  challenge: Challenge;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function ChallengeWithProgress({
  challenge,
  onComplete,
  onNext,
}: ChallengeWithProgressProps) {
  const { updateProgress } = useProgressTracking();
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const runTests = () => {
    setIsRunning(true);

    // Simulate test execution
    setTimeout(() => {
      const results = challenge.testCases.map((testCase, index) => {
        // This is a mock implementation - in real app, you'd run actual code
        const isPassed = Math.random() > 0.3; // Mock 70% pass rate
        return {
          testCase: index + 1,
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: isPassed ? testCase.expectedOutput : 'Wrong output',
          passed: isPassed,
          description: testCase.description,
        };
      });

      setTestResults(results);
      const passedTests = results.filter(r => r.passed).length;
      const calculatedScore = Math.round(
        (passedTests / results.length) * challenge.maxScore
      );
      setScore(calculatedScore);
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  const handleSubmit = async () => {
    if (testResults.length === 0) {
      runTests();
      return;
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 60000); // Convert to minutes
    const completed = score >= challenge.maxScore * 0.7; // 70% threshold for completion

    setIsTracking(true);
    try {
      updateProgress({
        completedQuestions: completed ? 1 : 0,
        totalTimeSpent: timeSpent,
        lastActivity: new Date().toISOString(),
      });

      setIsCompleted(true);

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error tracking challenge progress:', error);
    } finally {
      setIsTracking(false);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleReset = () => {
    setCode('');
    setTestResults([]);
    setScore(0);
    setIsCompleted(false);
    setShowResults(false);
  };

  const getPointsForChallenge = () => {
    if (!isCompleted) return 0;
    const percentage = score / challenge.maxScore;
    return Math.round(percentage * 50); // Max 50 points per challenge
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Challenge Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {challenge.title}
            </h1>
            <div className="flex items-center space-x-3 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
              >
                {challenge.difficulty.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {challenge.category}
              </span>
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {challenge.estimatedTime} min
              </span>
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <Trophy className="w-6 h-6" />
            <span className="font-semibold">Completed!</span>
          </div>
        )}
      </div>

      {/* Challenge Description */}
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {challenge.description}
        </p>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Instructions:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {challenge.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Solution
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Write your solution here..."
              className="w-full h-64 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
              disabled={isCompleted}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={runTests}
              disabled={!code.trim() || isRunning || isCompleted}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Run Tests</span>
                </>
              )}
            </button>

            {showResults && !isCompleted && (
              <button
                onClick={handleSubmit}
                disabled={isTracking}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isTracking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Solution</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Test Results
          </h3>

          {testResults.length > 0 ? (
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    result.passed
                      ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Test Case {result.testCase}
                    </span>
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <strong>Input:</strong> {result.input}
                    </div>
                    <div>
                      <strong>Expected:</strong> {result.expected}
                    </div>
                    <div>
                      <strong>Actual:</strong> {result.actual}
                    </div>
                    <div>
                      <strong>Description:</strong> {result.description}
                    </div>
                  </div>
                </div>
              ))}

              {/* Score Display */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Score
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {score}/{challenge.maxScore}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(score / challenge.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Run your code to see test results</p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Section */}
      {isCompleted && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">
                🎉 Challenge Completed!
              </h3>
              <p className="opacity-90">
                Great job! You earned {getPointsForChallenge()} points.
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                +{getPointsForChallenge()}
              </div>
              <div className="text-sm opacity-75">points</div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Next Challenge
            </button>
          </div>
        </div>
      )}

      {/* Progress Tracking Indicator */}
      {isTracking && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Saving your progress...</span>
          </div>
        </div>
      )}
    </div>
  );
}
