'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import Link from 'next/link';
import { X, Star, ArrowRight, Users, Target, BookOpen } from 'lucide-react';

interface WelcomeBannerProps {
  onClose: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Star className='w-6 h-6 text-yellow-300' />
              <span className='font-bold text-lg'>
                Welcome to Elzatona Web!
              </span>
            </div>
            <div className='hidden md:flex items-center space-x-6 text-sm'>
              <div className='flex items-center space-x-1'>
                <Target className='w-4 h-4' />
                <span>Guided Learning</span>
              </div>
              <div className='flex items-center space-x-1'>
                <BookOpen className='w-4 h-4' />
                <span>Free Style</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Users className='w-4 h-4' />
                <span>Community</span>
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <Link
              href='/auth'
              className='flex items-center space-x-2 bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition-colors'
            >
              <span>Sign In</span>
              <ArrowRight className='w-4 h-4' />
            </Link>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-white/20 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='mt-3 text-sm opacity-90'>
          <p>
            Prepare for frontend interviews with our comprehensive learning
            platform.
            <Link
              href='/get-started'
              className='underline hover:no-underline ml-1'
            >
              Get started →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
