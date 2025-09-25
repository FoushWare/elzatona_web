// v1.0 - Sector Schema for Learning Paths
// This defines the structure for sectors within learning paths

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase-server';

// Sector Interface - Represents a sector within a learning path
export interface Sector {
  id: string;
  
  // Basic Info
  name: string;
  description: string;
  
  // Learning Path Integration
  learningPathId: string; // Reference to learningPaths.id
  order: number; // Order within the learning path
  
  // Content
  questionIds: string[]; // Array of question IDs from unifiedQuestions
  totalQuestions: number; // Cached count of questions
  
  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[]; // Array of sector IDs that must be completed first
  
  // Status
  isActive: boolean;
  isLocked: boolean; // Whether this sector is locked until prerequisites are met
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
}

// Sector Progress Interface - Tracks user progress through sectors
export interface SectorProgress {
  id: string; // `${userId}_${sectorId}`
  userId: string;
  sectorId: string;
  learningPathId: string;
  
  // Progress Tracking
  completedQuestions: string[]; // Array of completed question IDs
  correctAnswers: number;
  totalAttempts: number;
  bestScore: number; // Best score achieved in this sector
  currentScore: number; // Current/latest score
  
  // Status
  isCompleted: boolean;
  isLocked: boolean;
  startedAt: string;
  completedAt?: string;
  lastAttemptAt: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Sector Service Class
export class SectorService {
  private static readonly COLLECTION_NAME = 'sectors';
  private static readonly PROGRESS_COLLECTION_NAME = 'sectorProgress';

  // Create a new sector
  static async createSector(sectorData: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; sectorId?: string; error?: string }> {
    try {
      const now = new Date().toISOString();
      const sector: Sector = {
        ...sectorData,
        id: '', // Will be set by Firestore
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), sector);
      
      // Update the sector with the generated ID
      await updateDoc(docRef, { id: docRef.id });
      
      return { success: true, sectorId: docRef.id };
    } catch (error: any) {
      console.error('Error creating sector:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all sectors for a learning path
  static async getSectorsByLearningPath(learningPathId: string): Promise<{ success: boolean; sectors?: Sector[]; error?: string }> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('learningPathId', '==', learningPathId),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const sectors: Sector[] = [];
      
      querySnapshot.forEach((doc) => {
        const sectorData = doc.data() as Sector;
        sectorData.id = doc.id; // Add the document ID
        sectors.push(sectorData);
      });
      
      // Sort by order after fetching
      sectors.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return { success: true, sectors };
    } catch (error: any) {
      console.error('Error fetching sectors:', error);
      return { success: false, error: error.message };
    }
  }

  // Get a specific sector
  static async getSector(sectorId: string): Promise<{ success: boolean; sector?: Sector; error?: string }> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sectorId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, sector: docSnap.data() as Sector };
      } else {
        return { success: false, error: 'Sector not found' };
      }
    } catch (error: any) {
      console.error('Error fetching sector:', error);
      return { success: false, error: error.message };
    }
  }

  // Update a sector
  static async updateSector(sectorId: string, updates: Partial<Omit<Sector, 'id' | 'createdAt'>>): Promise<{ success: boolean; error?: string }> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sectorId);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      await updateDoc(docRef, updateData);
      return { success: true };
    } catch (error: any) {
      console.error('Error updating sector:', error);
      return { success: false, error: error.message };
    }
  }

  // Add questions to a sector
  static async addQuestionsToSector(sectorId: string, questionIds: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      const sectorResult = await this.getSector(sectorId);
      if (!sectorResult.success || !sectorResult.sector) {
        return { success: false, error: 'Sector not found' };
      }

      const currentQuestionIds = sectorResult.sector.questionIds || [];
      const newQuestionIds = [...new Set([...currentQuestionIds, ...questionIds])]; // Remove duplicates
      
      await this.updateSector(sectorId, {
        questionIds: newQuestionIds,
        totalQuestions: newQuestionIds.length,
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Error adding questions to sector:', error);
      return { success: false, error: error.message };
    }
  }

  // Remove questions from a sector
  static async removeQuestionsFromSector(sectorId: string, questionIds: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      const sectorResult = await this.getSector(sectorId);
      if (!sectorResult.success || !sectorResult.sector) {
        return { success: false, error: 'Sector not found' };
      }

      const currentQuestionIds = sectorResult.sector.questionIds || [];
      const newQuestionIds = currentQuestionIds.filter(id => !questionIds.includes(id));
      
      await this.updateSector(sectorId, {
        questionIds: newQuestionIds,
        totalQuestions: newQuestionIds.length,
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Error removing questions from sector:', error);
      return { success: false, error: error.message };
    }
  }

  // Get sector progress for a user
  static async getSectorProgress(userId: string, sectorId: string): Promise<{ success: boolean; progress?: SectorProgress; error?: string }> {
    try {
      const docId = `${userId}_${sectorId}`;
      const docRef = doc(db, this.PROGRESS_COLLECTION_NAME, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, progress: docSnap.data() as SectorProgress };
      } else {
        return { success: false, error: 'Progress not found' };
      }
    } catch (error: any) {
      console.error('Error fetching sector progress:', error);
      return { success: false, error: error.message };
    }
  }

  // Update sector progress
  static async updateSectorProgress(progressData: Omit<SectorProgress, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; error?: string }> {
    try {
      const docId = `${progressData.userId}_${progressData.sectorId}`;
      const now = new Date().toISOString();
      
      const progress: SectorProgress = {
        ...progressData,
        id: docId,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = doc(db, this.PROGRESS_COLLECTION_NAME, docId);
      await setDoc(docRef, progress);
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating sector progress:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all sectors with progress for a user and learning path
  static async getSectorsWithProgress(userId: string, learningPathId: string): Promise<{ success: boolean; sectorsWithProgress?: Array<Sector & { progress?: SectorProgress }>; error?: string }> {
    try {
      // Get all sectors for the learning path
      const sectorsResult = await this.getSectorsByLearningPath(learningPathId);
      if (!sectorsResult.success || !sectorsResult.sectors) {
        return { success: false, error: 'Failed to fetch sectors' };
      }

      // Get progress for each sector
      const sectorsWithProgress = await Promise.all(
        sectorsResult.sectors.map(async (sector) => {
          const progressResult = await this.getSectorProgress(userId, sector.id);
          return {
            ...sector,
            progress: progressResult.success ? progressResult.progress : undefined,
          };
        })
      );

      return { success: true, sectorsWithProgress };
    } catch (error: any) {
      console.error('Error fetching sectors with progress:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a sector
  static async deleteSector(sectorId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sectorId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting sector:', error);
      return { success: false, error: error.message };
    }
  }
}
