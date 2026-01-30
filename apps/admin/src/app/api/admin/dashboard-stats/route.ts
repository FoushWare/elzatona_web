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
    const [questions, plans, cards, categories, topics, admins] = await Promise.all([
      questionRepository.findAll(),
      planRepository.findAll(),
      cardRepository.findAll(),
      categoryRepository.findAll(),
      topicRepository.getAllTopics(),
      userRepository.findByRole("admin"),
    ]);

    const stats = {
      questions: questions?.length || 0,
      categories: categories?.length || 0,
      topics: topics?.length || 0,
      cards: cards?.length || 0,
      learningPlans: plans?.length || 0,
      admins: admins?.total || 0,
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
