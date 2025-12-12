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
  difficulty: "easy" | "medium" | "hard";
  status: "new" | "learning" | "review" | "mastered";
  interval: number;
  repetitions: number;
  easeFactor: number;
  lastReviewed: string | null;
  nextReview: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  source: "wrong_answer" | "manual" | "bookmark";
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
  status: "active" | "completed" | "abandoned";
}

export const flashcardService = {
  async getFlashcard(_id: string): Promise<Flashcard | null> {
    return null;
  },
};

export const progressService = {
  async getCardsDueForReview(_userId: string): Promise<FlashcardProgress[]> {
    return [];
  },
  async getNewCards(_userId: string, _maxCards: number): Promise<Flashcard[]> {
    return [];
  },
  async getUserProgress(_userId: string): Promise<FlashcardProgress[]> {
    return [];
  },
  async updateProgress(
    _flashcardId: string,
    _result: "correct" | "incorrect",
    _responseTime: number,
    _sessionId: string,
  ): Promise<void> {
    throw new Error("Not implemented");
  },
};

export const sessionService = {
  async createSession(
    _session: Omit<FlashcardSession, "id">,
  ): Promise<FlashcardSession> {
    throw new Error("Not implemented");
  },
  async startSession(_userId: string, _type: string): Promise<string> {
    throw new Error("Not implemented");
  },
  async endSession(_sessionId: string, _duration: number): Promise<void> {
    throw new Error("Not implemented");
  },
  async updateSessionStats(
    _sessionId: string,
    _isCorrect: boolean,
  ): Promise<void> {
    throw new Error("Not implemented");
  },
  async updateSession(
    _id: string,
    _updates: Partial<FlashcardSession>,
  ): Promise<FlashcardSession> {
    throw new Error("Not implemented");
  },
};
