# Feature Specification: Complete VPS Setup for OpenClaw/MoltBot

**Feature Branch**: `002-vps-setup`  
**Created**: 2026-02-02  
**Status**: Draft  
**Input**: User description: "Complete VPS setup for OpenClaw: secure the VPS, install dependencies (Node.js, npm, git), setup Telegram bot, configure AI providers, install OpenClaw/MoltBot, setup GitHub CLI, and test validation"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Secure SSH Access (Priority: P1)

As a VPS administrator, I want to secure my Azure VM so that only I can SSH into it, preventing unauthorized access and brute-force attacks.

**Why this priority**: Security is the foundation—all other steps require a secure server. Without proper security, the entire setup is compromised.

**Independent Test**: After completing this story, SSH should still work with key-based auth, password auth should fail, and brute-force protection (fail2ban) should be active.

**Acceptance Scenarios**:

1. **Given** a fresh Azure VM, **When** I configure UFW firewall with default deny, **Then** only SSH (port 22) is allowed inbound
2. **Given** UFW is configured, **When** I disable password authentication, **Then** only SSH key authentication works
3. **Given** SSH hardening is applied, **When** someone attempts 3+ failed logins, **Then** fail2ban blocks their IP for 1 hour
4. **Given** the server is secured, **When** I open a new SSH session, **Then** I can still connect with my SSH key

---

### User Story 2 - Install Runtime Dependencies (Priority: P2)

As a developer, I want Node.js 20 LTS, npm, Python 3, and essential development tools installed so that I can run OpenClaw/MoltBot on the VPS.

**Why this priority**: The bot cannot run without the runtime environment. This is the foundation for all subsequent software installation.

**Independent Test**: Run `node -v`, `npm -v`, `python3 --version`, and `git --version` to confirm all tools are installed and functional.

**Acceptance Scenarios**:

1. **Given** a secured VPS, **When** I install Node.js via NodeSource, **Then** `node -v` shows v20.x.x
2. **Given** Node.js is installed, **When** I check npm, **Then** `npm -v` shows 10.x.x or higher
3. **Given** Python 3 is needed, **When** I verify installation, **Then** `python3 --version` shows 3.10.x or higher
4. **Given** development tools are needed, **When** I install build-essential and git, **Then** `git --version` returns a valid version

---

### User Story 3 - Create and Configure Telegram Bot (Priority: P3)

As a user, I want to create a Telegram bot named "Hamada" so that I can communicate with MoltBot remotely via Telegram messages.

**Why this priority**: Telegram is the primary interface for interacting with the bot. Without this, there's no way to send commands.

**Independent Test**: Send `/start` to the bot on Telegram and receive a welcome message.

**Acceptance Scenarios**:

1. **Given** a Telegram account, **When** I create a bot via BotFather, **Then** I receive a bot token
2. **Given** a bot token, **When** I configure bot description and about text, **Then** the bot shows proper info in Telegram
3. **Given** a configured bot, **When** I get my chat ID, **Then** the bot can be restricted to only respond to me
4. **Given** the bot is configured on VPS, **When** I send `/start`, **Then** I receive the welcome message

---

### User Story 4 - Configure AI Providers (Priority: P4)

As a developer, I want to configure AI providers (Groq, GitHub Copilot, optionally Claude) so that MoltBot can use AI for code assistance and refactoring.

**Why this priority**: AI providers give MoltBot its intelligence. Free tiers should be prioritized to minimize costs.

**Independent Test**: Make API calls to each configured provider and receive valid responses.

**Acceptance Scenarios**:

1. **Given** a Groq account, **When** I configure the API key, **Then** a test API call returns a valid response
2. **Given** GitHub Student Pack, **When** I install Copilot CLI, **Then** `gh copilot --version` works
3. **Given** credentials file exists, **When** I store API keys, **Then** they are readable only by the owner (chmod 600)
4. **Given** multiple providers, **When** the primary fails, **Then** the system falls back to secondary providers

---

### User Story 5 - Install and Run MoltBot (Priority: P5)

As a developer, I want MoltBot/OpenClaw installed and running so that I can use the AI assistant for code tasks.

**Why this priority**: This is the core deliverable—everything else supports this.

**Independent Test**: MoltBot responds to Telegram commands and can execute basic operations.

**Acceptance Scenarios**:

1. **Given** all dependencies installed, **When** I clone/create MoltBot project, **Then** `npm install` succeeds
2. **Given** environment configured, **When** I start MoltBot, **Then** it connects to Telegram successfully
3. **Given** MoltBot is running, **When** I send `/status`, **Then** I receive system status information
4. **Given** MoltBot needs persistence, **When** I configure tmux or systemd, **Then** the bot survives SSH disconnection

---

### User Story 6 - Setup GitHub CLI and Repository Access (Priority: P6)

As a developer, I want GitHub CLI configured so that MoltBot can interact with the elzatona_web repository (clone, commit, create PRs).

**Why this priority**: GitHub integration allows the bot to perform actual code changes and contributions.

**Independent Test**: `gh auth status` shows authenticated, and `gh repo clone` works.

**Acceptance Scenarios**:

1. **Given** GitHub CLI installed, **When** I authenticate via device code, **Then** `gh auth status` shows "Logged in"
2. **Given** authenticated, **When** I clone elzatona_web, **Then** the repository is cloned successfully
3. **Given** a cloned repo, **When** I configure git identity, **Then** commits show correct author info
4. **Given** GitHub access, **When** MoltBot creates a branch, **Then** the branch appears on GitHub

---

### User Story 7 - Validate Complete Setup (Priority: P7)

As a developer, I want to run validation tests to confirm all components work together before using the bot in production.

**Why this priority**: Validation ensures the system is reliable and catches issues before they cause problems.

**Independent Test**: All component tests pass, and an end-to-end test (Telegram → MoltBot → GitHub) succeeds.

**Acceptance Scenarios**:

1. **Given** all components installed, **When** I run the pre-test checklist, **Then** all items show ✅
2. **Given** AI providers configured, **When** I test each API, **Then** all return valid responses
3. **Given** Telegram connected, **When** I send a command, **Then** MoltBot responds within 5 seconds
4. **Given** GitHub configured, **When** MoltBot clones and runs tests, **Then** test results are reported to Telegram

---

### Edge Cases

- What happens when SSH connection drops during configuration? (Use tmux to preserve session)
- How does system handle expired AI API keys? (Log error, notify via Telegram, fallback to other providers)
- What if Telegram bot token is leaked? (Revoke token via BotFather, regenerate, update credentials)
- How to recover if fail2ban locks out the admin? (Use Azure Serial Console or wait for ban timeout)

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST configure UFW firewall with default deny incoming, allow outgoing
- **FR-002**: System MUST allow only SSH (port 22) through the firewall
- **FR-003**: System MUST disable password-based SSH authentication
- **FR-004**: System MUST enable SSH key-based authentication only
- **FR-005**: System MUST install and configure fail2ban to block IPs after 3 failed login attempts
- **FR-006**: System MUST install Node.js 20 LTS via NodeSource
- **FR-007**: System MUST install npm (bundled with Node.js)
- **FR-008**: System MUST verify Python 3.10+ is available
- **FR-009**: System MUST install git and build-essential packages
- **FR-010**: System MUST create a Telegram bot via BotFather and obtain a bot token
- **FR-011**: System MUST configure the Telegram bot with name "Hamada" and appropriate description
- **FR-012**: System MUST obtain and securely store the user's Telegram chat ID
- **FR-013**: System MUST configure at least one AI provider (Groq recommended for free tier)
- **FR-014**: System MUST store all API keys in a credentials file with 600 permissions
- **FR-015**: System MUST install MoltBot dependencies via npm
- **FR-016**: System MUST configure MoltBot environment with all required tokens
- **FR-017**: System MUST enable MoltBot to run persistently (tmux or systemd)
- **FR-018**: System MUST install and authenticate GitHub CLI
- **FR-019**: System MUST configure git identity (user.name, user.email)
- **FR-020**: System MUST clone the elzatona_web repository
- **FR-021**: System MUST run validation tests to confirm all components work

### Key Entities

- **VPS**: Azure Ubuntu 22.04 VM with SSH access (IP: 104.40.244.55)
- **Credentials File**: `~/.moltbot-credentials` containing all API keys and tokens
- **MoltBot**: Node.js application running on VPS, communicating via Telegram
- **Telegram Bot**: "Hamada" bot created via BotFather for user interaction
- **AI Providers**: Groq (primary/free), GitHub Copilot (free for students), Claude (optional/paid)
- **GitHub Repository**: elzatona_web project for code operations

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: VPS passes security audit: only SSH (22) open, password auth disabled, fail2ban active
- **SC-002**: All runtime dependencies installed: Node.js 20.x, npm 10.x, Python 3.10+, git
- **SC-003**: Telegram bot responds to `/start` command within 5 seconds
- **SC-004**: At least one AI provider returns valid responses to test queries
- **SC-005**: MoltBot starts successfully and stays running after SSH disconnection
- **SC-006**: GitHub CLI is authenticated and can clone/push to elzatona_web
- **SC-007**: Pre-test checklist shows 100% pass rate (all ✅)
- **SC-008**: End-to-end test completes: Telegram command → MoltBot → AI response → Telegram reply

## Assumptions

- Azure VM is already provisioned and accessible via SSH (completed in previous feature)
- User has a Telegram account and can create bots via BotFather
- User has GitHub Student Pack or can create free accounts on AI providers
- User has the SSH private key (`~/.ssh/id_rsa`) for VM access
- Internet connectivity is stable for API calls and package downloads
