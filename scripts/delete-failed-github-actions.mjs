#!/usr/bin/env node

/**
 * Script to delete failed GitHub Actions workflow runs
 * Usage: node scripts/delete-failed-github-actions.mjs [--dry-run] [--limit N]
 */

import { execSync } from "child_process";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const limitArg = args.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? parseInt(limitArg.split("=")[1]) : null;

const REPO = "FoushWare/elzatona_web";

console.log("🔍 Fetching failed and cancelled workflow runs...\n");

try {
  // Get all failed and cancelled workflow runs
  const response = execSync(
    `gh api repos/${REPO}/actions/runs --jq '.workflow_runs[] | select(.status == "completed" and (.conclusion == "failure" or .conclusion == "cancelled")) | {id: .id, name: .name, created_at: .created_at, head_branch: .head_branch, conclusion: .conclusion}'`,
    { encoding: "utf-8" },
  );

  const runs = response
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));

  // Sort by created_at (newest first)
  runs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Apply limit if specified
  const runsToDelete = limit ? runs.slice(0, limit) : runs;

  console.log(`📊 Found ${runs.length} failed/cancelled workflow run(s)`);
  if (limit) {
    console.log(
      `   Processing ${runsToDelete.length} run(s) (limited to ${limit})`,
    );
  }
  console.log("");

  if (runsToDelete.length === 0) {
    console.log("✅ No failed or cancelled runs to delete!");
    process.exit(0);
  }

  if (isDryRun) {
    console.log("🔍 DRY RUN MODE - No runs will be deleted\n");
    console.log("Failed/cancelled runs that would be deleted:");
    runsToDelete.forEach((run, index) => {
      console.log(
        `  ${index + 1}. Run ID: ${run.id} | ${run.name} | ${run.head_branch} | ${run.conclusion} | ${run.created_at}`,
      );
    });
    console.log(`\n💡 Run without --dry-run to actually delete these runs`);
    process.exit(0);
  }

  console.log("🗑️  Deleting failed and cancelled workflow runs...\n");

  let deleted = 0;
  let failed = 0;

  for (const run of runsToDelete) {
    try {
      execSync(`gh api repos/${REPO}/actions/runs/${run.id} -X DELETE`, {
        encoding: "utf-8",
        stdio: "pipe",
      });
      console.log(
        `✅ Deleted run ${run.id} - ${run.name} (${run.head_branch}) - ${run.conclusion}`,
      );
      deleted++;
    } catch (error) {
      console.error(`❌ Failed to delete run ${run.id}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Deleted: ${deleted}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📝 Total: ${runsToDelete.length}`);
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
