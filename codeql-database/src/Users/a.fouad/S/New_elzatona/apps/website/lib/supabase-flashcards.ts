import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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
  interval: number; // days until next review
  repetitions: number;
  easeFactor: number; // SM-2 algorithm
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
  sessionId: string;
  response: "correct" | "incorrect";
  responseTime: number; // milliseconds
  timestamp: string;
}

export interface FlashcardSession {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  cardsReviewed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTime: number; // milliseconds
  status: "active" | "completed" | "abandoned";
}

// Flashcard Service
export const flashcardService = {
  async createFlashcard(
    flashcard: Omit<Flashcard, "id" | "created_at" | "updated_at">,
  ) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("flashcards")
      .insert({
        ...flashcard,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFlashcards(
    userId: string,
    filters?: {
      status?: string;
      category?: string;
      due?: boolean;
    },
  ) {
    let query = supabase.from("flashcards").select("*").eq("userId", userId);

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.category) {
      query = query.eq("category", filters.category);
    }
    if (filters?.due) {
      const now = new Date().toISOString();
      query = query.lte("nextReview", now);
    }

    query = query.order("nextReview", { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async updateFlashcard(id: string, updates: Partial<Flashcard>) {
    const { data, error } = await supabase
      .from("flashcards")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteFlashcard(id: string) {
    const { error } = await supabase.from("flashcards").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  async getFlashcard(id: string) {
    const { data, error } = await supabase
      .from("flashcards")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};

// Progress Service
export const progressService = {
  async recordProgress(progress: Omit<FlashcardProgress, "id" | "timestamp">) {
    const { data, error } = await supabase
      .from("flashcard_progress")
      .insert({
        ...progress,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProgressBySession(sessionId: string) {
    const { data, error } = await supabase
      .from("flashcard_progress")
      .select("*")
      .eq("sessionId", sessionId)
      .order("timestamp", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getCardsDueForReview(userId: string) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("flashcards")
      .select("*")
      .eq("userId", userId)
      .lte("nextReview", now)
      .order("nextReview", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getNewCards(userId: string, limit: number = 20) {
    const { data, error } = await supabase
      .from("flashcards")
      .select("*")
      .eq("userId", userId)
      .eq("status", "new")
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from("flashcard_progress")
      .select("*")
      .eq("userId", userId)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateProgress(
    flashcardId: string,
    response: "correct" | "incorrect",
    responseTime: number,
    sessionId: string,
  ) {
    const { data, error } = await supabase
      .from("flashcard_progress")
      .insert({
        flashcardId,
        userId: "", // This should be passed from the hook
        sessionId,
        response,
        responseTime,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Session Service
export const sessionService = {
  async createSession(
    session: Omit<FlashcardSession, "id" | "startTime" | "endTime" | "status">,
  ) {
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .insert({
        ...session,
        startTime: new Date().toISOString(),
        status: "active",
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSession(id: string, updates: Partial<FlashcardSession>) {
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getActiveSession(userId: string) {
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .select("*")
      .eq("userId", userId)
      .eq("status", "active")
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  async startSession(userId: string, _type: string) {
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .insert({
        userId,
        startTime: new Date().toISOString(),
        cardsReviewed: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalTime: 0,
        status: "active",
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  async endSession(sessionId: string, duration: number) {
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .update({
        endTime: new Date().toISOString(),
        totalTime: duration,
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSessionStats(sessionId: string, isCorrect: boolean) {
    // First, get the current session data
    const { data: currentSession, error: fetchError } = await supabase
      .from("flashcard_sessions")
      .select("cardsReviewed, correctAnswers, incorrectAnswers")
      .eq("id", sessionId)
      .single();

    if (fetchError || !currentSession) {
      throw new Error("Session not found");
    }

    // Update with incremented values
    const { data, error } = await supabase
      .from("flashcard_sessions")
      .update({
        cardsReviewed: currentSession.cardsReviewed + 1,
        correctAnswers: isCorrect
          ? currentSession.correctAnswers + 1
          : currentSession.correctAnswers,
        incorrectAnswers: isCorrect
          ? currentSession.incorrectAnswers
          : currentSession.incorrectAnswers + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
