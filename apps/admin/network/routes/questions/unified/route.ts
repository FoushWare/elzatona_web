import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Type definitions for question relationships
interface QuestionTopic {
  id?: string;
  name?: string;
  slug?: string;
  difficulty?: string;
  is_primary?: boolean;
  order_index?: number;
}

interface QuestionCategory {
  id?: string;
  name?: string;
  slug?: string;
  card_type?: string;
  is_primary?: boolean;
  order_index?: number;
}

interface QuestionTopicRelation {
  question_id: string;
  topics: QuestionTopic | QuestionTopic[];
  is_primary: boolean;
  order_index: number;
}

interface QuestionCategoryRelation {
  card_id: string;
  categories: QuestionCategory | QuestionCategory[];
  is_primary: boolean;
  order_index: number;
}

// Get Supabase client - handle missing env vars gracefully
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("❌ Supabase configuration missing:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseServiceRoleKey,
    });
    throw new Error(
      "Supabase URL or Service Role Key is missing in environment variables.",
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

// Helper function to get question IDs for topic filtering
async function getQuestionIdsForTopics(
  supabase: ReturnType<typeof createClient>,
  topicNames: string[],
): Promise<string[]> {
  if (topicNames.length === 0) return [];

  // Get topic IDs by names
  const { data: topicsData } = await supabase
    .from("topics")
    .select("id")
    .in("name", topicNames);

  if (!topicsData || topicsData.length === 0) return [];

  const topicIds = topicsData.map((t: { id: string }) => t.id);

  // Get question IDs that have any of these topics
  const { data: questionTopicData } = await supabase
    .from("questions_topics")
    .select("question_id")
    .in("topic_id", topicIds);

  if (!questionTopicData || questionTopicData.length === 0) return [];

  return questionTopicData.map((qt: { question_id: string }) => qt.question_id);
}

export async function GET(request: NextRequest) {
  try {
    // Get Supabase client
    const supabase = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");
    const isActive = searchParams.get("isActive");
    const search = searchParams.get("search");
    const topic = searchParams.get("topic");
    const topics = searchParams.get("topics"); // comma-separated topic names

    console.log("🔍 API Parameters:", {
      page,
      pageSize,
      category,
      difficulty,
      type,
      isActive,
      search,
      topic,
      topics,
    });

    // Build query using junction tables to get topics and categories
    let query = supabase.from("questions").select(`
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
    if (category && category !== "all" && category !== "undefined") {
      // Check if category is a UUID or a name
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          category,
        );

      if (isUUID) {
        // Direct UUID filtering
        query = query.eq("category_id", category);
      } else {
        // Category name filtering - get UUID from name
        const { data: categoryData } = await supabase
          .from("categories")
          .select("id")
          .eq("name", category)
          .eq("is_active", true)
          .single();

        if (categoryData) {
          query = query.eq("category_id", categoryData.id);
        }
      }
    }

    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty);
    }

    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    if (isActive !== null && isActive !== "all") {
      query = query.eq("is_active", isActive === "true");
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Apply topic filtering using junction table
    let topicQuestionIds: string[] = [];
    if (topic && topic !== "all") {
      topicQuestionIds = await getQuestionIdsForTopics(
        supabase as ReturnType<typeof createClient>,
        [topic],
      );
    } else if (topics) {
      const topicNames = topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);
      topicQuestionIds = await getQuestionIdsForTopics(
        supabase as ReturnType<typeof createClient>,
        topicNames,
      );
    }

    if (topicQuestionIds.length > 0) {
      query = query.in("id", topicQuestionIds);
    } else if ((topic && topic !== "all") || topics) {
      // No questions found with these topics, return empty result
      query = query.eq("id", "no-results");
    }

    // Get total count with same filters
    let countQuery = supabase
      .from("questions")
      .select("*", { count: "exact", head: true });

    // Apply same filters to count query
    if (category && category !== "all" && category !== "undefined") {
      // Check if category is a UUID or a name
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          category,
        );

      if (isUUID) {
        // Direct UUID filtering
        countQuery = countQuery.eq("category_id", category);
      } else {
        // Category name filtering - get UUID from name
        const { data: categoryData } = await supabase
          .from("categories")
          .select("id")
          .eq("name", category)
          .eq("is_active", true)
          .single();

        if (categoryData) {
          countQuery = countQuery.eq("category_id", categoryData.id);
        }
      }
    }

    if (difficulty && difficulty !== "all") {
      countQuery = countQuery.eq("difficulty", difficulty);
    }

    if (type && type !== "all") {
      countQuery = countQuery.eq("type", type);
    }

    if (isActive !== null && isActive !== "all") {
      countQuery = countQuery.eq("is_active", isActive === "true");
    }

    if (search) {
      countQuery = countQuery.or(
        `title.ilike.%${search}%,content.ilike.%${search}%`,
      );
    }

    // Apply same topic filtering to count query
    if (topicQuestionIds.length > 0) {
      countQuery = countQuery.in("id", topicQuestionIds);
    } else if ((topic && topic !== "all") || topics) {
      // No questions found with these topics, return empty result
      countQuery = countQuery.eq("id", "no-results");
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
    const questionIds = data?.map((q) => q.id) || [];

    // Batch fetch all topics for these questions
    const { data: allQuestionTopics } = await supabase
      .from("questions_topics")
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
      `,
      )
      .in("question_id", questionIds);

    // Get unique learning card IDs
    const learningCardIds = Array.from(
      new Set(data?.map((q) => q.learning_card_id).filter(Boolean)),
    );

    // Fetch all categories for direct category_id lookups
    const { data: allCategories } = await supabase
      .from("categories")
      .select("id, name, slug, card_type")
      .eq("is_active", true);

    // Batch fetch all categories for these learning cards
    const { data: allCardCategories } = await supabase
      .from("card_categories")
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
      `,
      )
      .in("card_id", learningCardIds);

    // Transform data to match expected format with topics and categories
    const transformedData =
      data?.map((question) => {
        // Get topics for this question
        const questionTopics =
          allQuestionTopics?.filter((qt) => qt.question_id === question.id) ||
          [];
        const topics = questionTopics.map((qt: QuestionTopicRelation) => {
          // Handle topics as array or single object
          const topic = Array.isArray(qt.topics) ? qt.topics[0] : qt.topics;
          return {
            id: topic?.id,
            name: topic?.name,
            slug: topic?.slug,
            difficulty: topic?.difficulty,
            is_primary: qt.is_primary,
            order_index: qt.order_index,
          };
        });

        // Get categories for this question's learning card
        const cardCategories =
          allCardCategories?.filter(
            (cc) => cc.card_id === question.learning_card_id,
          ) || [];
        const categories = cardCategories.map((cc: QuestionCategoryRelation) => {
          // Handle categories as array or single object
          const category = Array.isArray(cc.categories)
            ? cc.categories[0]
            : cc.categories;
          return {
            id: category?.id,
            name: category?.name,
            slug: category?.slug,
            card_type: category?.card_type,
            is_primary: cc.is_primary,
            order_index: cc.order_index,
          };
        });

        // Get primary topic and category
        const primaryTopic = topics.find((t) => t.is_primary) || topics[0];
        // Use the question's direct category_id instead of card categories
        const directCategory = allCategories?.find(
          (c) => c.id === question.category_id,
        );
        const primaryCategory =
          directCategory ||
          categories.find((c) => c.is_primary) ||
          categories[0];

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
          category: primaryCategory?.name || "Unknown",
          category_id: primaryCategory?.id,
          topic: primaryTopic?.name || "Unknown",
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch questions";
    console.error("Error fetching questions:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get Supabase client
    const supabase = getSupabaseClient();

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
      .from("questions")
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create question";
    console.error("Error creating question:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
