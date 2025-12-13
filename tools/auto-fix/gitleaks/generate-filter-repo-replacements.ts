import fs from "node:fs";
import path from "node:path";

type GitleaksFinding = {
  Secret?: string;
  Fingerprint?: string;
};

const REPORT =
  process.argv.find((a) => a.startsWith("--report="))?.split("=")[1] ??
  "gitleaks-report.json";
const OUT =
  process.argv.find((a) => a.startsWith("--out="))?.split("=")[1] ??
  "replacements.txt";

const reportPath = path.resolve(process.cwd(), REPORT);
const outPath = path.resolve(process.cwd(), OUT);

if (!fs.existsSync(reportPath)) {
   
  console.error(
    `Missing ${reportPath}. Run: gitleaks detect --report-format json --report-path ${REPORT}`,
  );
  process.exit(1);
}

const raw = fs.readFileSync(reportPath, "utf8").trim();
const parsed = raw ? (JSON.parse(raw) as unknown) : [];
if (!Array.isArray(parsed)) {
   
  console.error("gitleaks report JSON is not an array");
  process.exit(1);
}

const findings = parsed as GitleaksFinding[];

const uniqueSecrets = new Set<string>();
for (const f of findings) {
  if (typeof f.Secret === "string" && f.Secret.length > 0) {
    uniqueSecrets.add(f.Secret);
  }
}

const lines: string[] = [];
for (const secret of uniqueSecrets) {
  // filter-repo replace-text format: <old>==><new>
  lines.push(`${secret}==>__REDACTED_SECRET__`);
}

fs.writeFileSync(
  outPath,
  lines.join("\n") + (lines.length ? "\n" : ""),
  "utf8",
);

 
console.log(`Generated ${outPath} with ${lines.length} replacement(s).`);
