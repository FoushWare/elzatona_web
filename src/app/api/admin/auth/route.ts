import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { adminConfig } from '@/admin.config';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query admin from Firestore
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const adminsRef = collection(db, adminConfig.database.collectionName);
    const q = query(adminsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const adminDoc = querySnapshot.docs[0];
    const adminData = adminDoc.data();

    // Check if admin is active
    if (!adminData.isActive) {
      return NextResponse.json(
        { success: false, error: 'Admin account is deactivated' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      adminData.passwordHash
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
        adminId: adminDoc.id,
        email: adminData.email,
        role: adminData.role,
      },
      adminConfig.jwt.secret,
      { expiresIn: '24h' }
    );

    const session = {
      id: adminDoc.id,
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

    // Verify JWT token
    const decoded = jwt.verify(token, adminConfig.jwt.secret) as {
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
