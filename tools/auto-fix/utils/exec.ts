import { spawn } from "node:child_process";

export interface ExecOptions {
  allowFailure?: boolean;
  cwd?: string;
}

export async function exec(
  command: string,
  options: ExecOptions = {},
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [], {
      shell: true,
      cwd: options.cwd || process.cwd(),
      stdio: "pipe",
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0 && !options.allowFailure) {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      } else {
        resolve({ stdout, stderr, exitCode: code || 0 });
      }
    });
  });
}
