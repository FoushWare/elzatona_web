import { runGitleaksFix } from "./gitleaks/fix-gitleaks-issues";
import { runEslintFix } from "./eslint/fix-eslint-issues";
import { runTypescriptFix } from "./typescript/fix-typescript-issues";
import { runSonarFix } from "./sonar/fix-sonarqube-issues";

async function main() {
  console.log("\n🛠 Auto-Fix Controller Starting\n");

  await runGitleaksFix();
  await runEslintFix();
  await runTypescriptFix();
  await runSonarFix();

  console.log("\n✅ Auto-Fix Completed\n");
}

main().catch((err) => {
  console.error("❌ Auto-Fix Failed", err);
  process.exit(1);
});
