// v1.0 - Fixed comprehensive seeding script with proper field handling
// Run with: npx tsx src/scripts/seed-all-remaining-fixed.ts

import { initializeApp } from 'firebase/app';

import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase

const db = getFirestore(app);

// ==========================================
// Helper Functions
// ==========================================

function sanitizeField(value: any): string {
  if (value === undefined || value === null) {
    return 'No answer provided';
  }
  if (typeof value === 'string') {
    return value.trim() || 'No answer provided';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

function extractQuestionText(item: any): string {
  return sanitizeField(
    item.question ||
      item.title ||
      item.problem ||
      item.text ||
      item.description ||
      'Question text not available'
  );
}

function extractAnswerText(item: any): string {
  return sanitizeField(
    item.answer ||
      item.solution ||
      item.explanation ||
      item.description ||
      item.content ||
      'Answer not provided'
  );
}

function extractTags(item: any, category: string): string[] {
  const tags = item.tags || item.keywords || [];
  if (Array.isArray(tags)) {
    return [...tags, category.toLowerCase()];
  }
  return [category.toLowerCase()];
}

// ==========================================
// Seeding Functions
// ==========================================

async function seedQuestionsFromJSON(
  category: string,
  jsonFilePath: string,
  topic?: string
) {
  console.log(`🌱 Seeding ${category} questions from ${jsonFilePath}...`);

  try {
    const fullPath = path.join(process.cwd(), jsonFilePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${jsonFilePath}`);
      return { successCount: 0, skipCount: 0, errorCount: 0 };
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      console.log(`⚠️  Invalid JSON format in ${jsonFilePath}`);
      return { successCount: 0, skipCount: 0, errorCount: 0 };
    }

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const question of questions) {
      try {
        const questionText = extractQuestionText(question);
        const answerText = extractAnswerText(question);

        // Check if question already exists
        const existingQuery = query(
          supabase.from('questions'),
          where('question', questionText)
        );
        const existingSnapshot = await getDocs(existingQuery);

        if (existingSnapshot.length === 0) {
          const questionData = {
            id: `${category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            question: questionText,
            answer: answerText,
            category: category,
            topic: topic || question.topic || 'General',
            difficulty: question.difficulty || 'medium',
            tags: extractTags(question, category),
            type: question.type || 'conceptual',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            createdBy: 'seeding-script',
            updatedBy: 'seeding-script',
          };

          await addDoc(supabase.from('questions'), questionData);
          successCount++;
        } else {
          skipCount++;
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Error processing question:`, error);
      }
    }

    console.log(`✅ ${category} seeding completed!`);
    console.log(`   - Successfully added: ${successCount}`);
    console.log(`   - Skipped (already exist): ${skipCount}`);
    console.log(`   - Errors: ${errorCount}`);

    return { successCount, skipCount, errorCount };
  } catch (error) {
    console.error(`❌ Error reading ${jsonFilePath}:`, error);
    return { successCount: 0, skipCount: 0, errorCount: 1 };
  }
}

async function seedAllRemainingQuestions() {
  console.log(
    '🚀 Starting comprehensive seeding of all remaining question types...'
  );

  const results = {
    'Design Patterns': { success: 0, skip: 0, error: 0 },
    'Performance Patterns': { success: 0, skip: 0, error: 0 },
    'Rendering Patterns': { success: 0, skip: 0, error: 0 },
    Security: { success: 0, skip: 0, error: 0 },
  };

  // Seed Design Patterns
  const designPatternFiles = [
    'data/json/design-patterns/singleton-pattern.json',
    'data/json/design-patterns/factory-pattern.json',
    'data/json/design-patterns/observer-pattern.json',
    'data/json/design-patterns/module-pattern.json',
    'data/json/design-patterns/mixin-pattern.json',
    'data/json/design-patterns/prototype-pattern.json',
    'data/json/design-patterns/proxy-pattern.json',
    'data/json/design-patterns/mediator-pattern.json',
    'data/json/design-patterns/flyweight-pattern.json',
    'data/json/design-patterns/provider-pattern.json',
    'data/json/design-patterns/static-import.json',
    'data/json/design-patterns/common-pattern.json',
  ];

  for (const file of designPatternFiles) {
    const result = await seedQuestionsFromJSON('Design Patterns', file);
    results['Design Patterns'].success += result.successCount;
    results['Design Patterns'].skip += result.skipCount;
    results['Design Patterns'].error += result.errorCount;
  }

  // Seed Performance Patterns
  const performancePatternFiles = [
    'data/json/performance-patterns/bundle-splitting.json',
    'data/json/performance-patterns/dynamic-import.json',
    'data/json/performance-patterns/tree-shaking.json',
    'data/json/performance-patterns/compression.json',
    'data/json/performance-patterns/prefetch.json',
    'data/json/performance-patterns/pre-load.json',
    'data/json/performance-patterns/loading-sequence.json',
    'data/json/performance-patterns/import-on-interaction.json',
    'data/json/performance-patterns/import-on-visibility.json',
    'data/json/performance-patterns/virtualization.json',
    'data/json/performance-patterns/third-party.json',
    'data/json/performance-patterns/prpl.json',
    'data/json/performance-patterns/performance-1.json',
  ];

  for (const file of performancePatternFiles) {
    const result = await seedQuestionsFromJSON('Performance Patterns', file);
    results['Performance Patterns'].success += result.successCount;
    results['Performance Patterns'].skip += result.skipCount;
    results['Performance Patterns'].error += result.errorCount;
  }

  // Seed Rendering Patterns
  const renderingPatternFiles = [
    'data/json/rendering-patterns/island-archeticure.json',
    'data/json/rendering-patterns/render-6.json',
    'data/json/rendering-patterns/render-7.json',
    'data/json/rendering-patterns/rendering-10.json',
    'data/json/rendering-patterns/rendering-2.json',
    'data/json/rendering-patterns/rendering-4.json',
    'data/json/rendering-patterns/rendering-5.json',
    'data/json/rendering-patterns/rendering-8.json',
    'data/json/rendering-patterns/rendering-9.json',
    'data/json/rendering-patterns/rendering.json',
  ];

  for (const file of renderingPatternFiles) {
    const result = await seedQuestionsFromJSON('Rendering Patterns', file);
    results['Rendering Patterns'].success += result.successCount;
    results['Rendering Patterns'].skip += result.skipCount;
    results['Rendering Patterns'].error += result.errorCount;
  }

  // Seed Security Questions
  const securityFiles = [
    'data/json/security/sec-01.json',
    'data/json/security/sec-02.json',
    'data/json/security/sec-03.json',
    'data/json/security/sec-04.json',
    'data/json/security/sec-05.json',
    'data/json/security/sec-06.json',
    'data/json/security/sec-07.json',
    'data/json/security/sec-08.json',
    'data/json/security/sec-09.json',
    'data/json/security/sec-10.json',
    'data/json/security/sec-11.json',
  ];

  for (const file of securityFiles) {
    const result = await seedQuestionsFromJSON('Security', file);
    results['Security'].success += result.successCount;
    results['Security'].skip += result.skipCount;
    results['Security'].error += result.errorCount;
  }

  // Summary
  console.log('\\n🎉 Comprehensive seeding completed!');
  console.log('📊 Summary:');

  let totalSuccess = 0;
  let totalSkip = 0;
  let totalError = 0;

  for (const [category, result] of Object.entries(results)) {
    console.log(`   ${category}:`);
    console.log(`     - Successfully added: ${result.success}`);
    console.log(`     - Skipped: ${result.skip}`);
    console.log(`     - Errors: ${result.error}`);

    totalSuccess += result.success;
    totalSkip += result.skip;
    totalError += result.error;
  }

  console.log(`\\n📈 Total Summary:`);
  console.log(`   - Successfully added: ${totalSuccess}`);
  console.log(`   - Skipped (already exist): ${totalSkip}`);
  console.log(`   - Errors: ${totalError}`);
  console.log(`   - Total processed: ${totalSuccess + totalSkip + totalError}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  try {
    await seedAllRemainingQuestions();
  } catch (error) {
    console.error('❌ Error during comprehensive seeding:', error);
  }
}

main().catch(console.error);
