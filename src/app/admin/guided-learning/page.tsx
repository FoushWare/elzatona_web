'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Eye, Loader2, Plus, Save, X } from 'lucide-react';
import { useLearningPlanTemplates } from '@/hooks/useLearningPlanTemplates';
import { notify } from '@/components/ui/Notification';
import { useConfirmation } from '@/components/ui/ConfirmationDialog';

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

// Helper function to get category name from categoryId
const getCategoryName = (categoryId: string, sections: any[]) => {
  const section = sections.find(s => s.categoryId === categoryId);
  return section?.category || 'Unknown Category';
};

// Helper function to get category color
const getCategoryColor = (categoryId: string) => {
  const colors = {
    AjaNBOIdiqulcmNkE5UC: '#E34F26', // HTML
    SoASg6lwweq1h7d7EQWP: '#F7DF1E', // JavaScript
    xuyVRvVWrKbfWMKUboFN: '#61DAFB', // React
    gVb0Nj1G4MB8RhzNQ55U: '#3178C6', // TypeScript
    '91MFgB8E5GogdkiU5lCw': '#10B981', // Performance
    O3pxATTaIP9POC9JWGGG: '#8B5CF6', // Architecture
  };
  return colors[categoryId as keyof typeof colors] || '#6B7280';
};

export default function GuidedLearningAdminPage() {
  const {
    templates: allPlans,
    isLoading,
    error,
    refreshTemplates,
  } = useLearningPlanTemplates();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  // Filter to only show day-based plans (1-day, 2-day, 3-day, 4-day, 5-day, 6-day, 7-day)
  const plans = allPlans.filter(plan => {
    const dayBasedPlans = [
      '1-day-plan',
      '2-day-plan',
      '3-day-plan',
      '4-day-plan',
      '5-day-plan',
      '6-day-plan',
      '7-day-plan',
    ];
    return dayBasedPlans.includes(plan.id);
  });

  // State for creating/editing plans
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    duration: 1,
    difficulty: 'Beginner',
    features: [''],
    estimatedTime: '2-3 hours',
    isRecommended: false,
  });

  // Handle create new plan
  const handleCreatePlan = () => {
    setIsCreatingPlan(true);
    setEditingPlan(null);
    setNewPlan({
      name: '',
      description: '',
      duration: 1,
      difficulty: 'Beginner',
      features: [''],
      estimatedTime: '2-3 hours',
      isRecommended: false,
    });
  };

  // Handle save new plan
  const handleSavePlan = async () => {
    try {
      const planData = {
        ...newPlan,
        features: newPlan.features.filter(f => f.trim() !== ''),
        sections: [], // Will be managed separately
        totalQuestions: 0,
        dailyQuestions: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await fetch('/api/guided-learning/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      const result = await response.json();

      if (result.success) {
        notify.success('Success!', 'Plan created successfully!');
        setIsCreatingPlan(false);
        setNewPlan({
          name: '',
          description: '',
          duration: 1,
          difficulty: 'Beginner',
          features: [''],
          estimatedTime: '2-3 hours',
          isRecommended: false,
        });
        refreshTemplates();
      } else {
        notify.error('Error', `Failed to create plan: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      notify.error('Error', 'Error creating plan. Please try again.');
    }
  };

  // Handle edit plan
  const handleEditPlan = (planId: string) => {
    console.log('Edit plan:', planId);
    // Navigate to edit page
    window.location.href = `/admin/guided-learning/${planId}/edit`;
  };

  // Handle delete plan
  const handleDeletePlan = async (planId: string, planName: string) => {
    showConfirmation({
      title: 'Delete Learning Plan',
      message: `Are you sure you want to delete "${planName}"? This action cannot be undone and will remove all associated data.`,
      confirmText: 'Delete Plan',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        try {
          console.log('Deleting plan:', planId, planName);

          const response = await fetch(
            `/api/guided-learning/plans?id=${planId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('Delete response status:', response.status);
          const result = await response.json();
          console.log('Delete response result:', result);

          if (result.success) {
            notify.success(
              'Success!',
              `Plan "${planName}" has been deleted successfully.`
            );
            refreshTemplates();
          } else {
            notify.error('Error', `Failed to delete plan: ${result.error}`);
          }
        } catch (error) {
          console.error('Error deleting plan:', error);
          notify.error('Error', 'Failed to delete plan. Please try again.');
        }
      },
    });
  };

  // Handle preview plan
  const handlePreviewPlan = (planId: string) => {
    console.log('Preview plan:', planId);
    // Navigate to preview page
    window.location.href = `/guided-learning/${planId}`;
  };

  // Handle feature input changes
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...newPlan.features];
    newFeatures[index] = value;
    setNewPlan({ ...newPlan, features: newFeatures });
  };

  // Add new feature input
  const addFeature = () => {
    setNewPlan({ ...newPlan, features: [...newPlan.features, ''] });
  };

  // Remove feature input
  const removeFeature = (index: number) => {
    const newFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Guided Learning Plans
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and configure guided learning plans for your users.
                {isLoading
                  ? 'Loading plans...'
                  : `Found ${plans.length} learning plans.`}
              </p>
            </div>
            <button
              onClick={handleCreatePlan}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Plan
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading learning plans...
              </p>
            </div>
          </div>
        )}

        {/* Create Plan Form */}
        {isCreatingPlan && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Learning Plan
              </h2>
              <button
                onClick={() => setIsCreatingPlan(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={e =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., React Fundamentals"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newPlan.duration}
                  onChange={e =>
                    setNewPlan({
                      ...newPlan,
                      duration: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={newPlan.difficulty}
                  onChange={e =>
                    setNewPlan({ ...newPlan, difficulty: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Time
                </label>
                <input
                  type="text"
                  value={newPlan.estimatedTime}
                  onChange={e =>
                    setNewPlan({ ...newPlan, estimatedTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 2-3 hours"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newPlan.description}
                  onChange={e =>
                    setNewPlan({ ...newPlan, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe what this plan covers..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Features
                </label>
                <div className="space-y-2">
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={e =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., Interactive exercises"
                      />
                      {newPlan.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newPlan.isRecommended}
                    onChange={e =>
                      setNewPlan({
                        ...newPlan,
                        isRecommended: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mark as recommended plan
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCreatingPlan(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                disabled={!newPlan.name.trim() || !newPlan.description.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create Plan
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!isLoading && !error && (
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
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      {plan.sections?.length || 0} sections
                    </span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      {plan.totalQuestions || 0} questions
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <h4 className="font-medium text-gray-900 dark:text-white sticky top-0 bg-white dark:bg-gray-800 py-1">
                    Sections:
                  </h4>
                  {plan.sections?.map((section: any) => (
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
                            backgroundColor: getCategoryColor(
                              section.categoryId
                            ),
                          }}
                        >
                          {getCategoryName(section.categoryId, plan.sections)}
                        </span>
                      )}
                    </div>
                  )) || (
                    <p className="text-gray-500 text-sm">
                      No sections available
                    </p>
                  )}
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
        )}
      </div>

      {/* Confirmation Dialog */}
      {ConfirmationDialog}
    </div>
  );
}
