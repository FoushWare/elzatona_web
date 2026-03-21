#!/usr/bin/env node

/**
 * Code Scanning to Issues Converter
 *
 * This script converts GitHub Code Scanning alerts into GitHub Issues
 * for better tracking and management.
 */

const { Octokit } = require('@octokit/rest');

// Get environment variables
const token = process.env.REPO_TOKEN;
const repository = process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPO;
const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';

if (!token) {
  console.error('❌ Error: REPO_TOKEN environment variable is required');
  console.error('Please set it with: export REPO_TOKEN=your_token_here');
  process.exit(1);
}

if (!repository) {
  console.error('❌ Error: GITHUB_REPOSITORY environment variable is required');
  console.error('Please set it with: export GITHUB_REPOSITORY=owner/repo');
  process.exit(1);
}

const [owner, repo] = repository.split('/');

if (!owner || !repo) {
  console.error('❌ Error: Invalid GITHUB_REPOSITORY format. Expected: owner/repo');
  process.exit(1);
}

const octokit = new Octokit({
  auth: token,
  baseUrl: apiUrl,
});

async function getCodeScanningAlerts() {
  try {
    console.log(`🔍 Fetching code scanning alerts for ${owner}/${repo}...`);

    const response = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
      owner,
      repo,
      per_page: 100,
      state: 'open'
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error fetching code scanning alerts:', error.message);
    process.exit(1);
  }
}

async function createIssueFromAlert(alert) {
  const title = `[Code Scanning] ${alert.rule.name}`;
  const body = `
## Code Scanning Alert

**Rule:** ${alert.rule.name}
**Severity:** ${alert.rule.severity}
**Description:** ${alert.rule.description}

**File:** \`${alert.location?.path || 'Unknown'}\`
**Line:** ${alert.location?.start_line || 'Unknown'}

**Details:** ${alert.most_recent_instance?.message?.text || 'No details available'}

**URL:** ${alert.html_url}

---
*This issue was automatically created from a Code Scanning alert.*
  `.trim();

  const labels = ['code-scanning', `severity-${alert.rule.severity}`];

  try {
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      labels
    });

    console.log(`✅ Created issue: ${response.data.html_url}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating issue for alert ${alert.number}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Code Scanning to Issues conversion...');

  const alerts = await getCodeScanningAlerts();

  if (alerts.length === 0) {
    console.log('ℹ️ No open code scanning alerts found.');
    return;
  }

  console.log(`📋 Found ${alerts.length} open alerts. Creating issues...`);

  for (const alert of alerts) {
    await createIssueFromAlert(alert);
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('✅ Conversion complete!');
}

try {
  await main();
} catch (error) {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
}