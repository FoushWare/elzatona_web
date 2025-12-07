import { NextRequest, NextResponse } from "next/server";
import { toPng, toJpeg, toBlob } from "html-to-image";

// Test endpoint to convert code HTML to image
export async function POST(request: NextRequest) {
  try {
    const { html, format = "png", options = {} } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 },
      );
    }

    // Create a temporary DOM element from HTML string
    // Note: This is a simplified approach. In production, you'd use a proper HTML parser
    const defaultOptions = {
      backgroundColor: "#1e1e1e",
      width: 800,
      height: 600,
      quality: 1.0,
      pixelRatio: 2,
      ...options,
    };

    // For server-side, we need to use a different approach
    // html-to-image works in the browser, so we'll need to use Puppeteer or similar
    // For now, let's create a test that can work with a DOM element

    return NextResponse.json({
      success: true,
      message:
        "html-to-image package installed. Use this in client-side code or with Puppeteer for server-side.",
      note: "html-to-image requires a DOM element. For server-side, consider using Puppeteer or Playwright.",
    });
  } catch (error: any) {
    console.error("Error in code-to-image test:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 },
    );
  }
}

// GET endpoint to show usage example
export async function GET() {
  return NextResponse.json({
    message: "Code to Image Test Endpoint",
    usage: {
      method: "POST",
      body: {
        html: "<div>Your HTML code here</div>",
        format: "png" as const,
        options: {
          backgroundColor: "#1e1e1e",
          width: 800,
          height: 600,
          quality: 1.0,
        },
      },
    },
    note: "html-to-image works best in the browser. For server-side, use Puppeteer or Playwright.",
  });
}
