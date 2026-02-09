import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const categoryRepo = factory.getCategoryRepository();
    const categories = await categoryRepo.getAllCategories();
    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json();
    // Basic validation
    if (!categoryData.name) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required field: name",
        },
        { status: 400 },
      );
    }
    const factory = getRepositoryFactory();
    const categoryRepo = factory.getCategoryRepository();
    const newCategory = await categoryRepo.createCategory({
      name: categoryData.name,
      description: categoryData.description || "",
    });
    return NextResponse.json({
      success: true,
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
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
