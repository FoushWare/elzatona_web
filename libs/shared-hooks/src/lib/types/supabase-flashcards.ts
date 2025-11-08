// Type definitions for supabase-flashcards service
// These types are used by shared-hooks but the service is app-specific

export interface Flashcard {
  id: string;
  userId: string;
  question_id: string;
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'new' | 'learning' | 'review' | 'mastered';
  interval: number;
  repetitions: number;
  easeFactor: number;
  lastReviewed: string | null;
  nextReview: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  source: 'wrong_answer' | 'manual' | 'bookmark';
}

export interface FlashcardProgress {
  id: string;
  flashcardId: string;
  userId: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface FlashcardSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  cardsReviewed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  status: 'active' | 'completed' | 'abandoned';
}

export const flashcardService = {
  async getFlashcard(id: string): Promise<Flashcard | null> {
    return null;
  },
};

export const progressService = {
  async getCardsDueForReview(userId: string): Promise<FlashcardProgress[]> {
    return [];
  },
  async getNewCards(userId: string, maxCards: number): Promise<Flashcard[]> {
    return [];
  },
};

export const sessionService = {
  async createSession(
    session: Omit<FlashcardSession, 'id'>
  ): Promise<FlashcardSession> {
    throw new Error('Not implemented');
  },
  async updateSession(
    id: string,
    updates: Partial<FlashcardSession>
  ): Promise<FlashcardSession> {
    throw new Error('Not implemented');
  },
};
