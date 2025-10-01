// Sections API Route
// v2.0 - Enhanced section management

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';

// GET /api/sections - Get all sections
export async function GET() {
  try {
    const snapshot = await db.collection('sections').get();
    const sections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: sections,
      count: sections.length,
    });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sections',
      },
      { status: 500 }
    );
  }
}

// POST /api/sections - Create a new section
export async function POST(request: NextRequest) {
  try {
    const sectionData = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'description',
      'learningPath',
      'questionLimit',
    ];
    for (const field of requiredFields) {
      if (!sectionData[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // Validate question limit
    if (sectionData.questionLimit < 1 || sectionData.questionLimit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question limit must be between 1 and 100',
        },
        { status: 400 }
      );
    }

    const docRef = db.collection('sections').doc();
    const sectionWithTimestamps = {
      ...sectionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(sectionWithTimestamps);
    const sectionId = docRef.id;

    return NextResponse.json({
      success: true,
      data: { id: sectionId },
      message: 'Section created successfully',
    });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to create section',
      },
      { status: 500 }
    );
  }
}
