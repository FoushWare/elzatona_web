import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Supabase URL or Service Role Key is missing in environment variables.",
  );
  throw new Error(
    "Supabase URL or Service Role Key is missing in environment variables.",
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");
    const isActive = searchParams.get("isActive");
    const search = searchParams.get("search");

    // Build query
    let query = supabase.from("questions").select(`
        *,
        categories:category_id (
          id,
          name
        )
      `);

    // Apply filters
    if (category && category !== "all") {
      query = query.eq("category_id", category);
    }

    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty);
    }

    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    if (isActive !== null && isActive !== "all") {
      query = query.eq("is_active", isActive === "true");
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    // Execute query
    const { data, error } = await query;

    if (error) throw error;

    // Transform data to match expected format (matching Elzatona-web-ui schema)
    const transformedData =
      data?.map((question) => ({
        id: question.id,
        title: question.title,
        content: question.content,
        type: question.type,
        difficulty: question.difficulty,
        points: question.points || 1,
        options: question.options || [],
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        test_cases: question.test_cases || [],
        hints: question.hints || [],
        tags: question.tags || [],
        stats: question.stats || {},
        metadata: question.metadata || {},
        category: question.categories?.name || "Unknown",
        category_id: question.category_id,
        learning_card_id: question.learning_card_id,
        isActive: question.is_active,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
      })) || [];

    return NextResponse.json({
      success: true,
      data: transformedData,
      pagination: {
        page,
        pageSize,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch questions";
    console.error("Error fetching questions:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      content,
      type,
      difficulty,
      points,
      options,
      correct_answer,
      explanation,
      test_cases,
      hints,
      tags,
      stats,
      metadata,
      category_id,
      learning_card_id,
      isActive = true,
    } = body;

    const { data, error } = await supabase
      .from("questions")
      .insert({
        title,
        content,
        type,
        difficulty,
        points,
        options,
        correct_answer,
        explanation,
        test_cases,
        hints,
        tags,
        stats,
        metadata,
        category_id,
        learning_card_id,
        is_active: isActive,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create question";
    console.error("Error creating question:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
