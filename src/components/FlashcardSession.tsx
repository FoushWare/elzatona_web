'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  Clock,
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import Flashcard from './Flashcard';
import { useFlashcardSession } from '@/hooks/useFlashcardSession';

interface FlashcardSessionProps {
  className?: string;
}

export default function FlashcardSession({ className = '' }: FlashcardSessionProps) {
  const {
    currentCard,
    sessionCards,
    currentIndex,
    isSessionActive,
    sessionStats,
    startSession,
    endSession,
    handleAnswer,
    skipCard,
    isLoading,
    error
  } = useFlashcardSession();

  const [showSessionComplete, setShowSessionComplete] = useState(false);

  // Check if session is complete
  const isSessionComplete = isSessionActive && currentIndex >= sessionCards.length;

  const handleSessionComplete = () => {
    setShowSessionComplete(true);
    endSession();
  };

  const handleStartNewSession = () => {
    setShowSessionComplete(false);
    // You can customize this to start a specific type of session
    startSession('mixed', 15);
  };

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 ${className}`}>
        <div className="flex items-center space-x-3">
          <XCircle className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Session Error</h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isSessionActive) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Active Session
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start a study session to begin reviewing flashcards
          </p>
          <button
            onClick={() => startSession('mixed', 15)}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Starting...' : 'Start Study Session'}
          </button>
        </div>
      </div>
    );
  }

  if (showSessionComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 ${className}`}
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Session Complete!
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Session Summary
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">{sessionStats.cardsReviewed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cards Reviewed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">{sessionStats.correctAnswers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{sessionStats.incorrectAnswers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">{Math.round(sessionStats.accuracy)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Time: {sessionStats.timeSpent} minutes</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleStartNewSession}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Start New Session
            </button>
            <button
              onClick={() => setShowSessionComplete(false)}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Session Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={endSession}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>End Session</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {currentIndex + 1} / {sessionCards.length}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {Math.round(sessionStats.accuracy)}%
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {sessionStats.timeSpent}m
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / sessionCards.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard
              flashcard={currentCard}
              onAnswer={handleAnswer}
              onSkip={skipCard}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Complete Check */}
      {isSessionComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Session Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You&apos;ve reviewed all {sessionCards.length} cards in this session.
            </p>
            <button
              onClick={handleSessionComplete}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              View Results
            </button>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-500">{sessionStats.correctAnswers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-500">{sessionStats.incorrectAnswers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-500">{sessionStats.cardsReviewed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reviewed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
