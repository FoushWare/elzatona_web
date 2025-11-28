#!/usr/bin/env node

/**
 * Generate default options for questions that don't have options
 * 
 * This script:
 * 1. Connects to Supabase
 * 2. Finds questions without options
 * 3. Generates 4 default options (A, B, C, D) for each
 * 4. Updates the questions in the database
 * 
 * Usage: node scripts/generate-options-for-questions.mjs [project-id]
 * 
 * If project-id is not provided, uses the main database from .env.local
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Get project ID from command line or use default
const projectId = process.argv[2] || 'hpnewqkvpnthpohvxcmq'; // Default to main database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || `https://${projectId}.supabase.co`;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ Error: Missing SUPABASE_SERVICE_ROLE_KEY');
  console.error('Please set SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Default options structure
const defaultOptions = [
  { id: 'A', text: 'Option A', isCorrect: true, explanation: '' },
  { id: 'B', text: 'Option B', isCorrect: false, explanation: '' },
  { id: 'C', text: 'Option C', isCorrect: false, explanation: '' },
  { id: 'D', text: 'Option D', isCorrect: false, explanation: '' },
];

async function generateOptions() {
  try {
    console.log('🔍 Finding questions without options...\n');

    // Fetch all questions and filter in JavaScript for more reliable results
    const { data: allQuestions, error: fetchError } = await supabase
      .from('questions')
      .select('id, title, type, options, correct_answer');

    if (fetchError) {
      console.error('❌ Error fetching questions:', fetchError);
      process.exit(1);
    }

    if (!allQuestions || allQuestions.length === 0) {
      console.log('⚠️  No questions found in database');
      return;
    }

    // Filter questions without options
    const questionsToUpdate = allQuestions.filter(q => {
      // Only process multiple-choice and code questions
      if (q.type !== 'multiple-choice' && q.type !== 'code') {
        return false;
      }

      // Check if options are missing or empty
      if (!q.options) return true;
      if (q.options === null) return true;
      if (typeof q.options === 'string' && (q.options === 'null' || q.options.trim() === '')) return true;
      if (Array.isArray(q.options) && q.options.length === 0) return true;
      if (typeof q.options === 'object' && Object.keys(q.options).length === 0) return true;
      
      return false;
    });

    const filteredQuestions = questionsToUpdate;

    console.log(`📊 Found ${filteredQuestions.length} questions without options\n`);

    if (filteredQuestions.length === 0) {
      console.log('✅ All questions already have options!');
      return;
    }

    // Show sample
    console.log('📝 Sample questions to update:');
    filteredQuestions.slice(0, 5).forEach((q, i) => {
      console.log(`   ${i + 1}. ${q.title} (${q.type})`);
    });
    if (filteredQuestions.length > 5) {
      console.log(`   ... and ${filteredQuestions.length - 5} more\n`);
    } else {
      console.log();
    }

    // Update questions in batches
    const batchSize = 100;
    let updated = 0;
    let errors = 0;

    console.log('🔄 Updating questions...\n');

    for (let i = 0; i < filteredQuestions.length; i += batchSize) {
      const batch = filteredQuestions.slice(i, i + batchSize);
      
      for (const question of batch) {
        const { error: updateError } = await supabase
          .from('questions')
          .update({
            options: defaultOptions,
            correct_answer: 'Option A',
          })
          .eq('id', question.id);

        if (updateError) {
          console.error(`❌ Error updating question ${question.id}:`, updateError.message);
          errors++;
        } else {
          updated++;
          if (updated % 50 === 0) {
            process.stdout.write(`   Updated ${updated}/${filteredQuestions.length}...\r`);
          }
        }
      }
    }

    console.log(`\n✅ Successfully updated ${updated} questions`);
    if (errors > 0) {
      console.log(`⚠️  ${errors} errors occurred`);
    }

    // Verify the update
    console.log('\n🔍 Verifying update...\n');
    const { count: withOptions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .not('options', 'is', null);

    const { count: withoutOptions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .or('options.is.null,options.eq.null');

    console.log(`📊 Final status:`);
    console.log(`   Questions with options: ${withOptions || 0}`);
    console.log(`   Questions without options: ${withoutOptions || 0}`);

  } catch (error) {
    console.error('❌ Error during options generation:', error);
    process.exit(1);
  }
}

// Run the script
generateOptions();

