import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../../../src/lib/utils/api-config";

// Helper function to create Supabase client using centralized config
function getSupabaseClient() {
  const config = getSupabaseConfig();
  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// GET /api/plans/[id]/hierarchy - Get full hierarchy: Plan → Cards → Categories → Topics → Questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;
    const supabase = getSupabaseClient();

    // 1. Get cards in the plan
    const { data: planCards, error: pcError } = await supabase
      .from("plan_cards")
      .select("*, learning_cards(*)")
      .eq("plan_id", planId)
      .order("order_index", { ascending: true });

    if (pcError) throw pcError;

    if (!planCards || planCards.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // 2. For each card, get categories (via card_categories or direct learning_card_id)
    const cardIds = planCards.map((pc) => pc.card_id);

    // Try to get categories via card_categories junction table (if it exists)
    let cardCategories: any[] = [];
    try {
      const { data, error } = await supabase
        .from("card_categories")
        .select("*, categories(*)")
        .in("card_id", cardIds)
        .order("order_index", { ascending: true });

      if (!error && data) {
        cardCategories = data;
      }
    } catch (error) {
      // Junction table doesn't exist, will use direct relationships
      console.log(
        "card_categories table not found, using direct relationships",
      );
    }

    // Also get categories directly linked to cards (primary method if junction table doesn't exist)
    if (cardCategories.length === 0) {
      const { data: directCategories, error: dcError } = await supabase
        .from("categories")
        .select("*")
        .in("learning_card_id", cardIds)
        .order("order_index", { ascending: true });

      if (!dcError && directCategories) {
        // Convert direct categories to card_categories format
        cardCategories = directCategories.map((cat) => ({
          card_id: cat.learning_card_id,
          category_id: cat.id,
          categories: cat,
        }));
      }
    }

    // 3. For each category, get topics (via category_topics or direct category_id)
    const categoryIds = cardCategories?.map((cc) => cc.category_id) || [];

    // Try to get topics via category_topics junction table (if it exists)
    let categoryTopics: any[] = [];
    try {
      const { data, error } = await supabase
        .from("category_topics")
        .select("*, topics(*)")
        .in("category_id", categoryIds)
        .order("order_index", { ascending: true });

      if (!error && data) {
        categoryTopics = data;
      }
    } catch (error) {
      // Junction table doesn't exist, will use direct relationships
      console.log(
        "category_topics table not found, using direct relationships",
      );
    }

    // Get topics directly linked to categories (primary method)
    const { data: directTopics, error: dtError } = await supabase
      .from("topics")
      .select("*")
      .in("category_id", categoryIds)
      .order("order_index", { ascending: true });

    if (dtError) throw dtError;

    // Merge topics from both sources
    const allTopicIds = new Set<string>();
    const topicsMap = new Map<string, any>();

    // Add topics from junction table if available
    categoryTopics?.forEach((ct) => {
      if (ct.topics) {
        allTopicIds.add(ct.topics.id);
        topicsMap.set(ct.topics.id, {
          ...ct.topics,
          category_id: ct.category_id,
        });
      }
    });

    // Add topics from direct relationships (primary source)
    directTopics?.forEach((topic) => {
      if (!topicsMap.has(topic.id)) {
        allTopicIds.add(topic.id);
        topicsMap.set(topic.id, topic);
      }
    });

    const topicIds = Array.from(allTopicIds);

    // 4. For each topic, get questions (via questions_topics or direct topic_id)
    let questions: any[] = [];

    if (topicIds.length > 0) {
      // Try to get questions via questions_topics junction table (if it exists)
      let questionTopics: any[] = [];
      try {
        const { data, error } = await supabase
          .from("questions_topics")
          .select("*, questions(*)")
          .in("topic_id", topicIds)
          .order("order_index", { ascending: true });

        if (!error && data) {
          questionTopics = data;
        }
      } catch (error) {
        // Junction table doesn't exist, will use direct relationships
        console.log(
          "questions_topics table not found, using direct relationships",
        );
      }

      // Get questions directly linked to topics (primary method)
      const { data: directQuestions, error: dqError } = await supabase
        .from("questions")
        .select("*")
        .in("topic_id", topicIds)
        .order("created_at", { ascending: true });

      if (dqError) throw dqError;

      // Merge questions from both sources
      const questionsMap = new Map<string, any>();

      // Add questions from junction table if available
      questionTopics?.forEach((qt) => {
        if (qt.questions) {
          questionsMap.set(qt.questions.id, {
            ...qt.questions,
            topic_id: qt.topic_id,
          });
        }
      });

      // Add questions from direct relationships (primary source)
      directQuestions?.forEach((q) => {
        if (!questionsMap.has(q.id)) {
          questionsMap.set(q.id, q);
        }
      });

      questions = Array.from(questionsMap.values());
    }

    // 5. Get total question counts for each topic (all questions, not filtered by plan)
    const topicQuestionCounts = new Map<string, number>();
    if (topicIds.length > 0) {
      try {
        // First, try to get counts from questions_topics junction table (preferred method)
        const { data: questionTopicCounts, error: qtcError } = await supabase
          .from("questions_topics")
          .select("topic_id")
          .in("topic_id", topicIds);

        if (
          !qtcError &&
          questionTopicCounts &&
          questionTopicCounts.length > 0
        ) {
          // Count questions per topic from junction table
          questionTopicCounts.forEach((qt) => {
            const currentCount = topicQuestionCounts.get(qt.topic_id) || 0;
            topicQuestionCounts.set(qt.topic_id, currentCount + 1);
          });
        } else {
          // Fallback: count from direct topic_id relationships if junction table doesn't exist or is empty
          const { data: directQuestionCounts, error: dqcError } = await supabase
            .from("questions")
            .select("topic_id")
            .in("topic_id", topicIds)
            .not("topic_id", "is", null);

          if (!dqcError && directQuestionCounts) {
            directQuestionCounts.forEach((q) => {
              if (q.topic_id) {
                const currentCount = topicQuestionCounts.get(q.topic_id) || 0;
                topicQuestionCounts.set(q.topic_id, currentCount + 1);
              }
            });
          }
        }

        console.log(
          `📊 Total question counts per topic:`,
          Object.fromEntries(topicQuestionCounts),
        );
      } catch (error) {
        console.warn("⚠️ Could not get total question counts:", error);
      }
    }

    // 6. Filter questions to only include those in the plan (via plan_questions)
    if (questions.length > 0) {
      const questionIds = questions.map((q) => q.id);

      // Get questions that are actually in this plan
      const { data: planQuestions, error: pqError } = await supabase
        .from("plan_questions")
        .select("question_id")
        .eq("plan_id", planId)
        .in("question_id", questionIds);

      if (!pqError && planQuestions) {
        const planQuestionIds = new Set(
          planQuestions.map((pq) => pq.question_id),
        );
        // Filter questions to only include those in the plan
        questions = questions.filter((q) => planQuestionIds.has(q.id));
        console.log(
          `📋 Filtered questions: ${questions.length} out of ${questionIds.length} are in plan ${planId}`,
        );
      } else if (pqError) {
        console.warn(
          "⚠️ Could not filter questions by plan_questions:",
          pqError.message,
        );
        // If plan_questions table doesn't exist or query fails, continue with all questions
      }
    }

    // Build hierarchical structure
    const hierarchy = planCards
      .map((pc) => {
        const card = pc.learning_cards;
        if (!card) return null;

        // Get categories for this card
        const cardCats =
          cardCategories?.filter((cc) => cc.card_id === pc.card_id) || [];

        const categories = cardCats
          .map((cc) => {
            const category = cc.categories;
            if (!category) return null;

            // Get topics for this category
            const catTopics = Array.from(topicsMap.values()).filter(
              (t: any) => t.category_id === category.id,
            );

            const topics = catTopics.map((topic) => {
              // Get questions for this topic (filtered by plan)
              const topicQuestions = questions.filter(
                (q: any) => q.topic_id === topic.id,
              );

              // Get total question count for this topic (all questions, not just in plan)
              const totalQuestionCount = topicQuestionCounts.get(topic.id) || 0;

              return {
                ...topic,
                questions: topicQuestions,
                totalQuestionCount: totalQuestionCount,
                planQuestionCount: topicQuestions.length,
              };
            });

            return {
              ...category,
              topics,
            };
          })
          .filter(Boolean);

        return {
          ...card,
          planCardId: pc.id,
          categories,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: hierarchy,
    });
  } catch (error: any) {
    console.error("Error fetching plan hierarchy:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plan hierarchy",
      },
      { status: 500 },
    );
  }
}
