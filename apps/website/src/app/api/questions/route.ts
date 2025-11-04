import { NextRequest, NextResponse } from 'next/server';
import { supabaseOperations, supabase } from '@/lib/supabase-server';

// GET /api/questions - Get all questions with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardType = searchParams.get('cardType');
    const category = searchParams.get('category');
    const categories = searchParams.getAll('categories'); // Support multiple categories
    const topic = searchParams.get('topic');
    const subtopic = searchParams.get('subtopic'); // Support subtopic slug
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    // Validate topic is a UUID, or resolve subtopic slug to topic ID
    let topicId: string | undefined = undefined;

    // Check if topic is a valid UUID format
    const isValidUUID = (str: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(str);
    };

    if (topic && isValidUUID(topic)) {
      topicId = topic;
    } else if (subtopic || (topic && !isValidUUID(topic))) {
      // Resolve topic/subtopic slug to topic ID
      try {
        const { data: topics, error: topicsError } =
          await supabaseOperations.getTopics({
            isActive: true,
          });

        if (!topicsError && topics) {
          const slugToFind = subtopic || topic || '';
          const slugLower = slugToFind.toLowerCase();

          console.log(`🔍 API: Searching for topic/subtopic "${slugToFind}"`);

          // Normalize slug for better matching (remove plural 's', handle common variations)
          const normalizeForMatch = (str: string) => {
            return str
              .toLowerCase()
              .replace(/s$/, '') // Remove trailing 's' for plural matching
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '');
          };

          const slugNormalized = normalizeForMatch(slugLower);

          // Try multiple matching strategies
          const matchingTopic = (topics as any[]).find((t: any) => {
            const topicSlug = t.slug?.toLowerCase() || '';
            const topicName = t.name?.toLowerCase() || '';
            const topicNameSlug = topicName.replace(/\s+/g, '-');
            const topicSlugNormalized = normalizeForMatch(topicSlug);
            const topicNameNormalized = normalizeForMatch(topicName);

            // Exact matches
            if (
              topicSlug === slugLower ||
              topicNameSlug === slugLower ||
              t.id?.toLowerCase() === slugLower
            ) {
              return true;
            }

            // Check if slug contains the subtopic (e.g., "js-scope-closure" contains "closure")
            if (
              topicSlug.includes(slugLower) ||
              topicSlug.includes(slugNormalized)
            ) {
              return true;
            }

            // Check normalized matching (handles plural/singular)
            if (
              topicSlugNormalized.includes(slugNormalized) ||
              slugNormalized.includes(topicSlugNormalized)
            ) {
              return true;
            }

            // Check if the subtopic appears as a word boundary in the slug
            const escapedSlug = slugLower.replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&'
            );
            const escapedSlugNormalized = slugNormalized.replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&'
            );

            if (
              new RegExp(`(^|-)${escapedSlug}(-|$)`).test(topicSlug) ||
              new RegExp(`(^|-)${escapedSlugNormalized}(-|$)`).test(topicSlug)
            ) {
              return true;
            }

            // Check name matching
            if (
              topicName.includes(slugLower.replace(/-/g, ' ')) ||
              topicNameNormalized.includes(slugNormalized) ||
              slugNormalized.includes(topicNameNormalized)
            ) {
              return true;
            }

            return false;
          });

          if (matchingTopic) {
            topicId = matchingTopic.id;
            console.log(
              `✅ Resolved topic/subtopic "${slugToFind}" to topic: "${matchingTopic.name}" (ID: ${topicId})`
            );
          } else {
            console.warn(
              `⚠️ Could not resolve topic/subtopic "${slugToFind}" to a topic ID`
            );
            console.log(
              'Available topics:',
              (topics as any[]).slice(0, 10).map((t: any) => ({
                id: t.id,
                name: t.name,
                slug: t.slug,
              }))
            );
          }
        }
      } catch (error) {
        console.error('Error resolving topic:', error);
      }
    }

    const filters = {
      topicId: topicId,
      categoryId:
        categories.length > 0 ? categories : category ? [category] : undefined,
      difficulty: difficulty || undefined,
      questionType: type || undefined,
      is_active: true,
      limit: limit ? parseInt(limit, 10) : undefined,
      orderBy: 'created_at',
      orderDirection: 'desc' as const,
    };

    // Log the filters being applied
    console.log('🔍 API Questions Route - Applied Filters:', {
      topicId: topicId || 'none',
      categoryId: filters.categoryId || 'none',
      difficulty: filters.difficulty || 'none',
      questionType: filters.questionType || 'none',
      limit: filters.limit || 'none',
    });

    // Get the filtered count (same filters, without limit)
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    let countQuery = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    countQuery = countQuery.eq('is_active', true);

    if (filters.categoryId) {
      if (Array.isArray(filters.categoryId)) {
        countQuery = countQuery.in('category_id', filters.categoryId);
      } else {
        countQuery = countQuery.eq('category_id', filters.categoryId);
      }
    }
    if (filters.difficulty) {
      countQuery = countQuery.eq('difficulty', filters.difficulty);
    }
    if (filters.questionType) {
      countQuery = countQuery.eq('question_type', filters.questionType);
    }
    if (filters.topicId) {
      console.log(`📌 Applying topic_id filter: ${filters.topicId}`);
      countQuery = countQuery.eq('topic_id', filters.topicId);
    } else {
      console.log('⚠️ No topic_id filter applied');
    }

    const { count: filteredCount } = await countQuery;

    const { data: questions, error } =
      await supabaseOperations.getQuestions(filters);

    if (error) {
      console.error('Supabase error fetching questions:', error);
      throw new Error(
        error.message || 'Failed to fetch questions from database'
      );
    }

    // Handle null or undefined questions
    if (!questions) {
      console.warn('No questions returned from database');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
        totalCount: filteredCount || 0,
      });
    }

    // Log the results for debugging
    console.log(`📊 Questions fetched: ${questions.length || 0}`);
    if (filters.topicId && questions.length > 0) {
      console.log(
        'Sample question topic_ids:',
        questions.slice(0, 3).map((q: any) => q.topic_id || 'NULL')
      );
    }

    // Transform data to match expected format
    const transformedQuestions =
      (questions as any[])
        ?.map(question => {
          try {
            // Try multiple possible field names for question text
            const questionText =
              question.question_text ||
              question.question ||
              question.title ||
              question.content ||
              question.text ||
              '';

            if (!questionText) {
              console.warn('Question missing text field:', {
                id: question.id,
                availableFields: Object.keys(question),
              });
            }

            return {
              id: question.id,
              question: questionText,
              question_text: questionText, // Also include raw field for backward compatibility
              answer: question.correct_answer,
              explanation: question.explanation || '',
              topicId: question.topic_id,
              categoryId: question.category_id,
              difficulty: question.difficulty,
              type: question.question_type,
              questionType: question.question_type,
              options: question.options
                ? typeof question.options === 'string'
                  ? JSON.parse(question.options)
                  : question.options
                : null,
              correctAnswer: question.correct_answer,
              tags: question.tags
                ? typeof question.tags === 'string'
                  ? JSON.parse(question.tags)
                  : question.tags
                : [],
              is_active: question.is_active,
              created_at: question.created_at
                ? new Date(question.created_at)
                : new Date(),
              updated_at: question.updated_at
                ? new Date(question.updated_at)
                : new Date(),
            };
          } catch (parseError) {
            console.error('Error parsing question:', question.id, parseError);
            return null;
          }
        })
        .filter(q => q !== null && q.question) || []; // Filter out questions without text

    // Additional filters that aren't handled by Supabase (already filtered by categoryId above)
    let filteredQuestions = transformedQuestions;

    if (cardType && cardType !== 'all') {
      // This would need to be handled by joining with learning_cards table
      // For now, we'll skip this filter
    }

    return NextResponse.json({
      success: true,
      data: filteredQuestions,
      count: filteredCount || filteredQuestions.length, // Actual filtered count from database
      totalCount: filteredCount || filteredQuestions.length, // Total count after filtering
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch questions';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/questions - Create a new question
export async function POST(request: NextRequest) {
  try {
    const questionData = await request.json();

    // Transform data to match Supabase schema
    const supabaseQuestionData = {
      question_text: questionData.question,
      explanation: questionData.explanation || '',
      topic_id: questionData.topicId || undefined,
      difficulty: questionData.difficulty || 'easy',
      question_type:
        questionData.type || questionData.questionType || 'multiple_choice',
      options: questionData.options
        ? JSON.stringify(questionData.options)
        : undefined,
      correct_answer:
        questionData.answer || questionData.correctAnswer || undefined,
      tags: questionData.tags ? JSON.stringify(questionData.tags) : undefined,
      is_active: questionData.isActive !== false,
    };

    const { data: newQuestion, error } =
      await supabaseOperations.createQuestion(supabaseQuestionData);

    if (error) {
      throw new Error(error.message);
    }

    // Transform response to match expected format
    const transformedQuestion = {
      id: (newQuestion as any).id,
      question: (newQuestion as any).question_text,
      answer: (newQuestion as any).correct_answer,
      explanation: (newQuestion as any).explanation,
      topicId: (newQuestion as any).topic_id,
      difficulty: (newQuestion as any).difficulty,
      type: (newQuestion as any).question_type,
      questionType: (newQuestion as any).question_type,
      options: (newQuestion as any).options
        ? JSON.parse((newQuestion as any).options)
        : null,
      correctAnswer: (newQuestion as any).correct_answer,
      tags: (newQuestion as any).tags
        ? JSON.parse((newQuestion as any).tags)
        : null,
      is_active: (newQuestion as any).is_active,
      created_at: new Date((newQuestion as any).created_at),
      updated_at: new Date((newQuestion as any).updated_at),
    };

    return NextResponse.json({
      success: true,
      data: transformedQuestion,
      message: 'Question created successfully',
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
