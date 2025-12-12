import { useState, useCallback } from "react";
import { AudioCollectionService } from "./types/audio-collection-service";
import { QuestionAudioMapping } from "./types/audio-collection-schema";

interface AudioInfo {
  localPath: string;
  isDefault: boolean;
  duration?: number;
  fileSize?: number;
  mimeType?: string;
}

export interface UseAudioCollectionReturn {
  // State
  audioMappings: QuestionAudioMapping[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getAudioMapping: (
    question_id: string,
  ) => Promise<QuestionAudioMapping | null>;
  getAudioMappingsForLearningPath: (
    learningPath: string,
  ) => Promise<QuestionAudioMapping[]>;
  getAudioMappingsForSection: (
    learningPath: string,
    sectionId: string,
  ) => Promise<QuestionAudioMapping[]>;
  updateAudioFile: (
    question_id: string,
    audioType: "questionAudio" | "answerAudio",
    audioInfo: AudioInfo,
  ) => Promise<boolean>;
  createAudioMapping: (
    question_id: string,
    learningPath: string,
    sectionId: string,
    questionNumber: number,
    questionAudioPath?: string,
    answerAudioPath?: string,
  ) => Promise<boolean>;
  deleteAudioMapping: (question_id: string) => Promise<boolean>;
  clearError: () => void;
}

export function useAudioCollection(): UseAudioCollectionReturn {
  const [audioMappings, setAudioMappings] = useState<QuestionAudioMapping[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getAudioMapping = useCallback(
    async (question_id: string): Promise<QuestionAudioMapping | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await AudioCollectionService.getAudioMapping(question_id);

        if (!result.success) {
          setError(result.error || "Failed to get audio mapping");
          return null;
        }

        return result.mapping || null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getAudioMappingsForLearningPath = useCallback(
    async (learningPath: string): Promise<QuestionAudioMapping[]> => {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await AudioCollectionService.getAudioMappingsForLearningPath(
            learningPath,
          );

        if (!result.success) {
          setError(result.error || "Failed to get audio mappings");
          return [];
        }

        const mappings = result.mappings || [];
        setAudioMappings(mappings);
        return mappings;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getAudioMappingsForSection = useCallback(
    async (
      learningPath: string,
      sectionId: string,
    ): Promise<QuestionAudioMapping[]> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await AudioCollectionService.getAudioMappingsForSection(
          learningPath,
          sectionId,
        );

        if (!result.success) {
          setError(result.error || "Failed to get audio mappings for section");
          return [];
        }

        const mappings = result.mappings || [];
        setAudioMappings(mappings);
        return mappings;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateAudioFile = useCallback(
    async (
      question_id: string,
      audioType: "questionAudio" | "answerAudio",
      audioInfo: AudioInfo,
    ): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await AudioCollectionService.updateAudioFile(
          question_id,
          audioType,
          audioInfo,
        );

        if (!result.success) {
          setError(result.error || "Failed to update audio file");
          return false;
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const createAudioMapping = useCallback(
    async (
      question_id: string,
      learningPath: string,
      sectionId: string,
      questionNumber: number,
      questionAudioPath?: string,
      answerAudioPath?: string,
    ): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await AudioCollectionService.createOrUpdateAudioMapping(
          question_id,
          learningPath,
          sectionId,
          questionNumber,
          questionAudioPath,
          answerAudioPath,
        );

        if (!result.success) {
          setError(result.error || "Failed to create audio mapping");
          return false;
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteAudioMapping = useCallback(
    async (question_id: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await AudioCollectionService.deleteAudioMapping(question_id);

        if (!result.success) {
          setError(result.error || "Failed to delete audio mapping");
          return false;
        }

        // Remove from local state
        setAudioMappings((prev) =>
          prev.filter((mapping) => mapping.questionId !== question_id),
        );
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    // State
    audioMappings,
    isLoading,
    error,

    // Actions
    getAudioMapping,
    getAudioMappingsForLearningPath,
    getAudioMappingsForSection,
    updateAudioFile,
    createAudioMapping,
    deleteAudioMapping,
    clearError,
  };
}
