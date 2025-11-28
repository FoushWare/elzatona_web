import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/plans/[id]/hierarchy - Get full hierarchy: Plan → Cards → Categories → Topics → Questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: planId } = await params;

    // 1. Get cards in the plan
    const { data: planCards, error: pcError } = await supabase
      .from('plan_cards')
      .select('*, learning_cards(*)')
      .eq('plan_id', planId)
      .order('order_index', { ascending: true });

    if (pcError) throw pcError;

    if (!planCards || planCards.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // 2. For each card, get categories (via card_categories or direct learning_card_id)
    const cardIds = planCards.map(pc => pc.card_id);
    
    // Try to get categories via card_categories junction table (if it exists)
    let cardCategories: any[] = [];
    try {
      const { data, error } = await supabase
        .from('card_categories')
        .select('*, categories(*)')
        .in('card_id', cardIds)
        .order('order_index', { ascending: true });
      
      if (!error && data) {
        cardCategories = data;
      }
    } catch (error) {
      // Junction table doesn't exist, will use direct relationships
      console.log('card_categories table not found, using direct relationships');
    }

    // Also get categories directly linked to cards (primary method if junction table doesn't exist)
    if (cardCategories.length === 0) {
      const { data: directCategories, error: dcError } = await supabase
        .from('categories')
        .select('*')
        .in('learning_card_id', cardIds)
        .order('order_index', { ascending: true });

      if (!dcError && directCategories) {
        // Convert direct categories to card_categories format
        cardCategories = directCategories.map(cat => ({
          card_id: cat.learning_card_id,
          category_id: cat.id,
          categories: cat,
        }));
      }
    }

    // 3. For each category, get topics (via category_topics or direct category_id)
    const categoryIds = cardCategories?.map(cc => cc.category_id) || [];
    
    // Try to get topics via category_topics junction table (if it exists)
    let categoryTopics: any[] = [];
    try {
      const { data, error } = await supabase
        .from('category_topics')
        .select('*, topics(*)')
        .in('category_id', categoryIds)
        .order('order_index', { ascending: true });
      
      if (!error && data) {
        categoryTopics = data;
      }
    } catch (error) {
      // Junction table doesn't exist, will use direct relationships
      console.log('category_topics table not found, using direct relationships');
    }

    // Get topics directly linked to categories (primary method)
    const { data: directTopics, error: dtError } = await supabase
      .from('topics')
      .select('*')
      .in('category_id', categoryIds)
      .order('order_index', { ascending: true });

    if (dtError) throw dtError;

    // Merge topics from both sources
    const allTopicIds = new Set<string>();
    const topicsMap = new Map<string, any>();
    
    // Add topics from junction table if available
    categoryTopics?.forEach(ct => {
      if (ct.topics) {
        allTopicIds.add(ct.topics.id);
        topicsMap.set(ct.topics.id, { ...ct.topics, category_id: ct.category_id });
      }
    });
    
    // Add topics from direct relationships (primary source)
    directTopics?.forEach(topic => {
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
          .from('questions_topics')
          .select('*, questions(*)')
          .in('topic_id', topicIds)
          .order('order_index', { ascending: true });
        
        if (!error && data) {
          questionTopics = data;
        }
      } catch (error) {
        // Junction table doesn't exist, will use direct relationships
        console.log('questions_topics table not found, using direct relationships');
      }

      // Get questions directly linked to topics (primary method)
      const { data: directQuestions, error: dqError } = await supabase
        .from('questions')
        .select('*')
        .in('topic_id', topicIds)
        .order('created_at', { ascending: true });

      if (dqError) throw dqError;

      // Merge questions from both sources
      const questionsMap = new Map<string, any>();
      
      // Add questions from junction table if available
      questionTopics?.forEach(qt => {
        if (qt.questions) {
          questionsMap.set(qt.questions.id, { ...qt.questions, topic_id: qt.topic_id });
        }
      });
      
      // Add questions from direct relationships (primary source)
      directQuestions?.forEach(q => {
        if (!questionsMap.has(q.id)) {
          questionsMap.set(q.id, q);
        }
      });

      questions = Array.from(questionsMap.values());
    }

    // Build hierarchical structure
    const hierarchy = planCards.map(pc => {
      const card = pc.learning_cards;
      if (!card) return null;

      // Get categories for this card
      const cardCats = cardCategories?.filter(cc => cc.card_id === pc.card_id) || [];
      
      const categories = cardCats.map(cc => {
        const category = cc.categories;
        if (!category) return null;

        // Get topics for this category
        const catTopics = Array.from(topicsMap.values()).filter(
          (t: any) => t.category_id === category.id
        );

        const topics = catTopics.map(topic => {
          // Get questions for this topic
          const topicQuestions = questions.filter(
            (q: any) => q.topic_id === topic.id
          );

          return {
            ...topic,
            questions: topicQuestions,
          };
        });

        return {
          ...category,
          topics,
        };
      }).filter(Boolean);

      return {
        ...card,
        planCardId: pc.id,
        categories,
      };
    }).filter(Boolean);

    return NextResponse.json({
      success: true,
      data: hierarchy,
    });
  } catch (error: any) {
    console.error('Error fetching plan hierarchy:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch plan hierarchy' },
      { status: 500 }
    );
  }
}

