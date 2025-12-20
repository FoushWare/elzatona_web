import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getSupabaseConfig } from "../../../../lib/utils/api-config";

/**
 * Protected Admin Creation API
 *
 * Only the owner (super_admin) can create regular admin users
 * Regular admins cannot create other admins
 *
 * Authentication: Requires valid JWT token with role='super_admin' OR
 *                 email matches ADMIN_OWNER_EMAIL from environment
 */

// Get salt rounds from environment (default: 10)
const getSaltRounds = () =>
  parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

// Get owner email from environment
const getOwnerEmail = () => process.env.ADMIN_OWNER_EMAIL || "";

// Get JWT secret
const getJwtSecret = () => process.env.JWT_SECRET || "default-secret";

// Get Supabase client
function getSupabaseClient() {
  const config = getSupabaseConfig();
  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Verify that the requester is the owner (super_admin)
 */
async function verifyOwner(
  request: NextRequest,
): Promise<{ isValid: boolean; email?: string; error?: string }> {
  try {
    // Get JWT token from Authorization header
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return { isValid: false, error: "No authentication token provided" };
    }

    // Verify JWT token
    const jwtSecret = getJwtSecret();
    let decoded: { adminId: string; email: string; role: string };

    try {
      decoded = jwt.verify(token, jwtSecret) as {
        adminId: string;
        email: string;
        role: string;
      };
    } catch (_jwtError) {
      return { isValid: false, error: "Invalid or expired token" };
    }

    // Check if user is super_admin
    if (decoded.role !== "super_admin") {
      return {
        isValid: false,
        error: "Only super_admin can create admin users",
      };
    }

    // Additional check: verify email matches owner email if ADMIN_OWNER_EMAIL is set
    const ownerEmail = getOwnerEmail();
    if (ownerEmail && decoded.email !== ownerEmail) {
      return {
        isValid: false,
        error: "Unauthorized: Email does not match owner",
      };
    }

    return { isValid: true, email: decoded.email };
  } catch (error) {
    console.error("Error verifying owner:", error);
    return { isValid: false, error: "Authentication error" };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Verify owner authentication
    const ownerCheck = await verifyOwner(request);
    if (!ownerCheck.isValid) {
      return NextResponse.json(
        { success: false, error: ownerCheck.error || "Unauthorized" },
        { status: 401 },
      );
    }

    console.log(`[Admin Create API] ✅ Owner verified: ${ownerCheck.email}`);

    // Step 2: Parse request body
    let body;
    try {
      body = await request.json();
    } catch (_jsonError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { email, password, name } = body;

    // Step 3: Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Email, password, and name are required" },
        { status: 400 },
      );
    }

    // Validate email format - use safe regex without ReDoS vulnerability
    // Safe email validation that avoids catastrophic backtracking
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 8 characters long",
        },
        { status: 400 },
      );
    }

    // Step 4: Get Supabase client
    const supabase = getSupabaseClient();

    // Step 5: Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from("admin_users")
      .select("email")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error(
        "[Admin Create API] Error checking existing admin:",
        checkError,
      );
      return NextResponse.json(
        { success: false, error: "Database error" },
        { status: 500 },
      );
    }

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: "Admin with this email already exists" },
        { status: 409 },
      );
    }

    // Step 6: Hash password
    const saltRounds = getSaltRounds();
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Step 7: Create admin user (role='admin', NOT 'super_admin')
    const { data: newAdmin, error: insertError } = await supabase
      .from("admin_users")
      .insert({
        email: email,
        password_hash: passwordHash,
        name: name,
        role: "admin", // Regular admin, not super_admin
        is_active: true,
        permissions: {
          can_manage_users: false, // Regular admins can't manage users
          can_manage_content: true,
          can_view_analytics: true,
          can_manage_settings: false, // Regular admins can't manage settings
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("[Admin Create API] Error creating admin:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to create admin user" },
        { status: 500 },
      );
    }

    console.log(
      `[Admin Create API] ✅ Admin created: ${email} by ${ownerCheck.email}`,
    );

    // Return success (don't return password hash)
    return NextResponse.json({
      success: true,
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        is_active: newAdmin.is_active,
        created_at: newAdmin.created_at,
      },
    });
  } catch (error) {
    console.error("[Admin Create API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
