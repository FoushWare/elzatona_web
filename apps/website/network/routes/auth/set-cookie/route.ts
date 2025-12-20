import { NextRequest, NextResponse } from "next/server";
import { verifySupabaseToken } from "../../../../lib/server-auth";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // Validate token input - prevent user-controlled security bypass
    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Sanitize token - remove potential injection characters
    const sanitizedToken = token.trim().replaceAll(/[<>"'&]/g, '');

    // Verify the Supabase token
    const decodedToken = await verifySupabaseToken(sanitizedToken);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Auth cookie set successfully",
    });

    // Set HTTP-only cookie with the Firebase token
    response.cookies.set("firebase_token", token, {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error setting auth cookie:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
