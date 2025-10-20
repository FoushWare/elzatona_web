import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { LearningCard } from '@/types/learning-cards';

// GET /api/admin/learning-cards - Get all learning cards
export async function GET() {
  try {
    const { data: snapshot, error } = await supabase
      .from('learning_cards')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw error;
    }

    const cards: LearningCard[] = snapshot.map(doc => ({
      id: doc.id,
      title: doc.title,
      type: doc.type,
      description: doc.description,
      color: doc.color,
      icon: doc.icon,
      order: doc.order,
      sections: doc.sections || [],
      topics: doc.topics || [],
      question_count: doc.question_count || 0,
      is_active: doc.is_active || true,
      metadata: doc.metadata || {},
      created_at: doc.created_at || new Date(),
      updated_at: doc.updated_at || new Date(),
    }));

    // Sort by order
    cards.sort((a, b) => a.order - b.order);

    return NextResponse.json({
      success: true,
      data: cards,
    });
  } catch (error) {
    console.error('Error fetching learning cards:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning cards',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/learning-cards - Create a new learning card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      type,
      description,
      color,
      icon,
      order,
      sections,
      topics,
      questionCount,
    } = body;

    if (!title || !type || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, type, and description are required',
        },
        { status: 400 }
      );
    }

    const { data: newCard, error } = await supabase
      .from('learning_cards')
      .insert({
        title,
        type,
        description,
        color,
        icon,
        order: order || 0,
        sections: sections || [],
        topics: topics || [],
        question_count: questionCount || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: newCard.id,
        title,
        type,
        description,
        color,
        icon,
        order: order || 0,
        sections: sections || [],
        topics: topics || [],
        question_count: questionCount || 0,
      },
    });
  } catch (error) {
    console.error('Error creating learning card:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create learning card',
      },
      { status: 500 }
    );
  }
}
