const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const planId = 'b0c508f5-8279-4bb4-be74-ad0a65f2dd95';

async function seedOneQuestionPerCategory() {
  try {
    console.log('🔄 Starting seed process for plan:', planId);

    // 1. Get all cards for this plan via plan_cards junction table
    const { data: planCards, error: planCardsError } = await supabase
      .from('plan_cards')
      .select('card_id, order_index')
      .eq('plan_id', planId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (planCardsError) {
      throw new Error(`Error fetching plan_cards: ${planCardsError.message}`);
    }

    if (!planCards || planCards.length === 0) {
      throw new Error(
        'No cards found for this plan. Please create plan_cards associations first.'
      );
    }

    const cardIds = planCards.map(pc => pc.card_id);

    // Get the actual card details
    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('id, title, type')
      .in('id', cardIds);

    if (cardsError) {
      throw new Error(`Error fetching cards: ${cardsError.message}`);
    }

    console.log(`✅ Found ${cards.length} cards`);
    console.log(
      'Cards:',
      cards.map(c => c.title)
    );

    // 2. Get all categories for these cards
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, learning_card_id, card_type')
      .in('learning_card_id', cardIds);

    if (categoriesError) {
      throw new Error(`Error fetching categories: ${categoriesError.message}`);
    }

    console.log(`✅ Found ${categories.length} categories`);
    console.log(
      'Categories:',
      categories.map(c => c.name)
    );

    // 3. Get topics for each category
    const categoryIds = categories.map(c => c.id);
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('id, name, category_id')
      .in('category_id', categoryIds);

    if (topicsError) {
      throw new Error(`Error fetching topics: ${topicsError.message}`);
    }

    console.log(`✅ Found ${topics.length} topics`);

    // Group topics by category
    const topicsByCategory = {};
    topics.forEach(topic => {
      if (!topicsByCategory[topic.category_id]) {
        topicsByCategory[topic.category_id] = [];
      }
      topicsByCategory[topic.category_id].push(topic);
    });

    // 4. Seed one question for each category (using the first topic in each category)
    const seededQuestions = [];

    for (const category of categories) {
      const categoryTopics = topicsByCategory[category.id] || [];

      if (categoryTopics.length === 0) {
        console.log(`⚠️  No topics found for category: ${category.name}`);
        continue;
      }

      const firstTopic = categoryTopics[0];
      console.log(
        `📝 Creating question for category: ${category.name}, topic: ${firstTopic.name}`
      );

      // Check if we already have questions for this topic
      const { data: existingQuestions } = await supabase
        .from('questions')
        .select('id')
        .eq('topic_id', firstTopic.id)
        .limit(1);

      if (existingQuestions && existingQuestions.length > 0) {
        console.log(`✅ Category ${category.name} already has questions`);
        continue;
      }

      // Create a simple question with options
      const questionData = {
        title: `Sample question for ${category.name}`,
        content: `This is a sample question for testing the ${category.name} category in the ${cards.find(c => c.id === category.learning_card_id)?.title || 'Unknown'} card.`,
        difficulty: 'medium',
        type: 'multiple-choice',
        topic_id: firstTopic.id,
        options: [
          { id: '1', text: 'Option A', isCorrect: true },
          { id: '2', text: 'Option B', isCorrect: false },
          { id: '3', text: 'Option C', isCorrect: false },
          { id: '4', text: 'Option D', isCorrect: false },
        ],
        correct_answer: 'Option A',
        explanation: 'This is a sample explanation for testing purposes.',
      };

      const { data: newQuestion, error: questionError } = await supabase
        .from('questions')
        .insert(questionData)
        .select()
        .single();

      if (questionError) {
        console.error(
          `❌ Error creating question for ${category.name}:`,
          questionError
        );
        continue;
      }

      console.log(`✅ Created question: ${newQuestion.id}`);

      // 5. Associate the question with the plan
      const { error: planQuestionError } = await supabase
        .from('plan_questions')
        .insert({
          plan_id: planId,
          question_id: newQuestion.id,
          topic_id: firstTopic.id,
          is_active: true,
        });

      if (planQuestionError) {
        console.error(
          `❌ Error associating question with plan for ${category.name}:`,
          planQuestionError
        );
        continue;
      }

      console.log(`✅ Associated question ${newQuestion.id} with plan`);
      seededQuestions.push({
        category: category.name,
        questionId: newQuestion.id,
        topic: firstTopic.name,
      });
    }

    console.log('\n🎉 Seed completed!');
    console.log(
      `✅ Created ${seededQuestions.length} questions across ${categories.length} categories`
    );
    console.log('\nSeeded questions:');
    seededQuestions.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.category} → ${item.topic} (Question ID: ${item.questionId})`
      );
    });
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedOneQuestionPerCategory();
