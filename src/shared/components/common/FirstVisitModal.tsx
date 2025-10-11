import React, { useState } from 'react';
import { Brain, Compass, X } from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContextSafe';

interface WindowWithTestFlags extends Window {
  __DISABLE_GUIDANCE_MODALS__?: boolean;
  __TEST_MODE__?: boolean;
}

interface FirstVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirstVisitModal: React.FC<FirstVisitModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { setUserType, setHasCompletedOnboarding } = useUserType();
  const [selectedType, setSelectedType] = useState<
    'guided' | 'self-directed' | null
  >(null);

  // Don't show modal during testing
  if (
    typeof window !== 'undefined' &&
    ((window as WindowWithTestFlags).__DISABLE_GUIDANCE_MODALS__ ||
      (window as WindowWithTestFlags).__TEST_MODE__)
  ) {
    return null;
  }

  const handleSelect = (type: 'guided' | 'self-directed') => {
    setSelectedType(type);
    setUserType(type);
    setHasCompletedOnboarding(true);

    // Close modal after selection
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSkip = () => {
    // Set a default type if user skips
    setUserType('self-directed');
    setHasCompletedOnboarding(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Skip selection"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Elzatona web 🚀
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let&apos;s personalize your learning experience. How do you prefer
            to learn?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => handleSelect('guided')}
            className={`p-6 border-2 rounded-xl transition-all duration-300 ease-in-out text-left ${
              selectedType === 'guided'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-105'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  selectedType === 'guided'
                    ? 'bg-indigo-600'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Compass
                  className={`w-6 h-6 ${
                    selectedType === 'guided'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                I need guidance
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Follow structured learning paths and roadmaps to master frontend
              development step by step.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              ✓ Pre-built roadmaps
              <br />
              ✓ Step-by-step guidance
              <br />✓ Progress tracking
            </div>
          </button>

          <button
            onClick={() => handleSelect('self-directed')}
            className={`p-6 border-2 rounded-xl transition-all duration-300 ease-in-out text-left ${
              selectedType === 'self-directed'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-105'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  selectedType === 'self-directed'
                    ? 'bg-indigo-600'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Brain
                  className={`w-6 h-6 ${
                    selectedType === 'self-directed'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                I&apos;m self-directed
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Create your own custom roadmaps and explore resources at your own
              pace.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              ✓ Custom roadmaps
              <br />
              ✓ Flexible scheduling
              <br />✓ Free exploration
            </div>
          </button>
        </div>

        {selectedType && (
          <div className="text-center">
            <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">
              Perfect! Setting up your{' '}
              {selectedType === 'guided' ? 'guided' : 'self-directed'} learning
              experience...
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={handleSkip}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};
