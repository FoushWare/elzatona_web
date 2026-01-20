// Categories API Route
// v1.1 - Category management for topics and questions
// Added input sanitization for security

import { NextRequest, NextResponse } from "next/server";
// Empty import removed
import { createRepositoryFactoryFromEnv } from "../../../../../../libs/database/src/repositories/RepositoryFactory";
import { sanitizeObjectServer } from "../../../sanitize-server";
import { validateAndSanitize, categorySchema } from "../../../validation";

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: Date;
  updated_at: Date;
}

export async function GET() {
  try {
    const factory = createRepositoryFactoryFromEnv();
    const categoryRepo = factory.getCategoryRepository();
    const categories = await categoryRepo.getAllCategories();
    // Transform data to match expected format
    const transformedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      created_at: category.created_at,
      updated_at: category.updated_at,
    }));
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
    const factory = createRepositoryFactoryFromEnv();
    const categoryRepo = factory.getCategoryRepository();
    const newCategory = await categoryRepo.createCategory({
      name: sanitizedData.name,
      description: sanitizedData.description || "",
    });
    return NextResponse.json({
      success: true,
      data: newCategory,
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
