'use client';

import React, { useEffect, useState } from 'react';
import {
  loadFlashcards,
  removeFlashcard,
  FlashcardItem,
} from '@/lib/flashcards';
import { BookOpen, Trash2 } from 'lucide-react';

export default function FlashcardsPage() {
  const [items, setItems] = useState<FlashcardItem[]>([]);

  useEffect(() => {
    setItems(loadFlashcards());
  }, []);

  const handleRemove = (id: string) => {
    removeFlashcard(id);
    setItems(loadFlashcards());
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-10'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <div className='text-center mb-8'>
          <div className='w-20 h-20 bg-gradient-to-r from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
            <BookOpen className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Flashcards
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Review questions you saved from practice.
          </p>
        </div>

        {items.length === 0 ? (
          <div className='text-center text-gray-600 dark:text-gray-400'>
            No flashcards yet. Add some from your practice sessions.
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            {items.map(item => (
              <div
                key={item.id}
                className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-white/30 dark:border-gray-700/30 shadow'
              >
                <div className='flex justify-between items-start gap-4'>
                  <div>
                    <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                      {item.section || 'General'}{' '}
                      {item.difficulty ? `• ${item.difficulty}` : ''}
                    </div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      {item.question}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className='p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                    title='Remove from Flashcards'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
