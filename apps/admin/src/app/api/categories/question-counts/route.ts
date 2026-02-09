import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const categoryRepo = factory.getCategoryRepository();
    const questionRepo = factory.getQuestionRepository();

    const categories = await categoryRepo.getAllCategories();

    // Get question counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        try {
          const questions = await questionRepo.findByCategory(category.id);
          return {
            id: category.id,
            name: category.name,
            description: category.description,
            questionCount: questions?.length || 0,
          };
        } catch (error) {
          console.error(
            `Error getting questions for category ${category.id}:`,
            error,
          );
          return {
            id: category.id,
            name: category.name,
            description: category.description,
            questionCount: 0,
          };
        }
      }),
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch category question counts",
      },
      { status: 500 },
    );
  }
}
