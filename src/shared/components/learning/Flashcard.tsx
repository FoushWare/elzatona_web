'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Eye } from 'lucide-react';
import { Flashcard as FlashcardType } from '@/lib/firebase-flashcards';

interface FlashcardProps {
  flashcard: FlashcardType;
  onAnswer: (isCorrect: boolean) => void;
  onSkip?: () => void;
  showAnswer?: boolean;
  className?: string;
}

export default function Flashcard({
  flashcard,
  onAnswer,
  onSkip,
  showAnswer = false,
  className = '',
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div
        className="relative h-96 group cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onClick={handleFlip}
      >
        {/* Card Container with both sides */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.8s ease-in-out',
          }}
        >
          {/* Front of card (Question) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl shadow-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden border-2 border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold bg-white/25 px-3 py-1.5 rounded-lg border border-white/30">
                  {flashcard.category}
                </span>
                <span className="text-xs font-medium bg-white/25 px-3 py-1.5 rounded-lg border border-white/30">
                  {flashcard.difficulty}
                </span>
              </div>

              {/* Question Content */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 w-full">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Question
                  </h3>
                  <p className="text-lg leading-relaxed text-white font-medium">
                    {flashcard.question}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {flashcard.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium bg-white/25 px-2 py-1 rounded border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-medium opacity-90 bg-white/15 px-3 py-1 rounded-lg flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Click to reveal answer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 rounded-xl shadow-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden border-2 border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold bg-white/25 px-3 py-1.5 rounded-lg border border-white/30">
                  Answer
                </span>
                <span className="text-xs font-medium bg-white/25 px-3 py-1.5 rounded-lg border border-white/30">
                  {flashcard.difficulty}
                </span>
              </div>

              {/* Answer Content */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 w-full">
                  <h3 className="text-xl font-bold mb-4 text-white">Answer</h3>
                  <p className="text-lg leading-relaxed text-white font-medium">
                    {flashcard.answer}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {flashcard.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium bg-white/25 px-2 py-1 rounded border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-medium opacity-90 bg-white/15 px-3 py-1 rounded-lg">
                  How did you do?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Feedback Buttons - Only show when flipped */}
      {isFlipped && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg"
          >
            <XCircle className="w-5 h-5" />
            <span>I was wrong</span>
          </button>

          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span>I was correct</span>
          </button>
        </div>
      )}

      {/* Skip Button - Only show when not flipped */}
      {!isFlipped && onSkip && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Skip this card</span>
          </button>
        </div>
      )}
    </div>
  );
}
