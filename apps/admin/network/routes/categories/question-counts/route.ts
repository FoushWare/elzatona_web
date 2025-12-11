import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(_request: NextRequest) {
  try {
    console.log("📊 Fetching question counts for all categories...");

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name, slug, description")
      .eq("is_active", true)
      .order("name");

    if (categoriesError) {
      console.error("❌ Error fetching categories:", categoriesError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch categories" },
        { status: 500 },
      );
    }

    if (!categories || categories.length === 0) {
      console.log("ℹ️ No categories found");
      return NextResponse.json({
        success: true,
        data: [],
        message: "No categories found",
      });
    }

    // Get question counts for each category
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const { count, error } = await supabase
          .from("questions")
          .select("*", { count: "exact", head: true })
          .eq("category_id", category.id)
          .eq("is_active", true);

        if (error) {
          console.error(
            `❌ Error counting questions for category ${category.name}:`,
            error,
          );
          return {
            ...category,
            questionCount: 0,
          };
        }

        return {
          ...category,
          questionCount: count || 0,
        };
      }),
    );

    console.log("✅ Category question counts fetched successfully:", {
      totalCategories: categoryCounts.length,
      totalQuestions: categoryCounts.reduce(
        (sum, cat) => sum + cat.questionCount,
        0,
      ),
    });

    return NextResponse.json({
      success: true,
      data: categoryCounts,
      message: "Category question counts fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error in category question counts API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
