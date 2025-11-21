import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeObjectServer, sanitizeRichContent } from '@/lib/utils/sanitize-server';

// Validate environment variables
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables.'
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseClient();

    const { data: question, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { id: bodyId, ...updateData } = body;

    // Use the same Supabase client helper as the main route
    const supabase = getSupabaseClient();

    console.log('🔄 Updating question:', id);
    console.log('📥 Raw update data keys:', Object.keys(updateData));
    console.log('📥 Raw update data:', JSON.stringify(updateData, null, 2));

    // Sanitize update data
    const sanitizedUpdate = sanitizeObjectServer(updateData);
    console.log('🧹 Sanitized update data keys:', Object.keys(sanitizedUpdate));
    
    // Sanitize rich content fields
    if (sanitizedUpdate.explanation) {
      sanitizedUpdate.explanation = sanitizeRichContent(sanitizedUpdate.explanation);
    }

    // Sanitize options if present
    if (sanitizedUpdate.options && Array.isArray(sanitizedUpdate.options)) {
      sanitizedUpdate.options = sanitizedUpdate.options.map((option: any) => ({
        ...option,
        text: sanitizeRichContent(option.text || ''),
      }));
    }

    // Map category name to category_id if needed (same logic as main route)
    const hasCategory = 'category' in sanitizedUpdate || 'category_id' in sanitizedUpdate;
    let categoryId: string | undefined = undefined;
    if (hasCategory) {
      const categoryValue = sanitizedUpdate.category_id || sanitizedUpdate.category;
      if (categoryValue && typeof categoryValue === 'string' && !categoryValue.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        // It's a category name, not an ID - need to look it up
        const categoryName = categoryValue.trim();
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name')
          .ilike('name', categoryName)
          .single();
        
        if (categoryError || !categoryData) {
          console.error('Category lookup error:', categoryError, 'Looking for:', categoryName);
          const { data: allCategories } = await supabase
            .from('categories')
            .select('name')
            .order('name');
          const categoryNames = allCategories?.map(c => c.name).join(', ') || 'None';
          throw new Error(`Category "${categoryName}" not found. Available categories: ${categoryNames}`);
        }
        
        categoryId = categoryData.id;
        console.log(`✅ Found category "${categoryData.name}" with ID: ${categoryId}`);
      } else if (categoryValue && typeof categoryValue === 'string') {
        // It's already an ID
        categoryId = categoryValue;
        console.log(`✅ Using provided category ID: ${categoryId}`);
      }
    }

    // Map topic name to topic_id if needed (same logic as main route)
    const hasTopic = 'topic' in sanitizedUpdate || 'topic_id' in sanitizedUpdate;
    let topicId: string | undefined = undefined;
    if (hasTopic) {
      const topicValue = sanitizedUpdate.topic_id || sanitizedUpdate.topic;
      if (topicValue && typeof topicValue === 'string' && !topicValue.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        // It's a topic name, not an ID - need to look it up
        const topicName = topicValue.trim();
        let topicQuery = supabase
          .from('topics')
          .select('id, name')
          .ilike('name', topicName);
        
        // If we have a category_id, filter topics by that category
        if (categoryId) {
          topicQuery = topicQuery.eq('category_id', categoryId);
        }
        
        const { data: topicData, error: topicError } = await topicQuery.single();
        
        if (topicError || !topicData) {
          console.error('Topic lookup error:', topicError, 'Looking for:', topicName, 'Category ID:', categoryId);
          const categoryHint = categoryId ? ` for the selected category` : '';
          throw new Error(`Topic "${topicName}" not found${categoryHint}. Make sure the topic exists and belongs to the selected category.`);
        }
        
        topicId = topicData.id;
        console.log(`✅ Found topic "${topicData.name}" with ID: ${topicId}`);
      } else if (topicValue && typeof topicValue === 'string') {
        // It's already an ID
        topicId = topicValue;
        console.log(`✅ Using provided topic ID: ${topicId}`);
      }
    }

    // Map learningCardId to learning_card_id (same logic as main route)
    const hasLearningCardId = 'learningCardId' in sanitizedUpdate || 'learning_card_id' in sanitizedUpdate;
    const learningCardId = sanitizedUpdate.learning_card_id || sanitizedUpdate.learningCardId;
    
    // Validate learningCardId if provided (must be UUID or empty/null)
    let finalLearningCardId: string | null | undefined = undefined; // undefined means don't update this field
    if (hasLearningCardId) {
      if (learningCardId && typeof learningCardId === 'string' && learningCardId.trim() !== '') {
        const trimmedId = learningCardId.trim();
        // Check if it's a valid UUID
        if (trimmedId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          finalLearningCardId = trimmedId;
          console.log(`✅ Using learning card ID: ${finalLearningCardId}`);
        } else {
          console.warn(`⚠️ Invalid learning card ID format: "${trimmedId}". Expected UUID.`);
          finalLearningCardId = null; // Invalid format, set to null to clear it
        }
      } else {
        // Explicitly provided as empty/null - clear the card
        finalLearningCardId = null;
        console.log('ℹ️ Learning card ID explicitly cleared (set to null)');
      }
    } else {
      console.log('ℹ️ No learning card ID provided in update (field not modified)');
    }

    // Prepare update data for database
    // Remove fields that don't exist in the database or shouldn't be updated
    const {
      category,
      topic,
      learningCardId: _learningCardId,
      learning_card_id: _learning_card_id,
      categories,
      topics,
      learning_cards,
      learning_card,
      stats,
      metadata,
      test_cases,
      correct_answer,
      created_at, // Don't allow updating created_at
      updated_at: _updated_at, // We set this ourselves
      id: _id, // Don't include id in update
      sampleAnswers, // Frontend-only field
      ...dbUpdate
    } = sanitizedUpdate;

    // Ensure content field exists if title is provided
    if (!dbUpdate.content && dbUpdate.title) {
      dbUpdate.content = dbUpdate.title;
    }

    // Build update object with only the fields that should be updated
    const updateWithTimestamps: any = {
      ...dbUpdate,
      updated_at: new Date().toISOString(),
    };

    // Only include category_id, topic_id, learning_card_id if they were provided/mapped
    if (categoryId) {
      updateWithTimestamps.category_id = categoryId;
    }
    if (topicId) {
      updateWithTimestamps.topic_id = topicId;
    }
    if (finalLearningCardId !== undefined) {
      updateWithTimestamps.learning_card_id = finalLearningCardId;
    }

    console.log('📝 Question update data keys:', Object.keys(updateWithTimestamps));
    console.log('📝 Question update data:', {
      id,
      title: updateWithTimestamps.title,
      category_id: updateWithTimestamps.category_id,
      topic_id: updateWithTimestamps.topic_id,
      learning_card_id: updateWithTimestamps.learning_card_id,
      allKeys: Object.keys(updateWithTimestamps),
    });

    const { data, error } = await supabase
      .from('questions')
      .update(updateWithTimestamps)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase update error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Question updated successfully',
    });
  } catch (error: any) {
    console.error('❌ Error updating question:', error);
    console.error('❌ Error details:', {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      stack: error?.stack,
    });
    
    // Return more specific error messages
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.details) {
      errorMessage = error.details;
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseClient();

    console.log('🗑️ Deleting question:', id);

    const { error } = await supabase.from('questions').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
