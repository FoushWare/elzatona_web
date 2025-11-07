'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Target, ArrowRight } from 'lucide-react';

export default function QuestionsEntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams?.get('topic') || '';
  const subtopic = searchParams?.get('subtopic') || '';

  const prettyTopic = topic
    ? topic.charAt(0).toUpperCase() + topic.slice(1)
    : 'Practice';
  const prettySub = subtopic
    ? subtopic
        .split('-')
        .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
        .join(' ')
    : '';

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8'>
      <div className='container mx-auto px-4 max-w-3xl'>
        <div className='text-center mb-10'>
          <div className='w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
            <BookOpen className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            {prettyTopic} {prettySub && `— ${prettySub}`}
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Free-style practice is available now. Guided filtering is coming
            soon to this page.
          </p>
        </div>

        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center'>
          <p className='text-gray-700 dark:text-gray-300 mb-6'>
            Start practicing right away in Free Style mode. We&apos;ll take you
            to the practice interface.
          </p>

          <Link
            href={
              topic || subtopic
                ? `/free-style-practice?${new URLSearchParams({
                    ...(topic && { topic }),
                    ...(subtopic && { subtopic }),
                  }).toString()}`
                : '/free-style-practice'
            }
            className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
          >
            <Target className='w-5 h-5' />
            <span>Start Practice</span>
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </div>
  );
}
