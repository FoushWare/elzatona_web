"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Bookmark, BookmarkCheck } from "lucide-react";

// Note: This import path assumes this component is used in apps/website
// For proper architecture, flashcardService should be injected or moved to shared location
import { flashcardService } from "../../../../../apps/website/src/app/lib/supabase-flashcards";
import { useAuth } from "@elzatona/contexts";

interface Flashcard {
  id: string;
  question: string;
  [key: string]: unknown;
}

interface AddToFlashcardProps {
  readonly question: string;
  readonly answer: string;
  readonly category: string;
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly source?: string;
  readonly onStatusChange?: (status: "added" | "removed" | "error") => void;
  readonly className?: string;
}

type FlashcardState = "add" | "saved" | "loading";

export default function AddToFlashcard({
  question,
  answer,
  category,
  difficulty,
  source,
  onStatusChange,
  className = "",
}: AddToFlashcardProps) {
  const { user } = useAuth();
  const [state, setState] = useState<FlashcardState>("add");
  const [flashcardId, setFlashcardId] = useState<string | null>(null);

  const checkExistingFlashcard = useCallback(async () => {
    if (!user) return;

    try {
      // Get all flashcards for the user and check if one matches the question
      const flashcards = await flashcardService.getFlashcards(user.id);
      const existingCard = flashcards?.find(
        (card: Flashcard) => card.question === question,
      );

      if (existingCard) {
        setState("saved");
        setFlashcardId(existingCard.id);
      }
    } catch (error) {
      console.error("Error checking existing flashcard:", error);
    }
  }, [user, question]);

  // Check if flashcard already exists when component mounts or question changes
  useEffect(() => {
    // Reset state when question changes
    setState("add");
    setFlashcardId(null);

    if (user) {
      checkExistingFlashcard();
    }
  }, [user, question, checkExistingFlashcard]);

  const handleToggleFlashcard = async () => {
    if (!user) {
      onStatusChange?.("error");
      return;
    }

    if (state === "loading") return;

    setState("loading");

    try {
      if (state === "add") {
        // Add to flashcards
        const now = new Date().toISOString();
        const flashcard = {
          userId: user.id,
          question_id: `manual-${Date.now()}`,
          question,
          answer,
          explanation: answer,
          category,
          difficulty:
            difficulty === "beginner"
              ? "easy"
              : difficulty === "intermediate"
                ? "medium"
                : ("hard" as "easy" | "medium" | "hard"),
          status: "new" as "new" | "learning" | "review" | "mastered",
          interval: 0,
          repetitions: 0,
          easeFactor: 2.5,
          lastReviewed: null,
          nextReview: now,
          tags: [],
          source: (source || "manual") as
            | "wrong_answer"
            | "manual"
            | "bookmark",
        };

        const newFlashcardId =
          await flashcardService.createFlashcard(flashcard);

        if (newFlashcardId) {
          setState("saved");
          setFlashcardId(newFlashcardId);
          onStatusChange?.("added");
        } else {
          setState("add");
          onStatusChange?.("error");
        }
      } else if (state === "saved" && flashcardId) {
        // Remove from flashcards
        await flashcardService.deleteFlashcard(flashcardId);

        setState("add");
        setFlashcardId(null);
        onStatusChange?.("removed");
      }
    } catch (error) {
      console.error("Error toggling flashcard:", error);
      setState(state === "add" ? "saved" : "add");
      onStatusChange?.("error");
    }
  };

  const getIcon = () => {
    switch (state) {
      case "add":
        return <Bookmark className="w-6 h-6" />;
      case "saved":
        return <BookmarkCheck className="w-6 h-6" />;
      case "loading":
        return (
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        );
      default:
        return <Bookmark className="w-6 h-6" />;
    }
  };

  const getTooltip = () => {
    switch (state) {
      case "add":
        return "Click to bookmark this question";
      case "saved":
        return "Remove bookmark";
      case "loading":
        return "Processing...";
      default:
        return "Click to bookmark this question";
    }
  };

  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (state) {
      case "add":
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-300 focus:ring-gray-500 hover:shadow-sm`;
      case "saved":
        return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-md`;
      case "loading":
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
      disabled={state === "loading"}
      className={`${getButtonClasses()} ${className}`}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
}
