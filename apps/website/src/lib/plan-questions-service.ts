import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface PlanQuestion {
  id: string;
  plan_id: string;
  question_id: string;
  card_id: string;
  categoryId?: string;
  topicId?: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface PlanQuestionFormData {
  plan_id: string;
  question_id: string;
  card_id: string;
  categoryId?: string;
  topicId?: string;
  order?: number;
}

const PLAN_QUESTIONS_COLLECTION = 'plan_questions';

export class PlanQuestionsService {
  // Get all plan questions for a specific plan
  static async getPlanQuestions(plan_id: string): Promise<PlanQuestion[]> {
    try {
      const { data: planQuestions, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*')
        .eq('plan_id', plan_id)
        .order('order', { ascending: true });

      if (error) throw error;

      return planQuestions || [];
    } catch (error) {
      console.error('Error fetching plan questions:', error);
      throw error;
    }
  }

  // Get a specific plan question by ID
  static async getPlanQuestionById(id: string): Promise<PlanQuestion | null> {
    try {
      const { data: planQuestion, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return planQuestion;
    } catch (error) {
      console.error('Error fetching plan question:', error);
      throw error;
    }
  }

  // Create a new plan question
  static async createPlanQuestion(
    planQuestionData: PlanQuestionFormData
  ): Promise<string> {
    try {
      const { data, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .insert({
          ...planQuestionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating plan question:', error);
      throw error;
    }
  }

  // Update a plan question
  static async updatePlanQuestion(
    id: string,
    planQuestionData: Partial<PlanQuestionFormData>
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .update({
          ...planQuestionData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating plan question:', error);
      throw error;
    }
  }

  // Delete a plan question
  static async deletePlanQuestion(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting plan question:', error);
      throw error;
    }
  }

  // Get plan questions by card
  static async getPlanQuestionsByCard(
    card_id: string
  ): Promise<PlanQuestion[]> {
    try {
      const { data: planQuestions, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*')
        .eq('card_id', card_id)
        .order('order', { ascending: true });

      if (error) throw error;
      return planQuestions || [];
    } catch (error) {
      console.error('Error fetching plan questions by card:', error);
      throw error;
    }
  }

  // Get plan questions by category
  static async getPlanQuestionsByCategory(
    categoryId: string
  ): Promise<PlanQuestion[]> {
    try {
      const { data: planQuestions, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*')
        .eq('categoryId', categoryId)
        .order('order', { ascending: true });

      if (error) throw error;
      return planQuestions || [];
    } catch (error) {
      console.error('Error fetching plan questions by category:', error);
      throw error;
    }
  }

  // Get plan questions by topic
  static async getPlanQuestionsByTopic(
    topicId: string
  ): Promise<PlanQuestion[]> {
    try {
      const { data: planQuestions, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*')
        .eq('topicId', topicId)
        .order('order', { ascending: true });

      if (error) throw error;
      return planQuestions || [];
    } catch (error) {
      console.error('Error fetching plan questions by topic:', error);
      throw error;
    }
  }

  // Reorder plan questions
  static async reorderPlanQuestions(
    plan_id: string,
    questionIds: string[]
  ): Promise<void> {
    try {
      const updates = questionIds.map((questionId, index) => ({
        id: questionId,
        order: index + 1,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from(PLAN_QUESTIONS_COLLECTION)
          .update({
            order: update.order,
            updated_at: update.updated_at,
          })
          .eq('id', update.id)
          .eq('plan_id', plan_id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error reordering plan questions:', error);
      throw error;
    }
  }

  // Bulk create plan questions
  static async bulkCreatePlanQuestions(
    planQuestionsData: PlanQuestionFormData[]
  ): Promise<string[]> {
    try {
      const insertData = planQuestionsData.map(data => ({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .insert(insertData)
        .select();

      if (error) throw error;
      return data.map(item => item.id);
    } catch (error) {
      console.error('Error bulk creating plan questions:', error);
      throw error;
    }
  }

  // Bulk delete plan questions
  static async bulkDeletePlanQuestions(ids: string[]): Promise<void> {
    try {
      const { error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .delete()
        .in('id', ids);

      if (error) throw error;
    } catch (error) {
      console.error('Error bulk deleting plan questions:', error);
      throw error;
    }
  }

  // Get plan questions count
  static async getPlanQuestionsCount(plan_id: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from(PLAN_QUESTIONS_COLLECTION)
        .select('*', { count: 'exact', head: true })
        .eq('plan_id', plan_id);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting plan questions count:', error);
      throw error;
    }
  }
}
