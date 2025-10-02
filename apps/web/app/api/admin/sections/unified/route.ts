// v1.0 - Unified Admin Sections API
// Bridges admin sections with the unified questions system

import { NextRequest, NextResponse } from 'next/server';
import { getDefaultAdminSections } from '@/lib/learning-path-mapping';
import UnifiedQuestionService from '@/lib/unified-question-schema';
import { db } from '@/lib/firebase-server';

// GET - Get all admin sections with question counts from unified system
export async function GET() {
  try {
    const sections = getDefaultAdminSections();

    // Get question counts for each section from unified system
    const sectionsWithCounts = await Promise.all(
      sections.map(async section => {
        try {
          const service = new UnifiedQuestionService(db);
          const questions = await service.getQuestions({
            learningPath: section.learningPathId,
            isActive: true,
          });

          return {
            ...section,
            questionCount: questions.length,
          };
        } catch (error) {
          console.error(`Error getting questions for ${section.name}:`, error);
          return {
            ...section,
            questionCount: 0,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: sectionsWithCounts,
      message:
        'Admin sections with unified question counts retrieved successfully',
    });
  } catch (error) {
    console.error('Unified admin sections API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve admin sections',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST - Add question to a section (learning path)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionId, questionData } = body;

    if (!sectionId || !questionData) {
      return NextResponse.json(
        { success: false, error: 'Section ID and question data are required' },
        { status: 400 }
      );
    }

    // Add learning path to question data
    const questionWithLearningPath = {
      ...questionData,
      learningPath: sectionId,
      isActive: true,
    };

    const service = new UnifiedQuestionService(db);
    const result = await service.createQuestion(questionWithLearningPath);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Question added to section successfully',
    });
  } catch (error) {
    console.error('Add question to section API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add question to section',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
