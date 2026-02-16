// v1.0 - AI Validation Service for Open-ended Questions
// Uses free AI services to validate user answers

export interface ValidationResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  suggestions?: string[];
}

export interface ValidationRequest {
  question: string;
  userAnswer: string;
  expectedAnswer?: string;
  customPrompt?: string;
  acceptPartialCredit?: boolean;
}

export class AIValidationService {
  private static readonly FREE_AI_ENDPOINTS = [
    "https://api.openai.com/v1/chat/completions", // OpenAI (requires API key)
    "https://api.anthropic.com/v1/messages", // Anthropic (requires API key)
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", // Google Gemini (free tier)
  ];

  /**
   * Validate user answer using free AI service
   */
  static async validateAnswer(
    request: ValidationRequest,
  ): Promise<ValidationResult> {
    try {
      // Try Google Gemini first (free tier)
      const result = await this.validateWithGemini(request);
      return result;
    } catch (error) {
      console.error("AI validation error:", error);

      // Fallback to simple keyword matching
      return this.fallbackValidation(request);
    }
  }

  /**
   * Validate using Google Gemini (free tier)
   */
  private static async validateWithGemini(
    request: ValidationRequest,
  ): Promise<ValidationResult> {
    const prompt = this.buildValidationPrompt(request);

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY environment variable is not set.");
    }
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return this.parseAIResponse(aiResponse);
  }

  /**
   * Build validation prompt for AI
   */
  private static buildValidationPrompt(request: ValidationRequest): string {
    const {
      question,
      userAnswer,
      expectedAnswer,
      customPrompt,
      acceptPartialCredit,
    } = request;

    const prompt = `You are an expert teacher evaluating student answers. Please evaluate the following:

Question: "${question}"

Student Answer: "${userAnswer}"

${expectedAnswer ? `Expected Answer: "${expectedAnswer}"` : ""}

${customPrompt ? `Additional Instructions: ${customPrompt}` : ""}

Please provide your evaluation in the following JSON format:
{
  "isCorrect": true/false,
  "score": 0-100,
  "feedback": "Detailed feedback for the student",
  "suggestions": ["suggestion1", "suggestion2"]
}

${acceptPartialCredit ? "Accept partial credit for partially correct answers." : "Only mark as correct if the answer is completely accurate."}

Consider:
- Technical accuracy
- Completeness
- Clarity of explanation
- Understanding of concepts`;

    return prompt;
  }

  /**
   * Parse AI response into ValidationResult
   */
  private static parseAIResponse(aiResponse: string): ValidationResult {
    try {
      // Extract JSON from the response using indexOf to avoid ReDoS
      const start = aiResponse.indexOf("{");
      const end = aiResponse.lastIndexOf("}");
      if (start !== -1 && end > start) {
        const parsed = JSON.parse(aiResponse.substring(start, end + 1));
        return {
          isCorrect: parsed.isCorrect || false,
          score: Math.max(0, Math.min(100, parsed.score || 0)),
          feedback: parsed.feedback || "No feedback provided",
          suggestions: parsed.suggestions || [],
        };
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    // Fallback parsing
    const isCorrect = /correct|right|accurate|good/i.test(aiResponse);
    const scoreMatch = /(\d+)\s*(?:%|percent|score)/i.exec(aiResponse);
    let score = 0;
    if (scoreMatch) {
      score = Number.parseInt(scoreMatch[1], 10);
    } else if (isCorrect) {
      score = 100;
    }

    return {
      isCorrect,
      score,
      feedback:
        aiResponse.substring(0, 200) + (aiResponse.length > 200 ? "..." : ""),
      suggestions: [],
    };
  }

  /**
   * Fallback validation using simple keyword matching
   */
  private static fallbackValidation(
    request: ValidationRequest,
  ): ValidationResult {
    const { question: _question, userAnswer, expectedAnswer } = request;

    if (!expectedAnswer) {
      return {
        isCorrect: false,
        score: 0,
        feedback: "No expected answer provided for validation",
        suggestions: ["Please provide an expected answer for this question"],
      };
    }

    // Simple keyword matching
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    const expectedWords = expectedAnswer.toLowerCase().split(/\s+/);

    const matchingWords = userWords.filter((word) =>
      expectedWords.some(
        (expectedWord) =>
          word.includes(expectedWord) || expectedWord.includes(word),
      ),
    );

    const similarity =
      matchingWords.length / Math.max(userWords.length, expectedWords.length);
    const score = Math.round(similarity * 100);
    const isCorrect = score >= 70; // 70% threshold

    return {
      isCorrect,
      score,
      feedback: isCorrect
        ? "Good answer! You covered the key points."
        : "Your answer is partially correct. Try to include more specific details.",
      suggestions: isCorrect
        ? []
        : ["Review the question and provide more detailed explanations"],
    };
  }

  /**
   * Validate using OpenAI (requires API key)
   */
  private static async validateWithOpenAI(
    request: ValidationRequest,
  ): Promise<ValidationResult> {
    const prompt = this.buildValidationPrompt(request);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert teacher evaluating student answers. Provide detailed feedback in JSON format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";

    return this.parseAIResponse(aiResponse);
  }
}
