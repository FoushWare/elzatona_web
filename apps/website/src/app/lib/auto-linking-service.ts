import { getSupabaseClient } from "./get-supabase-client";

export interface QuestionData {
  id?: string;
  title: string;
  content: string;
  type: "single" | "multiple" | "open-ended" | "code";
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  subcategory?: string;
  learningPath: string;
  sectionId?: string;
  tags: string[];
  options?: unknown[];
  correctAnswers?: string[];
  explanation: string;
  points: number;
  timeLimit: number;
  audioQuestion?: string;
  audioAnswer?: string;
  hints?: string[];
  references?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SectionData {
  id: string;
  name: string;
  description: string;
  learningPathId: string;
  order: number;
  questionLimit: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectorData {
  id: string;
  name: string;
  description: string;
  learningPathId: string;
  order: number;
  questionIds: string[];
  totalQuestions: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  prerequisites: string[];
  isActive: boolean;
  isLocked: boolean;
  createdBy: string;
  lastModifiedBy: string;
  created_at: string;
  updated_at: string;
}

/**
 * Auto-linking service for automatically connecting questions to sections and sectors
 */
export class AutoLinkingService {
  /**
   * Auto-link a question to appropriate sections based on category and learning path
   */
  async linkQuestionToSections(
    question_id: string,
    category: string,
    learningPath: string,
  ): Promise<void> {
    try {
      console.log("🔗 Auto-linking question to sections:", {
        questionId: question_id,
        category,
        learningPath,
      });

      // For admin sections, the linking is automatic based on category and learningPath matching
      // The questions will be filtered by these fields when viewing sections
      console.log(
        `✅ Question ${question_id} will be automatically linked to sections with category: ${category}, learningPath: ${learningPath}`,
      );
      console.log(
        "ℹ️ Admin sections are virtual - questions are filtered dynamically based on category and learningPath",
      );

      // No need to update Supabase as admin sections are virtual
    } catch (error) {
      console.error("❌ Error auto-linking question to sections:", error);
      throw error;
    }
  }

  /**
   * Auto-link a question to appropriate sectors based on learning path
   */
  async linkQuestionToSectors(
    question_id: string,
    category: string,
    learningPath: string,
  ): Promise<void> {
    try {
      console.log("🔗 Auto-linking question to sectors:", {
        questionId: question_id,
        category,
        learningPath,
      });

      // Find sectors that match the question's learning path
      const supabase = getSupabaseClient();
      const { data: sectors, error: sectorsError } = await supabase
        .from("sectors")
        .select("*")
        .eq("learning_path_id", learningPath)
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (sectorsError) {
        console.error("❌ Error fetching sectors:", sectorsError);
        return;
      }

      console.log(
        `📋 Found ${sectors?.length || 0} sectors for learning path: ${learningPath}`,
      );

      if (!sectors || sectors.length === 0) {
        console.log("⚠️ No sectors found for learning path:", learningPath);
        return;
      }

      // Find the most appropriate sector based on difficulty and category
      const appropriateSector = this.findAppropriateSector(sectors, category);

      if (!appropriateSector) {
        console.log("⚠️ No appropriate sector found for question");
        return;
      }

      // Add question to the sector
      const updatedQuestionIds = [
        ...(appropriateSector.questionIds || []),
        question_id,
      ];

      const { error: updateError } = await supabase
        .from("sectors")
        .update({
          questionIds: updatedQuestionIds,
          total_questions: updatedQuestionIds.length,
          updated_at: new Date().toISOString(),
        })
        .eq("id", appropriateSector.id);

      if (updateError) {
        console.error("❌ Error updating sector:", updateError);
        return;
      }

      console.log(
        `✅ Question ${question_id} linked to sector: ${appropriateSector.name}`,
      );
    } catch (error) {
      console.error("❌ Error auto-linking question to sectors:", error);
      throw error;
    }
  }

  /**
   * Find the most appropriate sector for a question based on category and difficulty
   */
  private findAppropriateSector(
    sectors: SectorData[],
    _category: string,
  ): SectorData | null {
    // For now, return the first active sector
    // In a more sophisticated implementation, you could match based on:
    // - Difficulty level
    // - Category matching
    // - Prerequisites
    // - Current question count (to balance load)

    return sectors.find((sector) => sector.isActive) || null;
  }

  /**
   * Auto-link multiple questions to sections and sectors
   */
  async linkMultipleQuestions(
    questions: QuestionData[],
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const question of questions) {
      try {
        if (!question.id) {
          results.failed++;
          results.errors.push(`Question missing ID: ${question.title}`);
          continue;
        }

        await this.linkQuestionToSections(
          question.id,
          question.category,
          question.learningPath,
        );

        await this.linkQuestionToSectors(
          question.id,
          question.category,
          question.learningPath,
        );

        results.success++;
        console.log(`✅ Successfully linked question: ${question.title}`);
      } catch (error) {
        results.failed++;
        const errorMessage = `Failed to link question ${question.title}: ${error instanceof Error ? error.message : "Unknown error"}`;
        results.errors.push(errorMessage);
        console.error(`❌ ${errorMessage}`);
      }
    }

    console.log(
      `📊 Auto-linking complete: ${results.success} success, ${results.failed} failed`,
    );
    return results;
  }

  /**
   * Remove question from all sectors
   */
  async removeQuestionFromSectors(question_id: string): Promise<void> {
    try {
      // Find all sectors that contain this question
      const supabase = getSupabaseClient();
      const { data: sectors, error: fetchError } = await supabase
        .from("sectors")
        .select("*")
        .contains("question_ids", [question_id]);

      if (fetchError) {
        console.error("❌ Error fetching sectors:", fetchError);
        return;
      }

      if (!sectors || sectors.length === 0) {
        console.log(`ℹ️ Question ${question_id} not found in any sectors`);
        return;
      }

      // Remove question from each sector
      for (const sector of sectors) {
        const updatedQuestionIds = (sector.question_ids || []).filter(
          (id: string) => id !== question_id,
        );

        const { error: updateError } = await supabase
          .from("sectors")
          .update({
            question_ids: updatedQuestionIds,
            total_questions: updatedQuestionIds.length,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sector.id);

        if (updateError) {
          console.error(`❌ Error updating sector ${sector.id}:`, updateError);
        } else {
          console.log(
            `✅ Removed question ${question_id} from sector: ${sector.name}`,
          );
        }
      }
    } catch (error) {
      console.error("❌ Error removing question from sectors:", error);
      throw error;
    }
  }

  /**
   * Get sections for plan creation
   */
  async getSectionsForPlan(
    category?: string,
    learningPath?: string,
  ): Promise<SectionData[]> {
    try {
      const supabase = getSupabaseClient();
      let query = supabase.from("sections").select("*").eq("is_active", true);

      if (category) {
        query = query.eq("category", category);
      }

      if (learningPath) {
        query = query.eq("learning_path_id", learningPath);
      }

      const { data: sections, error } = await query.order("order_index", {
        ascending: true,
      });

      if (error) {
        console.error("❌ Error fetching sections:", error);
        return [];
      }

      return sections || [];
    } catch (error) {
      console.error("❌ Error getting sections for plan:", error);
      return [];
    }
  }

  /**
   * Rebalance questions across sectors
   */
  async rebalanceSectors(learningPathId: string): Promise<void> {
    try {
      console.log(
        `🔄 Rebalancing sectors for learning path: ${learningPathId}`,
      );

      // Get all sectors for the learning path
      const supabase = getSupabaseClient();
      const { data: sectors, error: sectorsError } = await supabase
        .from("sectors")
        .select("*")
        .eq("learning_path_id", learningPathId)
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (sectorsError) {
        console.error("❌ Error fetching sectors:", sectorsError);
        return;
      }

      if (!sectors || sectors.length === 0) {
        console.log("⚠️ No sectors found for learning path");
        return;
      }

      // Get all questions for the learning path
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .eq("learning_path", learningPathId)
        .eq("is_active", true);

      if (questionsError) {
        console.error("❌ Error fetching questions:", questionsError);
        return;
      }

      if (!questions || questions.length === 0) {
        console.log("⚠️ No questions found for learning path");
        return;
      }

      // Clear existing question assignments
      for (const sector of sectors) {
        await supabase
          .from("sectors")
          .update({
            question_ids: [],
            total_questions: 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sector.id);
      }

      // Redistribute questions across sectors
      const questionsPerSector = Math.ceil(questions.length / sectors.length);

      for (let i = 0; i < sectors.length; i++) {
        const sector = sectors[i];
        const startIndex = i * questionsPerSector;
        const endIndex = Math.min(
          startIndex + questionsPerSector,
          questions.length,
        );
        const sectorQuestions = questions.slice(startIndex, endIndex);

        const questionIds = sectorQuestions.map((q) => q.id);

        await supabase
          .from("sectors")
          .update({
            question_ids: questionIds,
            total_questions: questionIds.length,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sector.id);

        console.log(
          `✅ Sector ${sector.name}: ${questionIds.length} questions`,
        );
      }

      console.log(
        `✅ Rebalancing complete for learning path: ${learningPathId}`,
      );
    } catch (error) {
      console.error("❌ Error rebalancing sectors:", error);
      throw error;
    }
  }
}
