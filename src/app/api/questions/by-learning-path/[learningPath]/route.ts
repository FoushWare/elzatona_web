import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface Question {
  id: string;
  order?: number;
  [key: string]: unknown; // Allow additional properties from Supabase
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ learningPath: string }> }
) {
  try {
    const { learningPath } = await params;

    if (!learningPath) {
      return NextResponse.json(
        { error: 'Learning path is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching questions for learning path: ${learningPath}`);

    // Query questions from Supabase
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('learningPath', learningPath)
      .order('order', { ascending: true });

    if (questionsError) {
      throw questionsError;
    }

    const questions: Question[] = (questionsData || []).map(doc => ({
      id: doc.id,
      ...doc,
    }));

    console.log(`Found ${questions.length} questions for ${learningPath}`);

    return NextResponse.json({
      success: true,
      learningPath,
      questions,
      count: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch questions from Supabase',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
