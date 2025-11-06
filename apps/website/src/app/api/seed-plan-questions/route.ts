import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://hpnewqkvpnthpohvxcmq.supabase.co';
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    console.log('🌱 Seeding plan_questions data...');

    // Get plans
    const { data: plans, error: plansError } = await supabase
      .from('learning_plans')
      .select('*')
      .limit(7);

    if (plansError) throw plansError;

    // Get questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(20);

    if (questionsError) throw questionsError;

    // Get topics
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('*');

    if (topicsError) throw topicsError;

    // Create plan_questions associations
    const planQuestionsToInsert: any[] = [];

    plans.forEach(plan => {
      // Associate first 5 questions with each plan
      const questionsForPlan = questions.slice(0, 5);

      questionsForPlan.forEach(question => {
        // Find a topic for this question
        const topic =
          topics.find(t => t.category_id === question.category_id) || topics[0];

        planQuestionsToInsert.push({
          plan_id: plan.id,
          question_id: question.id,
          topic_id: topic.id,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      });
    });

    // Insert plan_questions
    const { data: insertedData, error: insertError } = await supabase
      .from('plan_questions')
      .insert(planQuestionsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting plan_questions:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to insert plan_questions',
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    console.log(
      `✅ Successfully inserted ${insertedData.length} plan_questions associations`
    );

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedData.length} plan_questions associations`,
      data: {
        plansCount: plans.length,
        questionsCount: questions.length,
        topicsCount: topics.length,
        planQuestionsInserted: insertedData.length,
      },
    });
  } catch (error) {
    console.error('Error seeding plan_questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed plan_questions',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
