import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface LearningCartItem {
  id: string;
  userId: string;
  question_id: string;
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
  created_at: string;
  updated_at: string;
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
    const { data: existingCart, error: cartError } = await supabase
      .from('learning_carts')
      .select('*')
      .eq('userId', userId)
      .single();

    let cartId: string;
    let cart: LearningCart;

    if (cartError || !existingCart) {
      // Create new cart
      const newCart: Omit<LearningCart, 'id'> = {
        userId,
        items: [],
        totalQuestions: 0,
        estimatedTime: 0,
        categories: [],
        topics: [],
        learningPaths: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: cartData, error: insertError } = await supabase
        .from('learning_carts')
        .insert(newCart)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      cartId = cartData.id;
      cart = { id: cartId, ...newCart };
    } else {
      // Use existing cart
      cartId = existingCart.id;
      cart = { id: cartId, ...existingCart } as LearningCart;
    }

    // Check if question already in cart
    const existingItem = cart.items.find(
      item => item.question_id === questionId
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
      question_id: questionId,
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
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('learning_carts')
      .update(updatedCart)
      .eq('id', cartId);

    if (updateError) {
      throw updateError;
    }

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

    const { data: cartData, error: cartError } = await supabase
      .from('learning_carts')
      .select('*')
      .eq('userId', userId)
      .single();

    if (cartError || !cartData) {
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: cartData.id,
        ...cartData,
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

    const { data: cartData, error: cartError } = await supabase
      .from('learning_carts')
      .select('*')
      .eq('userId', userId)
      .single();

    if (cartError || !cartData) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cart = { id: cartData.id, ...cartData } as LearningCart;

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
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('learning_carts')
      .update(updatedCart)
      .eq('id', cart.id);

    if (updateError) {
      throw updateError;
    }

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

    const { data: cartData, error: cartError } = await supabase
      .from('learning_carts')
      .select('*')
      .eq('userId', userId)
      .single();

    if (cartError || !cartData) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cart = { id: cartData.id, ...cartData } as LearningCart;

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
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('learning_carts')
      .update(updatedCart)
      .eq('id', cart.id);

    if (updateError) {
      throw updateError;
    }

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
