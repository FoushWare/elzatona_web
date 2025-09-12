import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Types for flashcard system
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  source?: string; // Source of the question (e.g., "React Basics Quiz", "Frontend Fundamentals")
  status: 'new' | 'learning' | 'mastered'; // Flashcard learning status
  addedBy: 'manual' | 'failed'; // How the card was added
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: string; // User ID who created the card
  lastReviewed?: Timestamp;
  nextReview?: Timestamp;
}

export interface FlashcardProgress {
  id: string;
  userId: string;
  flashcardId: string;
  correctCount: number;
  incorrectCount: number;
  lastReviewed: Timestamp;
  nextReview: Timestamp;
  interval: number; // Days until next review
  easeFactor: number; // SM-2 algorithm ease factor
  reviewCount: number;
  streak: number; // Consecutive correct answers
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FlashcardSession {
  id: string;
  userId: string;
  sessionType: 'review' | 'new' | 'mixed';
  cardsReviewed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  startTime: Timestamp;
  endTime?: Timestamp;
  duration?: number; // in minutes
  createdAt: Timestamp;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cardIds: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Flashcard CRUD operations
export const flashcardService = {
  // Create a new flashcard
  async createFlashcard(
    flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const docRef = await addDoc(collection(db, 'flashcards'), {
      ...flashcard,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Get all flashcards
  async getAllFlashcards(): Promise<Flashcard[]> {
    const querySnapshot = await getDocs(collection(db, 'flashcards'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Flashcard[];
  },

  // Get flashcards by category
  async getFlashcardsByCategory(category: string): Promise<Flashcard[]> {
    const q = query(
      collection(db, 'flashcards'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Flashcard[];
  },

  // Get flashcards by difficulty
  async getFlashcardsByDifficulty(difficulty: string): Promise<Flashcard[]> {
    const q = query(
      collection(db, 'flashcards'),
      where('difficulty', '==', difficulty)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Flashcard[];
  },

  // Get a single flashcard
  async getFlashcard(id: string): Promise<Flashcard | null> {
    const docRef = doc(db, 'flashcards', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Flashcard;
    }
    return null;
  },

  // Update a flashcard
  async updateFlashcard(
    id: string,
    updates: Partial<Flashcard>
  ): Promise<void> {
    const docRef = doc(db, 'flashcards', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete a flashcard
  async deleteFlashcard(id: string): Promise<void> {
    const docRef = doc(db, 'flashcards', id);
    await deleteDoc(docRef);
  },

  // Create flashcard from question data
  async createFlashcardFromQuestion(questionData: {
    question: string;
    answer: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    source?: string;
    addedBy: 'manual' | 'failed';
    userId?: string;
  }): Promise<string | null> {
    try {
      // Check if Firebase is properly configured
      if (!db) {
        console.warn('Firestore not available - skipping flashcard creation');
        return null;
      }

      const flashcardData = {
        question: questionData.question,
        answer: questionData.answer,
        category: questionData.category,
        difficulty: questionData.difficulty,
        tags: [questionData.category.toLowerCase()],
        source: questionData.source || 'Learning Path',
        status: 'new' as const,
        addedBy: questionData.addedBy,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: questionData.userId,
        lastReviewed: null,
        nextReview: null,
      };

      const docRef = await addDoc(collection(db, 'flashcards'), flashcardData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating flashcard from question:', error);
      return null;
    }
  },

  // Check if a question already exists in user's flashcards
  async checkFlashcardExists(
    userId: string,
    question: string
  ): Promise<{ exists: boolean; flashcardId?: string }> {
    try {
      // Check if Firebase is properly configured
      if (!db) {
        console.warn('Firestore not available - skipping flashcard check');
        return { exists: false };
      }

      const flashcardsQuery = query(
        collection(db, 'flashcards'),
        where('createdBy', '==', userId),
        where('question', '==', question)
      );

      const snapshot = await getDocs(flashcardsQuery);

      if (snapshot.empty) {
        return { exists: false };
      }

      return {
        exists: true,
        flashcardId: snapshot.docs[0].id,
      };
    } catch (error) {
      console.error('Error checking flashcard existence:', error);
      return { exists: false };
    }
  },

  // Remove flashcard
  async removeFlashcard(flashcardId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'flashcards', flashcardId));
      return true;
    } catch (error) {
      console.error('Error removing flashcard:', error);
      return false;
    }
  },
};

// Progress tracking operations
export const progressService = {
  // Create or update flashcard progress
  async updateProgress(
    userId: string,
    flashcardId: string,
    isCorrect: boolean
  ): Promise<void> {
    const progressRef = doc(
      db,
      'flashcardProgress',
      `${userId}_${flashcardId}`
    );
    const progressSnap = await getDoc(progressRef);

    const now = new Date();
    const nextReview = new Date();

    if (progressSnap.exists()) {
      const currentProgress = progressSnap.data() as FlashcardProgress;

      // Update counts
      const newCorrectCount = isCorrect
        ? currentProgress.correctCount + 1
        : currentProgress.correctCount;
      const newIncorrectCount = isCorrect
        ? currentProgress.incorrectCount
        : currentProgress.incorrectCount + 1;

      // Calculate new interval using SM-2 algorithm
      let newInterval: number;
      let newEaseFactor = currentProgress.easeFactor;
      let newStreak = isCorrect ? currentProgress.streak + 1 : 0;

      if (isCorrect) {
        if (currentProgress.reviewCount === 0) {
          newInterval = 1;
        } else if (currentProgress.reviewCount === 1) {
          newInterval = 6;
        } else {
          newInterval = Math.round(currentProgress.interval * newEaseFactor);
        }
        newEaseFactor = Math.max(
          1.3,
          newEaseFactor + (0.1 - (5 - 3) * (0.08 + (5 - 3) * 0.02))
        );
      } else {
        newInterval = 1;
        newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
        newStreak = 0;
      }

      nextReview.setDate(now.getDate() + newInterval);

      await updateDoc(progressRef, {
        correctCount: newCorrectCount,
        incorrectCount: newIncorrectCount,
        lastReviewed: serverTimestamp(),
        nextReview: Timestamp.fromDate(nextReview),
        interval: newInterval,
        easeFactor: newEaseFactor,
        reviewCount: currentProgress.reviewCount + 1,
        streak: newStreak,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create new progress record
      nextReview.setDate(now.getDate() + 1);

      await addDoc(collection(db, 'flashcardProgress'), {
        userId,
        flashcardId,
        correctCount: isCorrect ? 1 : 0,
        incorrectCount: isCorrect ? 0 : 1,
        lastReviewed: serverTimestamp(),
        nextReview: Timestamp.fromDate(nextReview),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 1,
        streak: isCorrect ? 1 : 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  },

  // Get user's flashcard progress
  async getUserProgress(userId: string): Promise<FlashcardProgress[]> {
    const q = query(
      collection(db, 'flashcardProgress'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FlashcardProgress[];
  },

  // Get cards due for review
  async getCardsDueForReview(userId: string): Promise<FlashcardProgress[]> {
    const now = new Date();
    // First get all progress records for the user
    const q = query(
      collection(db, 'flashcardProgress'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);

    // Filter and sort in memory to avoid composite index requirement
    const allProgress = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FlashcardProgress[];

    // Filter cards due for review and sort by nextReview
    return allProgress
      .filter(progress => progress.nextReview.toDate() <= now)
      .sort(
        (a, b) =>
          a.nextReview.toDate().getTime() - b.nextReview.toDate().getTime()
      );
  },

  // Get new cards for user (cards they haven't seen yet)
  async getNewCards(
    userId: string,
    limitCount: number = 10
  ): Promise<Flashcard[]> {
    // Get all flashcards
    const allFlashcards = await flashcardService.getAllFlashcards();

    // Get user's progress to find cards they haven't seen
    const userProgress = await this.getUserProgress(userId);
    const seenCardIds = new Set(userProgress.map(p => p.flashcardId));

    // Filter out seen cards and return new ones
    const newCards = allFlashcards.filter(card => !seenCardIds.has(card.id));

    return newCards.slice(0, limitCount);
  },
};

// Session management
export const sessionService = {
  // Start a new flashcard session
  async startSession(
    userId: string,
    sessionType: 'review' | 'new' | 'mixed'
  ): Promise<string> {
    const docRef = await addDoc(collection(db, 'flashcardSessions'), {
      userId,
      sessionType,
      cardsReviewed: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      startTime: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // End a flashcard session
  async endSession(sessionId: string, duration: number): Promise<void> {
    const docRef = doc(db, 'flashcardSessions', sessionId);
    await updateDoc(docRef, {
      endTime: serverTimestamp(),
      duration,
    });
  },

  // Update session stats
  async updateSessionStats(
    sessionId: string,
    isCorrect: boolean
  ): Promise<void> {
    const docRef = doc(db, 'flashcardSessions', sessionId);
    const sessionSnap = await getDoc(docRef);

    if (sessionSnap.exists()) {
      const currentSession = sessionSnap.data() as FlashcardSession;
      await updateDoc(docRef, {
        cardsReviewed: currentSession.cardsReviewed + 1,
        correctAnswers: isCorrect
          ? currentSession.correctAnswers + 1
          : currentSession.correctAnswers,
        incorrectAnswers: isCorrect
          ? currentSession.incorrectAnswers
          : currentSession.incorrectAnswers + 1,
      });
    }
  },

  // Get user's session history
  async getUserSessions(
    userId: string,
    limitCount: number = 10
  ): Promise<FlashcardSession[]> {
    const q = query(
      collection(db, 'flashcardSessions'),
      where('userId', '==', userId),
      orderBy('startTime', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FlashcardSession[];
  },
};

// Deck management
export const deckService = {
  // Create a new deck
  async createDeck(
    deck: Omit<FlashcardDeck, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const docRef = await addDoc(collection(db, 'flashcardDecks'), {
      ...deck,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Get all public decks
  async getPublicDecks(): Promise<FlashcardDeck[]> {
    const q = query(
      collection(db, 'flashcardDecks'),
      where('isPublic', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FlashcardDeck[];
  },

  // Get user's decks
  async getUserDecks(userId: string): Promise<FlashcardDeck[]> {
    const q = query(
      collection(db, 'flashcardDecks'),
      where('createdBy', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FlashcardDeck[];
  },

  // Get deck with flashcards
  async getDeckWithCards(
    deckId: string
  ): Promise<{ deck: FlashcardDeck; cards: Flashcard[] } | null> {
    const deckRef = doc(db, 'flashcardDecks', deckId);
    const deckSnap = await getDoc(deckRef);

    if (!deckSnap.exists()) {
      return null;
    }

    const deck = { id: deckSnap.id, ...deckSnap.data() } as FlashcardDeck;

    // Get all flashcards in the deck
    const cards = await Promise.all(
      deck.cardIds.map(cardId => flashcardService.getFlashcard(cardId))
    );

    const validCards = cards.filter(card => card !== null) as Flashcard[];

    return { deck, cards: validCards };
  },
};
