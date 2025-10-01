import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export interface LearningCartItem {
  id: string;
  userId: string;
  questionId: string;
  question: string;
  category: string;
  topic: string;
  learningPath: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'single' | 'multiple' | 'conceptual' | 'code';
  addedAt: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number; // in minutes
  tags: string[];
}

export interface LearningCart {
  id: string;
  userId: string;
  items: LearningCartItem[];
  totalQuestions: number;
  estimatedTime: number;
  categories: string[];
  topics: string[];
  learningPaths: string[];
  createdAt: string;
  updatedAt: string;
}

// Add item to learning cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      questionId,
      question,
      category,
      topic,
      learningPath,
      difficulty,
      type,
      priority = 'medium',
      estimatedTime = 5,
      tags = [],
    } = body;

    if (!userId || !questionId || !question || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if item already exists in cart
    const existingCartQuery = query(
      collection(db, 'learningCarts'),
      where('userId', '==', userId)
    );
    const existingCartSnapshot = await getDocs(existingCartQuery);

    let cartId: string;
    let cart: LearningCart;

    if (existingCartSnapshot.empty) {
      // Create new cart
      const newCart: Omit<LearningCart, 'id'> = {
        userId,
        items: [],
        totalQuestions: 0,
        estimatedTime: 0,
        categories: [],
        topics: [],
        learningPaths: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const cartRef = await addDoc(collection(db, 'learningCarts'), newCart);
      cartId = cartRef.id;
      cart = { id: cartId, ...newCart };
    } else {
      // Use existing cart
      const cartDoc = existingCartSnapshot.docs[0];
      cartId = cartDoc.id;
      cart = { id: cartId, ...cartDoc.data() } as LearningCart;
    }

    // Check if question already in cart
    const existingItem = cart.items.find(
      item => item.questionId === questionId
    );
    if (existingItem) {
      return NextResponse.json(
        { error: 'Question already in cart' },
        { status: 400 }
      );
    }

    // Add new item
    const newItem: LearningCartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      questionId,
      question,
      category,
      topic: topic || 'General',
      learningPath: learningPath || 'General',
      difficulty: difficulty || 'medium',
      type: type || 'conceptual',
      addedAt: new Date().toISOString(),
      priority,
      estimatedTime,
      tags,
    };

    const updatedItems = [...cart.items, newItem];
    const updatedCategories = [...new Set([...cart.categories, category])];
    const updatedTopics = [...new Set([...cart.topics, topic || 'General'])];
    const updatedLearningPaths = [
      ...new Set([...cart.learningPaths, learningPath || 'General']),
    ];

    const updatedCart: Partial<LearningCart> = {
      items: updatedItems,
      totalQuestions: updatedItems.length,
      estimatedTime: updatedItems.reduce(
        (total, item) => total + item.estimatedTime,
        0
      ),
      categories: updatedCategories,
      topics: updatedTopics,
      learningPaths: updatedLearningPaths,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(doc(db, 'learningCarts', cartId), updatedCart);

    return NextResponse.json({
      success: true,
      data: {
        cartId,
        item: newItem,
        cart: { ...cart, ...updatedCart },
      },
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// Get learning cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const cartQuery = query(
      collection(db, 'learningCarts'),
      where('userId', '==', userId)
    );

    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      return NextResponse.json({
        success: true,
        data: {
          id: null,
          userId,
          items: [],
          totalQuestions: 0,
          estimatedTime: 0,
          categories: [],
          topics: [],
          learningPaths: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }

    const cart = cartSnapshot.docs[0];
    return NextResponse.json({
      success: true,
      data: {
        id: cart.id,
        ...cart.data(),
      },
    });
  } catch (error) {
    console.error('Error fetching learning cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning cart' },
      { status: 500 }
    );
  }
}

// Update cart item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, itemId, updates } = body;

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: 'User ID and item ID are required' },
        { status: 400 }
      );
    }

    const cartQuery = query(
      collection(db, 'learningCarts'),
      where('userId', '==', userId)
    );

    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cartDoc = cartSnapshot.docs[0];
    const cart = { id: cartDoc.id, ...cartDoc.data() } as LearningCart;

    const updatedItems = cart.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );

    const updatedCart = {
      ...cart,
      items: updatedItems,
      totalQuestions: updatedItems.length,
      estimatedTime: updatedItems.reduce(
        (total, item) => total + item.estimatedTime,
        0
      ),
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(doc(db, 'learningCarts', cart.id), updatedCart);

    return NextResponse.json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const itemId = searchParams.get('itemId');

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: 'User ID and item ID are required' },
        { status: 400 }
      );
    }

    const cartQuery = query(
      collection(db, 'learningCarts'),
      where('userId', '==', userId)
    );

    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cartDoc = cartSnapshot.docs[0];
    const cart = { id: cartDoc.id, ...cartDoc.data() } as LearningCart;

    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const updatedCategories = [
      ...new Set(updatedItems.map(item => item.category)),
    ];
    const updatedTopics = [...new Set(updatedItems.map(item => item.topic))];
    const updatedLearningPaths = [
      ...new Set(updatedItems.map(item => item.learningPath)),
    ];

    const updatedCart = {
      ...cart,
      items: updatedItems,
      totalQuestions: updatedItems.length,
      estimatedTime: updatedItems.reduce(
        (total, item) => total + item.estimatedTime,
        0
      ),
      categories: updatedCategories,
      topics: updatedTopics,
      learningPaths: updatedLearningPaths,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(doc(db, 'learningCarts', cart.id), updatedCart);

    return NextResponse.json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
