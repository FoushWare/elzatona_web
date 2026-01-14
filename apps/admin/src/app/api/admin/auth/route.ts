import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Admin config - using environment variables directly
const adminConfig = {
  security: {
    saltRounds: Number.parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
    sessionTimeout: 24 * 60 * 60 * 1000,
  },
  get jwtSecret() {
    return process.env.JWT_SECRET || "default-secret";
  },
};

// Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    const jwtSecret = adminConfig.jwtSecret;
    if (!process.env.JWT_SECRET || jwtSecret === "default-secret") {
      // Log warning but allow if in development
      console.warn("[Admin Auth API] ⚠️ Using default or missing JWT_SECRET");
    }

    const supabase = getSupabaseClient();

    // Query admin from admin_users table (custom auth)
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !adminData) {
      console.log(
        `[Admin Auth API] ❌ No admin found or DB error for ${email}`,
      );
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Check if admin is active
    if (!adminData.is_active) {
      return NextResponse.json(
        { success: false, error: "Admin account is deactivated" },
        { status: 401 },
      );
    }

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(
      password,
      adminData.password_hash,
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Create JWT token
    const expiresAt = new Date();
    expiresAt.setTime(
      expiresAt.getTime() + adminConfig.security.sessionTimeout,
    );

    const token = jwt.sign(
      {
        adminId: adminData.id,
        email: adminData.email,
        role: adminData.role,
      },
      jwtSecret,
      { expiresIn: "24h" },
    );

    const session = {
      id: adminData.id,
      email: adminData.email,
      name: adminData.name,
      role: adminData.role,
      token: token, // Note: The frontend expects this token if it uses it for subsequent requests
      expiresAt: expiresAt.toISOString(),
    };

    return NextResponse.json({ success: true, admin: session });
  } catch (error) {
    console.error("[Admin Auth API] 💥 Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
      );
    }

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
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
