import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Get a specific flashcard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { data: flashcardSnap, error } = await supabase
      .from("flashcards")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !flashcardSnap) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: flashcardSnap.id,
        ...flashcardSnap,
      },
    });
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcard" },
      { status: 500 },
    );
  }
}

// Update flashcard (for review results)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { quality, reviewResult } = await request.json();

    // Check if flashcard exists
    const { data: flashcardSnap, error: fetchError } = await supabase
      .from("flashcards")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !flashcardSnap) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 },
      );
    }

    const flashcard = flashcardSnap;
    const now = new Date();

    // SM-2 Algorithm implementation
    let newInterval = flashcard.interval;
    let newRepetitions = flashcard.repetitions;
    let newEaseFactor = flashcard.easeFactor;
    let newStatus = flashcard.status;

    if (quality >= 3) {
      // Correct response
      if (newRepetitions === 0) {
        newInterval = 1;
      } else if (newRepetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(newInterval * newEaseFactor);
      }

      newRepetitions += 1;
      newEaseFactor = Math.max(
        1.3,
        newEaseFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
      );

      if (newRepetitions >= 3) {
        newStatus = "mastered";
      } else if (newRepetitions >= 1) {
        newStatus = "learning";
      }
    } else {
      // Incorrect response
      newRepetitions = 0;
      newInterval = 1;
      newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
      newStatus = "new";
    }

    const nextReview = new Date(
      now.getTime() + newInterval * 24 * 60 * 60 * 1000,
    );

    const updates = {
      status: newStatus,
      interval: newInterval,
      repetitions: newRepetitions,
      easeFactor: newEaseFactor,
      lastReviewed: now.toISOString(),
      nextReview: nextReview.toISOString(),
      updated_at: now.toISOString(),
    };

    const { error: updateError } = await supabase
      .from("flashcards")
      .update(updates)
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        ...updates,
        reviewResult: {
          quality,
          newInterval,
          newRepetitions,
          newEaseFactor,
          newStatus,
        },
      },
    });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 },
    );
  }
}

// Delete a flashcard
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if flashcard exists
    const { data: flashcardSnap, error: fetchError } = await supabase
      .from("flashcards")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !flashcardSnap) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 },
      );
    }

    // Delete the flashcard
    const { error: deleteError } = await supabase
      .from("flashcards")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: "Flashcard deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 },
    );
  }
}
