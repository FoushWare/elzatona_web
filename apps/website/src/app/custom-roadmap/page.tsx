'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

// import { SignInPopup } from '@elzatona/shared-components'; // Temporarily disabled due to import issues
import { useAuth } from '@elzatona/shared-contexts';
import {
  Plus,
  Minus,
  Check,
  Clock,
  Target,
  ArrowRight,
  Save,
  Eye,
  Calendar,
  BookOpen,
  Code,
  Brain,
  Users,
  Zap,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
  isSelected: boolean;
  selectedQuestions: string[];
}

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  points: number;
}

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  sections: Section[];
  totalQuestions: number;
  dailyQuestions: number;
  created_at: Date;
}

export default function CustomRoadmapPage() {
  const router = useRouter();
  const { isAuthenticated: authIsAuthenticated, user } = useAuth();

  // Determine if user is authenticated
  const isAuthenticated = authIsAuthenticated && !!user;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [duration, setDuration] = useState(7);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSections, setSelectedSections] = useState<Set<string>>(
    new Set()
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Clear any pending intent flags when user reaches this page (authenticated)
    if (isAuthenticated) {
      try {
        localStorage.removeItem('pending_browse_practice_questions_intent');
        localStorage.removeItem('pending_custom_roadmap_intent');
        console.log('✅ Cleared pending intent flags on custom-roadmap page');
      } catch (e) {
        console.warn('Error clearing localStorage flags:', e);
      }
      loadSections();
      return;
    }

    // If not authenticated, store intent and redirect to auth
    try {
      localStorage.setItem('pending_browse_practice_questions_intent', 'true');
      // Redirect to auth page, which will then redirect to dashboard
      router.push('/auth?redirect=/dashboard');
    } catch (e) {
      console.warn('Error setting localStorage flag:', e);
    }
  }, [isAuthenticated, router]);

  const loadSections = async () => {
    setIsLoading(true);
    // Simulate loading from Firebase
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockSections: Section[] = [
      {
        id: 'html-fundamentals',
        name: 'HTML Fundamentals',
        description: 'Master the building blocks of web development with HTML5',
        category: 'Foundation',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '1',
            title: 'HTML5 Semantic Elements',
            difficulty: 'Easy',
            estimatedTime: '15 min',
            points: 20,
          },
          {
            id: '2',
            title: 'Form Validation and Input Types',
            difficulty: 'Medium',
            estimatedTime: '25 min',
            points: 30,
          },
          {
            id: '3',
            title: 'Accessibility Best Practices',
            difficulty: 'Medium',
            estimatedTime: '30 min',
            points: 35,
          },
          {
            id: '4',
            title: 'HTML5 APIs and Storage',
            difficulty: 'Hard',
            estimatedTime: '45 min',
            points: 50,
          },
        ],
      },
      {
        id: 'css-fundamentals',
        name: 'CSS Fundamentals',
        description: 'Learn styling, layout, and responsive design with CSS3',
        category: 'Foundation',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '5',
            title: 'CSS Grid and Flexbox Layout',
            difficulty: 'Medium',
            estimatedTime: '30 min',
            points: 40,
          },
          {
            id: '6',
            title: 'CSS Animations and Transitions',
            difficulty: 'Medium',
            estimatedTime: '25 min',
            points: 30,
          },
          {
            id: '7',
            title: 'Responsive Design Principles',
            difficulty: 'Hard',
            estimatedTime: '40 min',
            points: 45,
          },
          {
            id: '8',
            title: 'CSS Preprocessors (SASS/SCSS)',
            difficulty: 'Hard',
            estimatedTime: '35 min',
            points: 40,
          },
        ],
      },
      {
        id: 'javascript-fundamentals',
        name: 'JavaScript Fundamentals',
        description: 'Core JavaScript concepts, ES6+, and modern development',
        category: 'Foundation',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '9',
            title: 'Closures and Scope in JavaScript',
            difficulty: 'Hard',
            estimatedTime: '30 min',
            points: 45,
          },
          {
            id: '10',
            title: 'Promises and Async/Await',
            difficulty: 'Medium',
            estimatedTime: '25 min',
            points: 35,
          },
          {
            id: '11',
            title: 'ES6+ Features and Modules',
            difficulty: 'Medium',
            estimatedTime: '20 min',
            points: 30,
          },
          {
            id: '12',
            title: 'Event Handling and DOM Manipulation',
            difficulty: 'Easy',
            estimatedTime: '15 min',
            points: 25,
          },
        ],
      },
      {
        id: 'react-mastery',
        name: 'React Mastery',
        description: 'Advanced React concepts, hooks, and state management',
        category: 'Frontend',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '13',
            title: 'React Hooks Deep Dive',
            difficulty: 'Hard',
            estimatedTime: '40 min',
            points: 50,
          },
          {
            id: '14',
            title: 'State Management with Redux',
            difficulty: 'Hard',
            estimatedTime: '45 min',
            points: 55,
          },
          {
            id: '15',
            title: 'Performance Optimization',
            difficulty: 'Hard',
            estimatedTime: '35 min',
            points: 45,
          },
          {
            id: '16',
            title: 'Testing React Components',
            difficulty: 'Medium',
            estimatedTime: '30 min',
            points: 40,
          },
        ],
      },
      {
        id: 'behavioral-soft-skills',
        name: 'Behavioral & Soft Skills',
        description: 'Communication, teamwork, and professional development',
        category: 'Career',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '17',
            title: 'Technical Communication',
            difficulty: 'Easy',
            estimatedTime: '20 min',
            points: 25,
          },
          {
            id: '18',
            title: 'Team Collaboration Strategies',
            difficulty: 'Medium',
            estimatedTime: '25 min',
            points: 30,
          },
          {
            id: '19',
            title: 'Problem-Solving Approach',
            difficulty: 'Medium',
            estimatedTime: '30 min',
            points: 35,
          },
          {
            id: '20',
            title: 'Leadership in Tech',
            difficulty: 'Hard',
            estimatedTime: '35 min',
            points: 40,
          },
        ],
      },
      {
        id: 'ai-tools-frontend',
        name: 'AI Tools for Frontend',
        description: 'Leveraging AI tools for modern frontend development',
        category: 'Emerging',
        isSelected: false,
        selectedQuestions: [],
        questions: [
          {
            id: '21',
            title: 'AI-Powered Code Generation',
            difficulty: 'Medium',
            estimatedTime: '25 min',
            points: 30,
          },
          {
            id: '22',
            title: 'Automated Testing with AI',
            difficulty: 'Hard',
            estimatedTime: '35 min',
            points: 40,
          },
          {
            id: '23',
            title: 'AI-Assisted Debugging',
            difficulty: 'Medium',
            estimatedTime: '20 min',
            points: 25,
          },
          {
            id: '24',
            title: 'Future of AI in Frontend',
            difficulty: 'Easy',
            estimatedTime: '15 min',
            points: 20,
          },
        ],
      },
    ];

    setSections(mockSections);
    setIsLoading(false);
  };

  const handleSectionToggle = (sectionId: string) => {
    const newSelectedSections = new Set(selectedSections);
    if (newSelectedSections.has(sectionId)) {
      newSelectedSections.delete(sectionId);
      // Clear selected questions for this section
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId
            ? { ...section, isSelected: false, selectedQuestions: [] }
            : section
        )
      );
    } else {
      newSelectedSections.add(sectionId);
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId ? { ...section, isSelected: true } : section
        )
      );
    }
    setSelectedSections(newSelectedSections);
  };

  const handleQuestionToggle = (sectionId: string, question_id: string) => {
    setSections(prev =>
      prev.map(section => {
        if (section.id === sectionId) {
          const newSelectedQuestions = section.selectedQuestions.includes(
            question_id
          )
            ? section.selectedQuestions.filter(id => id !== question_id)
            : [...section.selectedQuestions, question_id];
          return { ...section, selectedQuestions: newSelectedQuestions };
        }
        return section;
      })
    );
  };

  const handleSelectAllQuestions = (sectionId: string) => {
    setSections(prev =>
      prev.map(section => {
        if (section.id === sectionId) {
          const allQuestionIds = section.questions.map(q => q.id);
          return { ...section, selectedQuestions: allQuestionIds };
        }
        return section;
      })
    );
  };

  const handleClearAllQuestions = (sectionId: string) => {
    setSections(prev =>
      prev.map(section => {
        if (section.id === sectionId) {
          return { ...section, selectedQuestions: [] };
        }
        return section;
      })
    );
  };

  const calculatePlanStats = () => {
    const selectedSectionsData = sections.filter(section =>
      selectedSections.has(section.id)
    );
    const totalQuestions = selectedSectionsData.reduce(
      (sum, section) => sum + section.selectedQuestions.length,
      0
    );
    const dailyQuestions = Math.ceil(totalQuestions / duration);

    return { totalQuestions, dailyQuestions };
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      alert('Please enter a plan name');
      return;
    }

    const selectedSectionsData = sections.filter(section =>
      selectedSections.has(section.id)
    );
    if (selectedSectionsData.length === 0) {
      alert('Please select at least one section');
      return;
    }

    const totalSelectedQuestions = selectedSectionsData.reduce(
      (sum, section) => sum + section.selectedQuestions.length,
      0
    );
    if (totalSelectedQuestions === 0) {
      alert('Please select at least one question');
      return;
    }

    setIsSaving(true);

    // Simulate saving to Firebase
    await new Promise(resolve => setTimeout(resolve, 2000));

    const plan: CustomPlan = {
      id: `plan_${Date.now()}`,
      name: planName,
      description: planDescription,
      duration,
      sections: selectedSectionsData,
      totalQuestions: totalSelectedQuestions,
      dailyQuestions: Math.ceil(totalSelectedQuestions / duration),
      created_at: new Date(),
    };

    // Save to localStorage for now (in real app, save to Firebase)
    const existingPlans = JSON.parse(localStorage.getItem('userPlans') || '[]');
    existingPlans.push(plan);
    localStorage.setItem('userPlans', JSON.stringify(existingPlans));

    setIsSaving(false);
    router.push('/my-plans');
  };

  const { totalQuestions, dailyQuestions } = calculatePlanStats();

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600' />
          <p className='text-gray-600 dark:text-gray-300 text-lg'>
            Loading sections...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110' />
            <div className='relative w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl'>
              <Target className='w-12 h-12 text-white' />
              <div
                className='absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin'
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className='text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>
            Create Your Custom Roadmap
          </h1>

          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8'>
            Build a personalized learning path tailored to your goals, schedule,
            and interests. Choose from all available sections and select
            specific questions to create your perfect study plan.
          </p>
        </div>

        {/* Progress Steps */}
        <div className='flex items-center justify-center mb-12'>
          <div className='flex items-center space-x-4'>
            {[1, 2, 3].map(step => (
              <div key={step} className='flex items-center'>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {currentStep > step ? <Check className='w-5 h-5' /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step
                        ? 'bg-indigo-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Plan Details */}
        {currentStep === 1 && (
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Plan Details
              </h2>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Plan Name *
                  </label>
                  <input
                    type='text'
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    placeholder='e.g., Frontend Mastery Plan'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Description
                  </label>
                  <textarea
                    value={planDescription}
                    onChange={e => setPlanDescription(e.target.value)}
                    placeholder='Describe your learning goals and what you want to achieve...'
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Duration (days)
                  </label>
                  <div className='flex items-center space-x-4'>
                    <button
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600'
                    >
                      <Minus className='w-4 h-4' />
                    </button>
                    <input
                      type='number'
                      value={duration}
                      onChange={e =>
                        setDuration(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min='1'
                      max='365'
                      className='w-20 text-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                    />
                    <button
                      onClick={() => setDuration(Math.min(365, duration + 1))}
                      className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600'
                    >
                      <Plus className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-8 text-right'>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!planName.trim()}
                  className='px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors'
                >
                  Next: Select Sections
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Sections */}
        {currentStep === 2 && (
          <div className='max-w-6xl mx-auto'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Select Learning Sections
              </h2>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {sections.map(section => (
                  <div
                    key={section.id}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedSections.has(section.id)
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleSectionToggle(section.id)}
                  >
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedSections.has(section.id)
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {selectedSections.has(section.id) && (
                            <Check className='w-4 h-4 text-white' />
                          )}
                        </div>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          {section.name}
                        </h3>
                      </div>
                    </div>

                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
                      {section.description}
                    </p>

                    <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                      <span>{section.questions.length} questions</span>
                      <span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg'>
                        {section.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-8 flex justify-between'>
                <button
                  onClick={() => setCurrentStep(1)}
                  className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedSections.size === 0}
                  className='px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors'
                >
                  Next: Select Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Questions */}
        {currentStep === 3 && (
          <div className='max-w-6xl mx-auto'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Select Questions for Each Section
              </h2>

              <div className='space-y-6'>
                {sections
                  .filter(section => selectedSections.has(section.id))
                  .map(section => (
                    <div
                      key={section.id}
                      className='border border-gray-200 dark:border-gray-700 rounded-xl p-6'
                    >
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                          {section.name}
                        </h3>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => handleSelectAllQuestions(section.id)}
                            className='px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors'
                          >
                            Select All
                          </button>
                          <button
                            onClick={() => handleClearAllQuestions(section.id)}
                            className='px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                          >
                            Clear All
                          </button>
                        </div>
                      </div>

                      <div className='grid md:grid-cols-2 gap-4'>
                        {section.questions.map(question => (
                          <div
                            key={question.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              section.selectedQuestions.includes(question.id)
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            onClick={() =>
                              handleQuestionToggle(section.id, question.id)
                            }
                          >
                            <div className='flex items-start justify-between'>
                              <div className='flex-1'>
                                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                                  {question.title}
                                </h4>
                                <div className='flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
                                  <span
                                    className={`px-2 py-1 rounded-lg ${
                                      question.difficulty === 'Easy'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : question.difficulty === 'Medium'
                                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}
                                  >
                                    {question.difficulty}
                                  </span>
                                  <span>{question.estimatedTime}</span>
                                  <span>{question.points} pts</span>
                                </div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-4 ${
                                  section.selectedQuestions.includes(
                                    question.id
                                  )
                                    ? 'border-indigo-500 bg-indigo-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}
                              >
                                {section.selectedQuestions.includes(
                                  question.id
                                ) && <Check className='w-3 h-3 text-white' />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className='mt-8 flex justify-between'>
                <button
                  onClick={() => setCurrentStep(2)}
                  className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                >
                  Back
                </button>
                <button
                  onClick={handleSavePlan}
                  disabled={totalQuestions === 0 || isSaving}
                  className='px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors flex items-center space-x-2'
                >
                  {isSaving ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className='w-4 h-4' />
                      <span>Create Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plan Summary Sidebar */}
        {currentStep > 1 && (
          <div className='fixed right-8 top-1/2 transform -translate-y-1/2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Plan Summary
            </h3>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Duration:
                </span>
                <span className='font-medium text-gray-900 dark:text-white'>
                  {duration} days
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Sections:
                </span>
                <span className='font-medium text-gray-900 dark:text-white'>
                  {selectedSections.size}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Total Questions:
                </span>
                <span className='font-medium text-gray-900 dark:text-white'>
                  {totalQuestions}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Daily Goal:
                </span>
                <span className='font-medium text-gray-900 dark:text-white'>
                  {dailyQuestions}
                </span>
              </div>
            </div>

            {totalQuestions > 0 && (
              <div className='mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg'>
                <div className='flex items-center space-x-2 text-indigo-700 dark:text-indigo-300'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-sm font-medium'>Ready to create!</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sign-in Popup */}
      {/* Sign-in Popup - Redirected to /auth page instead */}
    </div>
  );
}
