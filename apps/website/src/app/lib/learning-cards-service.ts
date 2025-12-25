import { createClient } from "@supabase/supabase-js";
import type {
  LearningCard,
  LearningCardFormData,
  LearningPlanCard,
  CardProgress,
  CardType,
} from "@elzatona/types";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export class LearningCardsService {
  // Learning Cards CRUD operations
  static async getAllCards(): Promise<LearningCard[]> {
    try {
      const { data: cards, error } = await supabase
        .from("learning_cards")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;

      return cards || [];
    } catch (error) {
      console.error("Error fetching learning cards:", error);
      throw error;
    }
  }

  static async getCardById(card_id: string): Promise<LearningCard | null> {
    try {
      const { data: card, error } = await supabase
        .from("learning_cards")
        .select("*")
        .eq("id", card_id)
        .single();

      if (error) throw error;
      return card;
    } catch (error) {
      console.error("Error fetching learning card:", error);
      throw error;
    }
  }

  static async createCard(cardData: LearningCardFormData): Promise<string> {
    try {
      const { data, error } = await supabase
        .from("learning_cards")
        .insert({
          ...cardData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error("Error creating learning card:", error);
      throw error;
    }
  }

  static async updateCard(
    card_id: string,
    cardData: Partial<LearningCardFormData>,
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("learning_cards")
        .update({
          ...cardData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", card_id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating learning card:", error);
      throw error;
    }
  }

  static async deleteCard(card_id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("learning_cards")
        .delete()
        .eq("id", card_id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting learning card:", error);
      throw error;
    }
  }

  // Learning Plan Cards operations
  static async getCardsForPlan(plan_id: string): Promise<LearningPlanCard[]> {
    try {
      const { data: planCards, error } = await supabase
        .from("learning_plan_cards")
        .select("*")
        .eq("plan_id", plan_id)
        .order("order", { ascending: true });

      if (error) throw error;

      const result: LearningPlanCard[] = [];

      for (const planCardData of planCards || []) {
        const card = await this.getCardById(planCardData.card_id);

        if (card) {
          result.push({
            id: planCardData.id,
            ...planCardData,
            card,
            created_at: planCardData.created_at || new Date(),
            updated_at: planCardData.updated_at || new Date(),
          } as LearningPlanCard);
        }
      }

      return result;
    } catch (error) {
      console.error("Error fetching cards for plan:", error);
      throw error;
    }
  }

  static async addCardToPlan(
    plan_id: string,
    card_id: string,
    config: {
      question_count: number;
      timeLimit: number;
      difficulty: "beginner" | "intermediate" | "advanced";
    },
  ): Promise<string> {
    try {
      const { data, error } = await supabase
        .from("learning_plan_cards")
        .insert({
          plan_id,
          card_id,
          ...config,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error("Error adding card to plan:", error);
      throw error;
    }
  }

  static async removeCardFromPlan(planCardId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("learning_plan_cards")
        .delete()
        .eq("id", planCardId);

      if (error) throw error;
    } catch (error) {
      console.error("Error removing card from plan:", error);
      throw error;
    }
  }

  // Card Progress operations
  static async getCardProgress(
    userId: string,
    plan_id: string,
    card_id: string,
  ): Promise<CardProgress | null> {
    try {
      const { data: progress, error } = await supabase
        .from("card_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("plan_id", plan_id)
        .eq("card_id", card_id)
        .single();

      if (error) throw error;
      return progress;
    } catch (error) {
      console.error("Error fetching card progress:", error);
      throw error;
    }
  }

  static async updateCardProgress(
    progressData: Partial<CardProgress>,
  ): Promise<void> {
    try {
      if (!progressData.id) {
        throw new Error("Progress ID is required for update");
      }

      const { error } = await supabase
        .from("card_progress")
        .update({
          ...progressData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", progressData.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating card progress:", error);
      throw error;
    }
  }

  static async createCardProgress(
    progressData: Omit<CardProgress, "id">,
  ): Promise<string> {
    try {
      const { data, error } = await supabase
        .from("card_progress")
        .insert({
          ...progressData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error("Error creating card progress:", error);
      throw error;
    }
  }

  // Utility methods
  static async getCardsByType(type: CardType): Promise<LearningCard[]> {
    try {
      const { data: cards, error } = await supabase
        .from("learning_cards")
        .select("*")
        .eq("type", type)
        .order("order", { ascending: true });

      if (error) throw error;
      return cards || [];
    } catch (error) {
      console.error("Error fetching cards by type:", error);
      throw error;
    }
  }

  static async getActiveCards(): Promise<LearningCard[]> {
    try {
      const { data: cards, error } = await supabase
        .from("learning_cards")
        .select("*")
        .eq("is_active", true)
        .order("order", { ascending: true });

      if (error) throw error;
      return cards || [];
    } catch (error) {
      console.error("Error fetching active cards:", error);
      throw error;
    }
  }
}
