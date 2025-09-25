import { useState, useEffect, useCallback } from 'react';
import { firestoreService } from '@/lib/firestore-service';
import { LearningPlanTemplate } from '@/types/learning-plan';

interface UseLearningPlanTemplatesReturn {
  templates: LearningPlanTemplate[];
  isLoading: boolean;
  error: string | null;
  refreshTemplates: () => Promise<void>;
  getTemplate: (templateId: string) => LearningPlanTemplate | null;
}

export function useLearningPlanTemplates(): UseLearningPlanTemplatesReturn {
  console.log('🔄 Hook: useLearningPlanTemplates called');
  const [templates, setTemplates] = useState<LearningPlanTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    console.log('🔄 Hook: Starting to load templates...');
    setIsLoading(true);
    setError(null);

    try {
        // Try API endpoint first since we know it works
        console.log('🔍 Hook: Calling API endpoint /api/test-firebase');
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/test-firebase`);
      const apiData = await response.json();
      
      if (apiData.success && apiData.templates && apiData.templates.length > 0) {
        console.log('✅ Hook: Successfully loaded templates from API:', apiData.templates.length);
        
        // Convert API data to our format with safe defaults
        const formattedTemplates: LearningPlanTemplate[] = apiData.templates.map((template: any) => ({
          id: template.id,
          name: template.name || `${template.duration} Day Plan`,
          duration: template.duration || 1,
          description: template.description || `${template.duration}-day intensive preparation plan`,
          difficulty: template.difficulty || 'Intermediate',
          totalQuestions: template.totalQuestions || 100,
          dailyQuestions: template.dailyQuestions || Math.ceil((template.totalQuestions || 100) / (template.duration || 1)),
          sections: template.sections || [
            { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 25 },
            { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
            { id: 'react', name: 'React', questions: [], weight: 25 },
            { id: 'general', name: 'General', questions: [], weight: 15 },
          ],
          features: template.features || [
            'Structured learning path',
            'Progress tracking',
            'Curated questions',
          ],
          estimatedTime: template.estimatedTime || `${Math.ceil((template.duration || 1) * 2)}-${Math.ceil((template.duration || 1) * 3)} hours`,
          isRecommended: template.isRecommended || (template.duration === 3 || template.duration === 7),
          isActive: template.isActive !== false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        
        setTemplates(formattedTemplates);
      } else {
        console.log('⚠️ Hook: API failed, using mock data');
        // Fallback to mock data
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
            id: '4-day-plan',
            name: '4 Day Plan',
            duration: 4,
            description: '4-day intensive preparation plan',
            difficulty: 'Intermediate',
            totalQuestions: 250,
            dailyQuestions: 63,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 25 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
              { id: 'react', name: 'React', questions: [], weight: 25 },
              { id: 'general', name: 'General', questions: [], weight: 15 },
            ],
            features: ['Structured learning path', 'Progress tracking', 'Curated questions'],
            estimatedTime: '6-8 hours',
            isRecommended: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '5-day-plan',
            name: '5 Day Plan',
            duration: 5,
            description: '5-day intensive preparation plan',
            difficulty: 'Intermediate',
            totalQuestions: 300,
            dailyQuestions: 60,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 25 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
              { id: 'react', name: 'React', questions: [], weight: 25 },
              { id: 'general', name: 'General', questions: [], weight: 15 },
            ],
            features: ['Structured learning path', 'Progress tracking', 'Curated questions'],
            estimatedTime: '8-10 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '6-day-plan',
            name: '6 Day Plan',
            duration: 6,
            description: '6-day intensive preparation plan',
            difficulty: 'Advanced',
            totalQuestions: 350,
            dailyQuestions: 58,
            sections: [
              { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 25 },
              { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
              { id: 'react', name: 'React', questions: [], weight: 25 },
              { id: 'general', name: 'General', questions: [], weight: 15 },
            ],
            features: ['Structured learning path', 'Progress tracking', 'Curated questions'],
            estimatedTime: '10-12 hours',
            isRecommended: false,
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
            estimatedTime: '12-14 hours',
            isRecommended: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setTemplates(mockTemplates);
      }
    } catch (error) {
      console.error('❌ Hook: Error loading learning plan templates:', error);
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
      console.log('🏁 Hook: Finished loading templates');
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
    console.log('🔄 Hook: useEffect triggered, calling loadTemplates');
    loadTemplates();
  }, []); // Remove loadTemplates dependency to avoid infinite loop

  return {
    templates,
    isLoading,
    error,
    refreshTemplates,
    getTemplate,
  };
}