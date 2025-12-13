import { exec } from "../utils/exec";

export async function runEslintFix(): Promise<void> {
  console.log("🧹 Running ESLint auto-fix");

  // Prefer affected for performance; fallback to workspace lint if Nx config doesn't support it.
  await exec("bunx nx affected -t lint --fix", { allowFailure: true });
}
