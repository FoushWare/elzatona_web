import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface CustomPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  topics: string[];
  learningPaths: string[];
  question_count: number;
  isPublic: boolean;
  isTemplate: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  tags: string[];
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
}

// Create a new custom plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      name,
      description,
      duration,
      difficulty,
      categories,
      topics,
      learningPaths,
      isPublic = false,
      isTemplate = false,
      tags = [],
      prerequisites = [],
      learningObjectives = [],
    } = body;

    if (!userId || !name || !description || !duration || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate estimated time based on duration and difficulty
    const baseTimePerDay = 60; // 60 minutes base
    const difficultyMultiplier = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.2,
    };
    const estimatedTime = Math.round(
      duration *
        baseTimePerDay *
        difficultyMultiplier[difficulty as keyof typeof difficultyMultiplier]
    );

    const customPlan: Omit<CustomPlan, 'id'> = {
      userId,
      name,
      description,
      duration,
      difficulty,
      categories: categories || [],
      topics: topics || [],
      learningPaths: learningPaths || [],
      question_count: 0, // Will be calculated when questions are added
      isPublic,
      isTemplate,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      createdBy: userId,
      tags,
      estimatedTime,
      prerequisites,
      learningObjectives,
    };

    const { data: docRef, error } = await supabase
      .from('custom_plans')
      .insert(customPlan)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!docRef) {
      throw new Error('No custom plan was created');
    }

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...customPlan,
      },
    });
  } catch (error) {
    console.error('Error creating custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to create custom plan' },
      { status: 500 }
    );
  }
}

// Get custom plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isPublic = searchParams.get('isPublic') === 'true';
    const isTemplate = searchParams.get('isTemplate') === 'true';
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    let q = supabase.from('custom_plans').select('*');

    if (userId) {
      q = q.eq('userId', userId);
    }

    if (isPublic) {
      q = q.eq('isPublic', true);
    }

    if (isTemplate) {
      q = q.eq('isTemplate', true);
    }

    if (category) {
      q = q.contains('categories', [category]);
    }

    if (difficulty) {
      q = q.eq('difficulty', difficulty);
    }

    q = q.order('created_at', { ascending: false });

    const { data: customPlans, error } = await q;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: customPlans,
    });
  } catch (error) {
    console.error('Error fetching custom plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom plans' },
      { status: 500 }
    );
  }
}
