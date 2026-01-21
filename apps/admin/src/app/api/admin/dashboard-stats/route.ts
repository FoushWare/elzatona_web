import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET(request: NextRequest) {
  try {
    // Use RepositoryFactory to get repository instances
    const factory = getRepositoryFactory();
    const questionRepository = factory.getQuestionRepository();
    const planRepository = factory.getPlanRepository();
    const cardRepository = factory.getLearningCardRepository();

    // Fetch counts for all entities using repositories
    const [questions, plans, cards] = await Promise.all([
      questionRepository.findAll(),
      planRepository.findAll(),
      cardRepository.findAll(),
    ]);

    const stats = {
      questions: questions?.length || 0,
      categories: 0, // TODO: Implement category repository
      topics: 0, // TODO: Implement topic repository
      cards: cards?.length || 0,
      learningPlans: plans?.length || 0,
      admins: 0, // TODO: Implement admin repository or user repository with admin filter
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
