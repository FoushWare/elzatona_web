import { NextRequest, NextResponse } from "next/server";
import { createRepositoryFactoryFromEnv } from "../../../../../../libs/database/src/repositories/RepositoryFactory";
import {
  sanitizeObjectServer,
  sanitizeRichContent,
} from "../../../sanitize-server";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, sectionId } = body;
    if (!question || !answer || !sectionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    // Sanitize inputs
    const sanitizedQuestion = sanitizeRichContent(question);
    const sanitizedAnswer = sanitizeRichContent(answer);
    const factory = createRepositoryFactoryFromEnv();
    const flashcardRepo = factory.getFlashcardRepository();
    const newFlashcard = await flashcardRepo.createFlashcard({
      question: sanitizedQuestion,
      answer: sanitizedAnswer,
      sectionId,
    });
    return NextResponse.json({
      success: true,
      data: newFlashcard,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const factory = createRepositoryFactoryFromEnv();
    const flashcardRepo = factory.getFlashcardRepository();
    const flashcards = await flashcardRepo.getAllFlashcards();
    return NextResponse.json({
      success: true,
      data: flashcards,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 },
    );
  }
}
