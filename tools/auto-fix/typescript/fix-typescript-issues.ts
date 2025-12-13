import { exec } from "../utils/exec";

export async function runTypescriptFix(): Promise<void> {
  console.log("📐 Running TypeScript check");

  // TypeScript has no safe general-purpose auto-fix; we run checks and fail fast.
  await exec("bunx nx affected -t type-check", { allowFailure: true });
}
