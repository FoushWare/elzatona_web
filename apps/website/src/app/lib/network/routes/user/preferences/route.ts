import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySupabaseToken } from "../../../../server-auth";
import { UserPreferences } from "@elzatona/types";
import { sanitizeObjectServer } from "../../../../sanitize-server";
import { getSupabaseClient } from "../../../../get-supabase-client";

export async function GET(_request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 },
      );
    }

    // Get user data from Supabase
    const supabase = getSupabaseClient();
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decodedToken.id)
      .single();

    if (error || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      preferences: userData.preferences,
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 },
      );
    }

    const preferences: Partial<UserPreferences> = await request.json();

    // Validate preferences data
    if (!preferences) {
      return NextResponse.json(
        { error: "Preferences data is required" },
        { status: 400 },
      );
    }

    // Sanitize preferences data
    const sanitizedPreferences = sanitizeObjectServer(preferences);

    // Update user preferences in Supabase
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("users")
      .update({
        preferences: sanitizedPreferences,
        updated_at: new Date().toISOString(),
      })
      .eq("id", decodedToken.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
