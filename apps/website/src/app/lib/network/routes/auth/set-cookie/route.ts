import { NextRequest, NextResponse } from "next/server";
import { verifySupabaseToken } from "../../../../server-auth";

function sanitizeForLog(value: unknown): string {
  const raw =
    typeof value === "string"
      ? value
      : (() => {
          try {
            return JSON.stringify(value);
          } catch {
            return "[unserializable]";
          }
        })();

  return raw.split("\r").join(" ").split("\n").join(" ").slice(0, 500);
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Authorization Bearer token is required" },
        { status: 400 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
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
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
