import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  try {
    const missingPlans = [
      {
        id: '4-day-plan',
        name: '4 Day Plan',
        duration: 4,
        description: 'Extended preparation with advanced topics',
        difficulty: 'Intermediate',
        totalQuestions: 250,
        dailyQuestions: 63,
        sections: [
          { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
          { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
          { id: 'react', name: 'React', questions: [], weight: 25 },
          { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 },
        ],
        features: [
          'Advanced concepts',
          'Daily practice',
          'TypeScript mastery',
          'React patterns',
        ],
        estimatedTime: '5-6 hours',
        isRecommended: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5-day-plan',
        name: '5 Day Plan',
        duration: 5,
        description: 'Comprehensive preparation with full coverage',
        difficulty: 'Intermediate',
        totalQuestions: 300,
        dailyQuestions: 60,
        sections: [
          { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 15 },
          { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
          { id: 'react', name: 'React', questions: [], weight: 25 },
          { id: 'typescript', name: 'TypeScript', questions: [], weight: 15 },
          { id: 'testing', name: 'Testing', questions: [], weight: 10 },
        ],
        features: [
          'Complete coverage',
          'Testing fundamentals',
          'Advanced patterns',
          'Performance optimization',
        ],
        estimatedTime: '6-7 hours',
        isRecommended: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6-day-plan',
        name: '6 Day Plan',
        duration: 6,
        description: 'Master-level preparation with expert topics',
        difficulty: 'Advanced',
        totalQuestions: 350,
        dailyQuestions: 58,
        sections: [
          { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 15 },
          { id: 'javascript', name: 'JavaScript', questions: [], weight: 30 },
          { id: 'react', name: 'React', questions: [], weight: 25 },
          { id: 'typescript', name: 'TypeScript', questions: [], weight: 15 },
          { id: 'testing', name: 'Testing', questions: [], weight: 10 },
          { id: 'performance', name: 'Performance', questions: [], weight: 5 },
        ],
        features: [
          'Expert-level topics',
          'Performance mastery',
          'Advanced testing',
          'System design basics',
        ],
        estimatedTime: '7-8 hours',
        isRecommended: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    console.log('Creating missing learning plans...');

    for (const plan of missingPlans) {
      const { error } = await supabase.from('learning_plans').insert(plan);

      if (error) {
        console.error(`❌ Error creating ${plan.name}:`, error);
        continue;
      }

      console.log(`✅ Created ${plan.name}`);
    }

    return NextResponse.json({
      success: true,
      message: 'All missing plans created successfully!',
      plans: missingPlans.map(p => p.name),
    });
  } catch (error) {
    console.error('❌ Error creating plans:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create plans',
      },
      { status: 500 }
    );
  }
}
