const getMode = (): "interactive" | "dry-run" | "auto" => {
  if (process.argv.includes("--interactive")) {
    return "interactive";
  }
  if (process.argv.includes("--dry-run")) {
    return "dry-run";
  }
  return "auto";
};

export const AutoFixConfig = {
  mode: getMode(),

  allowFileChanges: true,
  updateEnvExample: true,
  maxRefactorDepth: 1,

  paths: {
    apps: "apps",
    libs: "libs",
    envExample: ".env.example",
    gitleaksConfig: ".gitleaks.toml",
  },
} as const;
