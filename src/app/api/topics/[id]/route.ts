// Individual Topic API Route
// v1.0 - Handle individual topic operations (GET, PUT, DELETE)

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';

// Placeholder EnhancedQuestionService
class EnhancedQuestionService {
  static async getTopic(topicId: string): Promise<any> {
    // Placeholder implementation
    console.log('Getting topic:', topicId);
    return null;
  }

  static async updateTopic(topicId: string, updateData: any): Promise<any> {
    // Placeholder implementation
    console.log('Updating topic:', topicId, updateData);
    return { id: topicId, ...updateData };
  }

  static async deleteTopic(topicId: string): Promise<boolean> {
    // Placeholder implementation
    console.log('Deleting topic:', topicId);
    return true;
  }
}

// GET /api/topics/[id] - Get a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;
    const topic = await EnhancedQuestionService.getTopic(topicId);

    if (!topic) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch topic',
      },
      { status: 500 }
    );
  }
}

// PUT /api/topics/[id] - Update a topic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;
    const updateData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'difficulty'];
    for (const field of requiredFields) {
      if (!updateData[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const updatedTopic = await EnhancedQuestionService.updateTopic(
      topicId,
      updateData
    );

    if (!updatedTopic) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedTopic,
      message: 'Topic updated successfully',
    });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update topic',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/topics/[id] - Delete a topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;
    const deleted = await EnhancedQuestionService.deleteTopic(topicId);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete topic',
      },
      { status: 500 }
    );
  }
}
