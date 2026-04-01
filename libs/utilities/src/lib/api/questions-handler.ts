// v1.3 - Unified Questions API Route (Supabase Only)
// Single endpoint for all question operations
// Added input sanitization for security
// Uses centralized API configuration utility

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sanitizeObjectServer,
  sanitizeRichContent,
  sanitizeForLogging,
} from "./sanitize-server";
import { validateAndSanitize, questionSchema } from "./validation";
import { getSupabaseConfig, logApiConfig } from "./api-config";

// Log API configuration on module load (for debugging)
logApiConfig("Questions API");

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
let _questionsCache: Array<{
  id: string;
  [key: string]: unknown;
}> | null = null;
const _cacheTimestamp: number = 0;
const _CACHE_DURATION = 30000; // 30 seconds
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function stripUnsafeControlCharacters(value: string): string {
  return Array.from(value)
    .filter((char) => {
      const codePoint = char.codePointAt(0) ?? 0;
      return (
        codePoint === 9 ||
        codePoint === 10 ||
        codePoint === 13 ||
        (codePoint >= 32 && codePoint !== 127)
      );
    })
    .join("");
}

function parseBooleanParam(value: string | null): boolean | undefined {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
}

function normalizeCodeLineBreaks(value: string): string {
  return value
    .replaceAll(String.raw`\r\n`, "\n")
    .replaceAll(String.raw`\n`, "\n")
    .replaceAll(String.raw`\r`, "\n")
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n");
}

function getNonEmptyString(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  return String(value);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return String(JSON.stringify(error));
}

// GET /api/questions/unified - Get questions with filters
// NOSONAR - legacy endpoint complexity is tracked for a dedicated refactor.
export async function questionsGetHandler(request: NextRequest) {
  // NOSONAR
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1");
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
    const offset = (page - 1) * pageSize;

    const is_active = parseBooleanParam(searchParams.get("isActive"));
    const isComplete = parseBooleanParam(searchParams.get("isComplete"));

    const filters = {
      category: searchParams.get("category") || undefined,
      topic: searchParams.get("topic") || undefined,
      type: searchParams.get("type") || undefined,
      subcategory: searchParams.get("subcategory") || undefined,
      difficulty: searchParams.get("difficulty") || undefined,
      learningPath: searchParams.get("learningPath") || undefined,
      sectionId: searchParams.get("sectionId") || undefined,
      is_active,
      isComplete,
      limit: pageSize,
      orderBy:
        (searchParams.get("orderBy") as
          | "created_at"
          | "updated_at"
          | "order_index"
          | "title") || undefined,
      orderDirection:
        (searchParams.get("orderDirection") as "asc" | "desc") || undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined),
    );

    // Build query with all relationships (categories, topics, learning_cards)
    // Explicitly include 'code' field to ensure it's returned even if PostgREST cache hasn't refreshed
    let query = supabase.from("questions").select(`
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
    if (cleanFilters["category"]) {
      query = query.eq("category_id", cleanFilters["category"]);
    }
    if (cleanFilters["topic"]) {
      query = query.eq("topic_id", cleanFilters["topic"]);
    }
    if (cleanFilters["type"]) {
      query = query.eq("type", cleanFilters["type"]);
    }
    if (cleanFilters["difficulty"]) {
      query = query.eq("difficulty", cleanFilters["difficulty"]);
    }
    if (cleanFilters["learningPath"]) {
      query = query.eq("learning_card_id", cleanFilters["learningPath"]);
    }
    if (cleanFilters["isActive"] !== undefined) {
      query = query.eq("is_active", cleanFilters["isActive"]);
    }

    // Get total count with same filters
    let countQuery = supabase
      .from("questions")
      .select("*", { count: "exact", head: true });
    if (cleanFilters["category"]) {
      countQuery = countQuery.eq("category_id", cleanFilters["category"]);
    }
    if (cleanFilters["topic"]) {
      countQuery = countQuery.eq("topic_id", cleanFilters["topic"]);
    }
    if (cleanFilters["type"]) {
      countQuery = countQuery.eq("type", cleanFilters["type"]);
    }
    if (cleanFilters["difficulty"]) {
      countQuery = countQuery.eq("difficulty", cleanFilters["difficulty"]);
    }
    if (cleanFilters["learningPath"]) {
      countQuery = countQuery.eq(
        "learning_card_id",
        cleanFilters["learningPath"],
      );
    }
    if (cleanFilters["isActive"] !== undefined) {
      countQuery = countQuery.eq("is_active", cleanFilters["isActive"]);
    }

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    const rawQuestions = data || [];
    const totalCount = count || 0;

    // Transform questions to normalize the relationship data
    // Supabase returns single objects for foreign keys, but frontend expects arrays for display
    // NOSONAR - relationship normalization is intentionally verbose for backward compatibility.
    const questions = rawQuestions.map((question: Record<string, unknown>) => {
      // NOSONAR
      const transformed: Record<string, unknown> = { ...question };

      // Ensure code field preserves newlines - convert any \n escape sequences to actual newlines
      if (transformed["code"] && typeof transformed["code"] === "string") {
        // Handle cases where newlines might be stored as escape sequences
        transformed["code"] = normalizeCodeLineBreaks(transformed["code"]);
      }

      // Transform categories: single object -> array for display, also add category name for form
      if (
        question["categories"] &&
        typeof question["categories"] === "object" &&
        !Array.isArray(question["categories"])
      ) {
        const categoryObj = question["categories"] as Record<string, unknown>;
        transformed["categories"] = [question["categories"]];
        transformed["category"] =
          (categoryObj["name"] as string) ||
          (categoryObj["title"] as string) ||
          "";
      } else if (
        Array.isArray(question["categories"]) &&
        question["categories"].length > 0 &&
        question["categories"][0]
      ) {
        const firstCategory = question["categories"][0] as Record<
          string,
          unknown
        >;
        transformed["category"] =
          (firstCategory["name"] as string) ||
          (firstCategory["title"] as string) ||
          "";
      } else {
        transformed["categories"] = [];
        transformed["category"] = "";
      }

      // Transform topics: single object -> array for display, also add topic name for form
      if (
        question["topics"] &&
        typeof question["topics"] === "object" &&
        !Array.isArray(question["topics"])
      ) {
        const topicObj = question["topics"] as Record<string, unknown>;
        transformed["topics"] = [question["topics"]];
        transformed["topic"] =
          (topicObj["name"] as string) || (topicObj["title"] as string) || "";
      } else if (
        Array.isArray(question["topics"]) &&
        question["topics"].length > 0 &&
        question["topics"][0]
      ) {
        const firstTopic = question["topics"][0] as Record<string, unknown>;
        transformed["topic"] =
          (firstTopic["name"] as string) ||
          (firstTopic["title"] as string) ||
          "";
      } else {
        transformed["topics"] = [];
        transformed["topic"] = "";
      }

      // Transform learning_cards: single object -> learning_card for display, also add learningCardId for form
      // Supabase returns null when foreign key is null, or an object when it exists
      if (question["learning_cards"] && question["learning_cards"] !== null) {
        if (
          Array.isArray(question["learning_cards"]) &&
          question["learning_cards"].length > 0
        ) {
          const firstLearningCard = question["learning_cards"][0] as Record<
            string,
            unknown
          >;
          transformed["learning_card"] = question["learning_cards"][0];
          transformed["learningCardId"] =
            (firstLearningCard["id"] as string) || "";
        } else if (typeof question["learning_cards"] === "object") {
          const learningCardObj = question["learning_cards"] as Record<
            string,
            unknown
          >;
          transformed["learning_card"] = question["learning_cards"];
          transformed["learningCardId"] =
            (learningCardObj["id"] as string) || "";
        } else {
          transformed["learning_card"] = null;
          transformed["learningCardId"] = question["learning_card_id"] || "";
        }
      } else {
        // No learning card relationship (foreign key is null)
        transformed["learning_card"] = null;
        transformed["learningCardId"] = question["learning_card_id"] || "";
      }

      return transformed;
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    // Include pagination by default, but allow disabling for performance
    const includePagination = searchParams.get("includePagination") !== "false";

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
    console.error("Error fetching questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch questions";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

// POST /api/questions/unified - Create questions (bulk import or single)
// NOSONAR - legacy endpoint complexity is tracked for a dedicated refactor.
export async function questionsPostHandler(request: NextRequest) {
  // NOSONAR
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const body = await request.json();
    const { questions, isBulkImport = false } = body;

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: "Questions array is required" },
        { status: 400 },
      );
    }

    const results: Array<{ success: boolean; id?: string; error?: string }> =
      [];
    const errors: Array<{
      question: Record<string, unknown>;
      error: string;
      index: number;
    }> = [];

    for (let index = 0; index < questions.length; index++) {
      const questionData = questions[index] as Record<string, unknown>;
      try {
        // Normalize field names: convert camelCase to snake_case for database fields
        const normalizedData: Record<string, unknown> = { ...questionData };

        // CRITICAL: Extract code field FIRST, before any processing, to ensure it's never lost
        // Store the original code value from the input data
        const originalCode = questionData["code"] ?? normalizedData["code"];

        // Handle isActive -> is_active
        if ("isActive" in normalizedData && !("is_active" in normalizedData)) {
          normalizedData["is_active"] = normalizedData["isActive"];
        }

        // Handle learningCardId -> learning_card_id
        if (
          "learningCardId" in normalizedData &&
          !("learning_card_id" in normalizedData)
        ) {
          normalizedData["learning_card_id"] = normalizedData["learningCardId"];
        }

        // Handle timeLimit -> time_limit
        if (
          "timeLimit" in normalizedData &&
          !("time_limit" in normalizedData)
        ) {
          normalizedData["time_limit"] = normalizedData["timeLimit"];
        }

        // Validate and sanitize question data
        // Security: Removed debug logging to prevent information disclosure

        // CRITICAL: Process code field BEFORE validation/sanitization to preserve newlines
        // Extract and preserve code field separately - this ensures newlines are never lost
        const codeField = originalCode ?? normalizedData["code"];
        let processedCode: string | null = null;

        // Security: Removed debug logging to prevent information disclosure

        if (codeField !== undefined && codeField !== null && codeField !== "") {
          // Convert to string and ensure \n escape sequences become actual newlines
          let codeContent = String(codeField);

          // Convert literal \n escape sequences to actual newlines
          codeContent = normalizeCodeLineBreaks(codeContent);

          // Store processed code separately (will restore after sanitization)
          processedCode = codeContent;

          // Also update normalizedData for validation
          normalizedData["code"] = codeContent;

          // Security: Removed debug logging to prevent information disclosure
        } else {
          // Security: Removed debug logging to prevent information disclosure
        }

        // CRITICAL: Ensure code is in normalizedData before validation
        // If we have processedCode, use it; otherwise use originalCode
        if (processedCode !== null && processedCode !== "") {
          normalizedData["code"] = processedCode;
        } else if (
          originalCode !== undefined &&
          originalCode !== null &&
          originalCode !== ""
        ) {
          normalizedData["code"] = String(originalCode);
        } else {
          // Explicitly set to null (not undefined) so validation knows it exists
          normalizedData["code"] = null;
        }

        // Security: Removed debug logging to prevent information disclosure

        const validationResult = validateAndSanitize(
          questionSchema,
          normalizedData,
        );

        if (!validationResult.success) {
          // Security: Removed detailed error logging to prevent information disclosure
          // Only log minimal error information
          console.error("❌ Validation failed for question:", index + 1);
          errors.push({
            question: questionData,
            error: validationResult.error,
            index: index + 1,
          });
          continue; // Continue to next question
        }

        // Security: Removed debug logging to prevent information disclosure

        // Extract code field BEFORE sanitization to completely bypass it
        // Code field will NOT be sanitized - we'll use CSP protection instead
        // Priority: processedCode > originalCode > validatedData.code
        const validatedCode = (
          validationResult.data as Record<string, unknown>
        )["code"];
        const codeBeforeSanitization =
          getNonEmptyString(processedCode) ??
          getNonEmptyString(originalCode) ??
          getNonEmptyString(validatedCode);

        // Security: Removed debug logging to prevent information disclosure

        // Sanitize the validated data (code field is now excluded from sanitization)
        const sanitizedQuestion = sanitizeObjectServer(
          validationResult.data as Record<string, unknown>,
        );

        // CRITICAL: Restore code field AFTER sanitization (it was skipped during sanitization)
        // Code field is NOT sanitized - we rely on CSP protection for XSS prevention
        // ALWAYS set the code field, even if it's null
        if (codeBeforeSanitization !== null && codeBeforeSanitization !== "") {
          // Process the code to convert \n escape sequences to actual newlines
          let codeContent = String(codeBeforeSanitization);

          // Only process if not already processed
          if (!processedCode || processedCode === "") {
            codeContent = codeContent.replaceAll(String.raw`\n`, "\n");
            codeContent = codeContent.replaceAll(String.raw`\r\n`, "\n");
            codeContent = codeContent.replaceAll(String.raw`\r`, "\n");
            codeContent = codeContent.replaceAll("\r\n", "\n");
            codeContent = codeContent.replaceAll("\r", "\n");
            processedCode = codeContent;
          } else {
            codeContent = processedCode;
          }

          sanitizedQuestion["code"] = codeContent;

          // Security: Removed debug logging to prevent information disclosure
          const _newlineCount = (codeContent.match(/\n/g) || []).length;

          if (_newlineCount === 0 && codeContent.length > 50) {
            // Security: Removed detailed error logging to prevent information disclosure
            console.error(
              "❌ CRITICAL: Code field has no newlines after restoration!",
            );
          }
        } else {
          // Explicitly set to null (not undefined) so it's included in the database insert
          sanitizedQuestion["code"] = null;
          // Security: Removed debug logging to prevent information disclosure
        }

        // CRITICAL: Ensure code field is ALWAYS present in sanitizedQuestion
        if (!("code" in sanitizedQuestion)) {
          // Security: Removed detailed error logging to prevent information disclosure
          if (
            originalCode !== undefined &&
            originalCode !== null &&
            originalCode !== ""
          ) {
            let codeContent = String(originalCode);
            codeContent = codeContent.replaceAll(String.raw`\n`, "\n");
            codeContent = codeContent.replaceAll(String.raw`\r\n`, "\n");
            codeContent = codeContent.replaceAll(String.raw`\r`, "\n");
            codeContent = codeContent.replaceAll("\r\n", "\n");
            codeContent = codeContent.replaceAll("\r", "\n");
            sanitizedQuestion["code"] = codeContent;
            processedCode = codeContent;
            // Security: Removed debug logging to prevent information disclosure
          } else {
            sanitizedQuestion["code"] = null;
            // Security: Removed debug logging to prevent information disclosure
          }
        }

        // Ensure is_active is set (use isActive if is_active is not set)
        if (
          sanitizedQuestion["is_active"] === undefined &&
          sanitizedQuestion["isActive"] !== undefined
        ) {
          sanitizedQuestion["is_active"] = sanitizedQuestion["isActive"];
        }

        // Security: Removed debug logging to prevent information disclosure

        // Sanitize rich content fields (explanation, etc.)
        // NOTE: Code field is NOT sanitized - we use CSP protection instead
        if (sanitizedQuestion["explanation"]) {
          sanitizedQuestion["explanation"] = sanitizeRichContent(
            sanitizedQuestion["explanation"] as string,
          );
        }

        // Code field is NOT processed here - it was already processed and restored above
        // Code field is NOT sanitized - we rely on CSP (Content Security Policy) for XSS protection
        // The code field should already be set from the restoration step above
        // No additional processing needed - code is preserved exactly as provided

        // Sanitize options if present
        // Handle cases where options might be a string (invalid data) or not an array
        if (sanitizedQuestion["options"]) {
          if (
            Array.isArray(sanitizedQuestion["options"]) &&
            sanitizedQuestion["options"].length > 0
          ) {
            sanitizedQuestion["options"] = (
              sanitizedQuestion["options"] as Array<Record<string, unknown>>
            ).map((option: Record<string, unknown>) => ({
              ...option,
              text: sanitizeRichContent((option["text"] as string) || ""),
            }));
          } else {
            // If options is not a valid array (e.g., it's a string like "multiple-select"), remove it
            // This prevents errors when trying to access options[0] later
            // Security: Sanitize values before logging
            const sanitizedTitle = sanitizeForLogging(
              String(sanitizedQuestion["title"]),
            );
            const sanitizedOptionsType = sanitizeForLogging(
              typeof sanitizedQuestion["options"],
            );
            console.warn(
              "⚠️ Invalid options format for question:",
              sanitizedTitle,
              "Expected array, got:",
              sanitizedOptionsType,
              "Removing options.",
            );
            delete sanitizedQuestion["options"];
          }
        }

        // Map category name to category_id if needed
        let categoryId =
          sanitizedQuestion["category_id"] || sanitizedQuestion["category"];
        if (
          categoryId &&
          typeof categoryId === "string" &&
          !UUID_REGEX.exec(categoryId)
        ) {
          // It's a category name, not an ID - need to look it up
          // Categories table only has 'name' column, not 'title'
          // Use case-insensitive search with ilike
          const categoryName = categoryId.trim();
          const { data: categoryData, error: categoryError } = await supabase
            .from("categories")
            .select("id, name")
            .ilike("name", categoryName)
            .single();

          if (categoryError || !categoryData) {
            // Security: Removed detailed error logging to prevent information disclosure
            console.error("Category lookup error");
            // Get list of available categories for better error message
            const { data: allCategories } = await supabase
              .from("categories")
              .select("name")
              .order("name");
            const categoryNames =
              allCategories?.map((c) => c.name).join(", ") || "None";
            const sanitizedCategoryNameForError =
              sanitizeForLogging(categoryName);
            const sanitizedCategoryNamesForError =
              sanitizeForLogging(categoryNames);
            throw new Error(
              `Category "${sanitizedCategoryNameForError}" not found. Available categories: ${sanitizedCategoryNamesForError}`,
            );
          }

          categoryId = categoryData.id;
          // Security: Removed debug logging to prevent information disclosure
        }

        // Map topic name to topic_id if needed
        let topicId =
          sanitizedQuestion["topic_id"] || sanitizedQuestion["topic"];
        if (
          topicId &&
          typeof topicId === "string" &&
          !UUID_REGEX.exec(topicId)
        ) {
          // It's a topic name, not an ID - need to look it up
          // Topics table only has 'name' column, not 'title'
          // Use case-insensitive search with ilike
          const topicName = topicId.trim();
          let topicQuery = supabase
            .from("topics")
            .select("id, name")
            .ilike("name", topicName);

          // If we have a category_id, filter topics by that category
          if (categoryId) {
            topicQuery = topicQuery.eq("category_id", categoryId);
          }

          const { data: topicData, error: topicError } =
            await topicQuery.single();

          if (topicError || !topicData) {
            console.error(
              "Topic lookup error:",
              topicError,
              "Looking for:",
              topicName,
              "Category ID:",
              categoryId,
            );
            const categoryHint = categoryId ? ` for the selected category` : "";
            const sanitizedTopicNameForError = sanitizeForLogging(topicName);
            throw new Error(
              `Topic "${sanitizedTopicNameForError}" not found${categoryHint}. Make sure the topic exists and belongs to the selected category.`,
            );
          }

          topicId = topicData.id;
          // Security: Removed debug logging to prevent information disclosure
        }

        // Map learningCardId to learning_card_id
        const learningCardId =
          sanitizedQuestion["learning_card_id"] ||
          sanitizedQuestion["learningCardId"];

        // Validate and look up learningCardId if provided
        let finalLearningCardId = null;
        if (
          learningCardId &&
          typeof learningCardId === "string" &&
          learningCardId.trim() !== ""
        ) {
          const trimmedId = learningCardId.trim();
          // Check if it's a valid UUID
          if (UUID_REGEX.exec(trimmedId)) {
            // It's already a UUID, use it directly
            finalLearningCardId = trimmedId;
            // Security: Removed debug logging to prevent information disclosure
          } else {
            // It's not a UUID - might be an identifier like "core-technologies"
            // Try to look it up in the learning_cards table by slug or title
            // Security: Removed debug logging to prevent information disclosure

            // Try to find by title first (case-insensitive)
            let { data: cardData, error: cardError } = await supabase
              .from("learning_cards")
              .select("id")
              .ilike("title", trimmedId)
              .maybeSingle();

            // If not found by title, try slug (if slug column exists)
            if ((cardError || !cardData) && cardError?.code !== "PGRST116") {
              const { data: cardBySlug } = await supabase
                .from("learning_cards")
                .select("id")
                .ilike("slug", trimmedId)
                .maybeSingle();

              if (cardBySlug) {
                cardData = cardBySlug;
                cardError = null;
              }
            }

            // If still not found, try exact match on id (in case it's a different format)
            if (!cardData) {
              const { data: cardById } = await supabase
                .from("learning_cards")
                .select("id")
                .eq("id", trimmedId)
                .maybeSingle();

              if (cardById) {
                cardData = cardById;
              }
            }

            if (cardData) {
              finalLearningCardId = cardData.id;
              // Security: Removed debug logging to prevent information disclosure
            } else {
              // Security: Removed debug logging to prevent information disclosure
              // Don't throw error - learning card is optional
            }
          }
        } else {
          // Security: Removed debug logging to prevent information disclosure
        }

        // Prepare question data for database
        // Remove fields that don't exist in the database or are frontend-only
        // CRITICAL: Preserve code field - extract it before destructuring to ensure it's not lost
        // Use processedCode if available (from earlier processing), otherwise use sanitizedQuestion.code
        const codeForDb = processedCode ?? sanitizedQuestion["code"];

        const {
          category: _category,
          topic: _topic,
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
          code: _code, // Extract code separately to ensure it's preserved
          ...dbQuestion
        } = sanitizedQuestion;

        // Restore code field to dbQuestion if it exists
        if (codeForDb !== undefined && codeForDb !== null && codeForDb !== "") {
          dbQuestion["code"] = codeForDb;
          // Security: Removed debug logging to prevent information disclosure
        }

        // Ensure content field exists (required by database)
        if (!dbQuestion["content"] && dbQuestion["title"]) {
          dbQuestion["content"] = dbQuestion["title"];
        }

        // Ensure type field exists (required by database)
        // Map 'multiple-select' to 'multiple-choice' since database doesn't support 'multiple-select'
        if (!dbQuestion["type"] || dbQuestion["type"] === "multiple-select") {
          // Database constraint only allows: 'multiple-choice', 'open-ended', 'true-false', 'code'
          // Map missing type and 'multiple-select' to 'multiple-choice'.
          dbQuestion["type"] = "multiple-choice";
          // Security: Removed debug logging to prevent information disclosure
        }

        // Handle metadata if provided
        let metadata = null;
        if (
          sanitizedQuestion["metadata"] &&
          typeof sanitizedQuestion["metadata"] === "object"
        ) {
          metadata = sanitizedQuestion["metadata"];
        }

        // Handle hints if provided
        let hints: string[] | null = null;
        if (
          sanitizedQuestion["hints"] &&
          Array.isArray(sanitizedQuestion["hints"])
        ) {
          hints = sanitizedQuestion["hints"] as string[];
        }

        // Handle tags if provided
        let tags: string[] | null = null;
        if (
          sanitizedQuestion["tags"] &&
          Array.isArray(sanitizedQuestion["tags"])
        ) {
          tags = sanitizedQuestion["tags"] as string[];
        }

        // Handle resources if provided
        let resources: Array<Record<string, unknown>> | null = null;
        if (
          sanitizedQuestion["resources"] !== undefined &&
          sanitizedQuestion["resources"] !== null
        ) {
          if (Array.isArray(sanitizedQuestion["resources"])) {
            // Validate each resource object
            const validResources = sanitizedQuestion["resources"].filter(
              (resource: Record<string, unknown>) => {
                return (
                  resource &&
                  typeof resource === "object" &&
                  ["video", "course", "article"].includes(
                    resource["type"] as string,
                  ) &&
                  typeof resource["title"] === "string" &&
                  typeof resource["url"] === "string"
                );
              },
            );
            resources = validResources.length > 0 ? validResources : null;
          } else {
            console.warn(
              "⚠️ Invalid resources format - must be array or null. Setting to null.",
            );
          }
        }

        const questionWithTimestamps: Record<string, unknown> = {
          ...dbQuestion,
          category_id: categoryId || null,
          topic_id: topicId || null,
          learning_card_id: finalLearningCardId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Only add optional fields if they exist
        if (metadata !== null) {
          questionWithTimestamps["metadata"] = metadata;
        }
        if (hints !== null) {
          questionWithTimestamps["hints"] = hints;
        }
        if (tags !== null) {
          questionWithTimestamps["tags"] = tags;
        }
        if (resources !== null) {
          questionWithTimestamps["resources"] = resources;
        }
        // Add code field if present (always include it, even if null/undefined, to ensure it's saved)
        // CRITICAL: Ensure newlines are preserved when storing in database
        // Priority order: processedCode > codeForDb > dbQuestion.code > sanitizedQuestion.code > originalCode
        let codeToStore: string | null | undefined = null;

        if (processedCode !== null && processedCode !== "") {
          codeToStore = processedCode;
        } else if (
          codeForDb !== undefined &&
          codeForDb !== null &&
          codeForDb !== ""
        ) {
          codeToStore = codeForDb as string;
        } else if (
          dbQuestion["code"] !== undefined &&
          dbQuestion["code"] !== null &&
          dbQuestion["code"] !== ""
        ) {
          codeToStore = dbQuestion["code"] as string;
        } else if (
          sanitizedQuestion["code"] !== undefined &&
          sanitizedQuestion["code"] !== null &&
          sanitizedQuestion["code"] !== ""
        ) {
          codeToStore = sanitizedQuestion["code"] as string;
        } else if (
          originalCode !== undefined &&
          originalCode !== null &&
          originalCode !== ""
        ) {
          // Last resort: process originalCode now
          const codeContent = normalizeCodeLineBreaks(String(originalCode));
          codeToStore = codeContent;
          // Security: Removed user data from logs to prevent log injection
          console.log("⚠️ Using originalCode as fallback");
        }

        // ALWAYS explicitly set the code field, even if it's null
        // This ensures the field is always included in the database insert
        // CRITICAL: Use processedCode as the primary source since it's already processed
        if (processedCode !== null && processedCode !== "") {
          // processedCode is already processed with newlines
          questionWithTimestamps["code"] = processedCode;
          // Security: Removed debug logging to prevent information disclosure
          const _newlineCount = (processedCode.match(/\n/g) || []).length;
        } else if (
          codeToStore !== undefined &&
          codeToStore !== null &&
          codeToStore !== ""
        ) {
          // Fallback to codeToStore if processedCode is not available
          const codeString = String(codeToStore);
          // Security: Removed debug logging to prevent information disclosure
          const _newlineCount = (codeString.match(/\n/g) || []).length;
          questionWithTimestamps["code"] = codeString;
        } else if (
          originalCode !== undefined &&
          originalCode !== null &&
          originalCode !== ""
        ) {
          // Last resort: process originalCode now
          const codeContent = normalizeCodeLineBreaks(String(originalCode));
          questionWithTimestamps["code"] = codeContent;
          // Security: Removed debug logging to prevent information disclosure
          const _newlineCount = (codeContent.match(/\n/g) || []).length;
        } else {
          // Explicitly set to null if not provided (to ensure the field is included in the insert)
          questionWithTimestamps["code"] = null;
          // Security: Removed debug logging to prevent information disclosure
        }

        // CRITICAL: Ensure code field is ALWAYS present in questionWithTimestamps
        // Even if it's null, we need to explicitly set it so Supabase includes it in the insert
        if (!("code" in questionWithTimestamps)) {
          console.error(
            `❌ CRITICAL: Code field missing from questionWithTimestamps! Setting to null as fallback.`,
          );
          questionWithTimestamps["code"] = null;
        }

        // Handle options - only add if present and is an array with items
        // For open-ended questions, options might be undefined or empty
        if (
          sanitizedQuestion["options"] &&
          Array.isArray(sanitizedQuestion["options"]) &&
          sanitizedQuestion["options"].length > 0
        ) {
          questionWithTimestamps["options"] = sanitizedQuestion["options"];
        } else if (
          dbQuestion["type"] === "multiple-choice" ||
          dbQuestion["type"] === "multiple-select"
        ) {
          // For multiple-choice questions, options should exist
          // If missing, log a warning but don't fail (might be intentional)
          // Security: Sanitize title before logging
          const sanitizedTitle = sanitizeForLogging(
            String(sanitizedQuestion["title"]),
          );
          console.warn(
            "⚠️ Multiple-choice question:",
            sanitizedTitle,
            "has no options",
          );
        }

        // Security: Removed debug logging to prevent information disclosure

        // Check for duplicate questions before inserting
        // A question is considered duplicate if it has the same title (case-insensitive) AND (same content OR same code)
        let duplicateQuery = supabase
          .from("questions")
          .select("id, title, content, code")
          .ilike("title", questionWithTimestamps["title"] as string) // Case-insensitive match
          .limit(1);

        // If code exists, also check for same code
        if (questionWithTimestamps["code"]) {
          duplicateQuery = duplicateQuery.eq(
            "code",
            questionWithTimestamps["code"],
          );
        } else {
          // If no code, check for same content
          duplicateQuery = questionWithTimestamps["content"]
            ? duplicateQuery.eq("content", questionWithTimestamps["content"])
            : duplicateQuery;
        }

        const { data: existingQuestion, error: duplicateCheckError } =
          await duplicateQuery.maybeSingle();

        if (duplicateCheckError && duplicateCheckError.code !== "PGRST116") {
          // PGRST116 means no rows found, which is fine
          console.warn(
            "⚠️ Error checking for duplicates:",
            duplicateCheckError,
          );
        }

        if (existingQuestion) {
          // Security: Removed user data from logs to prevent log injection
          console.log("⚠️ Duplicate question found");
          let duplicateFieldSuffix = "";
          if (questionWithTimestamps["code"]) {
            duplicateFieldSuffix = " and code";
          } else if (questionWithTimestamps["content"]) {
            duplicateFieldSuffix = " and content";
          }

          errors.push({
            question: questionData,
            error: `Duplicate question: A question with the same title${duplicateFieldSuffix} already exists (ID: ${existingQuestion["id"]})`,
            index: index + 1,
          });
          continue; // Skip this question and move to next
        }

        // FINAL SAFETY CHECK: Ensure code field is in questionWithTimestamps before insert
        // This is a last resort to catch any code that might have been lost
        // Priority order: processedCode > originalCode > sanitizedQuestion.code > null
        if (
          !("code" in questionWithTimestamps) ||
          questionWithTimestamps["code"] === undefined
        ) {
          console.error(
            `❌ CRITICAL: Code field missing from questionWithTimestamps! Attempting recovery...`,
          );

          // Try to recover code from any available source
          if (processedCode !== null && processedCode !== "") {
            questionWithTimestamps["code"] = processedCode;
            // Security: Removed user data from logs to prevent log injection
            console.log("✅ Code field recovered from processedCode");
          } else if (
            originalCode !== undefined &&
            originalCode !== null &&
            originalCode !== ""
          ) {
            // Process originalCode as last resort
            const codeContent = normalizeCodeLineBreaks(String(originalCode));
            questionWithTimestamps["code"] = codeContent;
            // Security: Removed debug logging to prevent information disclosure
          } else if (
            sanitizedQuestion["code"] !== undefined &&
            sanitizedQuestion["code"] !== null &&
            sanitizedQuestion["code"] !== ""
          ) {
            questionWithTimestamps["code"] = sanitizedQuestion["code"];
            // Security: Removed user data from logs to prevent log injection
            console.log("✅ Code field recovered from sanitizedQuestion");
          } else {
            questionWithTimestamps["code"] = null;
            console.log(
              "⚠️ Code field not found in any source, setting to null",
            );
          }
        } else if (
          questionWithTimestamps["code"] === null ||
          questionWithTimestamps["code"] === ""
        ) {
          // Code field exists, but verify it's not empty when it should have content
          if (processedCode !== null && processedCode !== "") {
            questionWithTimestamps["code"] = processedCode;
            // Security: Removed debug logging to prevent information disclosure
          } else if (
            originalCode !== undefined &&
            originalCode !== null &&
            originalCode !== ""
          ) {
            const codeContent = normalizeCodeLineBreaks(String(originalCode));
            questionWithTimestamps["code"] = codeContent;
            // Security: Log code length instead of content to prevent log injection
            const sanitizedCodeLength = sanitizeForLogging(
              String(codeContent.length),
            );
            // codeql[js/log-injection]: Value sanitized via sanitizeForLogging() and JSON.stringify
            console.log(
              "⚠️ Code field was null/empty, restored from originalCode:",
              JSON.stringify(sanitizedCodeLength),
              "chars",
            );
          }
        }

        // Security: Removed debug logging to prevent information disclosure

        // Insert question with code field
        // Security: Removed user data from logs to prevent log injection
        console.log("🔍 FINAL INSERT DATA - questionWithTimestamps");

        // Explicitly select code field in the response to ensure it's returned
        const { data, error } = await supabase
          .from("questions")
          .insert(questionWithTimestamps)
          .select("*, code") // Explicitly include code in the response
          .single();

        // Security: Removed user data from logs to prevent log injection
        if (data) {
          console.log("✅ INSERT SUCCESS - Data returned from database");
        }

        if (error) {
          console.error("Supabase insert error:", error);
          // If error is about code column not found (PGRST204), it means PostgREST cache hasn't refreshed
          if (error.code === "PGRST204") {
            console.warn(
              "⚠️ Code column not found in PostgREST schema cache. Cache may need to refresh (1-5 minutes).",
            );
            const sanitizedErrorCode = sanitizeForLogging(error.code);
            throw new Error(
              `Database error: Code column not available yet. PostgREST schema cache needs to refresh. Please wait 1-5 minutes and try again. (Code: ${sanitizedErrorCode})`,
            );
          }
          const sanitizedErrorMessage = sanitizeForLogging(error.message);
          const sanitizedErrorCode = sanitizeForLogging(error.code);
          throw new Error(
            `Database error: ${sanitizedErrorMessage} (Code: ${sanitizedErrorCode})`,
          );
        }

        // Include code in the result - ensure it's returned from the database response
        results.push({
          success: true,
          id: data.id,
          // code is included in the spread from sanitizedQuestion
        });
      } catch (error) {
        // Security: Sanitize error before logging to prevent log injection
        const sanitizedError =
          error instanceof Error
            ? sanitizeForLogging(error.message)
            : sanitizeForLogging(String(error));
        const sanitizedIndex = sanitizeForLogging(String(index + 1));
        console.error(
          "Error creating question:",
          sanitizedIndex,
          "Error:",
          sanitizedError,
        );
        const errorMessage = getErrorMessage(error);

        errors.push({
          question: questionData,
          error: errorMessage,
          index: index + 1,
        });
      }
    }

    // Invalidate cache after creating questions
    _questionsCache = null;

    return NextResponse.json({
      success: true,
      data: {
        success: results.length,
        failed: errors.length,
        errors: errors.map((e) => `Question ${e.index}: ${e.error}`),
        errorDetails: errors.map((e) => ({
          index: e.index,
          title: e.question ? String(e.question["title"]) : "Unknown",
          error: e.error,
        })),
        results: results,
      },
      message: `Successfully ${isBulkImport ? "imported" : "created"} ${results.length} questions`,
    });
  } catch (error) {
    console.error("Error creating questions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create questions" },
      { status: 500 },
    );
  }
}

// PUT /api/questions/unified - Update a question
// NOSONAR - legacy endpoint complexity is tracked for a dedicated refactor.
export async function PUT(request: NextRequest) {
  // NOSONAR
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Question ID is required" },
        { status: 400 },
      );
    }

    // Sanitize update data
    const sanitizedUpdate = sanitizeObjectServer(updateData);

    // Sanitize rich content fields
    if (sanitizedUpdate["explanation"]) {
      sanitizedUpdate["explanation"] = sanitizeRichContent(
        sanitizedUpdate["explanation"] as string,
      );
    }

    // Sanitize code field if present - preserve newlines and format
    // Code should be treated as plain text, not HTML
    if (
      sanitizedUpdate["code"] !== undefined &&
      sanitizedUpdate["code"] !== null &&
      sanitizedUpdate["code"] !== ""
    ) {
      // Convert \n escape sequences to actual newlines (in case they're stored as strings)
      let codeContent = normalizeCodeLineBreaks(
        String(sanitizedUpdate["code"]),
      );

      // Remove unsafe control chars while preserving tabs/newlines for code readability.
      codeContent = stripUnsafeControlCharacters(codeContent);

      sanitizedUpdate["code"] = codeContent;
    } else if (
      sanitizedUpdate["code"] === "" ||
      sanitizedUpdate["code"] === null
    ) {
      // Explicitly set to null if empty string or null is provided
      sanitizedUpdate["code"] = null;
    }

    // Sanitize options if present
    if (
      sanitizedUpdate["options"] &&
      Array.isArray(sanitizedUpdate["options"])
    ) {
      sanitizedUpdate["options"] = sanitizedUpdate["options"].map(
        (option: Record<string, unknown>) => ({
          ...option,
          text: sanitizeRichContent((option["text"] as string) || ""),
        }),
      );
    }

    // Map category name to category_id if needed (same logic as POST)
    // Only process if category was provided in the update
    const hasCategory =
      "category" in sanitizedUpdate || "category_id" in sanitizedUpdate;
    let categoryId: string | undefined = undefined;
    if (hasCategory) {
      const categoryValue =
        sanitizedUpdate["category_id"] || sanitizedUpdate["category"];
      if (
        categoryValue &&
        typeof categoryValue === "string" &&
        !UUID_REGEX.exec(categoryValue)
      ) {
        // It's a category name, not an ID - need to look it up
        const categoryName = categoryValue.trim();
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id, name")
          .ilike("name", categoryName)
          .single();

        if (categoryError || !categoryData) {
          // Security: Sanitize all values before logging
          const sanitizedCategoryError =
            categoryError instanceof Error
              ? sanitizeForLogging(categoryError.message)
              : sanitizeForLogging(String(categoryError));
          const sanitizedCategoryName = sanitizeForLogging(categoryName);
          // codeql[js/log-injection]: All user-provided values are sanitized via sanitizeForLogging() and JSON.stringify
          console.error(
            "Category lookup error:",
            JSON.stringify(sanitizedCategoryError),
            "Looking for:",
            JSON.stringify(sanitizedCategoryName),
          );
          const { data: allCategories } = await supabase
            .from("categories")
            .select("name")
            .order("name");
          const categoryNames =
            allCategories?.map((c) => c.name).join(", ") || "None";
          const sanitizedCategoryNameForError =
            sanitizeForLogging(categoryName);
          const sanitizedCategoryNamesForError =
            sanitizeForLogging(categoryNames);
          throw new Error(
            `Category "${sanitizedCategoryNameForError}" not found. Available categories: ${sanitizedCategoryNamesForError}`,
          );
        }

        categoryId = categoryData.id;
        // Security: Sanitize values before using in template string
        const sanitizedCategoryName = sanitizeForLogging(categoryData.name);
        const sanitizedCategoryId = sanitizeForLogging(String(categoryId));
        console.log(
          "✅ Found category:",
          sanitizedCategoryName,
          "with ID:",
          sanitizedCategoryId,
        );
      } else if (categoryValue && typeof categoryValue === "string") {
        // It's already an ID
        categoryId = categoryValue;
        // Security: Sanitize value before using in template string
        const sanitizedCategoryId = sanitizeForLogging(categoryId);
        // codeql[js/log-injection]: User-provided value sanitized via sanitizeForLogging() and JSON.stringify
        console.log(
          "✅ Using provided category ID:",
          JSON.stringify(sanitizedCategoryId),
        );
      }
    }

    // Map topic name to topic_id if needed (same logic as POST)
    // Only process if topic was provided in the update
    const hasTopic =
      "topic" in sanitizedUpdate || "topic_id" in sanitizedUpdate;
    let topicId: string | undefined = undefined;
    if (hasTopic) {
      const topicValue =
        sanitizedUpdate["topic_id"] || sanitizedUpdate["topic"];
      if (
        topicValue &&
        typeof topicValue === "string" &&
        !UUID_REGEX.exec(topicValue)
      ) {
        // It's a topic name, not an ID - need to look it up
        const topicName = topicValue.trim();
        let topicQuery = supabase
          .from("topics")
          .select("id, name")
          .ilike("name", topicName);

        // If we have a category_id, filter topics by that category
        if (categoryId) {
          topicQuery = topicQuery.eq("category_id", categoryId);
        }

        const { data: topicData, error: topicError } =
          await topicQuery.single();

        if (topicError || !topicData) {
          // Security: Sanitize all values before logging
          const sanitizedTopicError =
            topicError instanceof Error
              ? sanitizeForLogging(topicError.message)
              : sanitizeForLogging(String(topicError));
          const sanitizedTopicName = sanitizeForLogging(topicName);
          const sanitizedCategoryId = sanitizeForLogging(categoryId);
          // codeql[js/log-injection]: All user-provided values are sanitized via sanitizeForLogging() and JSON.stringify
          console.error(
            "Topic lookup error:",
            JSON.stringify(sanitizedTopicError),
            "Looking for:",
            JSON.stringify(sanitizedTopicName),
            "Category ID:",
            JSON.stringify(sanitizedCategoryId),
          );
          const categoryHint = categoryId ? ` for the selected category` : "";
          const sanitizedTopicNameForError = sanitizeForLogging(topicName);
          throw new Error(
            `Topic "${sanitizedTopicNameForError}" not found${categoryHint}. Make sure the topic exists and belongs to the selected category.`,
          );
        }

        topicId = topicData.id;
        // Security: Sanitize values before using in template string
        const sanitizedTopicName = sanitizeForLogging(topicData.name);
        const sanitizedTopicId = sanitizeForLogging(String(topicId));
        console.log(
          "✅ Found topic:",
          sanitizedTopicName,
          "with ID:",
          sanitizedTopicId,
        );
      } else if (topicValue && typeof topicValue === "string") {
        // It's already an ID
        topicId = topicValue;
        // Security: Sanitize user data before logging to prevent log injection
        const sanitizedTopicId = sanitizeForLogging(topicId);
        // codeql[js/log-injection]: User-provided value sanitized via sanitizeForLogging() and JSON.stringify
        console.log(
          "✅ Using provided topic ID:",
          JSON.stringify(sanitizedTopicId),
        );
      }
    }

    // Map learningCardId to learning_card_id (same logic as POST)
    // Check if learningCardId was explicitly provided in the update
    const hasLearningCardId =
      "learningCardId" in sanitizedUpdate ||
      "learning_card_id" in sanitizedUpdate;
    const learningCardId =
      sanitizedUpdate["learning_card_id"] || sanitizedUpdate["learningCardId"];

    // Validate learningCardId if provided (must be UUID or empty/null)
    let finalLearningCardId: string | null | undefined = undefined; // undefined means don't update this field
    if (hasLearningCardId) {
      if (
        learningCardId &&
        typeof learningCardId === "string" &&
        learningCardId.trim() !== ""
      ) {
        const trimmedId = learningCardId.trim();
        // Check if it's a valid UUID
        if (UUID_REGEX.exec(trimmedId)) {
          finalLearningCardId = trimmedId;
          // Security: Sanitize value before using in template string
          const sanitizedLearningCardId =
            sanitizeForLogging(finalLearningCardId);
          console.log("✅ Using learning card ID:", sanitizedLearningCardId);
        } else {
          // Security: Sanitize user data before logging to prevent log injection
          const sanitizedTrimmedId = sanitizeForLogging(trimmedId);
          // codeql[js/log-injection]: User-provided value sanitized via sanitizeForLogging() and JSON.stringify
          console.warn(
            "⚠️ Invalid learning card ID format:",
            JSON.stringify(sanitizedTrimmedId),
            "Expected UUID.",
          );
          finalLearningCardId = null; // Invalid format, set to null to clear it
        }
      } else {
        // Explicitly provided as empty/null - clear the card
        finalLearningCardId = null;
        console.log("ℹ️ Learning card ID explicitly cleared (set to null)");
      }
    } else {
      console.log(
        "ℹ️ No learning card ID provided in update (field not modified)",
      );
    }

    // Prepare update data for database
    // Remove fields that don't exist in the database
    const {
      category: _category,
      topic: _topic,
      learningCardId: _learningCardId,
      learning_card_id: _learning_card_id,
      resources: _resources, // Remove resources - it's handled separately
      ...dbUpdate
    } = sanitizedUpdate;

    // Handle resources field - validate it's an array or null
    if ("resources" in sanitizedUpdate) {
      if (
        sanitizedUpdate["resources"] === null ||
        sanitizedUpdate["resources"] === undefined ||
        sanitizedUpdate["resources"] === ""
      ) {
        dbUpdate["resources"] = null;
      } else if (Array.isArray(sanitizedUpdate["resources"])) {
        // Validate each resource object
        const validResources = sanitizedUpdate["resources"].filter(
          (resource: Record<string, unknown>) => {
            return (
              resource &&
              typeof resource === "object" &&
              ["video", "course", "article"].includes(
                resource["type"] as string,
              ) &&
              typeof resource["title"] === "string" &&
              typeof resource["url"] === "string"
            );
          },
        );
        dbUpdate["resources"] =
          validResources.length > 0 ? validResources : null;
      } else {
        console.warn(
          "⚠️ Invalid resources format - must be array or null. Setting to null.",
        );
        dbUpdate["resources"] = null;
      }
    }

    // Ensure content field exists if title is provided
    if (!dbUpdate["content"] && dbUpdate["title"]) {
      dbUpdate["content"] = dbUpdate["title"];
    }

    // Build update object with only the fields that should be updated
    const updateWithTimestamps: Record<string, unknown> = {
      ...dbUpdate,
      updated_at: new Date().toISOString(),
    };

    // Only include category_id, topic_id, learning_card_id if they were provided/mapped
    if (categoryId) {
      updateWithTimestamps["category_id"] = categoryId;
    }
    if (topicId) {
      updateWithTimestamps["topic_id"] = topicId;
    }
    if (finalLearningCardId !== undefined) {
      updateWithTimestamps["learning_card_id"] = finalLearningCardId;
    }

    console.log("📝 Question update data:", {
      id,
      title: updateWithTimestamps["title"],
      category_id: updateWithTimestamps["category_id"],
      topic_id: updateWithTimestamps["topic_id"],
      learning_card_id: updateWithTimestamps["learning_card_id"],
    });

    const { error } = await supabase
      .from("questions")
      .update(updateWithTimestamps)
      .eq("id", id);

    if (error) {
      // Security: Sanitize error message before throwing to prevent log injection
      const sanitizedErrorMessage = sanitizeForLogging(
        error.message || "Unknown database error",
      );
      const sanitizedErrorCode = error.code
        ? sanitizeForLogging(String(error.code))
        : undefined;
      throw new Error(
        sanitizedErrorCode
          ? `Database error: ${sanitizedErrorMessage} (Code: ${sanitizedErrorCode})`
          : `Database error: ${sanitizedErrorMessage}`,
      );
    }

    // Invalidate cache after updating question
    _questionsCache = null;

    return NextResponse.json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (error: unknown) {
    // Security: Sanitize error details before logging to prevent log injection
    const errorMessage =
      error instanceof Error
        ? sanitizeForLogging(error.message)
        : sanitizeForLogging(String(error));
    // codeql[js/log-injection]: Error message sanitized via sanitizeForLogging() and JSON.stringify
    console.error("Error updating question:", JSON.stringify(errorMessage));
    if (error instanceof Error && error.message) {
      // Security: Sanitize error message before logging
      const sanitizedErrorMessage = sanitizeForLogging(error.message);
      // codeql[js/log-injection]: Error message sanitized via sanitizeForLogging() and JSON.stringify
      console.error("Error message:", JSON.stringify(sanitizedErrorMessage));
    }
    return NextResponse.json(
      { success: false, error: "Failed to update question" },
      { status: 500 },
    );
  }
}

// DELETE /api/questions/unified - Delete a question
export async function DELETE(request: NextRequest) {
  try {
    // Get Supabase client with validation
    const supabase = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Question ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("questions").delete().eq("id", id);

    if (error) throw error;

    // Invalidate cache after deleting question
    _questionsCache = null;

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete question" },
      { status: 500 },
    );
  }
}
