// API endpoint to clear all questions
import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
} from '@/lib/firebase-server';

export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    console.log('🗑️  Starting to clear all question collections...');

    const collectionsToClear = [
      'unifiedQuestions',
      'questions',
      'enhancedQuestions',
      'customQuestions',
    ];
    let totalDeleted = 0;

    for (const collectionName of collectionsToClear) {
      try {
        console.log(`📋 Fetching documents from ${collectionName}...`);
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);

        console.log(`📊 Found ${snapshot.size} documents in ${collectionName}`);

        if (snapshot.size === 0) {
          console.log(`✅ ${collectionName} is already empty`);
          continue;
        }

        console.log(
          `🗑️  Deleting ${snapshot.size} documents from ${collectionName}...`
        );

        // Use batch operations for better performance
        const batch = writeBatch(db);
        let batchCount = 0;
        const batchSize = 500; // Firestore batch limit

        snapshot.forEach(docSnapshot => {
          batch.delete(doc(db, collectionName, docSnapshot.id));
          batchCount++;

          // Commit batch when it reaches the limit
          if (batchCount >= batchSize) {
            batch.commit();
            batchCount = 0;
          }
        });

        // Commit any remaining documents
        if (batchCount > 0) {
          await batch.commit();
        }

        console.log(
          `✅ Deleted ${snapshot.size} documents from ${collectionName}`
        );
        totalDeleted += snapshot.size;
      } catch (error) {
        console.error(`❌ Error clearing ${collectionName}:`, error);
        // Continue with other collections even if one fails
      }
    }

    console.log(
      `🎉 CLEARING COMPLETE! Total documents deleted: ${totalDeleted}`
    );

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${totalDeleted} questions from all collections`,
      totalDeleted,
    });
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
