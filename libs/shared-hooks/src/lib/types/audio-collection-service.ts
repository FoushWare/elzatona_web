// Type definitions for audio-collection-service
// These types are used by shared-hooks but the service is app-specific

export interface QuestionAudioMapping {
  questionId: string;
  audioUrl: string;
}

export class AudioCollectionService {
  static async getAudioMappings(): Promise<QuestionAudioMapping[]> {
    return [];
  }
  static async getAudioMapping(
    questionId: string
  ): Promise<{
    success: boolean;
    mapping?: QuestionAudioMapping | null;
    error?: string;
  }> {
    return { success: true, mapping: null };
  }
  static async getAudioMappingsForLearningPath(
    learningPathId: string
  ): Promise<{
    success: boolean;
    mappings?: QuestionAudioMapping[];
    error?: string;
  }> {
    return { success: true, mappings: [] };
  }
  static async getAudioMappingsForSection(
    learningPath: string,
    sectionId: string
  ): Promise<{
    success: boolean;
    mappings?: QuestionAudioMapping[];
    error?: string;
  }> {
    return { success: true, mappings: [] };
  }
  static async updateAudioFile(
    questionId: string,
    audioType: string,
    audioInfo: { localPath: string; isDefault: boolean; duration?: number }
  ): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }
  static async createOrUpdateAudioMapping(
    questionId: string,
    learningPath: string,
    sectionId: string,
    questionNumber: number,
    questionAudioPath?: string,
    answerAudioPath?: string
  ): Promise<{
    success: boolean;
    mapping?: QuestionAudioMapping;
    error?: string;
  }> {
    return {
      success: true,
      mapping: { questionId, audioUrl: questionAudioPath || '' },
    };
  }
  static async deleteAudioMapping(
    questionId: string
  ): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }
}
