import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  QuestionAudioMapping,
  AudioFileInfo,
  generateAudioPaths,
  createDefaultAudioInfo,
  createCustomAudioInfo,
  DEFAULT_AUDIO_PATHS,
} from './audio-collection-schema';

export class AudioCollectionService {
  private static readonly COLLECTION_NAME = 'questionAudio';

  /**
   * Create or update audio mapping for a question
   */
  static async createOrUpdateAudioMapping(
    questionId: string,
    learningPath: string,
    sectionId: string,
    questionNumber: number,
    questionAudioPath?: string,
    answerAudioPath?: string
  ): Promise<{ success: boolean; error?: string; mappingId?: string }> {
    try {
      const mappingId = `${learningPath}_${sectionId}_${questionNumber}`;
      const audioPaths = generateAudioPaths(learningPath, sectionId, questionNumber);

      // Create audio file info objects
      const questionAudio: AudioFileInfo = questionAudioPath
        ? createCustomAudioInfo(questionAudioPath)
        : createDefaultAudioInfo(audioPaths.questionAudio);

      const answerAudio: AudioFileInfo = answerAudioPath
        ? createCustomAudioInfo(answerAudioPath)
        : createDefaultAudioInfo(audioPaths.answerAudio);

      const audioMapping: QuestionAudioMapping = {
        id: mappingId,
        questionId,
        learningPath,
        sectionId,
        questionNumber,
        questionAudio,
        answerAudio,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(doc(db, this.COLLECTION_NAME, mappingId), audioMapping);

      return { success: true, mappingId };
    } catch (error) {
      console.error('Error creating/updating audio mapping:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get audio mapping for a specific question
   */
  static async getAudioMapping(
    questionId: string
  ): Promise<{ success: boolean; mapping?: QuestionAudioMapping; error?: string }> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('questionId', '==', questionId),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: true, mapping: undefined };
      }

      const doc = querySnapshot.docs[0];
      const mapping = { id: doc.id, ...doc.data() } as QuestionAudioMapping;

      return { success: true, mapping };
    } catch (error) {
      console.error('Error getting audio mapping:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all audio mappings for a learning path
   */
  static async getAudioMappingsForLearningPath(
    learningPath: string
  ): Promise<{ success: boolean; mappings?: QuestionAudioMapping[]; error?: string }> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('learningPath', '==', learningPath),
        orderBy('questionNumber', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const mappings = querySnapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() } as QuestionAudioMapping)
      );

      return { success: true, mappings };
    } catch (error) {
      console.error('Error getting audio mappings for learning path:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get audio mappings for a specific section
   */
  static async getAudioMappingsForSection(
    learningPath: string,
    sectionId: string
  ): Promise<{ success: boolean; mappings?: QuestionAudioMapping[]; error?: string }> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('learningPath', '==', learningPath),
        where('sectionId', '==', sectionId),
        orderBy('questionNumber', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const mappings = querySnapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() } as QuestionAudioMapping)
      );

      return { success: true, mappings };
    } catch (error) {
      console.error('Error getting audio mappings for section:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Update audio file info for a question
   */
  static async updateAudioFile(
    questionId: string,
    audioType: 'questionAudio' | 'answerAudio',
    audioInfo: AudioFileInfo
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mappingResult = await this.getAudioMapping(questionId);
      
      if (!mappingResult.success || !mappingResult.mapping) {
        return {
          success: false,
          error: 'Audio mapping not found',
        };
      }

      const mapping = mappingResult.mapping;
      const mappingId = mapping.id;

      await updateDoc(doc(db, this.COLLECTION_NAME, mappingId), {
        [audioType]: audioInfo,
        updatedAt: Timestamp.now(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating audio file:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Delete audio mapping for a question
   */
  static async deleteAudioMapping(
    questionId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mappingResult = await this.getAudioMapping(questionId);
      
      if (!mappingResult.success || !mappingResult.mapping) {
        return { success: true }; // Already deleted or doesn't exist
      }

      const mappingId = mappingResult.mapping.id;
      await deleteDoc(doc(db, this.COLLECTION_NAME, mappingId));

      return { success: true };
    } catch (error) {
      console.error('Error deleting audio mapping:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get the next question number for a section
   */
  static async getNextQuestionNumber(
    learningPath: string,
    sectionId: string
  ): Promise<{ success: boolean; nextNumber?: number; error?: string }> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('learningPath', '==', learningPath),
        where('sectionId', '==', sectionId),
        orderBy('questionNumber', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: true, nextNumber: 1 };
      }

      const lastMapping = querySnapshot.docs[0].data() as QuestionAudioMapping;
      const nextNumber = lastMapping.questionNumber + 1;

      return { success: true, nextNumber };
    } catch (error) {
      console.error('Error getting next question number:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
