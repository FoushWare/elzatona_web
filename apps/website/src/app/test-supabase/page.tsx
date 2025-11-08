'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { SupabaseLearningCardsService } from '../../../lib/supabase-learning-cards-service';
import { LearningCard } from '../../../types/learning-cards';

export default function TestSupabasePage() {
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const cardsData = await SupabaseLearningCardsService.getAllCards();
      setCards(cardsData);
      console.log('✅ Cards loaded:', cardsData.length);
    } catch (err) {
      console.error('❌ Error loading cards:', err);
      setError('Failed to load learning cards');
    } finally {
      setLoading(false);
    }
  };

  const testCreateCard = async () => {
    try {
      const newCard = await SupabaseLearningCardsService.createCard({
        title: 'Test Card',
        type: 'core-technologies',
        description: 'This is a test card created from the frontend',
        color: '#FF6B6B',
        icon: '🧪',
        order: 999,
        is_active: true,
        metadata: {
          question_count: 0,
          estimatedTime: '5 minutes',
          difficulty: 'beginner' as const,
          topics: [],
          categories: [],
        },
      });
      console.log('✅ Card created:', newCard);
      await loadCards(); // Reload cards
    } catch (err) {
      console.error('❌ Error creating card:', err);
      setError('Failed to create card');
    }
  };

  if (loading) {
    return (
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>
          Testing Supabase Integration
        </h1>
        <div className='text-center'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Testing Supabase Integration</h1>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <div className='mb-6'>
        <button
          onClick={testCreateCard}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Test Create Card
        </button>
        <button
          onClick={loadCards}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Reload Cards
        </button>
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-semibold mb-2'>
          Learning Cards ({cards.length})
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cards.map(card => (
          <div
            key={card.id}
            className='border rounded-lg p-4 shadow-sm'
            style={{ borderLeftColor: card.color, borderLeftWidth: '4px' }}
          >
            <div className='flex items-center mb-2'>
              <span className='text-2xl mr-2'>{card.icon}</span>
              <h3 className='font-semibold'>{card.title}</h3>
            </div>
            <p className='text-gray-600 text-sm mb-2'>{card.description}</p>
            <div className='flex justify-between items-center text-xs text-gray-500'>
              <span className='bg-gray-100 px-2 py-1 rounded'>{card.type}</span>
              <span>Order: {card.order}</span>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className='text-center text-gray-500 py-8'>
          No cards found. Try creating one!
        </div>
      )}
    </div>
  );
}
