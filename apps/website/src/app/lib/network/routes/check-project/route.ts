import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getSupabaseConfig, getApiConfig } from "../../utils/api-config";
import { getEnvironment } from "../../utils/environment";

// Admin config - using environment variables directly
const adminConfig = {
  get jwtSecret() {
    return process.env.JWT_SECRET || "default-secret";
  },
};

/**
 * API endpoint to check which Supabase project is currently being used
 * Useful for debugging environment configuration
 *
 * SECURITY: This endpoint requires admin authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Admin token required",
        },
        { status: 401 },
      );
    }

    // Verify JWT token
    try {
      const jwtSecret = adminConfig.jwtSecret;
      const decoded = jwt.verify(token, jwtSecret) as {
        adminId?: string;
        id?: string;
        email?: string;
        role?: string;
      };

      // Verify it's an admin token (should have adminId or id and email)
      if (!decoded.adminId && !decoded.id) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Invalid admin token",
          },
          { status: 401 },
        );
      }

      // Log admin access for security auditing
      console.log(
        `[Check Project API] Admin access: ${decoded.email || decoded.adminId || "unknown"}`,
      );
    } catch (error) {
      console.error("[Check Project API] Token verification error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or expired token",
        },
        { status: 401 },
      );
    }

    // Proceed with project check (admin is authenticated)
    const config = getSupabaseConfig();
    const _apiConfig = getApiConfig();
    const env = getEnvironment();

    // Extract project reference from URL
    const urlProjectRef = config.url.match(
      /https?:\/\/([^.]+)\.supabase\.co/,
    )?.[1];

    // Decode service role key to get project reference
    let keyProjectRef = null;
    let keyRole = null;
    if (config.serviceRoleKey) {
      try {
        const jwtParts = config.serviceRoleKey.split(".");
        if (jwtParts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(jwtParts[1], "base64").toString(),
          );
          keyProjectRef = payload.ref;
          keyRole = payload.role;
        }
      } catch (_error) {
        // Invalid JWT
      }
    }

    // Project mappings
    const projects: Record<string, { name: string; type: string }> = {
      kiycimlsatwfqxtfprlr: {
        name: "zatona-web-testing",
        type: "TEST",
      },
      hpnewqkvpnthpohvxcmq: {
        name: "zatona-web",
        type: "PRODUCTION",
      },
      slfyltsmcivmqfloxpmq: {
        name: "zatona-web-testing (old)",
        type: "TEST (OLD)",
      },
      vopfdukvdhnmzzjkxpnj: {
        name: "zatona-web-testing (old)",
        type: "TEST (OLD)",
      },
    };

    const urlProject = projects[urlProjectRef || ""] || {
      name: "unknown",
      type: "UNKNOWN",
    };
    const keyProject = projects[keyProjectRef || ""] || {
      name: "unknown",
      type: "UNKNOWN",
    };

    const isMatch = urlProjectRef === keyProjectRef;
    const isTestProject = urlProjectRef === "kiycimlsatwfqxtfprlr";
    const isProductionProject = urlProjectRef === "hpnewqkvpnthpohvxcmq";

    return NextResponse.json({
      success: true,
      environment: {
        detected: env,
        appEnv: process.env.APP_ENV,
        nextPublicAppEnv: process.env.NEXT_PUBLIC_APP_ENV,
        nodeEnv: process.env.NODE_ENV,
      },
      supabase: {
        url: config.url,
        urlProjectRef: urlProjectRef || "not found",
        urlProjectName: urlProject.name,
        urlProjectType: urlProject.type,
        keyProjectRef: keyProjectRef || "not found",
        keyProjectName: keyProject.name,
        keyProjectType: keyProject.type,
        keyRole: keyRole || "unknown",
        match: isMatch,
      },
      status: {
        isTestProject,
        isProductionProject,
        isCorrectlyConfigured:
          isMatch && (isTestProject || isProductionProject),
        warning: !isMatch
          ? "URL and Service Role Key point to different projects!"
          : null,
      },
      message:
        isMatch && isTestProject
          ? "✅ Using zatona-web-testing (TEST) project correctly"
          : isMatch && isProductionProject
            ? "⚠️ Using zatona-web (PRODUCTION) project"
            : !isMatch
              ? "❌ Configuration mismatch detected"
              : "⚠️ Unknown project configuration",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
