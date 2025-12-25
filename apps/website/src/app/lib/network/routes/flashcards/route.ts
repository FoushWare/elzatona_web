import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sanitizeObjectServer,
  sanitizeRichContent,
} from "../../../sanitize-server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
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

// Create a new flashcard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      questionId,
      question,
      answer,
      explanation,
      category,
      difficulty = "medium",
      source = "manual",
      tags = [],
    } = body;

    if (!userId || !questionId || !question || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Sanitize all string inputs
    const sanitizedData = sanitizeObjectServer({
      userId,
      questionId,
      question,
      answer,
      explanation: explanation || "",
      category: category || "General",
      tags: Array.isArray(tags)
        ? tags.map((tag: any) =>
            typeof tag === "string" ? sanitizeObjectServer({ tag }).tag : tag,
          )
        : [],
    });

    // Sanitize rich content fields
    const sanitizedQuestion = sanitizeRichContent(sanitizedData.question);
    const sanitizedAnswer = sanitizeRichContent(sanitizedData.answer);
    const sanitizedExplanation = sanitizedData.explanation
      ? sanitizeRichContent(sanitizedData.explanation)
      : "";

    const now = new Date();
    const nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now

    const flashcard: Omit<Flashcard, "id"> = {
      userId: sanitizedData.userId,
      question_id: sanitizedData.questionId,
      question: sanitizedQuestion,
      answer: sanitizedAnswer,
      explanation: sanitizedExplanation,
      category: sanitizedData.category,
      difficulty,
      status: "new",
      interval: 1, // Start with 1 day
      repetitions: 0,
      easeFactor: 2.5, // SM-2 algorithm default
      lastReviewed: null,
      nextReview: nextReview.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      tags: sanitizedData.tags,
      source,
    };

    const { data: docRef, error } = await supabase
      .from("flashcards")
      .insert(flashcard)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!docRef) {
      throw new Error("No flashcard was created");
    }

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...flashcard,
      },
    });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 },
    );
  }
}

// Get flashcards for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const due = searchParams.get("due") === "true";

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    let q = supabase.from("flashcards").select("*").eq("userId", userId);

    if (status) {
      q = q.eq("status", status);
    }

    if (category) {
      q = q.eq("category", category);
    }

    if (due) {
      const now = new Date().toISOString();
      q = q.lte("nextReview", now);
    }

    q = q.order("nextReview", { ascending: true });

    const { data: flashcards, error } = await q;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: flashcards,
    });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 },
    );
  }
}
