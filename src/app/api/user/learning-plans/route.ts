import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyFirebaseToken } from '@/lib/server-auth';
import { firestoreService } from '@/lib/firestore-service';
import { LearningPlanProgress } from '@/types/firestore';

export async function GET(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifyFirebaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');

    if (planId) {
      // Get specific learning plan
      const plan = await firestoreService.getLearningPlan(
        decodedToken.uid,
        planId
      );

      if (!plan) {
        return NextResponse.json(
          { error: 'Learning plan not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        plan,
      });
    } else {
      // Get all learning plans for user
      const userData = await firestoreService.getUser(decodedToken.uid);

      if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        plans: userData.learningPlans,
      });
    }
  } catch (error) {
    console.error('Error fetching learning plans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifyFirebaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const planData: LearningPlanProgress = await request.json();

    // Validate plan data
    if (!planData.planId || !planData.planName) {
      return NextResponse.json(
        { error: 'Plan ID and name are required' },
        { status: 400 }
      );
    }

    // Start new learning plan
    await firestoreService.startLearningPlan(decodedToken.uid, planData);

    return NextResponse.json({
      success: true,
      message: 'Learning plan started successfully',
      planId: planData.planId,
    });
  } catch (error) {
    console.error('Error starting learning plan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifyFirebaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    const updates: Partial<LearningPlanProgress> = await request.json();

    // Update learning plan
    await firestoreService.updateLearningPlan(
      decodedToken.uid,
      planId,
      updates
    );

    return NextResponse.json({
      success: true,
      message: 'Learning plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating learning plan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
