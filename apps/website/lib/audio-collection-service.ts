/* eslint-disable @typescript-eslint/no-explicit-any */
// This file uses 'any' types for dynamic update data structures
import {
  QuestionAudioMapping,
  AudioFileInfo,
  generateAudioPaths,
  createDefaultAudioInfo,
  createCustomAudioInfo,
  _DEFAULT_AUDIO_PATHS as _DEFAULT_AUDIO_PATHS,
} from "./audio-collection-schema";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export class AudioCollectionService {
  private static readonly TABLE_NAME = "question_audio";

  /**
   * Create or update audio mapping for a question
   */
  static async createOrUpdateAudioMapping(
    question_id: string,
    learningPath: string,
    sectionId: string,
    questionNumber: number,
    questionAudioPath?: string,
    answerAudioPath?: string,
  ): Promise<{ success: boolean; error?: string; mappingId?: string }> {
    try {
      const mappingId = `${learningPath}_${sectionId}_${questionNumber}`;
      const audioPaths = generateAudioPaths(
        learningPath,
        sectionId,
        questionNumber,
      );

      // Create audio file info objects
      const questionAudio: AudioFileInfo = questionAudioPath
        ? createCustomAudioInfo(questionAudioPath)
        : createDefaultAudioInfo(audioPaths.questionAudio);

      const answerAudio: AudioFileInfo = answerAudioPath
        ? createCustomAudioInfo(answerAudioPath)
        : createDefaultAudioInfo(audioPaths.answerAudio);

      const audioMapping = {
        id: mappingId,
        question_id,
        learning_path: learningPath,
        section_id: sectionId,
        question_number: questionNumber,
        question_audio: questionAudio,
        answer_audio: answerAudio,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from(this.TABLE_NAME)
        .upsert(audioMapping);

      if (error) {
        console.error("Error creating/updating audio mapping:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true, mappingId };
    } catch (error) {
      console.error("Error creating/updating audio mapping:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get audio mapping for a specific question
   */
  static async getAudioMapping(question_id: string): Promise<{
    success: boolean;
    mapping?: QuestionAudioMapping;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("*")
        .eq("question_id", question_id)
        .limit(1)
        .single();

      if (error || !data) {
        return { success: true, mapping: undefined };
      }

      const mapping: QuestionAudioMapping = {
        id: data.id,
        question_id: data.question_id,
        learningPath: data.learning_path,
        sectionId: data.section_id,
        questionNumber: data.question_number,
        questionAudio: data.question_audio,
        answerAudio: data.answer_audio,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      return { success: true, mapping };
    } catch (error) {
      console.error("Error getting audio mapping:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get all audio mappings for a learning path
   */
  static async getAudioMappingsForLearningPath(learningPath: string): Promise<{
    success: boolean;
    mappings?: QuestionAudioMapping[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("*")
        .eq("learning_path", learningPath)
        .order("question_number", { ascending: true });

      if (error) {
        console.error("Error getting audio mappings for learning path:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      const mappings: QuestionAudioMapping[] = (data || []).map((item) => ({
        id: item.id,
        question_id: item.question_id,
        learningPath: item.learning_path,
        sectionId: item.section_id,
        questionNumber: item.question_number,
        questionAudio: item.question_audio,
        answerAudio: item.answer_audio,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      return { success: true, mappings };
    } catch (error) {
      console.error("Error getting audio mappings for learning path:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get audio mappings for a specific section
   */
  static async getAudioMappingsForSection(
    learningPath: string,
    sectionId: string,
  ): Promise<{
    success: boolean;
    mappings?: QuestionAudioMapping[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("*")
        .eq("learning_path", learningPath)
        .eq("section_id", sectionId)
        .order("question_number", { ascending: true });

      if (error) {
        console.error("Error getting audio mappings for section:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      const mappings: QuestionAudioMapping[] = (data || []).map((item) => ({
        id: item.id,
        question_id: item.question_id,
        learningPath: item.learning_path,
        sectionId: item.section_id,
        questionNumber: item.question_number,
        questionAudio: item.question_audio,
        answerAudio: item.answer_audio,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      return { success: true, mappings };
    } catch (error) {
      console.error("Error getting audio mappings for section:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Update audio file info for a question
   */
  static async updateAudioFile(
    question_id: string,
    audioType: "questionAudio" | "answerAudio",
    audioInfo: AudioFileInfo,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mappingResult = await this.getAudioMapping(question_id);

      if (!mappingResult.success || !mappingResult.mapping) {
        return {
          success: false,
          error: "Audio mapping not found",
        };
      }

      const mapping = mappingResult.mapping;
      const mappingId = mapping.id;

      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (audioType === "questionAudio") {
        updateData.question_audio = audioInfo;
      } else {
        updateData.answer_audio = audioInfo;
      }

      const { error } = await supabase
        .from(this.TABLE_NAME)
        .update(updateData)
        .eq("id", mappingId);

      if (error) {
        console.error("Error updating audio file:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating audio file:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Delete audio mapping for a question
   */
  static async deleteAudioMapping(
    question_id: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mappingResult = await this.getAudioMapping(question_id);

      if (!mappingResult.success || !mappingResult.mapping) {
        return { success: true }; // Already deleted or doesn't exist
      }

      const mappingId = mappingResult.mapping.id;
      const { error } = await supabase
        .from(this.TABLE_NAME)
        .delete()
        .eq("id", mappingId);

      if (error) {
        console.error("Error deleting audio mapping:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting audio mapping:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get the next question number for a section
   */
  static async getNextQuestionNumber(
    learningPath: string,
    sectionId: string,
  ): Promise<{ success: boolean; nextNumber?: number; error?: string }> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("question_number")
        .eq("learning_path", learningPath)
        .eq("section_id", sectionId)
        .order("question_number", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return { success: true, nextNumber: 1 };
      }

      const nextNumber = data.question_number + 1;
      return { success: true, nextNumber };
    } catch (error) {
      console.error("Error getting next question number:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
