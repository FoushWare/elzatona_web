import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const PLAN_QUESTIONS_COLLECTION = 'planQuestions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');
    const cardId = searchParams.get('cardId');

    if (!planId) {
      return NextResponse.json(
        { success: false, error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('plan_questions')
      .select('*')
      .eq('plan_id', planId);

    if (cardId) {
      query = query.eq('card_id', cardId);
    }

    query = query.order('order', { ascending: true });

    const { data: snapshot, error } = await query;

    if (error) {
      throw error;
    }

    const planQuestions = snapshot.map(doc => ({
      id: doc.id,
      ...doc,
      created_at: doc.created_at || new Date(),
      updated_at: doc.updated_at || new Date(),
    }));

    return NextResponse.json({
      success: true,
      data: planQuestions,
    });
  } catch (error) {
    console.error('Error fetching plan questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, questionId, cardId, sectionId, topicId, order } = body;

    if (!planId || !questionId || !cardId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Plan ID, Question ID, and Card ID are required',
        },
        { status: 400 }
      );
    }

    // Check if question is already assigned to this plan
    const { data: existingSnapshot, error: existingError } = await supabase
      .from(PLAN_QUESTIONS_COLLECTION)
      .select()
      .eq('plan_id', planId)
      .eq('question_id', questionId);

    if (existingError) {
      throw existingError;
    }

    if (existingSnapshot && existingSnapshot.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Question is already assigned to this plan' },
        { status: 400 }
      );
    }

    const planQuestionData = {
      planId,
      questionId,
      cardId,
      sectionId: sectionId || null,
      topicId: topicId || null,
      order: order || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newPlanQuestion, error } = await supabase
      .from(PLAN_QUESTIONS_COLLECTION)
      .insert(planQuestionData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: newPlanQuestion,
    });
  } catch (error) {
    console.error('Error creating plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create plan question' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Plan question ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from(PLAN_QUESTIONS_COLLECTION)
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Plan question updated successfully',
    });
  } catch (error) {
    console.error('Error updating plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan question' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Plan question ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from(PLAN_QUESTIONS_COLLECTION)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Plan question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete plan question' },
      { status: 500 }
    );
  }
}
