import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

interface Question {
  id: string;
  learningPath?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

interface Section {
  id: string;
  name?: string;
  currentQuestionCount?: number;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const {
      questionId,
      learningPathId,
      sectionSize = 15,
    } = await request.json();

    // Get all questions for this learning path
    const supabase = getSupabaseClient();
    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("learning_path", learningPathId)
      .order("created_at", { ascending: true });

    if (questionsError) {
      throw questionsError;
    }

    const questions: Question[] = questionsData || [];

    // Get existing sections for this learning path
    const { data: sectionsData, error: sectionsError } = await supabase
      .from("sections")
      .select("*")
      .eq("learning_path", learningPathId)
      .order("order_index", { ascending: true });

    if (sectionsError) {
      throw sectionsError;
    }

    const existingSections: Section[] = sectionsData || [];

    // Calculate which section this question should go to
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    const sectionIndex = Math.floor(questionIndex / sectionSize);

    let targetSection;

    // Check if section exists
    if (existingSections[sectionIndex]) {
      targetSection = existingSections[sectionIndex];
    } else {
      // Create new section
      const newSection = {
        name: `Section ${sectionIndex + 1}`,
        description: `Questions ${sectionIndex * sectionSize + 1} - ${(sectionIndex + 1) * sectionSize}`,
        learning_path: learningPathId,
        order_index: sectionIndex + 1,
        question_limit: sectionSize,
        current_question_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: sectionData, error: sectionError } = await supabase
        .from("sections")
        .insert(newSection)
        .select()
        .single();

      if (sectionError) {
        throw sectionError;
      }

      targetSection = sectionData;
    }

    // Update the question with section assignment
    const { error: questionUpdateError } = await supabase
      .from("questions")
      .update({
        section_id: targetSection.id,
        order_in_section: (questionIndex % sectionSize) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", questionId);

    if (questionUpdateError) {
      throw questionUpdateError;
    }

    // Update section question count
    const { error: sectionUpdateError } = await supabase
      .from("sections")
      .update({
        current_question_count:
          (targetSection as Section).currentQuestionCount! + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", targetSection.id);

    if (sectionUpdateError) {
      throw sectionUpdateError;
    }

    return NextResponse.json({
      success: true,
      data: {
        questionId,
        sectionId: targetSection.id,
        sectionName: (targetSection as Section).name,
        orderInSection: (questionIndex % sectionSize) + 1,
      },
    });
  } catch (error) {
    console.error("Error auto-assigning question to section:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to auto-assign question to section",
      },
      { status: 500 },
    );
  }
}
