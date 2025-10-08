import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

interface Question {
  id: string;
  learningPath?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

interface Section {
  id: string;
  name?: string;
  currentQuestionCount?: number;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const {
      questionId,
      learningPathId,
      sectionSize = 15,
    } = await request.json();

    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Get all questions for this learning path
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('learningPath', '==', learningPathId),
      orderBy('createdAt', 'asc')
    );
    const questionsSnapshot = await getDocs(q);
    const questions: Question[] = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get existing sections for this learning path
    const sectionsRef = collection(db, 'sections');
    const sectionsQuery = query(
      sectionsRef,
      where('learningPath', '==', learningPathId),
      orderBy('order', 'asc')
    );
    const sectionsSnapshot = await getDocs(sectionsQuery);
    const existingSections: Section[] = sectionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Calculate which section this question should go to
    const questionIndex = questions.findIndex(q => q.id === questionId);
    const sectionIndex = Math.floor(questionIndex / sectionSize);

    let targetSection;

    // Check if section exists
    if (existingSections[sectionIndex]) {
      targetSection = existingSections[sectionIndex];
    } else {
      // Create new section
      const newSection = {
        name: `Section ${sectionIndex + 1}`,
        description: `Questions ${sectionIndex * sectionSize + 1} - ${(sectionIndex + 1) * sectionSize}`,
        learningPath: learningPathId,
        order: sectionIndex + 1,
        questionLimit: sectionSize,
        currentQuestionCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const sectionDoc = await addDoc(sectionsRef, newSection);
      targetSection = { id: sectionDoc.id, ...newSection };
    }

    // Update the question with section assignment
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      sectionId: targetSection.id,
      orderInSection: (questionIndex % sectionSize) + 1,
      updatedAt: new Date(),
    });

    // Update section question count
    const sectionRef = doc(db, 'sections', targetSection.id);
    await updateDoc(sectionRef, {
      currentQuestionCount:
        (targetSection as Section).currentQuestionCount! + 1,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        questionId,
        sectionId: targetSection.id,
        sectionName: (targetSection as Section).name,
        orderInSection: (questionIndex % sectionSize) + 1,
      },
    });
  } catch (error) {
    console.error('Error auto-assigning question to section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to auto-assign question to section',
      },
      { status: 500 }
    );
  }
}
