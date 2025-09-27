'use client';

import { Trash2, Edit3, Eye } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface Section {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  order: number;
  isActive: boolean;
  questionCount: number;
}

// Create plans with all available sections
const createPlansWithAllSections = (
  sections: Section[],
  categories: Category[]
) => {
  const planConfigs = [
    {
      id: '1-day-plan',
      name: '1 Day Plan',
      description: "Intensive preparation for tomorrow's interview",
      questionPerSection: 2,
    },
    {
      id: '2-day-plan',
      name: '2 Day Plan',
      description: 'Perfect for weekend preparation',
      questionPerSection: 3,
    },
    {
      id: '3-day-plan',
      name: '3 Day Plan',
      description: 'Comprehensive 3-day preparation',
      questionPerSection: 4,
    },
    {
      id: '4-day-plan',
      name: '4 Day Plan',
      description: 'Extended preparation with comprehensive coverage',
      questionPerSection: 5,
    },
    {
      id: '5-day-plan',
      name: '5 Day Plan',
      description: 'Comprehensive preparation with advanced topics',
      questionPerSection: 6,
    },
    {
      id: '6-day-plan',
      name: '6 Day Plan',
      description: 'Master-level preparation with all advanced concepts',
      questionPerSection: 7,
    },
    {
      id: '7-day-plan',
      name: '7 Day Plan',
      description: 'Complete week-long preparation',
      questionPerSection: 8,
    },
  ];

  return planConfigs.map(config => {
    // Map sections to plan sections with category mapping
    const planSections = sections.map(section => {
      // Find matching category by name or use a default mapping
      const category = categories.find(
        cat =>
          cat.name.toLowerCase() === section.category.toLowerCase() ||
          (section.category === 'foundation' && cat.name === 'HTML') ||
          (section.category === 'frontend' &&
            (cat.name === 'JavaScript' ||
              cat.name === 'React' ||
              cat.name === 'TypeScript')) ||
          (section.category === 'advanced' &&
            (cat.name === 'Architecture' || cat.name === 'Performance')) ||
          (section.category === 'specialized' &&
            (cat.name === 'Performance' || cat.name === 'Architecture')) ||
          (section.category === 'career' && cat.name === 'Architecture') ||
          (section.category === 'emerging' && cat.name === 'Architecture')
      );

      return {
        id: section.id,
        name: section.name,
        categoryId: category?.id || categories[0]?.id,
        weight: Math.round(100 / sections.length), // Equal weight distribution
      };
    });

    return {
      id: config.id,
      name: config.name,
      description: config.description,
      sections: planSections,
    };
  });
};

export default function GuidedLearningAdminPage() {
  // Static data for testing - no useState or useEffect
  const sections: Section[] = [
    {
      id: 'html-fundamentals',
      name: 'HTML Fundamentals',
      description: 'Master HTML semantics',
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '2-3 weeks',
      order: 1,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'css-fundamentals',
      name: 'CSS Fundamentals',
      description: 'Learn CSS basics',
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '3-4 weeks',
      order: 2,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'javascript-fundamentals',
      name: 'JavaScript Fundamentals',
      description: 'Master JavaScript basics',
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '4-5 weeks',
      order: 3,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'react-fundamentals',
      name: 'React Fundamentals',
      description: 'Master React core concepts',
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '4-5 weeks',
      order: 7,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'typescript-essentials',
      name: 'TypeScript Essentials',
      description: 'Learn TypeScript',
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      order: 6,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Frontend performance techniques',
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      order: 13,
      isActive: true,
      questionCount: 0,
    },
    {
      id: 'design-patterns-architecture',
      name: 'Design Patterns & Architecture',
      description: 'Software design patterns',
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      order: 10,
      isActive: true,
      questionCount: 0,
    },
  ];

  const categories: Category[] = [
    {
      id: 'AjaNBOIdiqulcmNkE5UC',
      name: 'HTML',
      description: 'HTML markup, semantics, and structure',
      color: '#E34F26',
    },
    {
      id: 'SoASg6lwweq1h7d7EQWP',
      name: 'JavaScript',
      description: 'Core JavaScript concepts and advanced topics',
      color: '#F7DF1E',
    },
    {
      id: 'xuyVRvVWrKbfWMKUboFN',
      name: 'React',
      description: 'React library fundamentals and advanced patterns',
      color: '#61DAFB',
    },
    {
      id: 'gVb0Nj1G4MB8RhzNQ55U',
      name: 'TypeScript',
      description: 'TypeScript programming language',
      color: '#3178C6',
    },
    {
      id: '91MFgB8E5GogdkiU5lCw',
      name: 'Performance',
      description: 'Performance optimization techniques',
      color: '#10B981',
    },
    {
      id: 'O3pxATTaIP9POC9JWGGG',
      name: 'Architecture',
      description: 'Software architecture and design patterns',
      color: '#8B5CF6',
    },
  ];

  // Create plans with all sections
  const plans = createPlansWithAllSections(sections, categories);

  // Handle edit plan
  const handleEditPlan = (planId: string) => {
    console.log('Edit plan:', planId);
    // Navigate to edit page
    window.location.href = `/admin/guided-learning/${planId}/edit`;
  };

  // Handle delete plan
  const handleDeletePlan = async (planId: string, planName: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${planName}"? This action cannot be undone.`
      )
    ) {
      try {
        // Here you would typically make an API call to delete the plan
        console.log('Deleting plan:', planId);

        // Show success message
        alert(`Plan "${planName}" has been deleted successfully.`);

        // Reload the page to refresh the data
        window.location.reload();
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan. Please try again.');
      }
    }
  };

  // Handle preview plan
  const handlePreviewPlan = (planId: string) => {
    console.log('Preview plan:', planId);
    // Navigate to preview page
    window.location.href = `/guided-learning/${planId}`;
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Guided Learning Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and configure guided learning plans for your users. Each plan
            includes all {sections.length} available sections.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(plan => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                  {plan.sections.length} sections
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {plan.description}
              </p>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="font-medium text-gray-900 dark:text-white sticky top-0 bg-white dark:bg-gray-800 py-1">
                  All Sections:
                </h4>
                {plan.sections.map(section => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <span className="text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">
                      • {section.name}
                    </span>
                    {section.categoryId && (
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white flex-shrink-0"
                        style={{
                          backgroundColor: getCategoryColor(section.categoryId),
                        }}
                      >
                        {getCategoryName(section.categoryId)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-2">
                <button
                  onClick={() => handlePreviewPlan(plan.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => handleEditPlan(plan.id)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id, plan.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                  title="Delete Plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
