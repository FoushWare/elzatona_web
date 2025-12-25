// Sections API Route
// v2.0 - Enhanced section management

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/sections - Get all sections
export async function GET() {
  try {
    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Supabase configuration missing");
      return NextResponse.json(
        {
          success: false,
          error: "Database configuration missing",
        },
        { status: 500 },
      );
    }

    // Try to fetch sections with order_index, fallback to created_at if order_index doesn't exist
    let { data: sectionsData, error } = await supabase
      .from("sections")
      .select("*")
      .order("order_index", { ascending: true });

    // If order_index column doesn't exist, try ordering by created_at instead
    if (
      error &&
      (error.message?.includes("order_index") || error.code === "42703")
    ) {
      console.warn("order_index column not found, trying created_at instead");
      const fallbackQuery = await supabase
        .from("sections")
        .select("*")
        .order("created_at", { ascending: true });

      if (!fallbackQuery.error) {
        sectionsData = fallbackQuery.data;
        error = null;
      } else {
        // If that also fails, try without ordering
        const noOrderQuery = await supabase.from("sections").select("*");

        if (!noOrderQuery.error) {
          sectionsData = noOrderQuery.data;
          error = null;
        } else {
          error = fallbackQuery.error;
        }
      }
    }

    if (error) {
      console.error("Supabase error fetching sections:", error);
      // If table doesn't exist or query fails, return empty array instead of error
      // This allows the frontend to handle empty sections gracefully
      if (error.code === "42P01" || error.message?.includes("does not exist")) {
        console.warn("Sections table does not exist, returning empty array");
        return NextResponse.json({
          success: true,
          data: [],
          count: 0,
        });
      }
      throw error;
    }

    const sections = sectionsData || [];

    return NextResponse.json({
      success: true,
      data: sections,
      count: sections.length,
    });
  } catch (error) {
    console.error("Error fetching sections:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch sections";
    const errorDetails =
      error instanceof Error && "code" in error
        ? { code: (error as any).code }
        : {};

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 },
    );
  }
}

// POST /api/sections - Create a new section
export async function POST(request: NextRequest) {
  try {
    const sectionData = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "learning_path",
      "question_limit",
    ];
    for (const field of requiredFields) {
      if (!sectionData[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        );
      }
    }

    // Validate question limit
    if (sectionData.question_limit < 1 || sectionData.question_limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Question limit must be between 1 and 100",
        },
        { status: 400 },
      );
    }

    const sectionWithTimestamps = {
      ...sectionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newSection, error } = await supabase
      .from("sections")
      .insert(sectionWithTimestamps)
      .select()
      .single();

    if (error) {
      throw error;
    }

    const sectionId = newSection.id;

    return NextResponse.json({
      success: true,
      data: { id: sectionId },
      message: "Section created successfully",
    });
  } catch (error) {
    console.error("Error creating section:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create section",
      },
      { status: 500 },
    );
  }
}
