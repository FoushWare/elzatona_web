import { useState, useEffect, useCallback } from 'react';
import { AudioCollectionService } from '@/lib/audio-collection-service';
import { QuestionAudioMapping } from '@/lib/audio-collection-schema';

export interface UseAudioCollectionReturn {
  // State
  audioMappings: QuestionAudioMapping[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getAudioMapping: (questionId: string) => Promise<QuestionAudioMapping | null>;
  getAudioMappingsForLearningPath: (learningPath: string) => Promise<QuestionAudioMapping[]>;
  getAudioMappingsForSection: (learningPath: string, sectionId: string) => Promise<QuestionAudioMapping[]>;
  updateAudioFile: (questionId: string, audioType: 'questionAudio' | 'answerAudio', audioInfo: any) => Promise<boolean>;
  createAudioMapping: (questionId: string, learningPath: string, sectionId: string, questionNumber: number, questionAudioPath?: string, answerAudioPath?: string) => Promise<boolean>;
  deleteAudioMapping: (questionId: string) => Promise<boolean>;
  clearError: () => void;
}

export function useAudioCollection(): UseAudioCollectionReturn {
  const [audioMappings, setAudioMappings] = useState<QuestionAudioMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getAudioMapping = useCallback(async (questionId: string): Promise<QuestionAudioMapping | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.getAudioMapping(questionId);
      
      if (!result.success) {
        setError(result.error || 'Failed to get audio mapping');
        return null;
      }

      return result.mapping || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAudioMappingsForLearningPath = useCallback(async (learningPath: string): Promise<QuestionAudioMapping[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.getAudioMappingsForLearningPath(learningPath);
      
      if (!result.success) {
        setError(result.error || 'Failed to get audio mappings');
        return [];
      }

      const mappings = result.mappings || [];
      setAudioMappings(mappings);
      return mappings;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAudioMappingsForSection = useCallback(async (learningPath: string, sectionId: string): Promise<QuestionAudioMapping[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.getAudioMappingsForSection(learningPath, sectionId);
      
      if (!result.success) {
        setError(result.error || 'Failed to get audio mappings for section');
        return [];
      }

      const mappings = result.mappings || [];
      setAudioMappings(mappings);
      return mappings;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAudioFile = useCallback(async (
    questionId: string,
    audioType: 'questionAudio' | 'answerAudio',
    audioInfo: any
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.updateAudioFile(questionId, audioType, audioInfo);
      
      if (!result.success) {
        setError(result.error || 'Failed to update audio file');
        return false;
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAudioMapping = useCallback(async (
    questionId: string,
    learningPath: string,
    sectionId: string,
    questionNumber: number,
    questionAudioPath?: string,
    answerAudioPath?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.createOrUpdateAudioMapping(
        questionId,
        learningPath,
        sectionId,
        questionNumber,
        questionAudioPath,
        answerAudioPath
      );
      
      if (!result.success) {
        setError(result.error || 'Failed to create audio mapping');
        return false;
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAudioMapping = useCallback(async (questionId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await AudioCollectionService.deleteAudioMapping(questionId);
      
      if (!result.success) {
        setError(result.error || 'Failed to delete audio mapping');
        return false;
      }

      // Remove from local state
      setAudioMappings(prev => prev.filter(mapping => mapping.questionId !== questionId));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

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
