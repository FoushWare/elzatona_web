// Server-side Supabase configuration for Next.js 15 compatibility
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Initialize Supabase client (server-side with service role key)
let supabase: ReturnType<typeof createClient> | null = null;

try {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  console.log(
    '✅ Supabase server initialized successfully with service role key!'
  );
} catch (error) {
  console.error('❌ Supabase server initialization failed:', error);
}

// Export Supabase client for server-side use
export { supabase };

// Export common Supabase operations for easy migration
export const supabaseOperations = {
  // Learning Cards
  async getLearningCards(filters?: {
    type?: string;
    isActive?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    let query = (supabase as any).from('learning_cards').select('*');

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters?.orderBy) {
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === 'asc',
      });
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  },

  async createLearningCard(cardData: {
    title: string;
    type: string;
    description: string;
    color?: string;
    icon?: string;
    order_index?: number;
    is_active?: boolean;
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...cardData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: cardData.is_active !== false,
    };

    return await (supabase as any)
      .from('learning_cards')
      .insert(data)
      .select()
      .single();
  },

  async updateLearningCard(
    id: string,
    updates: Partial<{
      title: string;
      type: string;
      description: string;
      color: string;
      icon: string;
      order_index: number;
      is_active: boolean;
    }>
  ) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return await (supabase as any)
      .from('learning_cards')
      .update(data)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteLearningCard(id: string) {
    if (!supabase) throw new Error('Supabase not initialized');
    return await (supabase as any).from('learning_cards').delete().eq('id', id);
  },

  // Categories
  async getCategories(filters?: {
    isActive?: boolean;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    let query = (supabase as any).from('categories').select('*');

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters?.orderBy) {
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === 'asc',
      });
    }

    return await query;
  },

  async createCategory(categoryData: {
    name: string;
    description: string;
    slug?: string;
    card_type?: string;
    icon?: string;
    color?: string;
    order_index?: number;
    is_active?: boolean;
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...categoryData,
      slug:
        categoryData.slug ||
        categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      card_type:
        categoryData.card_type ||
        categoryData.slug ||
        categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: categoryData.is_active !== false,
    };

    return await (supabase as any)
      .from('categories')
      .insert(data)
      .select()
      .single();
  },

  // Topics
  async getTopics(filters?: {
    categoryId?: string;
    isActive?: boolean;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    let query = (supabase as any).from('topics').select('*');

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters?.orderBy) {
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === 'asc',
      });
    }

    return await query;
  },

  async createTopic(topicData: {
    name: string;
    description: string;
    slug?: string;
    category_id?: string;
    order_index?: number;
    is_active?: boolean;
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...topicData,
      slug: topicData.slug || topicData.name.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: topicData.is_active !== false,
    };

    return await (supabase as any)
      .from('topics')
      .insert(data)
      .select()
      .single();
  },

  // Questions
  async getQuestions(filters?: {
    topicId?: string;
    difficulty?: string;
    questionType?: string;
    isActive?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    let query = (supabase as any).from('questions').select('*');

    if (filters?.topicId) {
      query = query.eq('topic_id', filters.topicId);
    }
    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }
    if (filters?.questionType) {
      query = query.eq('question_type', filters.questionType);
    }
    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters?.orderBy) {
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === 'asc',
      });
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  },

  async createQuestion(questionData: {
    question_text: string;
    explanation: string;
    topic_id?: string;
    difficulty?: string;
    question_type?: string;
    options?: string;
    correct_answer?: string;
    tags?: string;
    is_active?: boolean;
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...questionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: questionData.is_active !== false,
    };

    return await (supabase as any)
      .from('questions')
      .insert(data)
      .select()
      .single();
  },

  // Learning Plans
  async getLearningPlans(filters?: {
    difficulty?: string;
    isActive?: boolean;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    let query = (supabase as any).from('learning_plans').select('*');

    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }
    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters?.orderBy) {
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === 'asc',
      });
    }

    return await query;
  },

  async createLearningPlan(planData: {
    title: string;
    description: string;
    difficulty?: string;
    estimated_time?: number;
    is_active?: boolean;
  }) {
    if (!supabase) throw new Error('Supabase not initialized');

    const data = {
      ...planData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: planData.is_active !== false,
    };

    return await (supabase as any)
      .from('learning_plans')
      .insert(data)
      .select()
      .single();
  },
};
