import { NextRequest, NextResponse } from 'next/server';

interface Flashcard {
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: string;
  tags: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { flashcards } = await request.json();

    if (!flashcards || !Array.isArray(flashcards)) {
      return NextResponse.json(
        { error: 'Flashcards array is required' },
        { status: 400 }
      );
    }

    // Validate flashcard structure
    for (const flashcard of flashcards) {
      if (!flashcard.question || !flashcard.answer || !flashcard.category) {
        return NextResponse.json(
          { error: 'Each flashcard must have question, answer, and category' },
          { status: 400 }
        );
      }
    }

    // In a real implementation, you would save these to a database
    // For now, we'll just return success
    console.log(`Adding ${flashcards.length} flashcards to user's collection`);

    return NextResponse.json({
      success: true,
      message: `Successfully added ${flashcards.length} flashcards`,
      flashcardsAdded: flashcards.length,
    });
  } catch (error) {
    console.error('Error adding flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to add flashcards' },
      { status: 500 }
    );
  }
}
