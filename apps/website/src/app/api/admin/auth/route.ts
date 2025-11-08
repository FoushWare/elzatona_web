import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
// Admin config - using environment variables directly
// Note: JWT secret is read at runtime to support test environments
const adminConfig = {
  security: {
    saltRounds: 10,
    sessionTimeout: 24 * 60 * 60 * 1000,
  },
  get jwtSecret() {
    return process.env.JWT_SECRET || 'default-secret';
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (_jsonError) {
      // Handle invalid JSON
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if JWT_SECRET is set (not using fallback)
    const jwtSecret = adminConfig.jwtSecret;
    if (
      !process.env.JWT_SECRET ||
      jwtSecret === 'dev-secret-key-change-in-production'
    ) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Query admin from Supabase
    const { data: adminData, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !adminData) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!adminData.is_active) {
      return NextResponse.json(
        { success: false, error: 'Admin account is deactivated' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      adminData.password_hash
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const expiresAt = new Date();
    expiresAt.setTime(
      expiresAt.getTime() + adminConfig.security.sessionTimeout
    );

    const token = jwt.sign(
      {
        adminId: adminData.id,
        email: adminData.email,
        role: adminData.role,
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    const session = {
      id: adminData.id,
      email: adminData.email,
      name: adminData.name,
      role: adminData.role,
      token: token,
      expiresAt: expiresAt.toISOString(),
    };

    return NextResponse.json({ success: true, admin: session });
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token (read secret at runtime)
    const jwtSecret = adminConfig.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret) as {
      adminId: string;
      email: string;
      role: string;
    };

    return NextResponse.json({
      success: true,
      admin: {
        id: decoded.adminId,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}
