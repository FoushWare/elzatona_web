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

    // Validate and sanitize input first
    const sanitizedEmail = typeof email === "string" ? email.trim() : "";
    const sanitizedPassword = typeof password === "string" ? password : "";
    const sanitizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";

    // Validate required fields first
    if (
      !sanitizedEmail ||
      sanitizedEmail.length === 0 ||
      !sanitizedPassword ||
      sanitizedPassword.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Validate action parameter against allowed values
    const allowedActions = ["login", "register"];
    if (!sanitizedAction || !allowedActions.includes(sanitizedAction)) {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'login' or 'register'" },
        { status: 400 },
      );
    }

    // Explicitly check for action parameter instead of relying on user-controlled name
    if (sanitizedAction === "register") {
      // Validate and sanitize registration data
      const validationResult = validateAndSanitize(registerSchema, {
        email: sanitizedEmail,
        password: sanitizedPassword,
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
    } else if (sanitizedAction === "login") {
      // This is a login request - action is already validated above
      // Validate and sanitize login data
      const validationResult = validateAndSanitize(loginSchema, {
        email: sanitizedEmail,
        password: sanitizedPassword,
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
