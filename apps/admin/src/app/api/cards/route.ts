import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const cardRepo = factory.getLearningCardRepository();
    const cards = await cardRepo.findAll();
    return NextResponse.json({
      success: true,
      data: cards,
      count: cards?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch cards",
      },
      { status: 500 },
    );
  }
}
