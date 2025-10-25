#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log(
  '🌱 Seeding plan_questions data to associate questions with plans\n'
);

// Supabase configuration
const supabaseUrl = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function seedPlanQuestions() {
  try {
    console.log('🔍 Step 1: Getting plans...');
    const { data: plans, error: plansError } = await supabase
      .from('learning_plans')
      .select('*')
      .order('created_at');

    if (plansError) throw plansError;
    console.log(`✅ Found ${plans.length} plans`);

    console.log('🔍 Step 2: Getting questions...');
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(50); // Limit to first 50 questions for testing

    if (questionsError) throw questionsError;
    console.log(`✅ Found ${questions.length} questions`);

    console.log('🔍 Step 3: Getting topics...');
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('*');

    if (topicsError) throw topicsError;
    console.log(`✅ Found ${topics.length} topics`);

    // Create plan_questions associations
    console.log('🔍 Step 4: Creating plan_questions associations...');

    const planQuestionsToInsert = [];

    // For each plan, associate some questions
    plans.forEach(plan => {
      // Take first 10 questions for each plan
      const questionsForPlan = questions.slice(0, 10);

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

    console.log(
      `📝 Inserting ${planQuestionsToInsert.length} plan_questions associations...`
    );

    const { data: insertedData, error: insertError } = await supabase
      .from('plan_questions')
      .insert(planQuestionsToInsert)
      .select();

    if (insertError) {
      console.error('❌ Error inserting plan_questions:', insertError);
      return;
    }

    console.log(
      `✅ Successfully inserted ${insertedData.length} plan_questions associations`
    );

    // Verify the data
    console.log('🔍 Step 5: Verifying data...');
    const { data: planQuestions, error: verifyError } = await supabase
      .from('plan_questions')
      .select('*')
      .eq('plan_id', 'b0c508f5-8279-4bb4-be74-ad0a65f2dd95');

    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError);
      return;
    }

    console.log(
      `✅ Found ${planQuestions.length} questions for plan b0c508f5-8279-4bb4-be74-ad0a65f2dd95`
    );

    console.log('\n🎉 Seeding completed successfully!');
    console.log(
      'Now try visiting: http://localhost:3000/features/guided-learning/b0c508f5-8279-4bb4-be74-ad0a65f2dd95'
    );
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

seedPlanQuestions();
