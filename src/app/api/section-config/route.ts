// Section Configuration API Route
// v2.0 - Admin configuration for section limits

import { NextRequest, NextResponse } from 'next/server';

// GET /api/section-config - Get section configuration
export async function GET() {
  try {
    // Return default config since we cleared all data
    const config = { maxQuestionsPerSection: 15, allowOverflow: false };

    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error fetching section config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch section config' },
      { status: 500 }
    );
  }
}