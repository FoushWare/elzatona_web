import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('plan') || '1-day-plan';

    console.log('🔄 Testing question fetching for plan:', planId);

    // Get plan details
    const planResponse = await fetch(`${request.nextUrl.origin}/api/guided-learning/plans/${planId}`);
    const planData = await planResponse.json();

    if (!planData.success) {
      throw new Error(planData.error || 'Failed to load plan details');
    }

    const planDetails = planData.data;
    console.log('📋 Plan details:', planDetails);

    // Get all question IDs from plan sections
    const allQuestionIds = [];
    if (planDetails.sections) {
      const sections = Array.isArray(planDetails.sections)
        ? planDetails.sections
        : Object.values(planDetails.sections);

      sections.forEach((section: any) => {
        if (section.questions && Array.isArray(section.questions)) {
          allQuestionIds.push(...section.questions);
        }
      });
    }

    console.log('🔍 Question IDs from plan sections:', allQuestionIds);

    let questionsToFetch = [];
    if (allQuestionIds.length > 0) {
      // Fetch specific questions by IDs
      const questionPromises = allQuestionIds.map(async (questionId: string) => {
        try {
          const response = await fetch(`${request.nextUrl.origin}/api/questions/unified/${questionId}`);
          const data = await response.json();
          return data.success ? data.data : null;
        } catch (error) {
          console.error(`Error fetching question ${questionId}:`, error);
          return null;
        }
      });

      const questionResults = await Promise.all(questionPromises);
      questionsToFetch = questionResults.filter(Boolean);
    } else {
      // Fallback: fetch questions by categories
      const getPlanCategories = (planDetails: any) => {
        const categories = new Set<string>();

        if (planDetails.sections) {
          const sections = Array.isArray(planDetails.sections)
            ? planDetails.sections
            : Object.values(planDetails.sections);

          sections.forEach((section: any) => {
            if (section.name) {
              const sectionName = section.name;
              if (sectionName === 'HTML & CSS') {
                categories.add('HTML & CSS');
              } else if (sectionName === 'JavaScript') {
                categories.add('JavaScript (Core)');
              } else if (sectionName === 'React') {
                categories.add('React');
              } else if (sectionName === 'TypeScript') {
                categories.add('TypeScript');
              } else if (sectionName === 'CSS & Styling') {
                categories.add('CSS & Styling');
              } else if (sectionName === 'Performance') {
                categories.add('Performance');
              } else if (sectionName === 'Security') {
                categories.add('Security');
              } else if (sectionName === 'Testing') {
                categories.add('Testing');
              }
            }
          });
        }

        if (categories.size === 0) {
          categories.add('JavaScript (Core)');
          categories.add('React');
          categories.add('HTML & CSS');
        }

        return Array.from(categories);
      };

      const planCategories = getPlanCategories(planDetails);
      console.log('📚 Plan categories for fallback:', planCategories);

      const questionPromises = planCategories.map(async (category: string) => {
        try {
          const response = await fetch(`${request.nextUrl.origin}/api/questions/unified?isActive=true&category=${encodeURIComponent(category)}`);
          const data = await response.json();
          return data.success ? data.data : [];
        } catch (error) {
          console.error(`Error fetching questions for category ${category}:`, error);
          return [];
        }
      });

      const questionResults = await Promise.all(questionPromises);
      questionsToFetch = questionResults.flat();
    }

    console.log('✅ Questions to use:', questionsToFetch.length);

    // Transform questions
    const transformedQuestions = questionsToFetch.map((q: any) => {
      let options: string[] = [];
      let correctAnswer: number | string = 0;

      if (q.type === 'conceptual' || q.type === 'open-ended' || q.type === 'practical') {
        options = [];
        correctAnswer = q.answer || '';
      } else if (q.type === 'true-false') {
        options = ['True', 'False'];
        correctAnswer = q.correctAnswer === true ? 0 : 1;
      } else if (q.type === 'multiple-select') {
        options = q.options?.map((opt: any) => opt.text) || [];
        correctAnswer = q.correctAnswer || [];
      } else {
        options = q.options?.map((opt: any) => opt.text) || [];
        correctAnswer = q.options?.findIndex((opt: any) => opt.isCorrect) || 0;
      }

      return {
        id: q.id,
        question: q.content || q.title || q.question,
        content: q.content,
        title: q.title,
        options,
        correctAnswer,
        explanation: q.explanation || 'No explanation available.',
        section: q.category || q.section || 'General',
        difficulty: q.difficulty || 'medium',
        type: q.type || 'multiple-choice',
        answer: q.answer,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        planId,
        planDetails,
        questionIds: allQuestionIds,
        categories: planDetails.sections ? (Array.isArray(planDetails.sections) ? planDetails.sections : Object.values(planDetails.sections)).map((s: any) => s.name) : [],
        questions: transformedQuestions,
        totalQuestions: transformedQuestions.length,
        questionTypes: transformedQuestions.reduce((acc: any, q: any) => {
          acc[q.type] = (acc[q.type] || 0) + 1;
          return acc;
        }, {}),
      }
    });
  } catch (error: any) {
    console.error('❌ Error in test-questions API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to test questions',
      },
      { status: 500 }
    );
  }
}
