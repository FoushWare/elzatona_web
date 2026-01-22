import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from "@elzatona/types";

// GET /api/admin/problem-solving - List all problem solving tasks
export async function GET(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";

    // Use repository pattern: findByType for 'problem'
    const options = { page, limit };
    const tasksResult = await questionRepo.findByType("problem", options);
    let data: any[] = tasksResult.data || [];

    // Apply additional filters client-side if needed
    if (category) {
      data = data.filter((task) => task.category === category);
    }
    if (difficulty) {
      data = data.filter((task) => task.difficulty === difficulty);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      data = data.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch) ||
          task.category.toLowerCase().includes(lowerSearch) ||
          task.tags?.some((tag: string) =>
            tag.toLowerCase().includes(lowerSearch),
          ),
      );
    }

    // Apply search filter (client-side since Supabase doesn't support full-text search)
    let filteredData = data;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredData = data.filter(
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
    const paginatedData = filteredData.slice(startIndex, endIndex);

    console.log(
      `📊 API: Problem solving tasks fetched: ${filteredData.length} total, ${paginatedData.length} returned`,
    );

    const response: PaginatedResponse<ProblemSolvingTask> = {
      success: true,
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      hasMore: endIndex < filteredData.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error fetching problem solving tasks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch problem solving tasks" },
      { status: 500 },
    );
  }
}

// POST /api/admin/problem-solving - Create new problem solving task
export async function POST(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const body: ProblemSolvingTaskFormData = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.category ||
      !body.functionName
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!body.testCases || body.testCases.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one test case is required" },
        { status: 400 },
      );
    }
    const taskData = {
      ...body,
      type: "problem",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newTask = await questionRepo.create(taskData as any);
    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: newTask.id },
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ API: Error creating problem solving task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create problem solving task" },
      { status: 500 },
    );
  }
}
