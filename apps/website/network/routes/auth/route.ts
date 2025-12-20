import { NextRequest, NextResponse } from "next/server";
import { UserAuthService } from "../../../lib/user-auth";
// Empty import removed
import {
  validateAndSanitize,
  registerSchema,
  loginSchema,
} from "../../../lib/utils/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role, action } = body;

    // Validate required fields first
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Validate action parameter against allowed values
    const allowedActions = ['login', 'register'];
    if (!action || typeof action !== 'string' || !allowedActions.includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'login' or 'register'" },
        { status: 400 },
      );
    }

    // Explicitly check for action parameter instead of relying on user-controlled name
    if (action === "register") {
      // Validate and sanitize registration data
      const validationResult = validateAndSanitize(registerSchema, {
        email,
        password,
        name: name || "", // Ensure name is provided for registration
        role: "user",
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
    } else if (action === "login") {
      // This is a login request - action is already validated above
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
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'login' or 'register'" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
