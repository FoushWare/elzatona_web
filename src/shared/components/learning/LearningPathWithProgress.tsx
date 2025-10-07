// v1.0 - Example Learning Path Component with Progress Tracking
'use client';

import { useState, useEffect } from 'react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Play,
  ArrowRight,
  ArrowLeft,
  Target,
  Star,
  Trophy,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'reading' | 'video' | 'interactive' | 'quiz';
  estimatedTime: number; // in minutes
  completed: boolean;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // total in minutes
  sections: Section[];
}

interface LearningPathWithProgressProps {
  learningPath: LearningPath;
  onComplete?: () => void;
}

export default function LearningPathWithProgress({
  learningPath,
  onComplete,
}: LearningPathWithProgressProps) {
  const { updateProgress } = useProgressTracking();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionStartTime, setSectionStartTime] = useState(Date.now());
  const [isTracking, setIsTracking] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );

  const currentSection = learningPath.sections[currentSectionIndex];
  const progress =
    (completedSections.size / learningPath.sections.length) * 100;

  useEffect(() => {
    // Initialize section start time when section changes
    setSectionStartTime(Date.now());
  }, [currentSectionIndex]);

  const handleSectionComplete = async () => {
    const timeSpent = Math.floor((Date.now() - sectionStartTime) / 60000); // Convert to minutes

    setIsTracking(true);
    try {
      updateProgress({
        completedQuestions: 1,
        totalTimeSpent: timeSpent,
        lastActivity: new Date().toISOString(),
      });

      setCompletedSections(prev => new Set([...prev, currentSection.id]));

      // Check if all sections are completed
      const newCompletedSections = new Set([
        ...completedSections,
        currentSection.id,
      ]);
      if (newCompletedSections.size === learningPath.sections.length) {
        if (onComplete) {
          onComplete();
        }
      }
    } catch (error) {
      console.error('Error tracking learning path progress:', error);
    } finally {
      setIsTracking(false);
    }
  };

  const handleNextSection = () => {
    if (currentSectionIndex < learningPath.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSectionTypeIcon = (type: string) => {
    switch (type) {
      case 'reading':
        return '📖';
      case 'video':
        return '🎥';
      case 'interactive':
        return '🎮';
      case 'quiz':
        return '❓';
      default:
        return '📄';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Learning Path Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {learningPath.title}
              </h1>
              <div className="flex items-center space-x-3 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(learningPath.difficulty)}`}
                >
                  {learningPath.difficulty.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {learningPath.category}
                </span>
                <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(learningPath.estimatedTime)}
                </span>
              </div>
            </div>
          </div>

          {progress === 100 && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Trophy className="w-6 h-6" />
              <span className="font-semibold">Completed!</span>
            </div>
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {learningPath.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {completedSections.size} of {learningPath.sections.length}{' '}
              sections
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sections Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sections
          </h3>
          <div className="space-y-2">
            {learningPath.sections.map((section, index) => {
              const isCurrent = index === currentSectionIndex;
              const isCompleted = completedSections.has(section.id);

              return (
                <div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isCurrent
                      ? 'bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500'
                      : isCompleted
                        ? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-600'
                        : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setCurrentSectionIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getSectionTypeIcon(section.type)}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {section.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(section.estimatedTime)}
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {getSectionTypeIcon(currentSection.type)}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentSection.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Section {currentSectionIndex + 1} of{' '}
                    {learningPath.sections.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentSection.estimatedTime)}</span>
              </div>
            </div>

            {/* Section Content */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {currentSection.description}
              </p>

              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  {currentSection.content}
                </div>
              </div>
            </div>

            {/* Section Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousSection}
                disabled={currentSectionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                {!completedSections.has(currentSection.id) && (
                  <button
                    onClick={handleSectionComplete}
                    disabled={isTracking}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isTracking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>
                )}

                {completedSections.has(currentSection.id) && (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}

                <button
                  onClick={handleNextSection}
                  disabled={
                    currentSectionIndex === learningPath.sections.length - 1
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration */}
      {progress === 100 && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="opacity-90 mb-4">
              You&apos;ve completed the &quot;{learningPath.title}&quot;
              learning path!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">+50</div>
                <div className="text-sm opacity-75">points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+1</div>
                <div className="text-sm opacity-75">achievement</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking Indicator */}
      {isTracking && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Saving your progress...</span>
          </div>
        </div>
      )}
    </div>
  );
}
