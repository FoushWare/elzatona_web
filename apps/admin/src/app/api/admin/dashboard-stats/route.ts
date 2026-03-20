import { NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

function getCollectionCount(result: unknown): number {
  if (Array.isArray(result)) {
    return result.length;
  }

  if (result && typeof result === "object") {
    const paginated = result as {
      meta?: { total?: number };
      data?: unknown[];
      total?: number;
    };

    if (typeof paginated.meta?.total === "number") {
      return paginated.meta.total;
    }

    if (Array.isArray(paginated.data)) {
      return paginated.data.length;
    }

    if (typeof paginated.total === "number") {
      return paginated.total;
    }
  }

  return 0;
}

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const planRepo = factory.getPlanRepository();
    const categoryRepo = factory.getCategoryRepository();
    const topicRepo = factory.getTopicRepository();
    const learningCardRepo = factory.getLearningCardRepository();
    const userRepo = factory.getUserRepository();

    const [
      questions,
      plansResult,
      categoriesResult,
      topicsResult,
      cardsResult,
      adminsResult,
    ] = await Promise.all([
      questionRepo.count(),
      planRepo.findAll({ limit: 1, offset: 0 }),
      categoryRepo.getAllCategories(),
      topicRepo.getAllTopics(),
      learningCardRepo.findAll({ limit: 1, offset: 0 }),
      userRepo.findByRole("admin", { limit: 1, offset: 0 }),
    ]);

    const stats = {
      questions,
      categories: getCollectionCount(categoriesResult),
      topics: getCollectionCount(topicsResult),
      cards: getCollectionCount(cardsResult),
      learningPlans: getCollectionCount(plansResult),
      admins: getCollectionCount(adminsResult),
      totalTasks: 0,
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
