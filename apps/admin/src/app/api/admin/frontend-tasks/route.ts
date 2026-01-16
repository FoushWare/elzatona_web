import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../lib/supabase-client";
import {
    FrontendTask,
    FrontendTaskFormData,
    ApiResponse,
    PaginatedResponse,
} from "@elzatona/types";

// GET /api/admin/frontend-tasks - List all frontend tasks
export async function GET(request: NextRequest) {
    try {
        const supabase = getSupabaseClient();
        console.log("🔄 Admin API: Fetching frontend tasks...");

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

        let data: FrontendTask[] = tasks || [];

        // Apply search filter
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
        const supabase = getSupabaseClient();
        console.log("🔄 Admin API: Creating new frontend task...");

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
            title: body.title,
            description: body.description,
            requirements: body.requirements,
            solution: body.solution,
            starter_code: body.starterCode,
            category: body.category,
            difficulty: body.difficulty,
            estimated_time: body.estimatedTime,
            author: body.author,
            company: body.company,
            files: body.files,
            test_cases: body.testCases,
            tags: body.tags,
            is_active: body.is_active !== false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
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

        console.log(`✅ Admin API: Frontend task created with ID: ${newTask.id}`);

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
