import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET /api/guided-learning/plan-details/[planId] - Get detailed plan with cards, categories, topics, and questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    // Use environment variables for Supabase credentials with fallback
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://hpnewqkvpnthpohvxcmq.supabase.co';
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

    console.log('🔍 Plan Details API Debug: Using Supabase URL:', supabaseUrl);
    console.log(
      '🔍 Plan Details API Debug: Anon key exists:',
      !!supabaseAnonKey
    );

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { planId } = await params;

    if (!planId) {
      return NextResponse.json(
        { success: false, error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Get the plan from Supabase
    let { data: plan, error: planError } = await supabase
      .from('learning_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found in database' },
        { status: 404 }
      );
    }

    // Get cards with their relationships using Supabase joins
    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select(
        `
        *,
        categories (
          *,
          topics (
            *,
            questions (*)
          )
        )
      `
      )
      .order('created_at', { ascending: true });

    if (cardsError) {
      console.error('Error fetching cards:', cardsError);
    }

    // Always use separate queries for better control
    console.log('Using separate queries for better data control...');

    // Get all categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
    }
    const categories = categoriesData || [];

    // Get all topics
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .order('created_at', { ascending: true });

    if (topicsError) {
      console.error('Error fetching topics:', topicsError);
    }
    const topics = topicsData || [];

    // Get questions associated with this specific plan via plan_questions table
    console.log(
      '🔍 Plan Details Debug: Querying plan_questions for planId:',
      planId
    );

    const { data: planQuestionsData, error: planQuestionsError } =
      await supabase
        .from('plan_questions')
        .select('question_id, topic_id')
        .eq('plan_id', planId)
        .eq('is_active', true);

    console.log('🔍 Plan Details Debug: Raw plan_questions query result:', {
      planQuestionsData,
      planQuestionsError,
      planQuestionsCount: planQuestionsData?.length || 0,
      samplePlanQuestions: planQuestionsData?.slice(0, 3) || [],
    });

    if (planQuestionsError) {
      console.error('Error fetching plan questions:', planQuestionsError);
    }

    console.log('🔍 Plan Details Debug: Plan questions query result:', {
      planQuestionsCount: planQuestionsData?.length || 0,
      planQuestions:
        planQuestionsData?.map(pq => ({
          questionId: pq.question_id,
          topicId: pq.topic_id,
        })) || [],
    });

    // Get all questions first (no joins - questions table has topic_id directly)
    const { data: allQuestionsData, error: allQuestionsError } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (allQuestionsError) {
      console.error('Error fetching all questions:', allQuestionsError);
    } else {
      console.log(
        '🔍 Plan Details Debug: All questions count:',
        allQuestionsData?.length || 0
      );
    }

    // Filter questions based on plan_questions associations
    let questions;
    if (planQuestionsData && planQuestionsData.length > 0 && allQuestionsData) {
      const planQuestionIds = planQuestionsData.map(pq => pq.question_id);
      questions = allQuestionsData.filter(q => planQuestionIds.includes(q.id));
      console.log(
        '🔍 Plan Details Debug: Filtered questions count:',
        questions.length
      );
    } else {
      questions = allQuestionsData || [];
      console.log(
        '🔍 Plan Details Debug: Using all questions (no plan_questions filter)'
      );
    }

    console.log(
      '🔍 Plan Details Debug: Final questions count:',
      questions?.length || 0
    );
    console.log(
      '🔍 Plan Details Debug: Sample questions:',
      questions?.slice(0, 3).map(q => ({
        id: q.id,
        title: q.title,
        topic_id: q.topic_id,
      })) || []
    );

    // Ensure options are properly parsed and structured
    if (questions && questions.length > 0) {
      questions = questions.map(q => {
        // Parse options if it's a string or ensure it's an array
        let parsedOptions = q.options;

        // If options is a string (JSON stringified), parse it
        if (typeof q.options === 'string') {
          try {
            parsedOptions = JSON.parse(q.options);
          } catch (e) {
            console.error(`Failed to parse options for question ${q.id}:`, e);
            parsedOptions = null;
          }
        }

        // Return question with properly parsed options
        return {
          ...q,
          options: parsedOptions,
        };
      });

      console.log(
        '🔍 Plan Details Debug: Questions with options parsed. Sample:',
        questions?.slice(0, 2).map(q => ({
          id: q.id,
          title: q.title,
          options: q.options,
          optionsType: typeof q.options,
          optionsLength: Array.isArray(q.options) ? q.options.length : null,
        })) || []
      );
    }
    console.log('🔍 Plan Details Debug: Raw data counts:', {
      cards: cards?.length || 0,
      categories: categories?.length || 0,
      topics: topics?.length || 0,
      questions: questions?.length || 0,
      planQuestions: planQuestionsData?.length || 0,
    });

    console.log('🔍 Plan Details Debug: Sample card and category data:', {
      sampleCard: cards?.[0]
        ? {
            id: cards[0].id,
            title: cards[0].title,
            type: cards[0].type,
          }
        : null,
      sampleCategories:
        categories?.slice(0, 3).map(c => ({
          id: c.id,
          name: c.name,
          learning_card_id: c.learning_card_id,
          card_type: c.card_type,
        })) || [],
      totalCategories: categories?.length || 0,
      categoriesWithLearningCardId:
        categories?.filter(c => c.learning_card_id).length || 0,
    });

    // Build the hierarchy using plan_questions data
    // Group questions by their topic_id and find their category_id
    const questionsByTopic = new Map();
    const questionsByCategory = new Map();

    (questions || []).forEach(question => {
      if (question.topic_id) {
        const topicId = question.topic_id;

        // Find the topic to get its category_id
        const topic = topics.find(t => t.id === topicId);
        const categoryId = topic?.category_id;

        if (!questionsByTopic.has(topicId)) {
          questionsByTopic.set(topicId, []);
        }
        questionsByTopic.get(topicId).push(question);

        if (categoryId) {
          if (!questionsByCategory.has(categoryId)) {
            questionsByCategory.set(categoryId, []);
          }
          questionsByCategory.get(categoryId).push(question);
        }
      }
    });

    console.log('🔍 Plan Details Debug: Questions grouped by topic/category:', {
      topicsWithQuestions: Array.from(questionsByTopic.entries()).map(
        ([topicId, qs]) => ({
          topicId,
          questionCount: qs.length,
          topicName: topics.find(t => t.id === topicId)?.name,
        })
      ),
      categoriesWithQuestions: Array.from(questionsByCategory.entries()).map(
        ([categoryId, qs]) => ({
          categoryId,
          questionCount: qs.length,
          categoryName: categories.find(c => c.id === categoryId)?.name,
        })
      ),
    });

    // Build the hierarchy: Cards -> Categories -> Topics -> Questions
    const cardsWithData = (cards || []).map(card => {
      // Find categories that belong to this card
      const cardCategories = (categories || []).filter(category => {
        // Match by learning_card_id first, then by card_type as fallback
        const matchesCardId = category.learning_card_id === card.id;
        const matchesCardType = category.card_type === card.type;

        console.log(`🔍 Category matching for card "${card.title}":`, {
          categoryName: category.name,
          categoryLearningCardId: category.learning_card_id,
          cardId: card.id,
          categoryCardType: category.card_type,
          cardType: card.type,
          matchesCardId,
          matchesCardType,
          willInclude: matchesCardId || matchesCardType,
        });

        return matchesCardId || matchesCardType;
      });

      console.log(`🔍 Plan Details Debug: Card "${card.title}" (${card.id})`, {
        cardType: card.type,
        cardId: card.id,
        foundCategories: cardCategories.length,
        categoryIds: cardCategories.map(c => c.id),
      });

      const categoriesWithTopics = cardCategories.map(category => {
        // Find topics that belong to this category
        const categoryTopics = (topics || []).filter(
          topic => topic.category_id === category.id
        );

        const topicsWithQuestions = categoryTopics.map(topic => {
          // Get questions for this topic from plan_questions
          const topicQuestions = questionsByTopic.get(topic.id) || [];

          return {
            ...topic,
            questions: topicQuestions,
            questionCount: topicQuestions.length,
          };
        });

        return {
          ...category,
          topics: topicsWithQuestions,
          questionCount: topicsWithQuestions.reduce(
            (sum, topic) => sum + topic.questionCount,
            0
          ),
        };
      });

      return {
        ...card,
        categories: categoriesWithTopics,
        questionCount: categoriesWithTopics.reduce(
          (sum, category) => sum + category.questionCount,
          0
        ),
        hasQuestions: categoriesWithTopics.some(cat => cat.questionCount > 0),
      };
    });

    // Calculate total questions
    const totalQuestions = cardsWithData.reduce(
      (sum, card) => sum + card.questionCount,
      0
    );

    console.log('🔍 Plan Details Debug: Final result:', {
      totalCards: cardsWithData.length,
      totalQuestions,
      cardsWithQuestions: cardsWithData.filter(c => c.questionCount > 0).length,
      cardDetails: cardsWithData.map(c => ({
        title: c.title,
        questionCount: c.questionCount,
        categoriesCount: c.categories.length,
      })),
    });

    return NextResponse.json({
      success: true,
      data: {
        ...plan,
        cards: cardsWithData,
        totalQuestions,
        // Add raw data for debugging
        rawData: {
          cards: cards || [],
          categories: categories || [],
          topics: topics || [],
          questions: questions || [],
          planQuestionsCount: planQuestionsData?.length || 0,
        },
        // Legacy compatibility - create sections from cards for backward compatibility
        sections: cardsWithData.map((card, index) => ({
          id: card.id,
          name: card.title,
          category: card.type,
          weight: Math.round((card.questionCount / totalQuestions) * 100) || 0,
          order: index + 1,
          questions: card.categories.flatMap(cat =>
            cat.topics.flatMap(topic => topic.questions)
          ),
          questionCount: card.questionCount,
          // Add card-specific metadata
          cardType: card.type,
          description: card.description,
          color: card.color,
          icon: card.icon,
          hasQuestions: card.questionCount > 0,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching plan details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan details' },
      { status: 500 }
    );
  }
}
