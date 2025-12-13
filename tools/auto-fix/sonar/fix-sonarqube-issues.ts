import { exec } from "../utils/exec";

export async function runSonarFix(): Promise<void> {
  console.log("📊 Running SonarQube (local)");

  // Sonar itself cannot auto-fix reliably; keep it as analysis + reporting.
  // Your repo already provides a wrapper script.
  await exec("bun run sonar:quick", { allowFailure: true });
}
