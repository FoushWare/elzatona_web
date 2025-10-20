'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Map, Compass, ArrowRight, CheckCircle } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelect: (userType: 'guided' | 'self-directed') => void;
  className?: string;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  onSelect,
  className = '',
}) => {
  const [selectedType, setSelectedType] = useState<
    'guided' | 'self-directed' | null
  >(null);

  const handleSelect = (type: 'guided' | 'self-directed') => {
    setSelectedType(type);
    setTimeout(() => onSelect(type), 300); // Small delay for visual feedback
  };

  return (
    <div className={`user-type-selector ${className}`}>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
          How would you like to learn?
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          Choose your learning style to get the most personalized experience
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
        {/* Guided Path Option */}
        <div
          className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
            selectedType === 'guided'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
          }`}
          onClick={() => handleSelect('guided')}
        >
          {selectedType === 'guided' && (
            <div className='absolute top-4 right-4'>
              <CheckCircle className='w-6 h-6 text-indigo-600' />
            </div>
          )}

          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Map className='w-8 h-8 text-white' />
            </div>

            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
              I need guidance
            </h3>

            <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
              Show me structured learning paths with clear milestones and
              progress tracking
            </p>

            <div className='space-y-2 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                <span>Pre-defined learning paths</span>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                <span>Progress tracking & milestones</span>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                <span>Expert-curated content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Directed Option */}
        <div
          className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
            selectedType === 'self-directed'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
          }`}
          onClick={() => handleSelect('self-directed')}
        >
          {selectedType === 'self-directed' && (
            <div className='absolute top-4 right-4'>
              <CheckCircle className='w-6 h-6 text-indigo-600' />
            </div>
          )}

          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Compass className='w-8 h-8 text-white' />
            </div>

            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
              I&apos;m self-directed
            </h3>

            <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
              Let me create my own roadmap and explore content at my own pace
            </p>

            <div className='space-y-2 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                <span>Custom roadmap builder</span>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                <span>Flexible learning schedule</span>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                <span>Explore all content freely</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedType && (
        <div className='text-center mt-8'>
          <div className='inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium'>
            <span>Great choice!</span>
            <ArrowRight className='w-4 h-4 animate-pulse' />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTypeSelector;
