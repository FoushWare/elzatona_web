import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // For now, just redirect to the actual login page
  // The login page is at /pages/admin/login/page.tsx
  return NextResponse.redirect("/admin/login");
}

export async function POST(request: NextRequest) {
  // Handle any POST requests to login as well
  return NextResponse.redirect("/admin/login");
}
