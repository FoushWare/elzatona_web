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
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedQuestions =
      (questions as any[])?.map(question => ({
        id: question.id,
        question: question.question_text,
        answer: question.correct_answer,
        explanation: question.explanation,
        topicId: question.topic_id,
        difficulty: question.difficulty,
        type: question.question_type,
        questionType: question.question_type,
        options: question.options ? JSON.parse(question.options) : null,
        correctAnswer: question.correct_answer,
        tags: question.tags ? JSON.parse(question.tags) : null,
        is_active: question.is_active,
        created_at: new Date(question.created_at),
        updated_at: new Date(question.updated_at),
      })) || [];

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
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
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
