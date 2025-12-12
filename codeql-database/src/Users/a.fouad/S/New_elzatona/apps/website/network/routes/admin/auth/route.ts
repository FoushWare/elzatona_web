import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import {
  getSupabaseConfig,
  logApiConfig,
} from "../../../../lib/utils/api-config";

// Log API configuration on module load (for debugging)
logApiConfig("Admin Auth API");

// Admin config - using environment variables directly
// Note: JWT secret is read at runtime to support test environments
const adminConfig = {
  security: {
    // Use BCRYPT_SALT_ROUNDS from environment, default to 10 if not set
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
    sessionTimeout: 24 * 60 * 60 * 1000,
  },
  get jwtSecret() {
    return process.env.JWT_SECRET || "default-secret";
  },
};

// Get Supabase client using centralized configuration
// This ensures the correct environment (test/production) is used
function getSupabaseClient() {
  const config = getSupabaseConfig();
  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (_jsonError) {
      // Handle invalid JSON
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Check if JWT_SECRET is set (not using fallback)
    const jwtSecret = adminConfig.jwtSecret;
    if (
      !process.env.JWT_SECRET ||
      jwtSecret === "dev-secret-key-change-in-production"
    ) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Get Supabase client (uses correct environment config)
    const supabase = getSupabaseClient();
    const config = getSupabaseConfig();

    // Debug logging for all environments (to help diagnose issues)
    console.log("[Admin Auth API] 🔍 Debug Info:");
    console.log("[Admin Auth API] 📋 Supabase URL:", config.url);
    console.log(
      "[Admin Auth API] 🔑 Service Role Key Project:",
      config.serviceRoleKey
        ? (() => {
            try {
              const parts = config.serviceRoleKey.split(".");
              const payload = JSON.parse(
                Buffer.from(parts[1], "base64").toString(),
              );
              return payload.ref;
            } catch {
              return "unknown";
            }
          })()
        : "missing",
    );
    console.log("[Admin Auth API] 🔍 Looking for admin email:", email);

    // Debug logging for test environment
    if (
      process.env.APP_ENV === "test" ||
      process.env.NEXT_PUBLIC_APP_ENV === "test"
    ) {
      console.log("[Admin Auth API] 🧪 TEST MODE");
      console.log("[Admin Auth API] 📋 Supabase URL:", config.url);
      console.log(
        "[Admin Auth API] 🔑 Service Role Key Project:",
        config.serviceRoleKey
          ? (() => {
              try {
                const parts = config.serviceRoleKey.split(".");
                const payload = JSON.parse(
                  Buffer.from(parts[1], "base64").toString(),
                );
                return payload.ref;
              } catch {
                return "unknown";
              }
            })()
          : "missing",
      );
      console.log("[Admin Auth API] 🔍 Looking for admin email:", email);
    }

    // Query admin from Supabase
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    // Debug logging for all environments
    if (error) {
      console.log(
        "[Admin Auth API] ❌ Database error:",
        error.message,
        error.code,
      );
    } else if (!adminData) {
      console.log("[Admin Auth API] ⚠️  No admin found with email:", email);
    } else {
      console.log(
        "[Admin Auth API] ✅ Admin found:",
        adminData.email,
        "Active:",
        adminData.is_active,
      );
    }

    if (error || !adminData) {
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

    // Verify password
    // ⚠️ SECURITY: Never log password or password verification details in production
    const isValidPassword = await bcrypt.compare(
      password,
      adminData.password_hash,
    );
    if (!isValidPassword) {
      // Only log in test/dev environments for debugging
      if (
        process.env.APP_ENV === "test" ||
        process.env.NEXT_PUBLIC_APP_ENV === "test"
      ) {
        console.log("[Admin Auth API] ❌ Password comparison failed");
      }
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
      token: token,
      expiresAt: expiresAt.toISOString(),
    };

    return NextResponse.json({ success: true, admin: session });
  } catch (error) {
    console.error("Admin authentication error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
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
    console.error("Token verification error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 },
    );
  }
}
