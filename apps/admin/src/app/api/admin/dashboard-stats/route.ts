import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    // Use RepositoryFactory to get repository instances
    const factory = getRepositoryFactory();
    const questionRepository = factory.getQuestionRepository();
    const planRepository = factory.getPlanRepository();
    const cardRepository = factory.getLearningCardRepository();
    const categoryRepository = factory.getCategoryRepository();
    const topicRepository = factory.getTopicRepository();
    const userRepository = factory.getUserRepository();

    // Fetch counts for all entities using repositories
    const [questions, plans, cards, categories, topics, admins] =
      await Promise.all([
        questionRepository.findAll(),
        planRepository.findAll(),
        cardRepository.findAll(),
        categoryRepository.getAllCategories(),
        topicRepository.getAllTopics(),
        userRepository.findByRole("admin"),
      ]);

    const stats = {
      // PaginatedResult<T> may provide length, items, or data
      questions:
        (questions as any)?.length ??
        (questions as any)?.items?.length ??
        (questions as any)?.data?.length ??
        0,
      categories:
        (categories as any)?.length ??
        (categories as any)?.items?.length ??
        (categories as any)?.data?.length ??
        (Array.isArray(categories) ? (categories as any).length : 0),
      topics: (topics as any)?.length ?? 0,
      cards:
        (cards as any)?.length ??
        (cards as any)?.items?.length ??
        (cards as any)?.data?.length ??
        0,
      learningPlans:
        (plans as any)?.length ??
        (plans as any)?.items?.length ??
        (plans as any)?.data?.length ??
        0,
      admins: (admins as any)?.total ?? 0,
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
