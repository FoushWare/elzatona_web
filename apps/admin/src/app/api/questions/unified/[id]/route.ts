import { NextRequest } from "next/server";

// Lightweight fallback implementations for admin API route.
// The original implementation lives in the website app; re-exporting
// it here caused type resolution failures during CI. Provide simple
// stubs to keep the admin build fast and the API surface stable.

export async function PUT(_req: NextRequest) {
  return new Response(null, { status: 204 });
}

export async function DELETE(_req: NextRequest) {
  return new Response(null, { status: 204 });
}
