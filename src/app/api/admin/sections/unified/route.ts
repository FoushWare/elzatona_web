// v1.0 - Unified Admin Sections API
// Bridges admin sections with the unified questions system

import { NextRequest, NextResponse } from 'next/server';
import { getDefaultAdminSections } from '@/lib/learning-path-mapping';
import UnifiedQuestionService from '@/lib/unified-question-schema';

// GET - Get all admin sections with question counts from unified system
export async function GET() {
  try {
    const sections = getDefaultAdminSections();
    
    // Get question counts for each section from unified system
    const sectionsWithCounts = await Promise.all(
      sections.map(async (section) => {
        try {
          const questions = await UnifiedQuestionService.getQuestions({
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
      message: 'Admin sections with unified question counts retrieved successfully',
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

    const result = await UnifiedQuestionService.createQuestion(questionWithLearningPath);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        message: 'Question added to section successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
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
