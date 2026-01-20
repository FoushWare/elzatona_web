import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from "@elzatona/types";

// GET /api/admin/frontend-tasks - List all frontend tasks
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

    // Use repository pattern: findByType for 'frontend-task'
    const options = { page, limit };
    const tasksResult = await questionRepo.findByType("frontend-task", options);
    let data: FrontendTask[] = tasksResult.data || [];

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

    // Client-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

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
    console.error("❌ Admin API: Error fetching frontend tasks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch frontend tasks" },
      { status: 500 },
    );
  }
}

// POST /api/admin/frontend-tasks - Create new frontend task
export async function POST(request: NextRequest) {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const body: FrontendTaskFormData = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create the task data
    const taskData = {
      ...body,
      type: "frontend-task",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to repository
    const newTask = await questionRepo.create(taskData);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: newTask.id },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ Admin API: Error creating frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create frontend task" },
      { status: 500 },
    );
  }
}
