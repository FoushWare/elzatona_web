#!/usr/bin/env ts-node

/**
 * Clear Questions Utility
 * This utility clears all questions from the database
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function clearQuestions(): Promise<void> {
  try {
    console.log('🗑️  Clearing all questions...');

    const { error } = await supabase.from('questions').delete().neq('id', 0); // Delete all records

    if (error) {
      throw error;
    }

    console.log('✅ All questions cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  clearQuestions()
    .then(() => {
      console.log('🎉 Questions clearing completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Questions clearing failed:', error);
      process.exit(1);
    });
}
