import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: pathId } = await params;

    if (!pathId) {
      return NextResponse.json(
        { error: "Learning path ID is required" },
        { status: 400 },
      );
    }

    // For now, return mock resources data
    // TODO: Implement actual database queries when resources are stored in Firebase
    const mockResources = [
      {
        id: "1",
        title: "Complete Guide to Frontend Development",
        url: "https://example.com/frontend-guide",
        type: "documentation",
        description:
          "Comprehensive documentation covering all aspects of frontend development",
        difficulty: "beginner",
        estimatedTime: 120,
      },
      {
        id: "2",
        title: "JavaScript Fundamentals Video Series",
        url: "https://example.com/js-fundamentals",
        type: "video",
        description:
          "Learn JavaScript from scratch with this comprehensive video series",
        difficulty: "beginner",
        estimatedTime: 180,
      },
      {
        id: "3",
        title: "React Best Practices Tutorial",
        url: "https://example.com/react-best-practices",
        type: "tutorial",
        description: "Master React with industry best practices and patterns",
        difficulty: "intermediate",
        estimatedTime: 90,
      },
      {
        id: "4",
        title: "CSS Grid Layout Examples",
        url: "https://example.com/css-grid-examples",
        type: "code",
        description: "Practical CSS Grid examples and code snippets",
        difficulty: "intermediate",
        estimatedTime: 60,
      },
      {
        id: "5",
        title: "Advanced Frontend Architecture Patterns",
        url: "https://example.com/advanced-patterns",
        type: "article",
        description:
          "Deep dive into advanced frontend architecture and design patterns",
        difficulty: "advanced",
        estimatedTime: 150,
      },
    ];

    // Filter resources based on learning path (for now, return all)
    // TODO: Implement proper filtering based on learning path ID
    const _resources = mockResources;

    return NextResponse.json(mockResources);
  } catch (error) {
    console.error("Error fetching learning path resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: pathId } = await params;
    const body = await request.json();

    if (!pathId) {
      return NextResponse.json(
        { error: "Learning path ID is required" },
        { status: 400 },
      );
    }

    // TODO: Implement resource creation in Firebase
    // For now, return a mock response
    const newResource = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Error creating learning path resource:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 },
    );
  }
}
