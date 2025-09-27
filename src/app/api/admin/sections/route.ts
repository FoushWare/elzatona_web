import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const sectionsRef = collection(db, 'sections');
    const q = query(sectionsRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    
    const sections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sections'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const body = await request.json();
    const { name, description, category, difficulty, estimatedTime, order, isActive } = body;

    if (!name || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and category are required'
        },
        { status: 400 }
      );
    }

    const sectionData = {
      name,
      description: description || '',
      category,
      difficulty: difficulty || 'beginner',
      estimatedTime: estimatedTime || '',
      order: order || 1,
      isActive: isActive !== false,
      questionCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'sections'), sectionData);

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...sectionData,
        createdAt: sectionData.createdAt.toISOString(),
        updatedAt: sectionData.updatedAt.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create section'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const body = await request.json();
    const { sectionId, updates } = body;

    if (!sectionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section ID is required'
        },
        { status: 400 }
      );
    }

    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    const sectionRef = doc(db, 'sections', sectionId);
    await updateDoc(sectionRef, updateData);

    return NextResponse.json({
      success: true,
      data: {
        id: sectionId,
        ...updates,
        updatedAt: updateData.updatedAt.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update section'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const body = await request.json();
    const { sectionId } = body;

    if (!sectionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section ID is required'
        },
        { status: 400 }
      );
    }

    const sectionRef = doc(db, 'sections', sectionId);
    await deleteDoc(sectionRef);

    return NextResponse.json({
      success: true,
      message: 'Section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete section'
      },
      { status: 500 }
    );
  }
}