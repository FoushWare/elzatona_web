#!/usr/bin/env node

/**
 * Test Supabase API Connection
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🧪 Testing Supabase API Connection...\n');

async function testConnection() {
  try {
    // Test learning cards
    console.log('🃏 Testing learning cards...');
    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('*')
      .limit(3);

    if (cardsError) {
      console.log(`❌ Cards error: ${cardsError.message}`);
    } else {
      console.log(`✅ Cards: Found ${cards?.length || 0} cards`);
      if (cards && cards.length > 0) {
        console.log(`   Sample: ${cards[0].title} (${cards[0].type})`);
      }
    }

    // Test categories
    console.log('\n📁 Testing categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(3);

    if (categoriesError) {
      console.log(`❌ Categories error: ${categoriesError.message}`);
    } else {
      console.log(`✅ Categories: Found ${categories?.length || 0} categories`);
      if (categories && categories.length > 0) {
        console.log(`   Sample: ${categories[0].name}`);
      }
    }

    // Test topics
    console.log('\n📝 Testing topics...');
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .limit(3);

    if (topicsError) {
      console.log(`❌ Topics error: ${topicsError.message}`);
    } else {
      console.log(`✅ Topics: Found ${topics?.length || 0} topics`);
      if (topics && topics.length > 0) {
        console.log(`   Sample: ${topics[0].name}`);
      }
    }

    // Test questions
    console.log('\n❓ Testing questions...');
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(3);

    if (questionsError) {
      console.log(`❌ Questions error: ${questionsError.message}`);
    } else {
      console.log(`✅ Questions: Found ${questions?.length || 0} questions`);
      if (questions && questions.length > 0) {
        console.log(`   Sample: ${questions[0].question_text}`);
      }
    }

    console.log('\n🎉 Supabase connection test completed!');
  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
  }
}

testConnection();
