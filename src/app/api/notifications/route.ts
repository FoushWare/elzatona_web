import { NextRequest, NextResponse } from 'next/server';
import { NotificationService } from '@/lib/notification-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const adminId = searchParams.get('adminId');
    const limit = parseInt(searchParams.get('limit') || '50');

    let notifications;
    if (userId) {
      notifications = await NotificationService.getUserNotifications(
        userId,
        limit
      );
    } else if (adminId) {
      notifications = await NotificationService.getAdminNotifications(
        adminId,
        limit
      );
    } else {
      notifications = await NotificationService.getSystemNotifications(limit);
    }

    return NextResponse.json({
      success: true,
      notifications,
      count: notifications.length,
      unreadCount: notifications.filter(n => !n.isRead).length,
    });
  } catch (error) {
    console.error('Get notifications API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, message, type, category, userId, adminId, metadata } =
      await request.json();

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const notificationId = await NotificationService.createNotification(
      title,
      message,
      type || 'info',
      category || 'system',
      { userId, adminId, metadata }
    );

    return NextResponse.json({
      success: true,
      notificationId,
      message: 'Notification created successfully',
    });
  } catch (error) {
    console.error('Create notification API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { notificationId, action } = await request.json();

    if (!notificationId || !action) {
      return NextResponse.json(
        { success: false, error: 'Notification ID and action are required' },
        { status: 400 }
      );
    }

    let success = false;

    switch (action) {
      case 'markAsRead':
        try {
          await NotificationService.markAsRead(notificationId);
          success = true;
        } catch (error) {
          success = false;
        }
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Notification updated successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update notification' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Update notification API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
