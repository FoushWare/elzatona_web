import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch counts for all entities
    const [
      questionsResult,
      categoriesResult,
      topicsResult,
      cardsResult,
      learningPlansResult,
      adminsResult,
    ] = await Promise.all([
      supabase.from("questions").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("topics").select("id", { count: "exact", head: true }),
      supabase.from("cards").select("id", { count: "exact", head: true }),
      supabase
        .from("learning_plans")
        .select("id", { count: "exact", head: true }),
      supabase.from("admins").select("id", { count: "exact", head: true }),
    ]);

    // Calculate total tasks (frontend + problem solving)
    const totalTasks = 0; // This would be calculated from actual task tables

    const stats = {
      questions: questionsResult.count || 0,
      categories: categoriesResult.count || 0,
      topics: topicsResult.count || 0,
      cards: cardsResult.count || 0,
      learningPlans: learningPlansResult.count || 0,
      admins: adminsResult.count || 0,
      totalTasks: totalTasks,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard statistics",
      },
      { status: 500 },
    );
  }
}
