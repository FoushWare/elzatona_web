import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface Section {
  id: string;
  name: string;
  questions: string[];
  questionCount?: number;
  updatedAt?: Date;
  [key: string]: unknown; // Allow additional properties
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string; sectionId: string }> },
) {
  try {
    const { planId, sectionId } = await params;
    const body = await request.json();
    const { questions } = body;

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        {
          success: false,
          error: "Questions must be an array",
        },
        { status: 400 },
      );
    }

    // Get the plan document
    const { data: planDoc, error } = await supabase
      .from("learning_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (error || !planDoc) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found",
        },
        { status: 404 },
      );
    }

    const planData = planDoc;
    const sections = planData.sections || [];

    // Find and update the specific section
    const updatedSections = sections.map((section: Section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: questions,
          question_count: questions.length,
          updated_at: new Date(),
        };
      }
      return section;
    });

    // Update the plan with the modified sections
    const { error: updateError } = await supabase
      .from("learning_plans")
      .update({
        sections: updatedSections,
        updated_at: new Date().toISOString(),
      })
      .eq("id", planId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      data: {
        sectionId,
        questions,
        question_count: questions.length,
      },
    });
  } catch (error) {
    console.error("Error updating section questions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update section questions",
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string; sectionId: string }> },
) {
  try {
    const { planId, sectionId } = await params;

    // Get the plan document
    const { data: planDoc, error } = await supabase
      .from("learning_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (error || !planDoc) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found",
        },
        { status: 404 },
      );
    }

    const planData = planDoc;
    const sections = planData.sections || [];

    // Find the specific section
    const section = sections.find((s: Section) => s.id === sectionId);

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error: "Section not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch section",
      },
      { status: 500 },
    );
  }
}
