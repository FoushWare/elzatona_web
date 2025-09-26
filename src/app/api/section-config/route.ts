// Section Configuration API Route
// v2.0 - Admin configuration for section limits

import { NextRequest, NextResponse } from 'next/server';
import { EnhancedQuestionService, SectionConfig } from '@/lib/enhanced-question-schema';

// GET /api/section-config - Get section configuration
export async function GET() {
  try {
    const config = await EnhancedQuestionService.getSectionConfig();

    if (!config) {
      // Initialize default config if none exists
      await EnhancedQuestionService.initializeSectionConfig();
      const newConfig = await EnhancedQuestionService.getSectionConfig();
      
      return NextResponse.json({
        success: true,
        data: newConfig
      });
    }

    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error fetching section config:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch section configuration'
      },
      { status: 500 }
    );
  }
}

// PUT /api/section-config - Update section configuration
export async function PUT(request: NextRequest) {
  try {
    const configData = await request.json();

    // Validate configuration data
    const { defaultQuestionLimit, maxQuestionLimit, minQuestionLimit, allowOverflow } = configData;

    if (defaultQuestionLimit && (defaultQuestionLimit < 1 || defaultQuestionLimit > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Default question limit must be between 1 and 100'
        },
        { status: 400 }
      );
    }

    if (maxQuestionLimit && (maxQuestionLimit < 1 || maxQuestionLimit > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Max question limit must be between 1 and 100'
        },
        { status: 400 }
      );
    }

    if (minQuestionLimit && (minQuestionLimit < 1 || minQuestionLimit > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Min question limit must be between 1 and 100'
        },
        { status: 400 }
      );
    }

    if (minQuestionLimit && maxQuestionLimit && minQuestionLimit > maxQuestionLimit) {
      return NextResponse.json(
        {
          success: false,
          error: 'Min question limit cannot be greater than max question limit'
        },
        { status: 400 }
      );
    }

    await EnhancedQuestionService.updateSectionConfig(configData);

    return NextResponse.json({
      success: true,
      message: 'Section configuration updated successfully'
    });
  } catch (error) {
    console.error('Error updating section config:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update section configuration'
      },
      { status: 500 }
    );
  }
}
