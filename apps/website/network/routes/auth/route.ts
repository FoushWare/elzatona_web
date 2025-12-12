import { NextRequest, NextResponse } from "next/server";
import { UserAuthService } from "@/lib/user-auth";
import {} from "@/lib/utils/sanitize-server";
import {
  validateAndSanitize,
  registerSchema,
  loginSchema,
} from "@/lib/utils/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    // If name is provided, this is a registration request
    if (name) {
      // Validate and sanitize registration data
      const validationResult = validateAndSanitize(registerSchema, {
        email,
        password,
        name,
        role: role || "user",
      });

      if (!validationResult.success) {
        return NextResponse.json(
          { success: false, error: validationResult.error },
          { status: 400 },
        );
      }

      const result = await UserAuthService.registerUser(
        validationResult.data.email,
        validationResult.data.password,
        validationResult.data.name,
        validationResult.data.role,
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          message: "User registered successfully",
          userId: result.userId,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 },
        );
      }
    } else {
      // This is a login request
      // Validate and sanitize login data
      const validationResult = validateAndSanitize(loginSchema, {
        email,
        password,
      });

      if (!validationResult.success) {
        return NextResponse.json(
          { success: false, error: validationResult.error },
          { status: 400 },
        );
      }

      const result = await UserAuthService.authenticateUser(
        validationResult.data.email,
        validationResult.data.password,
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          user: result.user,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 401 },
        );
      }
    }
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
