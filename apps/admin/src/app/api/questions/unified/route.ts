import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    'Supabase URL or Service Role Key is missing in environment variables.'
  );
  throw new Error(
    'Supabase URL or Service Role Key is missing in environment variables.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    // Build query using junction tables to get topics and categories
    let query = supabase.from('questions').select(`
        *,
        learning_cards (
          id,
          title,
          type,
          color,
          icon
        )
      `);

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    if (difficulty && difficulty !== 'all') {
      query = query.eq('difficulty', difficulty);
    }

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    if (isActive !== null && isActive !== 'all') {
      query = query.eq('is_active', isActive === 'true');
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Get total count with same filters
    let countQuery = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    // Apply same filters to count query
    if (category && category !== 'all') {
      countQuery = countQuery.eq('category_id', category);
    }

    if (difficulty && difficulty !== 'all') {
      countQuery = countQuery.eq('difficulty', difficulty);
    }

    if (type && type !== 'all') {
      countQuery = countQuery.eq('type', type);
    }

    if (isActive !== null && isActive !== 'all') {
      countQuery = countQuery.eq('is_active', isActive === 'true');
    }

    if (search) {
      countQuery = countQuery.or(
        `title.ilike.%${search}%,content.ilike.%${search}%`
      );
    }

    const { count, error: countError } = await countQuery;

    if (countError) throw countError;

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    // Execute query
    const { data, error } = await query;

    if (error) throw error;

    // Get question IDs for batch fetching
    const questionIds = data?.map(q => q.id) || [];

    // Batch fetch all topics for these questions
    const { data: allQuestionTopics } = await supabase
      .from('questions_topics')
      .select(
        `
        question_id,
        topic_id,
        is_primary,
        order_index,
        topics (
          id,
          name,
          slug,
          difficulty
        )
      `
      )
      .in('question_id', questionIds);

    // Get unique learning card IDs
    const learningCardIds = [
      ...new Set(data?.map(q => q.learning_card_id).filter(Boolean)),
    ];

    // Batch fetch all categories for these learning cards
    const { data: allCardCategories } = await supabase
      .from('card_categories')
      .select(
        `
        card_id,
        category_id,
        is_primary,
        order_index,
        categories (
          id,
          name,
          slug,
          card_type
        )
      `
      )
      .in('card_id', learningCardIds);

    // Transform data to match expected format with topics and categories
    const transformedData =
      data?.map(question => {
        // Get topics for this question
        const questionTopics =
          allQuestionTopics?.filter(qt => qt.question_id === question.id) || [];
        const topics = questionTopics.map(qt => ({
          id: qt.topics?.id,
          name: qt.topics?.name,
          slug: qt.topics?.slug,
          difficulty: qt.topics?.difficulty,
          is_primary: qt.is_primary,
          order_index: qt.order_index,
        }));

        // Get categories for this question's learning card
        const cardCategories =
          allCardCategories?.filter(
            cc => cc.card_id === question.learning_card_id
          ) || [];
        const categories = cardCategories.map(cc => ({
          id: cc.categories?.id,
          name: cc.categories?.name,
          slug: cc.categories?.slug,
          card_type: cc.categories?.card_type,
          is_primary: cc.is_primary,
          order_index: cc.order_index,
        }));

        // Get primary topic and category
        const primaryTopic = topics.find(t => t.is_primary) || topics[0];
        const primaryCategory =
          categories.find(c => c.is_primary) || categories[0];

        return {
          id: question.id,
          title: question.title,
          content: question.content,
          type: question.type,
          difficulty: question.difficulty,
          points: question.points || 1,
          options: question.options || [],
          correct_answer: question.correct_answer,
          explanation: question.explanation,
          test_cases: question.test_cases || [],
          hints: question.hints || [],
          tags: question.tags || [],
          stats: question.stats || {},
          metadata: question.metadata || {},
          // Legacy fields for backward compatibility
          category: primaryCategory?.name || 'Unknown',
          category_id: primaryCategory?.id,
          topic: primaryTopic?.name || 'Unknown',
          topic_id: primaryTopic?.id,
          learning_card_id: question.learning_card_id,
          learning_card: question.learning_cards
            ? {
                id: question.learning_cards.id,
                title: question.learning_cards.title,
                type: question.learning_cards.type,
                color: question.learning_cards.color,
                icon: question.learning_cards.icon,
              }
            : null,
          // New fields with full relationship data
          topics: topics,
          categories: categories,
          isActive: question.is_active,
          createdAt: question.created_at,
          updatedAt: question.updated_at,
        };
      }) || [];

    return NextResponse.json({
      success: true,
      data: transformedData,
      pagination: {
        page,
        pageSize,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    });
  } catch (error: any) {
    console.error('Error fetching questions:', error.message);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      content,
      type,
      difficulty,
      points,
      options,
      correct_answer,
      explanation,
      test_cases,
      hints,
      tags,
      stats,
      metadata,
      category_id,
      learning_card_id,
      isActive = true,
    } = body;

    const { data, error } = await supabase
      .from('questions')
      .insert({
        title,
        content,
        type,
        difficulty,
        points,
        options,
        correct_answer,
        explanation,
        test_cases,
        hints,
        tags,
        stats,
        metadata,
        category_id,
        learning_card_id,
        is_active: isActive,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Error creating question:', error.message);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create question' },
      { status: 500 }
    );
  }
}
