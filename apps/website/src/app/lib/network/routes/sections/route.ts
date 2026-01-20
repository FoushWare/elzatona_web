// Sections API Route
// v2.0 - Enhanced section management

import { NextRequest, NextResponse } from "next/server";
import { createRepositoryFactoryFromEnv } from "../../../../../../libs/database/src/repositories/RepositoryFactory";

export async function GET() {
  try {
    const factory = createRepositoryFactoryFromEnv();
    const sectionRepo = factory.getSectionRepository();
    const sections = await sectionRepo.getAllSections();
    return NextResponse.json({
      success: true,
      data: sections,
      count: sections.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch sections",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sectionData = await request.json();
    // Basic validation
    if (!sectionData.name || !sectionData.topicId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required field: name or topicId",
        },
        { status: 400 },
      );
    }
    const factory = createRepositoryFactoryFromEnv();
    const sectionRepo = factory.getSectionRepository();
    const newSection = await sectionRepo.createSection({
      name: sectionData.name,
      topicId: sectionData.topicId,
      description: sectionData.description || "",
    });
    return NextResponse.json({
      success: true,
      data: newSection,
      message: "Section created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create section",
      },
      { status: 500 },
    );
  }
}
