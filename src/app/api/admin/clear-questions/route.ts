// v1.0 - Clear Questions API Route
// API endpoint to clear all questions from Firebase collections

import { NextRequest, NextResponse } from 'next/server';
import { db, collection, getDocs, deleteDoc, doc } from '@/lib/firebase-server';

export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    console.log('🧹 Starting to clear questions from Firebase...');

    // Clear 'questions' collection
    console.log('📝 Clearing "questions" collection...');
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    const questionsDeletePromises = questionsSnapshot.docs.map(docSnapshot =>
      deleteDoc(doc(db, 'questions', docSnapshot.id))
    );

    if (questionsDeletePromises.length > 0) {
      await Promise.all(questionsDeletePromises);
      console.log(
        `✅ Deleted ${questionsDeletePromises.length} documents from "questions" collection`
      );
    } else {
      console.log('ℹ️  No documents found in "questions" collection');
    }

    // Clear 'unifiedQuestions' collection
    console.log('📝 Clearing "unifiedQuestions" collection...');
    const unifiedQuestionsSnapshot = await getDocs(
      collection(db, 'unifiedQuestions')
    );
    const unifiedQuestionsDeletePromises = unifiedQuestionsSnapshot.docs.map(
      docSnapshot => deleteDoc(doc(db, 'unifiedQuestions', docSnapshot.id))
    );

    if (unifiedQuestionsDeletePromises.length > 0) {
      await Promise.all(unifiedQuestionsDeletePromises);
      console.log(
        `✅ Deleted ${unifiedQuestionsDeletePromises.length} documents from "unifiedQuestions" collection`
      );
    } else {
      console.log('ℹ️  No documents found in "unifiedQuestions" collection');
    }

    const totalDeleted =
      questionsDeletePromises.length + unifiedQuestionsDeletePromises.length;

    console.log('🎉 Successfully cleared all questions from Firebase!');
    console.log('📊 Summary:');
    console.log(
      `   - Questions collection: ${questionsDeletePromises.length} documents deleted`
    );
    console.log(
      `   - UnifiedQuestions collection: ${unifiedQuestionsDeletePromises.length} documents deleted`
    );
    console.log(`   - Total deleted: ${totalDeleted} documents`);

    return NextResponse.json({
      success: true,
      message: 'Successfully cleared all questions from Firebase',
      data: {
        questionsDeleted: questionsDeletePromises.length,
        unifiedQuestionsDeleted: unifiedQuestionsDeletePromises.length,
        totalDeleted: totalDeleted,
      },
    });
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
