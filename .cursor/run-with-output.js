#!/usr/bin/env node
const { spawn } = require("child_process");
const path = require("path");

const scriptPath = path.join(__dirname, "check-build-and-push.sh");
const cwd = "/Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web";

console.log("=".repeat(60));
console.log("Running build-check-and-push script");
console.log("=".repeat(60));
console.log();

const child = spawn("bash", [scriptPath], {
  cwd: cwd,
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => {
  console.log();
  console.log("=".repeat(60));
  console.log(`Script completed with exit code: ${code}`);
  console.log("=".repeat(60));
  process.exit(code || 0);
});

child.on("error", (err) => {
  console.error("Error running script:", err);
  process.exit(1);
});
