// Sections API Route
// v2.0 - Enhanced section management

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/sections - Get all sections
export async function GET() {
  try {
    const { data: sectionsData, error } = await supabase
      .from('sections')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      throw error;
    }

    const sections = sectionsData || [];

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
      'learning_path',
      'question_limit',
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
    if (sectionData.question_limit < 1 || sectionData.question_limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question limit must be between 1 and 100',
        },
        { status: 400 }
      );
    }

    const sectionWithTimestamps = {
      ...sectionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newSection, error } = await supabase
      .from('sections')
      .insert(sectionWithTimestamps)
      .select()
      .single();

    if (error) {
      throw error;
    }

    const sectionId = newSection.id;

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
