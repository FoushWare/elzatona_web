'use client';

import React, { useState } from 'react';
import { Compass, Brain, ChevronDown } from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContextSafe';

interface LearningModeSwitcherProps {
  isScrolled?: boolean;
}

export const LearningModeSwitcher: React.FC<LearningModeSwitcherProps> = ({
  isScrolled = false,
}) => {
  const { userType, setUserType } = useUserType();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    {
      id: 'guided',
      name: 'Guided',
      description: 'Structured learning with clear steps',
      icon: <Compass className="w-4 h-4" />,
      color: 'text-blue-600',
    },
    {
      id: 'self-directed',
      name: 'Free Style',
      description: 'Explore and learn at your own pace',
      icon: <Brain className="w-4 h-4" />,
      color: 'text-purple-600',
    },
  ];

  const currentMode = modes.find(mode => mode.id === userType) || {
    id: 'guided',
    name: 'Select Mode',
    description: 'Choose your learning style',
    icon: <Compass className="w-4 h-4" />,
    color: 'text-gray-600',
  };

  const handleModeChange = (modeId: 'guided' | 'self-directed') => {
    setUserType(modeId);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isScrolled
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
        }`}
        aria-label="Switch learning mode"
      >
        <div
          className={`${userType ? currentMode.color : 'text-gray-500'} ${isScrolled ? '' : 'text-white'}`}
        >
          {currentMode.icon}
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {currentMode.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isScrolled ? 'text-gray-500' : 'text-white'}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
              Learning Mode
            </div>
            {modes.map(mode => (
              <button
                key={mode.id}
                onClick={() =>
                  handleModeChange(mode.id as 'guided' | 'self-directed')
                }
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                  userType === mode.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    userType === mode.id
                      ? 'bg-indigo-100 dark:bg-indigo-800'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`${
                      userType === mode.id
                        ? 'text-indigo-600'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {mode.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className={`font-medium ${
                      userType === mode.id
                        ? 'text-indigo-900 dark:text-indigo-100'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {mode.name}
                  </div>
                  <div
                    className={`text-sm ${
                      userType === mode.id
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {mode.description}
                  </div>
                </div>
                {userType === mode.id && (
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Switch anytime to change your learning experience
            </p>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
