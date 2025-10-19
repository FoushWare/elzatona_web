'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default function TestQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('🔍 Test: Starting fetch...');
        setLoading(true);
        setError(null);

        const response = await fetch(
          '/api/questions/unified?page=1&pageSize=10'
        );
        console.log('📡 Test: Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📊 Test: Result:', result);

        setQuestions(result.data || []);
        setLoading(false);
        console.log('✅ Test: Questions set:', result.data?.length || 0);
      } catch (err) {
        console.error('❌ Test: Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Questions Page</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Questions Page</h1>
        <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-semibold mb-2">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Questions Page</h1>
      <div className="mb-4">
        <p className="text-lg">Total questions: {questions.length}</p>
      </div>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id || index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{question.title}</h3>
            <p className="text-sm text-gray-600">
              {question.category} - {question.difficulty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
