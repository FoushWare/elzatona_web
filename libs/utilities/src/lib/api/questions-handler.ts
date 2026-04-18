import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseClient,
  validateAndSanitize,
  sanitizeObjectServer,
  sanitizeRichContent,
  sanitizeForLogging,
  getErrorMessage,
  normalizeCodeLineBreaks,
  stripUnsafeControlCharacters,
} from "../../../utilities";
import { questionSchema } from "../../../validation";

// -----------------------------------------------------------------------------
// Constants and Types
// -----------------------------------------------------------------------------

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// In-memory cache for questions (simple implementation)
let _questionsCache: any = null;

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Checks if a string is a valid UUID.
 */
function isUuid(str: string): boolean {
  return UUID_REGEX.test(str);
}

/**
 * Looks up a category ID by name if it's not already a UUID.
 */
async function lookupCategory(supabase: any, categoryValue: any) {
  if (!categoryValue || typeof categoryValue !== "string") return null;
  const trimmed = categoryValue.trim();
  if (isUuid(trimmed)) return trimmed;

  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", trimmed)
    .single();

  if (error || !data) {
    console.error(`Category lookup failed for: ${trimmed}`);
    return null;
  }
  return data.id;
}

/**
 * Looks up a topic ID by name within a category if it's not already a UUID.
 */
async function lookupTopic(supabase: any, topicValue: any, categoryId?: string | null) {
  if (!topicValue || typeof topicValue !== "string") return null;
  const trimmed = topicValue.trim();
  if (isUuid(trimmed)) return trimmed;

  let query = supabase.from("topics").select("id").ilike("name", trimmed);
  if (categoryId) query = query.eq("category_id", categoryId);

  const { data, error } = await query.single();
  if (error || !data) {
    console.error(`Topic lookup failed for: ${trimmed}`);
    return null;
  }
  return data.id;
}

/**
 * Looks up a learning card ID by identifier (slug, title, or ID).
 */
async function lookupLearningCard(supabase: any, identifier: any) {
  if (!identifier || typeof identifier !== "string") return null;
  const trimmed = identifier.trim();
  if (isUuid(trimmed)) return trimmed;

  // Try title
  let { data } = await supabase.from("learning_cards").select("id").ilike("title", trimmed).maybeSingle();
  if (data) return data.id;

  // Try slug
  ({ data } = await supabase.from("learning_cards").select("id").ilike("slug", trimmed).maybeSingle());
  if (data) return data.id;

  // Try exact ID
  ({ data } = await supabase.from("learning_cards").select("id").eq("id", trimmed).maybeSingle());
  return data?.id || null;
}

/**
 * Processes question options: sanitizes text and handles invalid formats.
 */
function processQuestionOptions(options: any) {
  if (!options || !Array.isArray(options)) return undefined;
  return options
    .filter((opt) => opt && typeof opt === "object")
    .map((option) => ({
      ...option,
      text: sanitizeRichContent(String(option.text || "")),
    }));
}

/**
 * Checks for duplicate questions based on title and (content OR code).
 */
async function checkDuplicateQuestion(supabase: any, question: Record<string, any>) {
  let query = supabase
    .from("questions")
    .select("id")
    .ilike("title", question["title"])
    .limit(1);

  if (question["code"]) {
    query = query.eq("code", question["code"]);
  } else if (question["content"]) {
    query = query.eq("content", question["content"]);
  }

  const { data } = await query.maybeSingle();
  return data;
}

/**
 * Transforms a raw database question for frontend consumption.
 */
function transformQuestionForFrontend(question: Record<string, any>) {
  const transformed = { ...question };
  if (question["categories"]) {
    transformed["category_id"] = question["categories"]["id"];
    transformed["category"] = question["categories"]["name"];
  }
  if (question["topics"]) {
    transformed["topic_id"] = question["topics"]["id"];
    transformed["topic"] = question["topics"]["name"];
  }
  if (question["learning_cards"]) {
    transformed["learning_card_id"] = question["learning_cards"]["id"];
    transformed["learningCardId"] = question["learning_cards"]["id"];
    transformed["learning_card"] = question["learning_cards"];
  }
  return transformed;
}

/**
 * Prepares a raw question object for Supabase insertion.
 * Handles normalization, validation, sanitization, and relationship lookup.
 */
async function prepareQuestionForStorage(
  supabase: any,
  questionData: Record<string, any>,
) {
  // 1. Normalize field names
  const normalized: Record<string, any> = { ...questionData };
  const originalCode = questionData["code"];

  if (normalized["isActive"] !== undefined) normalized["is_active"] = normalized["isActive"];
  if (normalized["learningCardId"] !== undefined) normalized["learning_card_id"] = normalized["learningCardId"];
  if (normalized["timeLimit"] !== undefined) normalized["time_limit"] = normalized["timeLimit"];

  // 2. Preserve and Normalize Code field (CRITICAL for newlines)
  let processedCode: string | null = null;
  if (originalCode !== undefined && originalCode !== null) {
    processedCode = normalizeCodeLineBreaks(String(originalCode));
    normalized["code"] = processedCode;
  } else {
    normalized["code"] = null;
  }

  // 3. Validation
  const validation = validateAndSanitize(questionSchema, normalized);
  if (!validation.success) {
    throw new Error(validation.error);
  }

  // 4. Sanitization (Exclude code from HTML sanitization, rely on CSP)
  const validatedData = validation.data as Record<string, any>;
  const sanitized = sanitizeObjectServer(validatedData);

  // Restore processed code after object-wide sanitization
  sanitized["code"] = processedCode;
  if (sanitized["explanation"]) {
    sanitized["explanation"] = sanitizeRichContent(sanitized["explanation"] as string);
  }
  sanitized["options"] = processQuestionOptions(sanitized["options"]);

  // 5. Build Final Object with Relationship Lookups
  const categoryId = await lookupCategory(supabase, sanitized["category_id"] || sanitized["category"]);
  const topicId = await lookupTopic(supabase, sanitized["topic_id"] || sanitized["topic"], categoryId);
  const learningCardId = await lookupLearningCard(supabase, sanitized["learning_card_id"] || sanitized["learningCardId"]);

  const {
    category: _c, topic: _t, learningCardId: _lc, learning_card_id: _lci,
    isActive: _ia, timeLimit: _tl, id: _id, categories: _cs, topics: _ts,
    learning_cards: _lcs, learning_card: _lcobj, ...dbQuestion
  } = sanitized;

  const finalQuestion: Record<string, any> = {
    ...dbQuestion,
    category_id: categoryId || null,
    topic_id: topicId || null,
    learning_card_id: learningCardId || null,
    content: dbQuestion["content"] || dbQuestion["title"],
    type: dbQuestion["type"] === "multiple-select" ? "multiple-choice" : (dbQuestion["type"] || "multiple-choice"),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Ensure code is explicitly null if missing to satisfy Supabase insert
  if (!("code" in finalQuestion)) finalQuestion["code"] = null;

  return finalQuestion;
}

// -----------------------------------------------------------------------------
// API Handlers
// -----------------------------------------------------------------------------

/**
 * GET Handler: Fetches and filters questions with pagination.
 */
export async function questionsGetHandler(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const categoryId = searchParams.get("categoryId");
    const topicId = searchParams.get("topicId");
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from("questions")
      .select("*, categories(id, name), topics(id, name), learning_cards(*)", {
        count: "exact",
      });

    if (categoryId) query = query.eq("category_id", categoryId);
    if (topicId) query = query.eq("topic_id", topicId);
    if (type) query = query.eq("type", type);
    if (search) query = query.ilike("title", `%${search}%`);

    const { count, data, error } = await query
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const questions = (data || []).map(transformQuestionForFrontend);
    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      success: true,
      data: questions,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

/**
 * GET Handler: Fetches a single question by ID.
 */
export async function questionsGetByIdHandler(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("questions")
      .select("*, categories(id, name), topics(id, name), learning_cards(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformQuestionForFrontend(data),
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

/**
 * POST Handler: Creates questions (bulk import or single).
 */
export async function questionsPostHandler(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { questions, isBulkImport = false } = body;

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: "Questions array is required" },
        { status: 400 },
      );
    }

    const results: Array<{ success: boolean; id?: string }> = [];
    const errors: Array<{
      question: Record<string, unknown>;
      error: string;
      index: number;
    }> = [];

    for (let index = 0; index < questions.length; index++) {
      const questionData = questions[index] as Record<string, unknown>;
      try {
        const finalQuestion = await prepareQuestionForStorage(supabase, questionData);
        const existing = await checkDuplicateQuestion(supabase, finalQuestion);
        
        if (existing) {
          errors.push({
            question: questionData,
            error: `Duplicate question: same title and ${finalQuestion.code ? "code" : "content"} already exists (ID: ${existing.id})`,
            index: index + 1,
          });
          continue;
        }

        const { data, error } = await supabase
          .from("questions")
          .insert(finalQuestion)
          .select("*, code")
          .single();

        if (error) throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
        results.push({ success: true, id: data.id });
      } catch (error) {
        const msg = getErrorMessage(error);
        errors.push({ question: questionData, error: msg, index: index + 1 });
        console.error(`Error creating question ${index + 1}:`, msg);
      }
    }

    _questionsCache = null;

    return NextResponse.json({
      success: true,
      data: {
        success: results.length,
        failed: errors.length,
        errors: errors.map((e) => `Question ${e.index}: ${e.error}`),
        errorDetails: errors.map((e) => ({
          index: e.index,
          title: (e.question?.title as string) || "Unknown",
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

/**
 * PUT Handler: Updates an existing question.
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Question ID is required" }, { status: 400 });
    }

    // 1. Prepare data for update (Recycle logic from preparation helper)
    const categoryId = await lookupCategory(supabase, updateData["category_id"] || updateData["category"]);
    const topicId = await lookupTopic(supabase, updateData["topic_id"] || updateData["topic"], categoryId);
    const learningCardId = await lookupLearningCard(supabase, updateData["learning_card_id"] || updateData["learningCardId"]);

    const sanitized = sanitizeObjectServer(updateData);
    if (sanitized["explanation"]) sanitized["explanation"] = sanitizeRichContent(sanitized["explanation"]);
    if (sanitized["code"]) sanitized["code"] = normalizeCodeLineBreaks(String(sanitized["code"]));
    sanitized["options"] = processQuestionOptions(sanitized["options"]);

    const {
      category: _c, topic: _t, learningCardId: _lc, learning_card_id: _lci,
      isActive: _ia, timeLimit: _tl, ...dbUpdate
    } = sanitized;

    const finalUpdate = {
      ...dbUpdate,
      category_id: categoryId || undefined,
      topic_id: topicId || undefined,
      learning_card_id: learningCardId || undefined,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("questions").update(finalUpdate).eq("id", id);
    if (error) throw error;

    _questionsCache = null;
    return NextResponse.json({ success: true, message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE Handler: Deletes a question.
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Question ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) throw error;

    _questionsCache = null;
    return NextResponse.json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
