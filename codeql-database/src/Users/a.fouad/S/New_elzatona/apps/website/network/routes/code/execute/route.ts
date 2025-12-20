import { NextRequest, NextResponse } from "next/server";

// Piston API endpoint
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

interface PistonRequest {
  language: string;
  version: string;
  files: Array<{
    content: string;
  }>;
}

interface PistonResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
}

// Supported languages mapping
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "cpp", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
  csharp: { language: "csharp", version: "6.12.0" },
  go: { language: "go", version: "1.21.0" },
  rust: { language: "rust", version: "1.70.0" },
  php: { language: "php", version: "8.2.0" },
  ruby: { language: "ruby", version: "3.2.0" },
  swift: { language: "swift", version: "5.5.0" },
  kotlin: { language: "kotlin", version: "1.9.0" },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language } = body;

    if (!code || !language) {
      return NextResponse.json(
        { success: false, error: "Code and language are required" },
        { status: 400 },
      );
    }

    // Normalize language name
    const normalizedLang = language.toLowerCase().replace(/[^a-z]/g, "");
    const langConfig = LANGUAGE_MAP[normalizedLang];

    if (!langConfig) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported language: ${language}. Supported languages: ${Object.keys(LANGUAGE_MAP).join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Prepare Piston API request
    const pistonRequest: PistonRequest = {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          content: code,
        },
      ],
    };

    // Call Piston API
    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pistonRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Piston API error:", errorText);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to execute code",
          details: errorText,
        },
        { status: response.status },
      );
    }

    const data: PistonResponse = await response.json();

    // Combine stdout and output fields (Piston API may use either)
    const stdout = data.run.stdout || data.run.output || "";
    const stderr = data.run.stderr || "";

    return NextResponse.json({
      success: true,
      data: {
        stdout: stdout,
        stderr: stderr,
        output: stdout, // Keep for backward compatibility
        exitCode: data.run.code || 0,
        signal: data.run.signal || null,
        compileOutput: data.compile
          ? {
              stdout: data.compile.stdout || data.compile.output || "",
              stderr: data.compile.stderr || "",
              output: data.compile.output || "",
              exitCode: data.compile.code || 0,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error executing code:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
