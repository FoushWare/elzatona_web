import { NextRequest, NextResponse } from 'next/server';
import { supabaseOperations } from '@/lib/supabase-server';

// GET /api/questions - Get all questions with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardType = searchParams.get('cardType');
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    const filters = {
      topicId: topic || undefined,
      difficulty: difficulty || undefined,
      questionType: type || undefined,
      is_active: true,
      limit: limit ? parseInt(limit, 10) : undefined,
      orderBy: 'created_at',
      orderDirection: 'desc' as const,
    };

    const { data: questions, error } =
      await supabaseOperations.getQuestions(filters);

    if (error) {
      console.error('Supabase error fetching questions:', error);
      throw new Error(
        error.message || 'Failed to fetch questions from database'
      );
    }

    // Handle null or undefined questions
    if (!questions) {
      console.warn('No questions returned from database');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // Transform data to match expected format
    const transformedQuestions =
      (questions as any[])
        ?.map(question => {
          try {
            // Try multiple possible field names for question text
            const questionText =
              question.question_text ||
              question.question ||
              question.title ||
              question.content ||
              question.text ||
              '';

            if (!questionText) {
              console.warn('Question missing text field:', {
                id: question.id,
                availableFields: Object.keys(question),
              });
            }

            return {
              id: question.id,
              question: questionText,
              question_text: questionText, // Also include raw field for backward compatibility
              answer: question.correct_answer,
              explanation: question.explanation || '',
              topicId: question.topic_id,
              categoryId: question.category_id,
              difficulty: question.difficulty,
              type: question.question_type,
              questionType: question.question_type,
              options: question.options
                ? typeof question.options === 'string'
                  ? JSON.parse(question.options)
                  : question.options
                : null,
              correctAnswer: question.correct_answer,
              tags: question.tags
                ? typeof question.tags === 'string'
                  ? JSON.parse(question.tags)
                  : question.tags
                : [],
              is_active: question.is_active,
              created_at: question.created_at
                ? new Date(question.created_at)
                : new Date(),
              updated_at: question.updated_at
                ? new Date(question.updated_at)
                : new Date(),
            };
          } catch (parseError) {
            console.error('Error parsing question:', question.id, parseError);
            return null;
          }
        })
        .filter(q => q !== null && q.question) || []; // Filter out questions without text

    // Apply additional filters that aren't handled by Supabase
    let filteredQuestions = transformedQuestions;

    if (cardType && cardType !== 'all') {
      // This would need to be handled by joining with learning_cards table
      // For now, we'll skip this filter
    }
    if (category && category !== 'all') {
      // This would need to be handled by joining with topics and categories
      // For now, we'll skip this filter
    }

    return NextResponse.json({
      success: true,
      data: filteredQuestions,
      count: filteredQuestions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch questions';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/questions - Create a new question
export async function POST(request: NextRequest) {
  try {
    const questionData = await request.json();

    // Transform data to match Supabase schema
    const supabaseQuestionData = {
      question_text: questionData.question,
      explanation: questionData.explanation || '',
      topic_id: questionData.topicId || undefined,
      difficulty: questionData.difficulty || 'easy',
      question_type:
        questionData.type || questionData.questionType || 'multiple_choice',
      options: questionData.options
        ? JSON.stringify(questionData.options)
        : undefined,
      correct_answer:
        questionData.answer || questionData.correctAnswer || undefined,
      tags: questionData.tags ? JSON.stringify(questionData.tags) : undefined,
      is_active: questionData.isActive !== false,
    };

    const { data: newQuestion, error } =
      await supabaseOperations.createQuestion(supabaseQuestionData);

    if (error) {
      throw new Error(error.message);
    }

    // Transform response to match expected format
    const transformedQuestion = {
      id: (newQuestion as any).id,
      question: (newQuestion as any).question_text,
      answer: (newQuestion as any).correct_answer,
      explanation: (newQuestion as any).explanation,
      topicId: (newQuestion as any).topic_id,
      difficulty: (newQuestion as any).difficulty,
      type: (newQuestion as any).question_type,
      questionType: (newQuestion as any).question_type,
      options: (newQuestion as any).options
        ? JSON.parse((newQuestion as any).options)
        : null,
      correctAnswer: (newQuestion as any).correct_answer,
      tags: (newQuestion as any).tags
        ? JSON.parse((newQuestion as any).tags)
        : null,
      is_active: (newQuestion as any).is_active,
      created_at: new Date((newQuestion as any).created_at),
      updated_at: new Date((newQuestion as any).updated_at),
    };

    return NextResponse.json({
      success: true,
      data: transformedQuestion,
      message: 'Question created successfully',
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
