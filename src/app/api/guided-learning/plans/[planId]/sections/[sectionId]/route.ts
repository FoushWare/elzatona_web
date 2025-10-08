import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

interface Section {
  id: string;
  name: string;
  questions: string[];
  questionCount?: number;
  updatedAt?: Date;
  [key: string]: unknown; // Allow additional properties
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string; sectionId: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { planId, sectionId } = await params;
    const body = await request.json();
    const { questions } = body;

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Questions must be an array',
        },
        { status: 400 }
      );
    }

    // Get the plan document
    const planRef = doc(db, 'learningPlanTemplates', planId);
    const planDoc = await getDoc(planRef);

    if (!planDoc.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Plan not found',
        },
        { status: 404 }
      );
    }

    const planData = planDoc.data();
    const sections = planData.sections || [];

    // Find and update the specific section
    const updatedSections = sections.map((section: Section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: questions,
          questionCount: questions.length,
          updatedAt: new Date(),
        };
      }
      return section;
    });

    // Update the plan with the modified sections
    await updateDoc(planRef, {
      sections: updatedSections,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        sectionId,
        questions,
        questionCount: questions.length,
      },
    });
  } catch (error) {
    console.error('Error updating section questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update section questions',
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string; sectionId: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { planId, sectionId } = await params;

    // Get the plan document
    const planRef = doc(db, 'learningPlanTemplates', planId);
    const planDoc = await getDoc(planRef);

    if (!planDoc.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Plan not found',
        },
        { status: 404 }
      );
    }

    const planData = planDoc.data();
    const sections = planData.sections || [];

    // Find the specific section
    const section = sections.find((s: Section) => s.id === sectionId);

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch section',
      },
      { status: 500 }
    );
  }
}
