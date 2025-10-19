/**
 * Search Suggestions API Endpoint
 * Provides search suggestions based on query and existing data
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestionLimit = limitParam ? parseInt(limitParam) : 10;
    const queryLower = query.toLowerCase();

    console.log('🔍 Generating suggestions for:', query);

    // Get all questions for suggestion generation
    const { data: questionsData, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1000);

    if (error) {
      throw error;
    }

    const questions = questionsData || [];

    const suggestions = new Set<string>();

    // Generate suggestions from various fields
    questions.forEach(question => {
      // Title words
      if (question.title) {
        const titleWords = question.title.split(/\s+/);
        titleWords.forEach((word: string) => {
          const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
          if (cleanWord.length > 2 && cleanWord.includes(queryLower)) {
            suggestions.add(word);
          }
        });
      }

      // Tags
      if (question.tags && Array.isArray(question.tags)) {
        question.tags.forEach((tag: string) => {
          if (tag.toLowerCase().includes(queryLower)) {
            suggestions.add(tag);
          }
        });
      }

      // Categories
      if (
        question.category &&
        question.category.toLowerCase().includes(queryLower)
      ) {
        suggestions.add(question.category);
      }

      // Topics
      if (question.topic && question.topic.toLowerCase().includes(queryLower)) {
        suggestions.add(question.topic);
      }

      // Content keywords
      if (question.content) {
        const contentWords = question.content.split(/\s+/);
        contentWords.forEach((word: string) => {
          const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
          if (cleanWord.length > 3 && cleanWord.includes(queryLower)) {
            suggestions.add(word);
          }
        });
      }
    });

    // Convert to array and sort by relevance
    const suggestionArray = Array.from(suggestions)
      .sort((a, b) => {
        // Prioritize exact matches
        const aExact = a.toLowerCase() === queryLower;
        const bExact = b.toLowerCase() === queryLower;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        // Then by length (shorter is better for suggestions)
        if (a.length !== b.length) return a.length - b.length;

        // Finally alphabetically
        return a.localeCompare(b);
      })
      .slice(0, suggestionLimit);

    console.log('✅ Generated suggestions:', suggestionArray.length);

    return NextResponse.json({ suggestions: suggestionArray });
  } catch (error) {
    console.error('❌ Suggestions error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate suggestions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
