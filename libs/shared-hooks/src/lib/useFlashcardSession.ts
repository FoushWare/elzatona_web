'use client';

import { useState, useEffect, useCallback } from 'react';

import {
  flashcardService,
  progressService,
  sessionService,
  Flashcard,
  FlashcardProgress,
  FlashcardSession,
} from '@/lib/supabase-flashcards';

interface SessionStats {
  cardsReviewed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeSpent: number; // in minutes
}

interface UseFlashcardSessionReturn {
  // Session state
  currentCard: Flashcard | null;
  sessionCards: Flashcard[];
  currentIndex: number;
  isSessionActive: boolean;
  sessionId: string | null;
  sessionStats: SessionStats;

  // Session controls
  startSession: (
    type: 'review' | 'new' | 'mixed',
    maxCards?: number
  ) => Promise<void>;
  endSession: () => Promise<void>;
  nextCard: () => void;

  // Card interactions
  handleAnswer: (isCorrect: boolean) => Promise<void>;
  skipCard: () => void;

  // Progress data
  cardsDueForReview: FlashcardProgress[];
  newCardsAvailable: number;
  totalCardsStudied: number;

  // Loading states
  isLoading: boolean;
  error: string | null;
}

export function useFlashcardSession(): UseFlashcardSessionReturn {
  const [user, setUser] = useState({ uid: 'placeholder-user' });
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [sessionCards, setSessionCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    cardsReviewed: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
    timeSpent: 0,
  });
  const [cardsDueForReview, setCardsDueForReview] = useState<
    FlashcardProgress[]
  >([]);
  const [newCardsAvailable, setNewCardsAvailable] = useState(0);
  const [totalCardsStudied, setTotalCardsStudied] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Load user's flashcard data
  const loadUserData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load cards due for review
      const dueCards = await progressService.getCardsDueForReview(user.uid);
      setCardsDueForReview(dueCards);

      // Load new cards count
      const newCards = await progressService.getNewCards(user.uid, 100);
      setNewCardsAvailable(newCards.length);

      // Load total cards studied
      const userProgress = await progressService.getUserProgress(user.uid);
      setTotalCardsStudied(userProgress.length);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load flashcard data'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Start a new session
  const startSession = useCallback(
    async (type: 'review' | 'new' | 'mixed', maxCards: number = 20) => {
      if (!user) {
        setError('You must be logged in to start a session');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Start session in Firebase
        const newSessionId = await sessionService.startSession(user.uid, type);
        setSessionId(newSessionId);
        setSessionStartTime(new Date());
        setIsSessionActive(true);
        setCurrentIndex(0);
        setSessionStats({
          cardsReviewed: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          accuracy: 0,
          timeSpent: 0,
        });

        // Load cards for session
        let cards: Flashcard[] = [];

        if (type === 'review') {
          // Get cards due for review
          const dueProgress = await progressService.getCardsDueForReview(
            user.uid
          );
          const dueCardIds = dueProgress.map(p => p.flashcardId);
          const fetchedCards = await Promise.all(
            dueCardIds.map(id => flashcardService.getFlashcard(id))
          );
          cards = fetchedCards.filter(
            (card): card is Flashcard => card !== null
          );
        } else if (type === 'new') {
          // Get new cards
          cards = await progressService.getNewCards(user.uid, maxCards);
        } else {
          // Mixed: combine review and new cards
          const dueProgress = await progressService.getCardsDueForReview(
            user.uid
          );
          const dueCardIds = dueProgress.map(p => p.flashcardId);
          const dueCards = await Promise.all(
            dueCardIds.map(id => flashcardService.getFlashcard(id))
          );
          const validDueCards = dueCards.filter(
            card => card !== null
          ) as Flashcard[];

          const newCards = await progressService.getNewCards(
            user.uid,
            Math.max(1, maxCards - validDueCards.length)
          );

          // Prioritize review cards, then add new cards
          cards = [...validDueCards, ...newCards];
        }

        // Limit cards and shuffle
        cards = cards.slice(0, maxCards);
        cards = shuffleArray(cards);

        setSessionCards(cards);
        setCurrentCard(cards[0] || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to start session'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  // End current session
  const endSession = useCallback(async () => {
    if (!sessionId || !sessionStartTime) return;

    try {
      const endTime = new Date();
      const duration = Math.round(
        (endTime.getTime() - sessionStartTime.getTime()) / 60000
      ); // minutes

      await sessionService.endSession(sessionId, duration);

      // Reset session state
      setIsSessionActive(false);
      setSessionId(null);
      setCurrentCard(null);
      setSessionCards([]);
      setCurrentIndex(0);
      setSessionStartTime(null);

      // Reload user data
      await loadUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end session');
    }
  }, [sessionId, sessionStartTime, loadUserData]);

  // Handle card answer
  const handleAnswer = useCallback(
    async (isCorrect: boolean) => {
      if (!user || !currentCard || !sessionId) return;

      try {
        // Update progress in Supabase
        await progressService.updateProgress(
          currentCard.id,
          isCorrect ? 'correct' : 'incorrect',
          0, // responseTime - placeholder
          sessionId
        );

        // Update session stats
        await sessionService.updateSessionStats(sessionId, isCorrect);

        // Update local stats
        setSessionStats(prev => {
          const newCorrect = isCorrect
            ? prev.correctAnswers + 1
            : prev.correctAnswers;
          const newIncorrect = isCorrect
            ? prev.incorrectAnswers
            : prev.incorrectAnswers + 1;
          const newReviewed = prev.cardsReviewed + 1;

          return {
            ...prev,
            cardsReviewed: newReviewed,
            correctAnswers: newCorrect,
            incorrectAnswers: newIncorrect,
            accuracy: newReviewed > 0 ? (newCorrect / newReviewed) * 100 : 0,
          };
        });

        // Move to next card
        nextCard();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to record answer'
        );
      }
    },
    [user, currentCard, sessionId]
  );

  // Move to next card
  const nextCard = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      console.log('Moving to next card:', {
        prev,
        nextIndex,
        sessionCardsLength: sessionCards.length,
      });
      if (nextIndex < sessionCards.length) {
        setCurrentCard(sessionCards[nextIndex]);
        return nextIndex;
      } else {
        // Session complete
        console.log('Session complete - no more cards');
        setCurrentCard(null);
        return nextIndex;
      }
    });
  }, [sessionCards]);

  // Skip current card
  const skipCard = useCallback(() => {
    nextCard();
  }, [nextCard]);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Update time spent periodically
  useEffect(() => {
    if (!isSessionActive || !sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeSpent = Math.round(
        (now.getTime() - sessionStartTime.getTime()) / 60000
      );
      setSessionStats(prev => ({ ...prev, timeSpent }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  return {
    // Session state
    currentCard,
    sessionCards,
    currentIndex,
    isSessionActive,
    sessionId,
    sessionStats,

    // Session controls
    startSession,
    endSession,
    nextCard,

    // Card interactions
    handleAnswer,
    skipCard,

    // Progress data
    cardsDueForReview,
    newCardsAvailable,
    totalCardsStudied,

    // Loading states
    isLoading,
    error,
  };
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
