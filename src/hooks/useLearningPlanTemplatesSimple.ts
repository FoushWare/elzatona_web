import { useState, useEffect } from 'react';
import { LearningPlanTemplate } from '@/types/learning-plan';

interface UseLearningPlanTemplatesReturn {
  templates: LearningPlanTemplate[];
  isLoading: boolean;
  error: string | null;
}

export function useLearningPlanTemplatesSimple(): UseLearningPlanTemplatesReturn {
  console.log('🔄 SimpleHook: useLearningPlanTemplatesSimple called');
  const [templates, setTemplates] = useState<LearningPlanTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 SimpleHook: useEffect triggered');
    
    const loadTemplates = async () => {
      console.log('🔄 SimpleHook: Starting to load templates...');
      setIsLoading(true);
      setError(null);

      try {
        // Try API endpoint first
        console.log('🔍 SimpleHook: Calling API endpoint /api/test-firebase');
        const response = await fetch('/api/test-firebase');
        const apiData = await response.json();
        
        if (apiData.success && apiData.templates && apiData.templates.length > 0) {
          console.log('✅ SimpleHook: Successfully loaded templates from API:', apiData.templates.length);
          
          // Convert API data to our format
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
          console.log('⚠️ SimpleHook: API failed, using mock data');
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
          ];
          setTemplates(mockTemplates);
        }
      } catch (error) {
        console.error('❌ SimpleHook: Error loading learning plan templates:', error);
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
        console.log('🏁 SimpleHook: Finished loading templates');
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, []);

  return {
    templates,
    isLoading,
    error,
  };
}
