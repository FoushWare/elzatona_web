// v1.0 - Sector Schema for Learning Paths
// This defines the structure for sectors within learning paths

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface SectorError extends Error {
  code?: string;
  message: string;
}

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
  questionIds: string[]; // Array of question IDs
  estimatedTime: number; // Estimated time in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  // Status
  isActive: boolean;
  isCompleted?: boolean; // For user progress tracking

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // Admin who created this sector
  lastModifiedBy?: string; // Admin who last modified this sector

  // Analytics
  completionRate?: number; // Percentage of users who completed this sector
  averageTimeSpent?: number; // Average time spent in minutes
  userRating?: number; // Average user rating (1-5)
}

// Sector Form Data - For creating/updating sectors
export interface SectorFormData {
  name: string;
  description: string;
  learningPathId: string;
  order?: number;
  questionIds?: string[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive?: boolean;
}

// Sector Progress - For tracking user progress
export interface SectorProgress {
  id: string;
  userId: string;
  sectorId: string;
  learningPathId: string;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number; // Time spent in minutes
  score?: number; // Score achieved (0-100)
  attempts: number; // Number of attempts
  createdAt: Date;
  updatedAt: Date;
}

// Sector Analytics - For admin analytics
export interface SectorAnalytics {
  sectorId: string;
  totalUsers: number;
  completedUsers: number;
  completionRate: number;
  averageTimeSpent: number;
  averageScore: number;
  averageRating: number;
  totalAttempts: number;
  lastUpdated: Date;
}

// Sector Service Class
export class SectorService {
  private static readonly COLLECTION_NAME = 'sectors';

  // Create a new sector
  static async createSector(sectorData: SectorFormData): Promise<string> {
    try {
      const { data, error } = await supabase
        .from(this.COLLECTION_NAME)
        .insert({
          ...sectorData,
          questionIds: sectorData.questionIds || [],
          isActive: sectorData.isActive ?? true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating sector:', error);
      throw error;
    }
  }

  // Get all sectors for a learning path
  static async getSectorsByLearningPath(
    learningPathId: string
  ): Promise<Sector[]> {
    try {
      const { data: sectors, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('learningPathId', learningPathId)
        .order('order', { ascending: true });

      if (error) throw error;
      return sectors || [];
    } catch (error) {
      console.error('Error fetching sectors by learning path:', error);
      throw error;
    }
  }

  // Get a specific sector by ID
  static async getSectorById(sectorId: string): Promise<Sector | null> {
    try {
      const { data: sector, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('id', sectorId)
        .single();

      if (error) throw error;
      return sector;
    } catch (error) {
      console.error('Error fetching sector by ID:', error);
      throw error;
    }
  }

  // Update a sector
  static async updateSector(
    sectorId: string,
    sectorData: Partial<SectorFormData>
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          ...sectorData,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', sectorId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating sector:', error);
      throw error;
    }
  }

  // Delete a sector
  static async deleteSector(sectorId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .delete()
        .eq('id', sectorId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting sector:', error);
      throw error;
    }
  }

  // Reorder sectors within a learning path
  static async reorderSectors(
    learningPathId: string,
    sectorIds: string[]
  ): Promise<void> {
    try {
      const updates = sectorIds.map((sectorId, index) => ({
        id: sectorId,
        order: index + 1,
        updatedAt: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from(this.COLLECTION_NAME)
          .update({
            order: update.order,
            updatedAt: update.updatedAt,
          })
          .eq('id', update.id)
          .eq('learningPathId', learningPathId);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error reordering sectors:', error);
      throw error;
    }
  }

  // Add questions to a sector
  static async addQuestionsToSector(
    sectorId: string,
    questionIds: string[]
  ): Promise<void> {
    try {
      const { data: sector, error: fetchError } = await supabase
        .from(this.COLLECTION_NAME)
        .select('questionIds')
        .eq('id', sectorId)
        .single();

      if (fetchError) throw fetchError;

      const updatedQuestionIds = [
        ...(sector.questionIds || []),
        ...questionIds,
      ];

      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          questionIds: updatedQuestionIds,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', sectorId);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding questions to sector:', error);
      throw error;
    }
  }

  // Remove questions from a sector
  static async removeQuestionsFromSector(
    sectorId: string,
    questionIds: string[]
  ): Promise<void> {
    try {
      const { data: sector, error: fetchError } = await supabase
        .from(this.COLLECTION_NAME)
        .select('questionIds')
        .eq('id', sectorId)
        .single();

      if (fetchError) throw fetchError;

      const updatedQuestionIds = (sector.questionIds || []).filter(
        (id: string) => !questionIds.includes(id)
      );

      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({
          questionIds: updatedQuestionIds,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', sectorId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing questions from sector:', error);
      throw error;
    }
  }

  // Get sector analytics
  static async getSectorAnalytics(
    sectorId: string
  ): Promise<SectorAnalytics | null> {
    try {
      // This would require additional queries to calculate analytics
      // For now, return a basic structure
      const { data: sector, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('id', sectorId)
        .single();

      if (error) throw error;

      return {
        sectorId: sector.id,
        totalUsers: 0,
        completedUsers: 0,
        completionRate: 0,
        averageTimeSpent: 0,
        averageScore: 0,
        averageRating: 0,
        totalAttempts: 0,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Error getting sector analytics:', error);
      throw error;
    }
  }

  // Get all active sectors
  static async getActiveSectors(): Promise<Sector[]> {
    try {
      const { data: sectors, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .eq('isActive', true)
        .order('order', { ascending: true });

      if (error) throw error;
      return sectors || [];
    } catch (error) {
      console.error('Error fetching active sectors:', error);
      throw error;
    }
  }

  // Search sectors by name or description
  static async searchSectors(query: string): Promise<Sector[]> {
    try {
      const { data: sectors, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('order', { ascending: true });

      if (error) throw error;
      return sectors || [];
    } catch (error) {
      console.error('Error searching sectors:', error);
      throw error;
    }
  }
}

// Export types for use in other files
export type { SectorError };
