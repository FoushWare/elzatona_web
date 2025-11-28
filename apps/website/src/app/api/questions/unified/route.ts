// v1.3 - Unified Questions API Route (Supabase Only)
// Single endpoint for all question operations
// Added input sanitization for security
// Uses centralized API configuration utility

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeObjectServer, sanitizeRichContent } from '@/lib/utils/sanitize-server';
import { validateAndSanitize, questionSchema } from '@/lib/utils/validation';
import { getSupabaseConfig, logApiConfig } from '@/lib/utils/api-config';

// Log API configuration on module load (for debugging)
logApiConfig('Questions API');

// Get Supabase client using centralized configuration
function getSupabaseClient() {
  const config = getSupabaseConfig();
  
  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: config.headers,
    },
  });
}

// Simple in-memory cache for questions (resets on server restart)
let questionsCache: Array<{
  id: string;
  [key: string]: unknown;
}> | null = null;
const cacheTimestamp: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

// GET /api/questions/unified - Get questions with filters
export async function GET(request: NextRequest) {
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const offset = (page - 1) * pageSize;

    const filters = {
      category: searchParams.get('category') || undefined,
      topic: searchParams.get('topic') || undefined,
      type: searchParams.get('type') || undefined,
      subcategory: searchParams.get('subcategory') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      learningPath: searchParams.get('learningPath') || undefined,
      sectionId: searchParams.get('sectionId') || undefined,
      is_active:
        searchParams.get('isActive') === 'true'
          ? true
          : searchParams.get('isActive') === 'false'
            ? false
            : undefined,
      isComplete:
        searchParams.get('isComplete') === 'true'
          ? true
          : searchParams.get('isComplete') === 'false'
            ? false
            : undefined,
      limit: pageSize,
      orderBy:
        (searchParams.get('orderBy') as
          | 'created_at'
          | 'updated_at'
          | 'order_index'
          | 'title') || undefined,
      orderDirection:
        (searchParams.get('orderDirection') as 'asc' | 'desc') || undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );

    // Build query with all relationships (categories, topics, learning_cards)
    // Explicitly include 'code' field to ensure it's returned even if PostgREST cache hasn't refreshed
    let query = supabase.from('questions').select(`
      *,
      code,
      categories (
        id,
        name,
        slug,
        description,
        icon,
        color
      ),
      topics (
        id,
        name,
        slug,
        description,
        difficulty
      ),
      learning_cards (
        id,
        title,
        type,
        color,
        icon
      )
    `);

    // Apply filters
    if (cleanFilters.category) {
      query = query.eq('category_id', cleanFilters.category);
    }
    if (cleanFilters.topic) {
      query = query.eq('topic_id', cleanFilters.topic);
    }
    if (cleanFilters.type) {
      query = query.eq('type', cleanFilters.type);
    }
    if (cleanFilters.difficulty) {
      query = query.eq('difficulty', cleanFilters.difficulty);
    }
    if (cleanFilters.learningPath) {
      query = query.eq('learning_card_id', cleanFilters.learningPath);
    }
    if (cleanFilters.isActive !== undefined) {
      query = query.eq('is_active', cleanFilters.isActive);
    }

    // Get total count with same filters
    let countQuery = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    if (cleanFilters.category) {
      countQuery = countQuery.eq('category_id', cleanFilters.category);
    }
    if (cleanFilters.topic) {
      countQuery = countQuery.eq('topic_id', cleanFilters.topic);
    }
    if (cleanFilters.type) {
      countQuery = countQuery.eq('type', cleanFilters.type);
    }
    if (cleanFilters.difficulty) {
      countQuery = countQuery.eq('difficulty', cleanFilters.difficulty);
    }
    if (cleanFilters.learningPath) {
      countQuery = countQuery.eq('learning_card_id', cleanFilters.learningPath);
    }
    if (cleanFilters.isActive !== undefined) {
      countQuery = countQuery.eq('is_active', cleanFilters.isActive);
    }

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    const rawQuestions = data || [];
    const totalCount = count || 0;

    // Transform questions to normalize the relationship data
    // Supabase returns single objects for foreign keys, but frontend expects arrays for display
    const questions = rawQuestions.map((question: any) => {
      const transformed: any = { ...question };
      
      // Ensure code field preserves newlines - convert any \n escape sequences to actual newlines
      if (transformed.code && typeof transformed.code === 'string') {
        // Handle cases where newlines might be stored as escape sequences
        transformed.code = transformed.code
          .replace(/\\n/g, '\n')      // Replace \n escape sequences with actual newlines
          .replace(/\\r\\n/g, '\n')   // Replace \r\n escape sequences
          .replace(/\\r/g, '\n')      // Replace \r escape sequences
          .replace(/\r\n/g, '\n')     // Normalize Windows line breaks
          .replace(/\r/g, '\n');      // Normalize Mac line breaks
      }
      
      // Transform categories: single object -> array for display, also add category name for form
      if (question.categories && typeof question.categories === 'object' && !Array.isArray(question.categories)) {
        transformed.categories = [question.categories];
        transformed.category = question.categories.name || question.categories.title || '';
      } else if (Array.isArray(question.categories) && question.categories.length > 0 && question.categories[0]) {
        transformed.category = question.categories[0]?.name || question.categories[0]?.title || '';
      } else {
        transformed.categories = [];
        transformed.category = '';
      }
      
      // Transform topics: single object -> array for display, also add topic name for form
      if (question.topics && typeof question.topics === 'object' && !Array.isArray(question.topics)) {
        transformed.topics = [question.topics];
        transformed.topic = question.topics.name || question.topics.title || '';
      } else if (Array.isArray(question.topics) && question.topics.length > 0 && question.topics[0]) {
        transformed.topic = question.topics[0]?.name || question.topics[0]?.title || '';
      } else {
        transformed.topics = [];
        transformed.topic = '';
      }
      
      // Transform learning_cards: single object -> learning_card for display, also add learningCardId for form
      // Supabase returns null when foreign key is null, or an object when it exists
      if (question.learning_cards && question.learning_cards !== null) {
        if (Array.isArray(question.learning_cards) && question.learning_cards.length > 0) {
          transformed.learning_card = question.learning_cards[0];
          transformed.learningCardId = question.learning_cards[0].id || '';
        } else if (typeof question.learning_cards === 'object') {
          transformed.learning_card = question.learning_cards;
          transformed.learningCardId = question.learning_cards.id || '';
        } else {
          transformed.learning_card = null;
          transformed.learningCardId = question.learning_card_id || '';
        }
      } else {
        // No learning card relationship (foreign key is null)
        transformed.learning_card = null;
        transformed.learningCardId = question.learning_card_id || '';
      }
      
      return transformed;
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    // Include pagination by default, but allow disabling for performance
    const includePagination = searchParams.get('includePagination') !== 'false';

    return NextResponse.json({
      success: true,
      data: questions,
      ...(includePagination && {
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }),
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to fetch questions';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/questions/unified - Create questions (bulk import or single)
export async function POST(request: NextRequest) {
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const body = await request.json();
    const { questions, isBulkImport = false } = body;

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: 'Questions array is required' },
        { status: 400 }
      );
    }

    const results = [];
    const errors: Array<{ question: any; error: string; index: number }> = [];

    for (let index = 0; index < questions.length; index++) {
      const questionData = questions[index];
      try {
        // Normalize field names: convert camelCase to snake_case for database fields
        const normalizedData: any = { ...questionData };
        
        // Handle isActive -> is_active
        if ('isActive' in normalizedData && !('is_active' in normalizedData)) {
          normalizedData.is_active = normalizedData.isActive;
        }
        
        // Handle learningCardId -> learning_card_id
        if ('learningCardId' in normalizedData && !('learning_card_id' in normalizedData)) {
          normalizedData.learning_card_id = normalizedData.learningCardId;
        }
        
        // Handle timeLimit -> time_limit
        if ('timeLimit' in normalizedData && !('time_limit' in normalizedData)) {
          normalizedData.time_limit = normalizedData.timeLimit;
        }
        
        // Validate and sanitize question data
        console.log('🔍 Validating question:', {
          index: index + 1,
          title: normalizedData.title,
          hasCategory: !!normalizedData.category,
          hasCategoryId: !!normalizedData.category_id,
          category: normalizedData.category,
          category_id: normalizedData.category_id,
        });
        
        // CRITICAL: Process code field BEFORE validation/sanitization to preserve newlines
        // Extract and preserve code field separately - this ensures newlines are never lost
        const codeField = normalizedData.code;
        let processedCode: string | null = null;
        
        if (codeField) {
          // Convert to string and ensure \n escape sequences become actual newlines
          let codeContent = String(codeField);
          
          // Convert literal \n escape sequences to actual newlines
          codeContent = codeContent.replace(/\\n/g, '\n');
          codeContent = codeContent.replace(/\\r\\n/g, '\n');
          codeContent = codeContent.replace(/\\r/g, '\n');
          
          // Normalize line breaks
          codeContent = codeContent.replace(/\r\n/g, '\n');
          codeContent = codeContent.replace(/\r/g, '\n');
          
          // Store processed code separately (will restore after sanitization)
          processedCode = codeContent;
          
          // Also update normalizedData for validation
          normalizedData.code = codeContent;
          
          const newlineCount = (codeContent.match(/\n/g) || []).length;
          console.log(`📝 Code field pre-processing: ${newlineCount} newlines, length: ${codeContent.length}`);
        }
        
        const validationResult = validateAndSanitize(questionSchema, normalizedData);
        
        if (!validationResult.success) {
          console.error('❌ Validation failed for question:', {
            index: index + 1,
            title: questionData.title,
            error: validationResult.error,
            normalizedData: normalizedData,
          });
          errors.push({
            question: questionData,
            error: validationResult.error,
            index: index + 1,
          });
          continue; // Continue to next question
        }
        
        console.log('✅ Validation passed for question:', {
          index: index + 1,
          title: normalizedData.title,
        });

        // Sanitize the validated data (but code will be handled separately)
        const sanitizedQuestion = sanitizeObjectServer(validationResult.data as any);
        
        // CRITICAL: Restore code field AFTER sanitization to ensure newlines are preserved
        // We bypass sanitizeObjectServer for code field by restoring it from our processed version
        if (processedCode !== null) {
          sanitizedQuestion.code = processedCode;
          
          const newlineCount = (sanitizedQuestion.code.match(/\n/g) || []).length;
          console.log(`✅ Code field restored: ${newlineCount} newlines preserved, length: ${sanitizedQuestion.code.length}`);
          
          if (newlineCount === 0 && sanitizedQuestion.code.length > 50) {
            console.error(`❌ CRITICAL: Code field has no newlines after restoration!`);
            console.error(`   Code preview: ${sanitizedQuestion.code.substring(0, 150)}`);
          }
        }
        
        // Ensure is_active is set (use isActive if is_active is not set)
        if (sanitizedQuestion.is_active === undefined && sanitizedQuestion.isActive !== undefined) {
          sanitizedQuestion.is_active = sanitizedQuestion.isActive;
        }
        
        // Log learningCardId after validation and sanitization
        console.log('🔍 After validation/sanitization:', {
          learningCardId: sanitizedQuestion.learningCardId,
          learning_card_id: sanitizedQuestion.learning_card_id,
          hasLearningCardId: !!(sanitizedQuestion.learningCardId || sanitizedQuestion.learning_card_id),
        });
        
        // Sanitize rich content fields (explanation, code, etc.)
        if (sanitizedQuestion.explanation) {
          sanitizedQuestion.explanation = sanitizeRichContent(sanitizedQuestion.explanation);
        }
        
        // Final code field processing - ensure newlines are definitely preserved
        // This is a final safety check after all sanitization
        if (sanitizedQuestion.code) {
          let codeContent = String(sanitizedQuestion.code);
          
          // Convert any remaining \n escape sequences to actual newlines
          codeContent = codeContent.replace(/\\n/g, '\n');
          codeContent = codeContent.replace(/\\r\\n/g, '\n');
          codeContent = codeContent.replace(/\\r/g, '\n');
          
          // Normalize line breaks
          codeContent = codeContent.replace(/\r\n/g, '\n');
          codeContent = codeContent.replace(/\r/g, '\n');
          
          // Only remove dangerous control characters, PRESERVE newlines and tabs
          codeContent = codeContent
            .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars except \n (0x0A), \r (0x0D), \t (0x09)
            .replace(/\x00/g, ''); // Remove null bytes
          
          // Final verification
          const newlineCount = (codeContent.match(/\n/g) || []).length;
          console.log(`✅ Final code processing: ${newlineCount} newlines, length: ${codeContent.length}`);
          
          if (newlineCount === 0 && codeContent.length > 50) {
            console.error(`❌ ERROR: Code has no newlines! This should not happen.`);
            console.error(`   Code preview: ${codeContent.substring(0, 150)}`);
          }
          
          sanitizedQuestion.code = codeContent;
        }

        // Sanitize options if present
        // Handle cases where options might be a string (invalid data) or not an array
        if (sanitizedQuestion.options) {
          if (Array.isArray(sanitizedQuestion.options) && sanitizedQuestion.options.length > 0) {
            sanitizedQuestion.options = sanitizedQuestion.options.map((option: any) => ({
              ...option,
              text: sanitizeRichContent(option.text || ''),
            }));
          } else {
            // If options is not a valid array (e.g., it's a string like "multiple-select"), remove it
            // This prevents errors when trying to access options[0] later
            console.warn(`⚠️ Invalid options format for question "${sanitizedQuestion.title}". Expected array, got: ${typeof sanitizedQuestion.options}. Removing options.`);
            delete sanitizedQuestion.options;
          }
        }

        // Map category name to category_id if needed
        let categoryId = sanitizedQuestion.category_id || sanitizedQuestion.category;
        if (categoryId && typeof categoryId === 'string' && !categoryId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          // It's a category name, not an ID - need to look it up
          // Categories table only has 'name' column, not 'title'
          // Use case-insensitive search with ilike
          const categoryName = categoryId.trim();
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('id, name')
            .ilike('name', categoryName)
            .single();
          
          if (categoryError || !categoryData) {
            console.error('Category lookup error:', categoryError, 'Looking for:', categoryName);
            // Get list of available categories for better error message
            const { data: allCategories } = await supabase
              .from('categories')
              .select('name')
              .order('name');
            const categoryNames = allCategories?.map(c => c.name).join(', ') || 'None';
            throw new Error(`Category "${categoryName}" not found. Available categories: ${categoryNames}`);
          }
          
          categoryId = categoryData.id;
          console.log(`✅ Found category "${categoryData.name}" with ID: ${categoryId}`);
        }

        // Map topic name to topic_id if needed
        let topicId = sanitizedQuestion.topic_id || sanitizedQuestion.topic;
        if (topicId && typeof topicId === 'string' && !topicId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          // It's a topic name, not an ID - need to look it up
          // Topics table only has 'name' column, not 'title'
          // Use case-insensitive search with ilike
          const topicName = topicId.trim();
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
        }

        // Map learningCardId to learning_card_id
        const learningCardId = sanitizedQuestion.learning_card_id || sanitizedQuestion.learningCardId;
        
        // Validate and look up learningCardId if provided
        let finalLearningCardId = null;
        if (learningCardId && typeof learningCardId === 'string' && learningCardId.trim() !== '') {
          const trimmedId = learningCardId.trim();
          // Check if it's a valid UUID
          if (trimmedId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // It's already a UUID, use it directly
            finalLearningCardId = trimmedId;
            console.log(`✅ Using learning card UUID: ${finalLearningCardId}`);
          } else {
            // It's not a UUID - might be an identifier like "core-technologies"
            // Try to look it up in the learning_cards table by slug or title
            console.log(`🔍 Looking up learning card by identifier: "${trimmedId}"`);
            
            // Try to find by title first (case-insensitive)
            let { data: cardData, error: cardError } = await supabase
              .from('learning_cards')
              .select('id')
              .ilike('title', trimmedId)
              .maybeSingle();
            
            // If not found by title, try slug (if slug column exists)
            if ((cardError || !cardData) && cardError?.code !== 'PGRST116') {
              const { data: cardBySlug } = await supabase
                .from('learning_cards')
                .select('id')
                .ilike('slug', trimmedId)
                .maybeSingle();
              
              if (cardBySlug) {
                cardData = cardBySlug;
                cardError = null;
              }
            }
            
            // If still not found, try exact match on id (in case it's a different format)
            if (!cardData) {
              const { data: cardById } = await supabase
                .from('learning_cards')
                .select('id')
                .eq('id', trimmedId)
                .maybeSingle();
              
              if (cardById) {
                cardData = cardById;
              }
            }
            
            if (cardData) {
              finalLearningCardId = cardData.id;
              console.log(`✅ Found learning card "${trimmedId}" with UUID: ${finalLearningCardId}`);
            } else {
              console.warn(`⚠️ Learning card not found: "${trimmedId}". Skipping learning card assignment.`);
              // Don't throw error - learning card is optional
            }
          }
        } else {
          console.log('ℹ️ No learning card ID provided (this is optional)');
        }

        // Prepare question data for database
        // Remove fields that don't exist in the database or are frontend-only
        const {
          category,
          topic,
          learningCardId: _learningCardId,
          learning_card_id: _learning_card_id,
          isActive: _isActive, // Remove camelCase version, keep is_active
          timeLimit: _timeLimit, // Remove camelCase version, keep time_limit
          id: _id, // Remove id if provided (we'll generate it)
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          createdBy: _createdBy,
          updatedBy: _updatedBy,
          categories: _categories,
          topics: _topics,
          learning_cards: _learning_cards,
          learning_card: _learning_card,
          stats: _stats,
          test_cases: _test_cases, // Frontend-only field
          correct_answer: _correct_answer, // Frontend-only field
          sampleAnswers: _sampleAnswers, // Frontend-only field (doesn't exist in database)
          metadata: _metadata, // Keep metadata if it exists, but we'll handle it separately
          ...dbQuestion
        } = sanitizedQuestion;

        // Ensure content field exists (required by database)
        if (!dbQuestion.content && dbQuestion.title) {
          dbQuestion.content = dbQuestion.title;
        }
        
        // Ensure type field exists (required by database)
        // Map 'multiple-select' to 'multiple-choice' since database doesn't support 'multiple-select'
        if (!dbQuestion.type) {
          dbQuestion.type = 'multiple-choice'; // Default type
        } else if (dbQuestion.type === 'multiple-select') {
          // Database constraint only allows: 'multiple-choice', 'open-ended', 'true-false', 'code'
          // Map 'multiple-select' to 'multiple-choice' as they're functionally the same
          dbQuestion.type = 'multiple-choice';
          console.log(`🔄 Mapped 'multiple-select' to 'multiple-choice' for question: ${sanitizedQuestion.title}`);
        }

        // Handle metadata if provided
        let metadata = null;
        if (sanitizedQuestion.metadata && typeof sanitizedQuestion.metadata === 'object') {
          metadata = sanitizedQuestion.metadata;
        }
        
        // Handle hints if provided
        let hints = null;
        if (sanitizedQuestion.hints && Array.isArray(sanitizedQuestion.hints)) {
          hints = sanitizedQuestion.hints;
        }
        
        // Handle tags if provided
        let tags = null;
        if (sanitizedQuestion.tags && Array.isArray(sanitizedQuestion.tags)) {
          tags = sanitizedQuestion.tags;
        }
        
        // Handle resources if provided
        let resources = null;
        if (sanitizedQuestion.resources !== undefined && sanitizedQuestion.resources !== null) {
          if (Array.isArray(sanitizedQuestion.resources)) {
            // Validate each resource object
            const validResources = sanitizedQuestion.resources.filter((resource: any) => {
              return (
                resource &&
                typeof resource === 'object' &&
                ['video', 'course', 'article'].includes(resource.type) &&
                typeof resource.title === 'string' &&
                typeof resource.url === 'string'
              );
            });
            resources = validResources.length > 0 ? validResources : null;
          } else {
            console.warn('⚠️ Invalid resources format - must be array or null. Setting to null.');
            resources = null;
          }
        }
        
        const questionWithTimestamps: any = {
          ...dbQuestion,
          category_id: categoryId || null,
          topic_id: topicId || null,
          learning_card_id: finalLearningCardId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Only add optional fields if they exist
        if (metadata !== null) {
          questionWithTimestamps.metadata = metadata;
        }
        if (hints !== null) {
          questionWithTimestamps.hints = hints;
        }
        if (tags !== null) {
          questionWithTimestamps.tags = tags;
        }
        if (resources !== null) {
          questionWithTimestamps.resources = resources;
        }
        // Add code field if present (always include it, even if null/undefined, to ensure it's saved)
        // CRITICAL: Ensure newlines are preserved when storing in database
        if (sanitizedQuestion.code !== undefined && sanitizedQuestion.code !== null && sanitizedQuestion.code !== '') {
          // Verify newlines are present before storing
          const codeToStore = String(sanitizedQuestion.code);
          const newlineCount = (codeToStore.match(/\n/g) || []).length;
          console.log(`💾 Storing code with ${newlineCount} newlines, length: ${codeToStore.length}`);
          questionWithTimestamps.code = codeToStore;
        } else {
          // Explicitly set to null if not provided (to ensure the field is included in the insert)
          questionWithTimestamps.code = null;
        }
        
        // Handle options - only add if present and is an array with items
        // For open-ended questions, options might be undefined or empty
        if (sanitizedQuestion.options && Array.isArray(sanitizedQuestion.options) && sanitizedQuestion.options.length > 0) {
          questionWithTimestamps.options = sanitizedQuestion.options;
        } else if (dbQuestion.type === 'multiple-choice' || dbQuestion.type === 'multiple-select') {
          // For multiple-choice questions, options should exist
          // If missing, log a warning but don't fail (might be intentional)
          console.warn(`⚠️ Multiple-choice question "${sanitizedQuestion.title}" has no options`);
        }
        
        console.log('📝 Question data to insert:', {
          title: questionWithTimestamps.title,
          type: questionWithTimestamps.type,
          category_id: questionWithTimestamps.category_id,
          topic_id: questionWithTimestamps.topic_id,
          learning_card_id: questionWithTimestamps.learning_card_id,
          hasOptions: !!(questionWithTimestamps.options && Array.isArray(questionWithTimestamps.options) && questionWithTimestamps.options.length > 0),
        });

        // Insert question with code field
        // Explicitly select code field in the response to ensure it's returned
        const { data, error } = await supabase
          .from('questions')
          .insert(questionWithTimestamps)
          .select('*, code') // Explicitly include code in the response
          .single();

        if (error) {
          console.error('Supabase insert error:', error);
          // If error is about code column not found (PGRST204), it means PostgREST cache hasn't refreshed
          if (error.code === 'PGRST204') {
            console.warn('⚠️ Code column not found in PostgREST schema cache. Cache may need to refresh (1-5 minutes).');
            throw new Error(`Database error: Code column not available yet. PostgREST schema cache needs to refresh. Please wait 1-5 minutes and try again. (Code: ${error.code})`);
          }
          throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
        }

        // Include code in the result - ensure it's returned from the database response
        results.push({ 
          id: data.id, 
          ...sanitizedQuestion,
          code: data.code || sanitizedQuestion.code || null // Ensure code is included in response
        });
      } catch (error) {
        console.error(`Error creating question ${index + 1}:`, error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : typeof error === 'string' 
            ? error 
            : JSON.stringify(error);
        
        errors.push({
          question: questionData,
          error: errorMessage,
          index: index + 1,
        });
      }
    }

    // Invalidate cache after creating questions
    questionsCache = null;

    return NextResponse.json({
      success: true,
      data: {
        success: results.length,
        failed: errors.length,
        errors: errors.map(e => `Question ${e.index}: ${e.error}`),
        errorDetails: errors.map(e => ({
          index: e.index,
          title: e.question?.title || 'Unknown',
          error: e.error,
        })),
        results: results,
      },
      message: `Successfully ${isBulkImport ? 'imported' : 'created'} ${results.length} questions`,
    });
  } catch (error) {
    console.error('Error creating questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create questions' },
      { status: 500 }
    );
  }
}

// PUT /api/questions/unified - Update a question
export async function PUT(request: NextRequest) {
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    // Sanitize update data
    const sanitizedUpdate = sanitizeObjectServer(updateData);
    
    // Sanitize rich content fields
    if (sanitizedUpdate.explanation) {
      sanitizedUpdate.explanation = sanitizeRichContent(sanitizedUpdate.explanation);
    }
    
    // Sanitize code field if present - preserve newlines and format
    // Code should be treated as plain text, not HTML
    if (sanitizedUpdate.code !== undefined && sanitizedUpdate.code !== null && sanitizedUpdate.code !== '') {
      // Convert \n escape sequences to actual newlines (in case they're stored as strings)
      let codeContent = String(sanitizedUpdate.code)
        .replace(/\\n/g, '\n')  // Replace \n escape sequences
        .replace(/\r\n/g, '\n') // Normalize Windows line breaks
        .replace(/\r/g, '\n');  // Normalize Mac line breaks
      
      // Basic sanitization - remove null bytes and control characters (except newlines and tabs)
      codeContent = codeContent
        .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars except \n, \r, \t
        .replace(/\x00/g, ''); // Remove null bytes
      
      sanitizedUpdate.code = codeContent;
    } else if (sanitizedUpdate.code === '' || sanitizedUpdate.code === null) {
      // Explicitly set to null if empty string or null is provided
      sanitizedUpdate.code = null;
    }

    // Sanitize options if present
    if (sanitizedUpdate.options && Array.isArray(sanitizedUpdate.options)) {
      sanitizedUpdate.options = sanitizedUpdate.options.map((option: any) => ({
        ...option,
        text: sanitizeRichContent(option.text || ''),
      }));
    }

    // Map category name to category_id if needed (same logic as POST)
    // Only process if category was provided in the update
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

    // Map topic name to topic_id if needed (same logic as POST)
    // Only process if topic was provided in the update
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

    // Map learningCardId to learning_card_id (same logic as POST)
    // Check if learningCardId was explicitly provided in the update
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
    // Remove fields that don't exist in the database
    const {
      category,
      topic,
      learningCardId: _learningCardId,
      learning_card_id: _learning_card_id,
      resources, // Keep resources - it's a valid database field
      ...dbUpdate
    } = sanitizedUpdate;

    // Handle resources field - validate it's an array or null
    if ('resources' in sanitizedUpdate) {
      if (sanitizedUpdate.resources === null || sanitizedUpdate.resources === undefined || sanitizedUpdate.resources === '') {
        dbUpdate.resources = null;
      } else if (Array.isArray(sanitizedUpdate.resources)) {
        // Validate each resource object
        const validResources = sanitizedUpdate.resources.filter((resource: any) => {
          return (
            resource &&
            typeof resource === 'object' &&
            ['video', 'course', 'article'].includes(resource.type) &&
            typeof resource.title === 'string' &&
            typeof resource.url === 'string'
          );
        });
        dbUpdate.resources = validResources.length > 0 ? validResources : null;
      } else {
        console.warn('⚠️ Invalid resources format - must be array or null. Setting to null.');
        dbUpdate.resources = null;
      }
    }

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

    console.log('📝 Question update data:', {
      id,
      title: updateWithTimestamps.title,
      category_id: updateWithTimestamps.category_id,
      topic_id: updateWithTimestamps.topic_id,
      learning_card_id: updateWithTimestamps.learning_card_id,
    });

    const { error } = await supabase
      .from('questions')
      .update(updateWithTimestamps)
      .eq('id', id);

    if (error) throw error;

    // Invalidate cache after updating question
    questionsCache = null;

    return NextResponse.json({
      success: true,
      message: 'Question updated successfully',
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/unified - Delete a question
export async function DELETE(request: NextRequest) {
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('questions').delete().eq('id', id);

    if (error) throw error;

    // Invalidate cache after deleting question
    questionsCache = null;

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
