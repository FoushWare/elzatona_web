'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { flashcardService } from '@/lib/firebase-flashcards';

interface AddToFlashcardProps {
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  source?: string;
  onStatusChange?: (status: 'added' | 'removed' | 'error') => void;
  className?: string;
}

type FlashcardState = 'add' | 'saved' | 'loading';

export default function AddToFlashcard({
  question,
  answer,
  category,
  difficulty,
  source,
  onStatusChange,
  className = '',
}: AddToFlashcardProps) {
  const { user } = useFirebaseAuth();
  const [state, setState] = useState<FlashcardState>('add');
  const [flashcardId, setFlashcardId] = useState<string | null>(null);

  // Check if flashcard already exists when component mounts or question changes
  useEffect(() => {
    // Reset state when question changes
    setState('add');
    setFlashcardId(null);

    if (user) {
      checkExistingFlashcard();
    }
  }, [user, question]);

  const checkExistingFlashcard = async () => {
    if (!user) return;

    try {
      const result = await flashcardService.checkFlashcardExists(
        user.uid,
        question
      );

      // Handle case where result might be undefined or null
      if (result && result.exists && result.flashcardId) {
        setState('saved');
        setFlashcardId(result.flashcardId);
      }
    } catch (error) {
      console.error('Error checking existing flashcard:', error);
    }
  };

  const handleToggleFlashcard = async () => {
    if (!user) {
      onStatusChange?.('error');
      return;
    }

    if (state === 'loading') return;

    setState('loading');

    try {
      if (state === 'add') {
        // Add to flashcards
        const newFlashcardId =
          await flashcardService.createFlashcardFromQuestion({
            question,
            answer,
            category,
            difficulty,
            source,
            addedBy: 'manual',
            userId: user.uid,
          });

        if (newFlashcardId) {
          setState('saved');
          setFlashcardId(newFlashcardId);
          onStatusChange?.('added');
        } else {
          setState('add');
          onStatusChange?.('error');
        }
      } else if (state === 'saved' && flashcardId) {
        // Remove from flashcards
        const success = await flashcardService.removeFlashcard(flashcardId);

        if (success) {
          setState('add');
          setFlashcardId(null);
          onStatusChange?.('removed');
        } else {
          setState('saved');
          onStatusChange?.('error');
        }
      }
    } catch (error) {
      console.error('Error toggling flashcard:', error);
      setState(state === 'add' ? 'saved' : 'add');
      onStatusChange?.('error');
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'add':
        return <Bookmark className="w-6 h-6" />;
      case 'saved':
        return <BookmarkCheck className="w-6 h-6" />;
      case 'loading':
        return (
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        );
      default:
        return <Bookmark className="w-6 h-6" />;
    }
  };

  const getTooltip = () => {
    switch (state) {
      case 'add':
        return 'Click to bookmark this question';
      case 'saved':
        return 'Remove bookmark';
      case 'loading':
        return 'Processing...';
      default:
        return 'Click to bookmark this question';
    }
  };

  const getButtonText = () => {
    // No text for icon-only button
    return '';
  };

  const getButtonClasses = () => {
    const baseClasses =
      'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (state) {
      case 'add':
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 focus:ring-gray-500 hover:shadow-sm`;
      case 'saved':
        return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-md`;
      case 'loading':
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 focus:ring-gray-500 hover:shadow-sm`;
    }
  };

  // Show the button even if user is not authenticated, but disable functionality
  // if (!user) {
  //   return null; // Don't show the button if user is not authenticated
  // }

  return (
    <button
      onClick={handleToggleFlashcard}
      disabled={state === 'loading'}
      className={`${getButtonClasses()} ${className}`}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
}
