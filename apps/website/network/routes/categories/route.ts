// Categories API Route
// v1.1 - Category management for topics and questions
// Added input sanitization for security

import { NextRequest, NextResponse } from "next/server";
import {} from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { sanitizeObjectServer } from "@/lib/utils/sanitize-server";
import { validateAndSanitize, categorySchema } from "@/lib/utils/validation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: Date;
  updated_at: Date;
}

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedCategories =
      categories?.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        orderIndex: category.order_index,
        is_active: category.is_active,
        learning_card_id: category.learning_card_id || null,
        card_type: category.card_type || null,
        cardType: category.card_type || null, // Also include camelCase for compatibility
        created_at: new Date(category.created_at),
        updated_at: new Date(category.updated_at),
      })) || [];

    return NextResponse.json({
      success: true,
      data: transformedCategories,
      count: transformedCategories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json();

    // Validate and sanitize category data
    const validationResult = validateAndSanitize(categorySchema, categoryData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error,
        },
        { status: 400 },
      );
    }

    // Sanitize the validated data
    const sanitizedData = sanitizeObjectServer(validationResult.data as any);

    // Transform data to match Supabase schema
    const supabaseCategoryData = {
      name: sanitizedData.name,
      description: sanitizedData.description || "",
      slug:
        sanitizedData.slug ||
        sanitizedData.name.toLowerCase().replace(/\s+/g, "-"),
      icon: categoryData.icon || "📁", // Icon is not sanitized as it's an emoji/symbol
      color: categoryData.color || "#3B82F6", // Color is validated by format
      order_index: categoryData.orderIndex || categoryData.order_index || 0,
      is_active: categoryData.isActive !== false,
    };

    const { data: newCategory, error } = await supabase
      .from("categories")
      .insert(supabaseCategoryData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!newCategory) {
      throw new Error("No category was created");
    }

    // Transform response to match expected format
    const transformedCategory = {
      id: newCategory.id,
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      icon: newCategory.icon,
      orderIndex: newCategory.order_index,
      is_active: newCategory.is_active,
      created_at: new Date(newCategory.created_at),
      updated_at: new Date(newCategory.updated_at),
    };

    return NextResponse.json({
      success: true,
      data: transformedCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create category",
      },
      { status: 500 },
    );
  }
}
