#!/usr/bin/env ts-node

/**
 * 🚀 Firebase to Supabase Migration Script (TypeScript)
 *
 * This script migrates data from Firebase Firestore to Supabase PostgreSQL
 * following the new relational structure.
 *
 * Usage:
 *   npm run migrate:firebase-to-supabase
 *   or
 *   npx ts-node scripts/migrate-firebase-to-supabase.ts
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize clients
const firebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(firebaseApp);
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Migration statistics
interface MigrationStats {
  migrated: number;
  errors: number;
}

const stats: Record<string, MigrationStats> = {
  learningCards: { migrated: 0, errors: 0 },
  categories: { migrated: 0, errors: 0 },
  topics: { migrated: 0, errors: 0 },
  questions: { migrated: 0, errors: 0 },
  learningPlans: { migrated: 0, errors: 0 },
  planCards: { migrated: 0, errors: 0 },
};

// Helper function to convert Firestore timestamp to ISO string
function convertTimestamp(timestamp: any): string {
  if (!timestamp) return new Date().toISOString();
  if (typeof timestamp === 'string') return timestamp;
  if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
    return (timestamp as any).toDate().toISOString();
  }
  return new Date(timestamp).toISOString();
}

// Helper function to convert Firestore document to plain object
function docToObject(doc: any): any {
  const data = doc.data();
  const result: any = { id: doc.id };

  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && 'toDate' in value) {
      result[key] = (value as any).toDate().toISOString();
    } else if (Array.isArray(value)) {
      result[key] = value.map((item: any) =>
        item && typeof item === 'object' && 'toDate' in item
          ? (item as any).toDate().toISOString()
          : item
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Migration functions
async function migrateLearningCards(): Promise<void> {
  console.log('🔄 Migrating Learning Cards...');

  try {
    const cardsRef = collection(firestore, 'learningCards');
    const snapshot = await getDocs(cardsRef);

    for (const doc of snapshot.docs) {
      try {
        const cardData = docToObject(doc);

        const { error } = await supabase.from('learning_cards').insert({
          id: cardData.id,
          title: cardData.title,
          type: cardData.type,
          description: cardData.description,
          color: cardData.color,
          icon: cardData.icon,
          order_index: cardData.order || 0,
          is_active: cardData.isActive !== false,
          created_at: convertTimestamp(cardData.createdAt),
          updated_at: convertTimestamp(cardData.updatedAt),
        });

        if (error) {
          console.error(`❌ Error migrating card ${cardData.id}:`, error);
          stats.learningCards.errors++;
        } else {
          console.log(`✅ Migrated card: ${cardData.title}`);
          stats.learningCards.migrated++;
        }
      } catch (error) {
        console.error(`❌ Error processing card ${doc.id}:`, error);
        stats.learningCards.errors++;
      }
    }
  } catch (error) {
    console.error('❌ Error fetching learning cards:', error);
  }
}

async function migrateCategories(): Promise<void> {
  console.log('🔄 Migrating Categories...');

  try {
    const categoriesRef = collection(firestore, 'categories');
    const snapshot = await getDocs(categoriesRef);

    for (const doc of snapshot.docs) {
      try {
        const categoryData = docToObject(doc);

        // Find the learning card ID by name or type
        let learningCardId = null;
        if (categoryData.cardType) {
          const { data: cardData } = await supabase
            .from('learning_cards')
            .select('id')
            .eq(
              'type',
              categoryData.cardType.toLowerCase().replace(/\s+/g, '-')
            )
            .single();

          if (cardData) {
            learningCardId = cardData.id;
          }
        }

        const { error } = await supabase.from('categories').insert({
          id: categoryData.id,
          name: categoryData.name,
          slug:
            categoryData.slug ||
            categoryData.name.toLowerCase().replace(/\s+/g, '-'),
          description: categoryData.description,
          card_type: categoryData.cardType,
          icon: categoryData.icon,
          color: categoryData.color,
          order_index: categoryData.order || 0,
          learning_card_id: learningCardId,
          is_active: categoryData.isActive !== false,
          created_at: convertTimestamp(categoryData.createdAt),
          updated_at: convertTimestamp(categoryData.updatedAt),
        });

        if (error) {
          console.error(
            `❌ Error migrating category ${categoryData.id}:`,
            error
          );
          stats.categories.errors++;
        } else {
          console.log(`✅ Migrated category: ${categoryData.name}`);
          stats.categories.migrated++;
        }
      } catch (error) {
        console.error(`❌ Error processing category ${doc.id}:`, error);
        stats.categories.errors++;
      }
    }
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
  }
}

async function migrateTopics(): Promise<void> {
  console.log('🔄 Migrating Topics...');

  try {
    const topicsRef = collection(firestore, 'topics');
    const snapshot = await getDocs(topicsRef);

    for (const doc of snapshot.docs) {
      try {
        const topicData = docToObject(doc);

        // Find the category ID by name
        let categoryId = null;
        if (topicData.category) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('id')
            .eq('name', topicData.category)
            .single();

          if (categoryData) {
            categoryId = categoryData.id;
          }
        }

        const { error } = await supabase.from('topics').insert({
          id: topicData.id,
          name: topicData.name,
          slug:
            topicData.slug || topicData.name.toLowerCase().replace(/\s+/g, '-'),
          description: topicData.description,
          difficulty: topicData.difficulty || 'beginner',
          estimated_questions: topicData.estimatedQuestions || 0,
          order_index: topicData.order || 0,
          category_id: categoryId,
          is_active: topicData.isActive !== false,
          created_at: convertTimestamp(topicData.createdAt),
          updated_at: convertTimestamp(topicData.updatedAt),
        });

        if (error) {
          console.error(`❌ Error migrating topic ${topicData.id}:`, error);
          stats.topics.errors++;
        } else {
          console.log(`✅ Migrated topic: ${topicData.name}`);
          stats.topics.migrated++;
        }
      } catch (error) {
        console.error(`❌ Error processing topic ${doc.id}:`, error);
        stats.topics.errors++;
      }
    }
  } catch (error) {
    console.error('❌ Error fetching topics:', error);
  }
}

async function migrateQuestions(): Promise<void> {
  console.log('🔄 Migrating Questions...');

  try {
    const questionsRef = collection(firestore, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);

    for (const doc of snapshot.docs) {
      try {
        const questionData = docToObject(doc);

        // Find related IDs
        let topicId = null;
        let categoryId = null;
        let learningCardId = null;

        if (questionData.topic) {
          const { data: topicData } = await supabase
            .from('topics')
            .select('id, category_id')
            .eq('name', questionData.topic)
            .single();

          if (topicData) {
            topicId = topicData.id;
            categoryId = topicData.category_id;
          }
        }

        if (questionData.category) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('id, learning_card_id')
            .eq('name', questionData.category)
            .single();

          if (categoryData) {
            categoryId = categoryData.id;
            learningCardId = categoryData.learning_card_id;
          }
        }

        if (questionData.learningCardId) {
          learningCardId = questionData.learningCardId;
        }

        const { error } = await supabase.from('questions').insert({
          id: questionData.id,
          title: questionData.title,
          content: questionData.content,
          type: questionData.type,
          difficulty: questionData.difficulty,
          answer: questionData.answer,
          explanation: questionData.explanation,
          hints: questionData.hints || [],
          time_limit: questionData.timeLimit,
          points: questionData.points || 10,
          tags: questionData.tags || [],
          metadata: questionData.metadata || {},
          options: questionData.options || null,
          code_template: questionData.codeTemplate,
          test_cases: questionData.testCases || null,
          sample_answers: questionData.sampleAnswers || [],
          stats: questionData.stats || null,
          topic_id: topicId,
          category_id: categoryId,
          learning_card_id: learningCardId,
          is_active: questionData.isActive !== false,
          created_at: convertTimestamp(questionData.createdAt),
          updated_at: convertTimestamp(questionData.updatedAt),
          created_by: questionData.createdBy,
          updated_by: questionData.updatedBy,
        });

        if (error) {
          console.error(
            `❌ Error migrating question ${questionData.id}:`,
            error
          );
          stats.questions.errors++;
        } else {
          console.log(`✅ Migrated question: ${questionData.title}`);
          stats.questions.migrated++;
        }
      } catch (error) {
        console.error(`❌ Error processing question ${doc.id}:`, error);
        stats.questions.errors++;
      }
    }
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
  }
}

async function migrateLearningPlans(): Promise<void> {
  console.log('🔄 Migrating Learning Plans...');

  try {
    const plansRef = collection(firestore, 'learningPlans');
    const snapshot = await getDocs(plansRef);

    for (const doc of snapshot.docs) {
      try {
        const planData = docToObject(doc);

        const { error } = await supabase.from('learning_plans').insert({
          id: planData.id,
          name: planData.name,
          description: planData.description,
          duration_days: planData.duration || 7,
          difficulty: planData.difficulty,
          estimated_time_hours: planData.estimatedTimeHours || 0,
          is_template: planData.isTemplate || false,
          is_public: planData.isPublic || false,
          prerequisites: planData.prerequisites || [],
          learning_objectives: planData.learningObjectives || [],
          metadata: planData.metadata || {},
          is_active: planData.isActive !== false,
          created_at: convertTimestamp(planData.createdAt),
          updated_at: convertTimestamp(planData.updatedAt),
          created_by: planData.createdBy,
          updated_by: planData.updatedBy,
        });

        if (error) {
          console.error(`❌ Error migrating plan ${planData.id}:`, error);
          stats.learningPlans.errors++;
        } else {
          console.log(`✅ Migrated plan: ${planData.name}`);
          stats.learningPlans.migrated++;

          // Migrate plan-card relationships
          if (planData.categories) {
            await migratePlanCards(planData.id, planData.categories);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing plan ${doc.id}:`, error);
        stats.learningPlans.errors++;
      }
    }
  } catch (error) {
    console.error('❌ Error fetching learning plans:', error);
  }
}

async function migratePlanCards(
  planId: string,
  categories: any
): Promise<void> {
  console.log(`🔄 Migrating Plan Cards for plan ${planId}...`);

  try {
    let orderIndex = 0;

    for (const [categoryName, categoryData] of Object.entries(categories)) {
      // Find the learning card for this category
      const { data: cardData } = await supabase
        .from('learning_cards')
        .select('id')
        .eq('type', categoryName.toLowerCase().replace(/\s+/g, '-'))
        .single();

      if (cardData) {
        const { error } = await supabase.from('plan_cards').insert({
          plan_id: planId,
          card_id: cardData.id,
          order_index: orderIndex++,
          question_count: (categoryData as any).totalQuestions || 0,
          time_limit_minutes: (categoryData as any).estimatedTime || 0,
          difficulty: (categoryData as any).difficulty || 'beginner',
          is_active: true,
        });

        if (error) {
          console.error(
            `❌ Error migrating plan card for ${categoryName}:`,
            error
          );
          stats.planCards.errors++;
        } else {
          console.log(`✅ Migrated plan card: ${categoryName}`);
          stats.planCards.migrated++;
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error migrating plan cards for plan ${planId}:`, error);
  }
}

// Main migration function
async function runMigration(): Promise<void> {
  console.log('🚀 Starting Firebase to Supabase Migration...');
  console.log('================================================');

  try {
    // Run migrations in order (respecting foreign key constraints)
    await migrateLearningCards();
    await migrateCategories();
    await migrateTopics();
    await migrateQuestions();
    await migrateLearningPlans();

    // Update question counts
    console.log('🔄 Updating question counts...');
    const { error: updateError } = await supabase.rpc('update_question_counts');
    if (updateError) {
      console.error('❌ Error updating question counts:', updateError);
    } else {
      console.log('✅ Question counts updated');
    }

    // Print final statistics
    console.log('\n📊 Migration Complete!');
    console.log('======================');
    console.log(
      `Learning Cards: ${stats.learningCards.migrated} migrated, ${stats.learningCards.errors} errors`
    );
    console.log(
      `Categories: ${stats.categories.migrated} migrated, ${stats.categories.errors} errors`
    );
    console.log(
      `Topics: ${stats.topics.migrated} migrated, ${stats.topics.errors} errors`
    );
    console.log(
      `Questions: ${stats.questions.migrated} migrated, ${stats.questions.errors} errors`
    );
    console.log(
      `Learning Plans: ${stats.learningPlans.migrated} migrated, ${stats.learningPlans.errors} errors`
    );
    console.log(
      `Plan Cards: ${stats.planCards.migrated} migrated, ${stats.planCards.errors} errors`
    );

    const totalMigrated = Object.values(stats).reduce(
      (sum, stat) => sum + stat.migrated,
      0
    );
    const totalErrors = Object.values(stats).reduce(
      (sum, stat) => sum + stat.errors,
      0
    );

    console.log(
      `\nTotal: ${totalMigrated} records migrated, ${totalErrors} errors`
    );

    if (totalErrors === 0) {
      console.log('🎉 Migration completed successfully with no errors!');
    } else {
      console.log(
        '⚠️  Migration completed with some errors. Please review the logs above.'
      );
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  runMigration().catch(console.error);
}

export { runMigration };
