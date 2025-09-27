import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { sectionId } = params;

    const sectionRef = doc(db, 'sections', sectionId);
    const sectionDoc = await getDoc(sectionRef);

    if (!sectionDoc.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section not found'
        },
        { status: 404 }
      );
    }

    const sectionData = sectionDoc.data();
    const section = {
      id: sectionDoc.id,
      ...sectionData,
      createdAt: sectionData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: sectionData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: section
    });
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch section'
      },
      { status: 500 }
    );
  }
}
