#!/usr/bin/env node

/**
 * Code Scanning Alerts to GitHub Issues Automation
 *
 * This script fetches code scanning alerts from GitHub and creates
 * corresponding issues labeled with "bugs" for tracking and remediation.
 *
 * Features:
 * - Fetches open code scanning alerts from GitHub Advanced Security
 * - Creates detailed GitHub issues with alert information
 * - Prevents duplicate issues using alert ID tracking
 * - Applies "bugs" label (creates if needed)
 * - Handles API rate limits with retry logic
 */

import { Octokit } from "@octokit/rest";

interface CodeScanningAlert {
  number: number;
  state: string;
  dismissed_reason: string | null;
  rule: {
    id: string;
    name?: string;
    severity: string;
    description: string;
    tags?: string[];
  };
  tool: {
    name: string;
    version: string | null;
  };
  most_recent_instance: {
    ref: string;
    state: string;
    commit_sha: string;
    message: {
      text: string;
    };
    location: {
      path: string;
      start_line: number;
      end_line: number;
      start_column?: number;
      end_column?: number;
    };
  };
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
}

interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  labels: Array<{ name?: string } | string>;
  state: string;
  pull_request?: unknown;
}

interface AlertIssueMapping {
  [alertNumber: string]: number; // alertNumber -> issueNumber
}

class CodeScanningToIssues {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private dryRun: boolean;
  private alertIssueMapping: AlertIssueMapping = {};

  constructor(
    token: string,
    owner: string,
    repo: string,
    dryRun: boolean = false,
  ) {
    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
    this.dryRun = dryRun;
  }

  /**
   * Main execution method
   */
  async execute(): Promise<void> {
    console.log("🔍 Code Scanning Alerts to Issues - Starting...");
    console.log(`📦 Repository: ${this.owner}/${this.repo}`);
    console.log(`🏃 Mode: ${this.dryRun ? "DRY RUN" : "LIVE"}\n`);

    try {
      // Step 1: Ensure "bugs" label exists
      await this.ensureBugsLabel();

      // Step 2: Build mapping of existing issues
      await this.buildAlertIssueMapping();

      // Step 3: Fetch code scanning alerts
      const alerts = await this.fetchCodeScanningAlerts();
      console.log(`📊 Found ${alerts.length} open code scanning alerts\n`);

      if (alerts.length === 0) {
        console.log("✅ No alerts to process. Exiting.");
        return;
      }

      // Step 4: Process each alert
      let created = 0;
      let skipped = 0;

      for (const alert of alerts) {
        const existed = await this.processAlert(alert);
        if (existed) {
          skipped++;
        } else {
          created++;
        }
      }

      console.log("\n📈 Summary:");
      console.log(`  ✅ Issues created: ${created}`);
      console.log(`  ⏭️  Issues skipped (already exist): ${skipped}`);
      console.log(`  📊 Total alerts processed: ${alerts.length}`);
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  }

  /**
   * Ensure the "bugs" label exists in the repository
   */
  private async ensureBugsLabel(): Promise<void> {
    try {
      await this.octokit.issues.getLabel({
        owner: this.owner,
        repo: this.repo,
        name: "bugs",
      });
      console.log('✅ "bugs" label already exists');
    } catch (error: any) {
      if (error.status === 404) {
        console.log('📝 Creating "bugs" label...');
        if (!this.dryRun) {
          await this.octokit.issues.createLabel({
            owner: this.owner,
            repo: this.repo,
            name: "bugs",
            color: "d73a4a",
            description: "Code scanning security or quality issues",
          });
          console.log('✅ "bugs" label created');
        } else {
          console.log('🔍 [DRY RUN] Would create "bugs" label');
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Build mapping of code scanning alerts to existing issues
   */
  private async buildAlertIssueMapping(): Promise<void> {
    console.log("🔍 Building alert-to-issue mapping...");

    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
      const { data: issues } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: "bugs",
        state: "all",
        per_page: perPage,
        page,
      });

      for (const issue of issues as GitHubIssue[]) {
        if ((issue as any).pull_request) {
          continue;
        }

        // Extract alert number from issue title or body
        const alertNumber = this.extractAlertNumber(
          issue.title,
          issue.body || "",
        );
        if (alertNumber) {
          const current = this.alertIssueMapping[alertNumber];
          if (!current || issue.state === 'open') {
            this.alertIssueMapping[alertNumber] = issue.number;
          }
        }
      }

      hasMore = issues.length === perPage;
      page++;
    }

    console.log(
      `✅ Mapped ${Object.keys(this.alertIssueMapping).length} existing issues\n`,
    );
  }

  /**
   * Extract alert number from issue title or body
   */
  private extractAlertNumber(title: string, body: string): string | null {
    // Stable marker: <!-- code-scanning-alert-id:123 -->
    const markerMatch = /code-scanning-alert-id:(\d+)/i.exec(body);
    if (markerMatch) return markerMatch[1];

    // Look for pattern: "Alert #123" or "Alert: #123"
    const titleMatch = /Alert[:\s]+#(\d+)/i.exec(title);
    if (titleMatch) return titleMatch[1];

    const bodyMatch = /Alert[:\s]+#(\d+)/i.exec(body);
    if (bodyMatch) return bodyMatch[1];

    const urlMatch = /\/code-scanning\/alerts\/(\d+)/i.exec(body);
    if (urlMatch) return urlMatch[1];

    return null;
  }

  /**
   * Search for an existing issue for this alert number as a final safety net
   */
  private async findExistingIssueForAlert(alertNumber: number): Promise<number | null> {
    const query = `repo:${this.owner}/${this.repo} is:issue label:bugs in:title,in:body "Alert #${alertNumber}"`;

    const { data } = await this.octokit.search.issuesAndPullRequests({
      q: query,
      per_page: 10,
    });

    const candidate = data.items.find(item => !('pull_request' in item));
    return candidate ? candidate.number : null;
  }

  /**
   * Fetch all open code scanning alerts
   */
  private async fetchCodeScanningAlerts(): Promise<CodeScanningAlert[]> {
    console.log("🔍 Fetching code scanning alerts...");

    const alerts: CodeScanningAlert[] = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
      try {
        const { data } = await this.octokit.codeScanning.listAlertsForRepo({
          owner: this.owner,
          repo: this.repo,
          state: "open",
          per_page: perPage,
          page,
        });

        alerts.push(...(data as any));
        hasMore = data.length === perPage;
        page++;

        // Rate limit handling: small delay between pages
        if (hasMore) {
          await this.sleep(500);
        }
      } catch (error: any) {
        if (error.status === 403 && error.message?.includes("rate limit")) {
          console.log("⏳ Rate limit hit, waiting 60 seconds...");
          await this.sleep(60000);
          // Retry the same page
          continue;
        }
        throw error;
      }
    }

    return alerts;
  }

  /**
   * Process a single alert and create an issue if needed
   */
  private async processAlert(alert: CodeScanningAlert): Promise<boolean> {
    const alertKey = alert.number.toString();

    // Check if issue already exists
    if (this.alertIssueMapping[alertKey]) {
      console.log(
        `⏭️  Alert #${alert.number}: Issue #${this.alertIssueMapping[alertKey]} already exists`,
      );
      return true;
    }

    const fallbackIssue = await this.findExistingIssueForAlert(alert.number);
    if (fallbackIssue) {
      this.alertIssueMapping[alertKey] = fallbackIssue;
      console.log(`⏭️  Alert #${alert.number}: Issue #${fallbackIssue} already exists (search fallback)`);
      return true;
    }

    // Create issue
    const title = this.generateIssueTitle(alert);
    const body = this.generateIssueBody(alert);

    console.log(`📝 Creating issue for Alert #${alert.number}...`);
    console.log(`   Title: ${title}`);

    if (!this.dryRun) {
      try {
        const { data: issue } = await this.octokit.issues.create({
          owner: this.owner,
          repo: this.repo,
          title,
          body,
          labels: ["bugs"],
        });

        console.log(
          `✅ Created issue #${issue.number} for Alert #${alert.number}`,
        );
        this.alertIssueMapping[alertKey] = issue.number;

        // Rate limit handling: small delay between creations
        await this.sleep(1000);
      } catch (error: any) {
        if (error.status === 403 && error.message?.includes("rate limit")) {
          console.log("⏳ Rate limit hit, waiting 60 seconds...");
          await this.sleep(60000);
          // Retry
          return await this.processAlert(alert);
        }
        throw error;
      }
    } else {
      console.log("🔍 [DRY RUN] Would create issue");
    }

    return false;
  }

  /**
   * Generate issue title from alert
   */
  private generateIssueTitle(alert: CodeScanningAlert): string {
    const severity = alert.rule.severity?.toUpperCase() || "MEDIUM";
    const ruleName = alert.rule.name || alert.rule.id;
    return `[${severity}] ${ruleName} - Alert #${alert.number}`;
  }

  /**
   * Generate issue body from alert
   */
  private generateIssueBody(alert: CodeScanningAlert): string {
    const location = alert.most_recent_instance?.location;
    const message =
      alert.most_recent_instance?.message?.text || alert.rule.description;

    let body = `## Code Scanning Alert #${alert.number}\n\n`;
    body += `<!-- code-scanning-alert-id:${alert.number} -->\n\n`;
    // Alert information
    body += `**Severity:** ${alert.rule.severity?.toUpperCase() || "MEDIUM"}\n`;
    body += `**Rule:** ${alert.rule.id}\n`;
    if (alert.rule.name) {
      body += `**Rule Name:** ${alert.rule.name}\n`;
    }
    body += `**Tool:** ${alert.tool.name}${alert.tool.version ? ` (${alert.tool.version})` : ""}\n`;
    body += `**State:** ${alert.state}\n\n`;

    // Description
    body += `### Description\n\n${message}\n\n`;

    // Location
    if (location) {
      body += `### Location\n\n`;
      body += `**File:** \`${location.path}\`\n`;
      body += `**Lines:** ${location.start_line}`;
      if (location.end_line !== location.start_line) {
        body += `-${location.end_line}`;
      }
      body += "\n\n";

      // Link to code
      const commitSha = alert.most_recent_instance?.commit_sha;
      if (commitSha) {
        const codeUrl = `https://github.com/${this.owner}/${this.repo}/blob/${commitSha}/${location.path}#L${location.start_line}`;
        body += `[View code location](${codeUrl})\n\n`;
      }
    }

    // Tags
    if (alert.rule.tags && alert.rule.tags.length > 0) {
      body += `### Tags\n\n${alert.rule.tags.map((tag) => `\`${tag}\``).join(", ")}\n\n`;
    }

    // Links
    body += `### Links\n\n`;
    body += `- [View alert in GitHub](${alert.html_url})\n`;
    body += `- [Alert API endpoint](${alert.url})\n\n`;

    // Remediation guidance
    body += `### Remediation\n\n`;
    body += `Please review the alert details and apply the necessary fixes to resolve this security or quality issue.\n\n`;
    body += `**Created:** ${new Date(alert.created_at).toLocaleString()}\n`;
    body += `**Updated:** ${new Date(alert.updated_at).toLocaleString()}\n`;

    return body;
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Main execution
 */
async function main() {
  const token = process.env.GITHUB_TOKEN;
  const owner =
    process.env.GITHUB_REPOSITORY_OWNER ||
    process.env.GITHUB_REPOSITORY?.split("/")[0];
  const repo =
    process.env.GITHUB_REPOSITORY?.split("/")[1] || process.env.REPO_NAME;
  const dryRun = process.env.DRY_RUN === "true";

  if (!token) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  if (!owner || !repo) {
    console.error("❌ Error: Repository information not found");
    console.error(
      "   Set GITHUB_REPOSITORY (format: owner/repo) or GITHUB_REPOSITORY_OWNER and REPO_NAME",
    );
    process.exit(1);
  }

  const converter = new CodeScanningToIssues(token, owner, repo, dryRun);
  await converter.execute();
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { CodeScanningToIssues };
