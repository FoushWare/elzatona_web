import { useState, useEffect, useCallback } from 'react';
import { firestoreService } from '@/lib/firestore-service';

interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: {
    id: string;
    name: string;
    questions: string[]; // Question IDs
    weight: number;
  }[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UseLearningPlanTemplatesReturn {
  templates: LearningPlanTemplate[];
  isLoading: boolean;
  error: string | null;
  refreshTemplates: () => Promise<void>;
  getTemplate: (templateId: string) => LearningPlanTemplate | null;
}

export function useLearningPlanTemplates(): UseLearningPlanTemplatesReturn {
  const [templates, setTemplates] = useState<LearningPlanTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const firestoreTemplates = await firestoreService.getLearningPlanTemplates();
      
      if (firestoreTemplates.length > 0) {
        // Convert Firestore data to our format
        const formattedTemplates: LearningPlanTemplate[] = firestoreTemplates.map(template => ({
          id: template.id,
          name: template.name,
          duration: template.duration,
          description: template.description,
          difficulty: template.difficulty,
          totalQuestions: template.totalQuestions,
          dailyQuestions: template.dailyQuestions,
          sections: template.sections || [],
          features: template.features || [],
          estimatedTime: template.estimatedTime,
          isRecommended: template.isRecommended || false,
          isActive: template.isActive !== false,
          createdAt: template.createdAt?.toDate() || new Date(),
          updatedAt: template.updatedAt?.toDate() || new Date(),
        }));
        setTemplates(formattedTemplates);
      } else {
        // Fallback to mock data if no templates exist in Firestore
        const mockTemplates: LearningPlanTemplate[] = [
          {
            id: '1-day-plan',
            name: '1 Day Plan',
            duration: 1,
            description: "Intensive preparation for tomorrow's interview",
            difficulty: 'Beginner',
            totalQuestions: 100,
            dailyQuestions: 100,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
              { id: 'react', name: 'React', questions: [], weight: 20 },
            ],
            features: ['Quick review', 'Essential concepts', 'Common questions'],
            estimatedTime: '2-3 hours',
            isRecommended: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2-day-plan',
            name: '2 Day Plan',
            duration: 2,
            description: 'Perfect for weekend preparation',
            difficulty: 'Beginner',
            totalQuestions: 150,
            dailyQuestions: 75,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
              { id: 'react', name: 'React', questions: [], weight: 20 },
            ],
            features: ['Balanced coverage', 'Practice sessions', 'Progress tracking'],
            estimatedTime: '3-4 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3-day-plan',
            name: '3 Day Plan',
            duration: 3,
            description: 'Comprehensive 3-day preparation',
            difficulty: 'Intermediate',
            totalQuestions: 200,
            dailyQuestions: 67,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
              { id: 'react', name: 'React', questions: [], weight: 20 },
              { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 },
            ],
            features: ['Extended coverage', 'Daily milestones', 'TypeScript basics'],
            estimatedTime: '4-5 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '7-day-plan',
            name: '7 Day Plan',
            duration: 7,
            description: 'Complete week-long preparation',
            difficulty: 'Advanced',
            totalQuestions: 400,
            dailyQuestions: 57,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
              { id: 'react', name: 'React', questions: [], weight: 20 },
              { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 },
            ],
            features: [
              'Complete coverage',
              'Daily milestones',
              'Master-level prep',
            ],
            estimatedTime: '8-10 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setTemplates(mockTemplates);
      }
    } catch (error) {
      console.error('Error loading learning plan templates:', error);
      setError(error instanceof Error ? error.message : 'Failed to load learning plan templates');
      
      // Fallback to mock data on error
      const mockTemplates: LearningPlanTemplate[] = [
        {
          id: '1-day-plan',
          name: '1 Day Plan',
          duration: 1,
          description: "Intensive preparation for tomorrow's interview",
          difficulty: 'Beginner',
          totalQuestions: 100,
          dailyQuestions: 100,
          sections: [
            { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
            { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
            { id: 'react', name: 'React', questions: [], weight: 20 },
          ],
          features: ['Quick review', 'Essential concepts', 'Common questions'],
          estimatedTime: '2-3 hours',
          isRecommended: false,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setTemplates(mockTemplates);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTemplates = useCallback(async () => {
    await loadTemplates();
  }, [loadTemplates]);

  const getTemplate = useCallback((templateId: string): LearningPlanTemplate | null => {
    return templates.find(template => template.id === templateId) || null;
  }, [templates]);

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return {
    templates,
    isLoading,
    error,
    refreshTemplates,
    getTemplate,
  };
}

