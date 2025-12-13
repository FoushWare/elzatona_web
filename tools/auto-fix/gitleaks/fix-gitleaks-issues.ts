import fs from "node:fs";
import path from "node:path";

import { exec } from "../utils/exec";
import { AutoFixConfig } from "../config";

type GitleaksFinding = {
  RuleID?: string;
  Description?: string;
  File?: string;
  StartLine?: number;
  EndLine?: number;
  Secret?: string;
};

const sanitizeEnvKey = (ruleId: string, filePath: string): string => {
  const base = `${ruleId}_${path.basename(filePath)}`.toUpperCase();
  return base.replace(/[^A-Z0-9]/g, "_");
};

const isLikelyClientFile = (filePath: string): boolean => {
  // Heuristic: components + Next app router pages/layouts are frequently client components.
  // We prefer NEXT_PUBLIC_ for anything that might run in the browser.
  return (
    /(^|\/)(apps|libs)\//.test(filePath) &&
    /(\/app\/|\/components\/|\.tsx$)/.test(filePath)
  );
};

const toEnvKey = (rawKey: string, filePath: string): string => {
  if (isLikelyClientFile(filePath)) {
    return rawKey.startsWith("NEXT_PUBLIC_") ? rawKey : `NEXT_PUBLIC_${rawKey}`;
  }
  return rawKey;
};

const ensureEnvExampleLine = (envExamplePath: string, key: string): void => {
  if (!AutoFixConfig.updateEnvExample) return;

  const exists = fs.existsSync(envExamplePath);
  const current = exists ? fs.readFileSync(envExamplePath, "utf8") : "";
  const line = `${key}=`;

  if (!current.split(/\r?\n/).some((l) => l.trim().startsWith(`${key}=`))) {
    const next = current.length
      ? `${current.replace(/\s*$/, "")}\n${line}\n`
      : `${line}\n`;
    fs.writeFileSync(envExamplePath, next, "utf8");
  }
};

export async function runGitleaksFix(): Promise<void> {
  console.log("🔐 Running Gitleaks scan");

  const reportPath = path.join(process.cwd(), "gitleaks-report.json");

  // We scan staged files only in the hook, but the fixer can still be used manually.
  // If it finds secrets, gitleaks exits non-zero, so allowFailure.
  await exec(
    `gitleaks detect --redact --report-format json --report-path "${reportPath}"`,
    {
      allowFailure: true,
    },
  );

  if (!fs.existsSync(reportPath)) {
    return;
  }

  const raw = fs.readFileSync(reportPath, "utf8").trim();
  if (!raw) {
    fs.unlinkSync(reportPath);
    return;
  }

  let findings: GitleaksFinding[] = [];
  try {
    findings = JSON.parse(raw) as GitleaksFinding[];
  } catch {
    // If parsing fails, keep the report for manual inspection.
    return;
  }

  if (!Array.isArray(findings) || findings.length === 0) {
    fs.unlinkSync(reportPath);
    return;
  }

  const envExamplePath = path.join(
    process.cwd(),
    AutoFixConfig.paths.envExample,
  );

  for (const f of findings) {
    if (!f.File || !f.Secret || !f.RuleID) continue;
    if (!fs.existsSync(f.File)) continue;

    const envKey = toEnvKey(sanitizeEnvKey(f.RuleID, f.File), f.File);
    const content = fs.readFileSync(f.File, "utf8");

    if (!content.includes(f.Secret)) continue;

    // Safe-first: only do literal replacement of the exact leaked secret.
    const replaced = content.replaceAll(f.Secret, `process.env.${envKey}`);

    if (AutoFixConfig.allowFileChanges) {
      fs.writeFileSync(f.File, replaced, "utf8");
      ensureEnvExampleLine(envExamplePath, envKey);
      console.log(`✔ Replaced secret in ${f.File} -> process.env.${envKey}`);
    }
  }

  fs.unlinkSync(reportPath);
}
