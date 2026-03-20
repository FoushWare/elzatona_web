import { NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const planRepo = factory.getPlanRepository();
    const plans = await planRepo.findAll({
      limit: 500,
      offset: 0,
      orderBy: "created_at",
      orderDirection: "desc",
    });

    let planData: unknown[] = [];
    if (Array.isArray(plans?.data)) {
      planData = plans.data;
    } else if (Array.isArray((plans as { items?: unknown[] }).items)) {
      planData = (plans as { items?: unknown[] }).items ?? [];
    }

    return NextResponse.json({
      success: true,
      data: planData,
      count: planData.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch plans",
      },
      { status: 500 },
    );
  }
}
