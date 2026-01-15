// v1.0 - API routes for frontend tasks CRUD operations

import { NextRequest, NextResponse } from "next/server";
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from "@elzatona/types";
import { getSupabaseClient } from "../../../../lib/supabase-client";

// GET /api/admin/frontend-tasks - List all frontend tasks
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 API: Fetching frontend tasks...");

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";

    // Fetch tasks from Supabase
    let query = supabase.from("frontend_tasks").select("*");

    // Apply filters
    if (category) {
      query = query.eq("category", category);
    }
    if (difficulty) {
      query = query.eq("difficulty", difficulty);
    }

    // Apply ordering
    query = query.order("created_at", { ascending: false });

    const { data: tasks, error } = await query;

    if (error) {
      throw error;
    }

    // Map snake_case to camelCase
    let data: FrontendTask[] = (tasks || []).map((t: any) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      category: t.category,
      timeLimit: t.time_limit,
      tags: t.tags || [],
      files: t.files || [],
      boilerplate: t.boilerplate,
      solution: t.solution,
      testCases: t.test_cases || [],
      created_at: t.created_at,
      updated_at: t.updated_at,
      is_active: t.is_active,
      order: t.order || 0,
      learningPathId: t.learning_path_id,
      moduleId: t.module_id || "default",
      metadata: t.metadata || {},
      // Default values for required fields not in DB or mapped differently
      estimatedTime: t.time_limit || 30,
      author: "System",
      company: "",
      requirements: "",
      hints: [],
      starterCode: t.boilerplate || "",
    }));

    // Apply search filter (client-side since Supabase doesn't support full-text search)
    if (search) {
      const lowerSearch = search.toLowerCase();
      data = data.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch) ||
          task.category.toLowerCase().includes(lowerSearch) ||
          task.tags.some((tag: string) =>
            tag.toLowerCase().includes(lowerSearch),
          ),
      );
    }

    // Client-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    console.log(
      `📊 API: Frontend tasks fetched: ${data.length} total, ${paginatedData.length} returned`,
    );

    const response: PaginatedResponse<FrontendTask> = {
      success: true,
      data: paginatedData,
      total: data.length,
      page,
      limit,
      hasMore: endIndex < data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error fetching frontend tasks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch frontend tasks" },
      { status: 500 },
    );
  }
}

// POST /api/admin/frontend-tasks - Create new frontend task
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 API: Creating new frontend task...");

    const body: FrontendTaskFormData = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create the task data with snake_case mapping
    const taskData = {
      title: body.title,
      description: body.description,
      difficulty: body.difficulty,
      category: body.category,
      time_limit: body.timeLimit,
      tags: body.tags,
      files: body.files,
      boilerplate: body.boilerplate || null,
      solution: body.solution || null,
      test_cases: body.testCases,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      learning_path_id: body.learningPathId || null,
      module_id: body.moduleId || "default",
      metadata: body.metadata || {},
      order: 0,
    };

    // Add to Supabase
    const { data: newTask, error } = await supabase
      .from("frontend_tasks")
      .insert(taskData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log(`✅ API: Frontend task created with ID: ${newTask.id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: newTask.id },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ API: Error creating frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create frontend task" },
      { status: 500 },
    );
  }
}
