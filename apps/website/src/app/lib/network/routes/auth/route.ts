import { NextRequest, NextResponse } from "next/server";
import { UserAuthService } from "../../user-auth";
// Empty import removed
import {
  validateAndSanitize,
  registerSchema,
  loginSchema,
} from "../../utils/validation";

function sanitizeInput(email: unknown, password: unknown, action: unknown) {
  return {
    sanitizedEmail: typeof email === "string" ? email.trim() : "",
    sanitizedPassword: typeof password === "string" ? password : "",
    sanitizedAction: sanitizeAction(action),
  };
}

function validateRequiredFields(email: string, password: string) {
  if (!email || email.length === 0 || !password || password.length === 0) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 },
    );
  }
  return null;
}

function validateAction(action: string): NextResponse | null {
  const allowedActions = ["login", "register"];
  if (!action || !allowedActions.includes(action)) {
    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'login' or 'register'" },
      { status: 400 },
    );
  }
  return null;
}

function sanitizeAction(action: unknown): string {
  if (typeof action !== "string") {
    return "";
  }
  const normalizedAction = action.trim().toLowerCase();
  const allowedActions = ["login", "register"];
  return allowedActions.includes(normalizedAction) ? normalizedAction : "";
}

async function handleRegistration(
  email: string,
  password: string,
  name: unknown,
) {
  const validationResult = validateAndSanitize(registerSchema, {
    email,
    password,
    name: name || "",
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
}

async function handleLogin(email: string, password: string) {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, action } = body;

    const { sanitizedEmail, sanitizedPassword, sanitizedAction } =
      sanitizeInput(email, password, action);

    const validationError = validateRequiredFields(
      sanitizedEmail,
      sanitizedPassword,
    );
    if (validationError) return validationError;

    const actionError = validateAction(sanitizedAction);
    if (actionError) return actionError;

    // Use hardcoded action mapping instead of user-controlled flow
    if (sanitizedAction === "register") {
      return await handleRegistration(sanitizedEmail, sanitizedPassword, name);
    } else if (sanitizedAction === "login") {
      return await handleLogin(sanitizedEmail, sanitizedPassword);
    } else {
      // This should never be reached due to validation, but added as defense-in-depth
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'login' or 'register'" },
        { status: 400 },
      );
    }
  } catch (error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
