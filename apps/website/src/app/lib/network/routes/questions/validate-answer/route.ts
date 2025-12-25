// v1.0 - API endpoint for AI validation of open-ended questions

import { NextRequest, NextResponse } from "next/server";
import {
  AIValidationService,
  ValidationRequest,
} from "../../../../ai-validation-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      question,
      userAnswer,
      expectedAnswer,
      customPrompt,
      acceptPartialCredit,
    } = body;

    // Validate required fields
    if (!question || !userAnswer) {
      return NextResponse.json(
        { error: "Question and userAnswer are required" },
        { status: 400 },
      );
    }

    const validationRequest: ValidationRequest = {
      question,
      userAnswer,
      expectedAnswer,
      customPrompt,
      acceptPartialCredit: acceptPartialCredit ?? true,
    };

    // Validate answer using AI
    const result = await AIValidationService.validateAnswer(validationRequest);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Validation API error:", error);
    return NextResponse.json(
      {
        error: "Failed to validate answer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
