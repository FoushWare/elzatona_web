# VPS Setup Execution Checklist

**Status**: Ready to Start  
**VM IP**: 104.40.244.55  
**Feature Branch**: `002-vps-setup`  
**Total Estimated Time**: 3-3.5 hours  
**Started**: [START DATE]  
**Completed**: [COMPLETION DATE]

---

## Prerequisites ✅

- [ ] SSH key configured (`~/.ssh/id_rsa`)
- [ ] Can SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Have Telegram app installed (smartphone or desktop)
- [ ] GitHub account ready (for CLI authentication)
- [ ] Groq account created (free at groq.com)
- [ ] GitHub Copilot CLI installed locally (for student token)

**Check Prerequisites**:

```bash
ssh azureuser@104.40.244.55 "echo 'SSH works!'"
```

---

## Phase 1: Security Hardening (25 min)

**Goal**: Secure the VPS - only SSH with keys, auto-block brute-force attempts  
**Reference**: docs/moltbot/03-secure-vps.md

### Task 1.1: Configure UFW Firewall (5 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Set default policy: `sudo ufw default deny incoming`
- [ ] Allow SSH: `sudo ufw allow 22/tcp`
- [ ] Enable UFW: `sudo ufw enable`
- [ ] Verify rules: `sudo ufw status verbose`
- [ ] Confirm SSH port 22 is ALLOW

**Expected Output**: UFW enabled with SSH allowed

---

### Task 1.2: SSH Hardening (10 min)

- [ ] Edit SSH config: `sudo nano /etc/ssh/sshd_config`
- [ ] Set `PermitRootLogin no`
- [ ] Set `PasswordAuthentication no`
- [ ] Set `LoginGraceTime 30`
- [ ] Set `MaxAuthTries 3`
- [ ] Save and exit (Ctrl+O, Enter, Ctrl+X)
- [ ] Test config syntax: `sudo sshd -t` (should return nothing)
- [ ] Restart SSH: `sudo systemctl restart ssh`
- [ ] Verify still can SSH: `ssh azureuser@104.40.244.55 "echo 'SSH hardened!'"` (should work)

**Expected Output**: SSH service restarted, key-based auth only

---

### Task 1.3: Install fail2ban (10 min)

- [ ] Update system: `sudo apt update`
- [ ] Install fail2ban: `sudo apt install -y fail2ban`
- [ ] Start service: `sudo systemctl start fail2ban`
- [ ] Enable on boot: `sudo systemctl enable fail2ban`
- [ ] Check status: `sudo fail2ban-client status`
- [ ] View SSH jail: `sudo fail2ban-client status sshd`

**Expected Output**: fail2ban service running, sshd jail active

**Phase 1 Complete**:

- [ ] UFW firewall blocking all except SSH
- [ ] SSH key-based auth only (no passwords)
- [ ] fail2ban monitoring SSH with 3-strike rule (1 hour ban)

---

## Phase 2: Install Dependencies (13 min)

**Goal**: Install Node.js, Python, and build tools  
**Reference**: docs/moltbot/04-install-dependencies.md

### Task 2.1: Update System (3 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Update package list: `sudo apt update`
- [ ] Upgrade packages: `sudo apt upgrade -y`
- [ ] Wait for completion

**Expected Output**: All system packages updated

---

### Task 2.2: Install Node.js 20 LTS (5 min)

- [ ] Add NodeSource repository: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
- [ ] Install Node.js: `sudo apt install -y nodejs`
- [ ] Verify Node version: `node --version` (should be v20.x.x)
- [ ] Verify npm version: `npm --version` (should be 10.x.x)

**Expected Output**: Node.js v20.x, npm 10.x installed

---

### Task 2.3: Install Python & Development Tools (5 min)

- [ ] Install Python: `sudo apt install -y python3 python3-pip python3-venv`
- [ ] Verify Python: `python3 --version` (should be 3.10+)
- [ ] Install build tools: `sudo apt install -y build-essential git curl wget`
- [ ] Verify git: `git --version`

**Expected Output**: Python 3.10+, git, curl, wget all installed

**Phase 2 Complete**:

- [ ] Node.js v20 LTS installed and available
- [ ] npm 10.x installed and available
- [ ] Python 3.10+ installed and available
- [ ] Development tools (build-essential, git, curl) available

---

## Phase 3: Create Telegram Bot (20 min)

**Goal**: Set up Telegram bot for remote control  
**Reference**: docs/moltbot/05-setup-telegram-bot.md

### Task 3.1: Create Bot via BotFather (8 min)

- [ ] Open Telegram and search for `@BotFather`
- [ ] Send `/newbot`
- [ ] Enter bot name (e.g., "elzatona-bot")
- [ ] Enter bot username (must be unique, e.g., "elzatona_bot_XXXX")
- [ ] Copy the token provided (long string starting with numbers)
- [ ] Save token securely (we'll use it next)

**Expected Output**: Telegram bot created with token

---

### Task 3.2: Get Your Telegram Chat ID (7 min)

- [ ] Search for bot `@userinfobot` in Telegram
- [ ] Send any message (e.g., "hello")
- [ ] Bot responds with your Telegram ID (large number)
- [ ] Copy your Chat ID

**Expected Output**: Your Chat ID obtained (9-10 digit number)

---

### Task 3.3: Store Credentials on VPS (5 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Create .env file in home: `nano ~/.env`
- [ ] Add these lines (replace with actual values):
  ```
  TELEGRAM_BOT_TOKEN=<your-bot-token-here>
  TELEGRAM_CHAT_ID=<your-chat-id-here>
  ```
- [ ] Save and exit
- [ ] Verify: `cat ~/.env` (confirm both lines present)
- [ ] Secure permissions: `chmod 600 ~/.env`

**Expected Output**: .env file created with Telegram credentials

**Phase 3 Complete**:

- [ ] Telegram bot created with token
- [ ] Your Chat ID obtained
- [ ] Credentials stored in ~/.env on VPS

---

## Phase 4: Configure AI Providers (20 min)

**Goal**: Set up Groq (free) and GitHub Copilot CLI (free for students)  
**Reference**: docs/moltbot/06-configure-ai-providers.md

### Task 4.1: Get Groq API Key (10 min)

- [ ] Go to https://console.groq.com
- [ ] Sign up (free) if needed
- [ ] Navigate to API Keys section
- [ ] Create new API key
- [ ] Copy the key (long string starting with "gsk\_")
- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Add to ~/.env: `echo "GROQ_API_KEY=<your-key>" >> ~/.env`
- [ ] Verify: `grep GROQ ~/.env`

**Expected Output**: Groq API key obtained and stored

---

### Task 4.2: GitHub Copilot CLI (10 min)

- [ ] On local machine, install: `npm install -g @githubnext/github-copilot-cli`
- [ ] Or if you have it, verify: `which gh-copilot`
- [ ] Authenticate: `gh auth login` (follow prompts, use GitHub token if needed)
- [ ] Test: `gh copilot explain "npm install"`
- [ ] Your GitHub Copilot is now available for bot to use

**Expected Output**: GitHub Copilot CLI installed and authenticated locally

**Phase 4 Complete**:

- [ ] Groq API key obtained and stored in ~/.env on VPS
- [ ] GitHub Copilot CLI installed and authenticated on local machine
- [ ] Ready for AI provider integration in bot

---

## Phase 5: Install MoltBot (45 min)

**Goal**: Set up MoltBot project with dependencies and persistence  
**Reference**: docs/moltbot/07-install-moltbot.md

### Task 5.1: Create Project Directory (5 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Create directory: `mkdir -p ~/projects/moltbot`
- [ ] Navigate: `cd ~/projects/moltbot`
- [ ] Verify: `pwd` (should show `/home/azureuser/projects/moltbot`)

**Expected Output**: Project directory created

---

### Task 5.2: Initialize Project & Install Dependencies (20 min)

- [ ] Initialize npm: `npm init -y`
- [ ] Install Telegraf: `npm install telegraf dotenv axios`
- [ ] Install Groq SDK: `npm install groq-sdk`
- [ ] Verify packages: `npm list` (should show all installed)
- [ ] Check package.json: `cat package.json`

**Expected Output**: package.json created with all dependencies

---

### Task 5.3: Create Bot Entry Point (10 min)

- [ ] Create bot file: `nano bot.js`
- [ ] Paste the bot code (basic Telegraf setup):

  ```javascript
  require("dotenv").config();
  const { Telegram } = require("telegraf");

  const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

  console.log("Bot is ready. Chat ID:", process.env.TELEGRAM_CHAT_ID);
  ```

- [ ] Save and exit
- [ ] Test: `node bot.js` (should print "Bot is ready" with your chat ID)
- [ ] Stop with Ctrl+C

**Expected Output**: bot.js created and runs without errors

---

### Task 5.4: Setup tmux for Persistence (10 min)

- [ ] Install tmux: `sudo apt install -y tmux`
- [ ] Create tmux session: `tmux new-session -d -s moltbot`
- [ ] Send start command: `tmux send-keys -t moltbot "cd ~/projects/moltbot && node bot.js" Enter`
- [ ] Verify running: `tmux list-sessions` (should show "moltbot" session)
- [ ] View logs: `tmux capture-pane -t moltbot -p`
- [ ] Exit SSH (bot stays running): `exit`

**Expected Output**: tmux session "moltbot" created and running bot.js

**Phase 5 Complete**:

- [ ] MoltBot project created in ~/projects/moltbot
- [ ] All dependencies installed (telegraf, groq-sdk, axios, dotenv)
- [ ] bot.js entry point created and tested
- [ ] tmux session running bot persistently (survives SSH disconnect)

---

## Phase 6: Setup GitHub CLI (18 min)

**Goal**: Enable bot to interact with GitHub repositories  
**Reference**: docs/moltbot/08-setup-github-cli.md

### Task 6.1: Install GitHub CLI (5 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Add GitHub CLI repo: `sudo apt install -y gh`
- [ ] Verify: `gh --version`

**Expected Output**: GitHub CLI installed

---

### Task 6.2: Authenticate with GitHub (8 min)

- [ ] Start auth: `gh auth login`
- [ ] Choose: Use HTTPS (or SSH if preferred)
- [ ] Choose: Authenticate with a token (recommended)
- [ ] Paste your GitHub Personal Access Token (create at https://github.com/settings/tokens if needed)
- [ ] Verify: `gh auth status`

**Expected Output**: GitHub CLI authenticated, shows current user and scopes

---

### Task 6.3: Configure Git Identity (5 min)

- [ ] Set git user: `git config --global user.name "Your Name"`
- [ ] Set git email: `git config --global user.email "your-email@example.com"`
- [ ] Verify: `git config --global --list`

**Expected Output**: Git configured with user.name and user.email

**Phase 6 Complete**:

- [ ] GitHub CLI installed and authenticated
- [ ] Git identity configured globally
- [ ] Ready to clone and push repos

---

## Phase 6.5: Train Hamada Context (30 min)

**Goal**: Create and load project context for AI awareness  
**Reference**: docs/moltbot/10-train-hamada-context.md

### Task 6.5.1: Create Context File (15 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Create context: `nano ~/projects/moltbot/hamada-context.md`
- [ ] Add project information:

  ```markdown
  # Hamada Context

  ## Project: Elzatona Web

  - Repository: https://github.com/Abdelhamid-kh/elzatona_web
  - Tech Stack: Next.js 15, TypeScript, Tailwind CSS, Supabase
  - Main Libraries: Telegraf, Groq SDK, Azure SDK

  ## Key Responsibilities

  1. Manage GitHub operations (clone, commit, push)
  2. Execute Telegram bot commands
  3. Query Groq AI for task assistance

  ## Important Endpoints

  - Telegram Bot API: https://api.telegram.org
  - Groq API: https://api.groq.com
  - GitHub API: https://api.github.com

  ## Current Status

  - VPS Setup: Phase 6.5 (In Progress)
  - Security: Enabled (UFW, SSH hardening, fail2ban)
  - Dependencies: Installed (Node.js, Python, build tools)
  ```

- [ ] Save and exit
- [ ] Verify: `cat ~/projects/moltbot/hamada-context.md`

**Expected Output**: hamada-context.md created with project information

---

### Task 6.5.2: Load Context in Bot (15 min)

- [ ] Edit bot.js: `nano ~/projects/moltbot/bot.js`
- [ ] Add context loading at top (after require statements):
  ```javascript
  const fs = require("fs");
  const hamadaContext = fs.readFileSync("./hamada-context.md", "utf-8");
  ```
- [ ] Add to bot initialization (for Groq requests):
  ```javascript
  // When calling Groq, prepend context
  const systemPrompt = `${hamadaContext}\n\nUser request:`;
  ```
- [ ] Save and exit
- [ ] Stop old session: `tmux kill-session -t moltbot`
- [ ] Restart with context: `tmux new-session -d -s moltbot -c ~/projects/moltbot "node bot.js"`
- [ ] Verify: `tmux capture-pane -t moltbot -p` (should show bot running)

**Expected Output**: bot.js updated to load and use Hamada context

**Phase 6.5 Complete**:

- [ ] hamada-context.md created with project information
- [ ] bot.js updated to load context
- [ ] Bot restarted with context awareness enabled

---

## Phase 7: Configure Cloudflare (35 min) [OPTIONAL]

**Goal**: Add Cloudflare Zero Trust tunnel for secure remote access  
**Reference**: docs/moltbot/09-configure-cloudflare.md

### Task 7.1: Install cloudflared (10 min)

- [ ] SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] Download: `curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb`
- [ ] Install: `sudo dpkg -i cloudflared.deb`
- [ ] Verify: `cloudflared --version`
- [ ] Clean up: `rm cloudflared.deb`

**Expected Output**: cloudflared binary installed

---

### Task 7.2: Authenticate with Cloudflare (12 min)

- [ ] Login: `cloudflared tunnel login`
- [ ] Browser opens to Cloudflare login - authorize tunnel
- [ ] Returns tunnel certificate to ~/.cloudflared/cert.pem
- [ ] Verify: `ls ~/.cloudflared/cert.pem`

**Expected Output**: Cloudflare authentication certificate obtained

---

### Task 7.3: Create Zero Trust Tunnel (13 min)

- [ ] Create tunnel: `cloudflared tunnel create elzatona-vps`
- [ ] Copy tunnel ID from output
- [ ] Create config: `nano ~/.cloudflared/config.yml`
- [ ] Add configuration:

  ```yaml
  tunnel: <your-tunnel-id>
  credentialsFile: ~/.cloudflared/<tunnel-id>.json

  ingress:
    - hostname: ssh.elzatona.com
      service: ssh://localhost:22
    - service: http_status:404
  ```

- [ ] Save and exit
- [ ] Start tunnel: `cloudflared tunnel run elzatona-vps`
- [ ] In another session, verify: `cloudflared tunnel list`

**Expected Output**: Cloudflare tunnel created and running

**Phase 7 Complete** [OPTIONAL]:

- [ ] cloudflared installed
- [ ] Authenticated with Cloudflare
- [ ] Zero Trust tunnel configured and running
- [ ] SSH accessible via Cloudflare domain (no public IP exposed)

---

## Phase 8: Validation (25 min)

**Goal**: Verify all systems operational and integrated  
**Reference**: docs/moltbot/11-test-and-validate.md

### Task 8.1: Pre-Test Checklist (10 min)

- [ ] Can SSH to VM: `ssh azureuser@104.40.244.55`
- [ ] UFW running: `sudo ufw status` shows "Status: active"
- [ ] fail2ban running: `sudo fail2ban-client status sshd` shows active
- [ ] Node.js works: `node --version` shows v20.x
- [ ] npm works: `npm --version` shows 10.x
- [ ] Python works: `python3 --version` shows 3.10+
- [ ] Credentials present: `cat ~/.env` shows TELEGRAM and GROQ keys
- [ ] GitHub CLI authenticated: `gh auth status` shows authenticated
- [ ] MoltBot running: `tmux list-sessions` shows moltbot session active
- [ ] Context file exists: `cat ~/projects/moltbot/hamada-context.md`

**Expected Output**: All systems operational

---

### Task 8.2: End-to-End Validation (15 min)

- [ ] **Telegram Test**: Send message to your bot via Telegram - should respond or log activity
- [ ] **Groq Test**: SSH and run: `npm exec -- node -e "console.log(process.env.GROQ_API_KEY ? 'Groq ready' : 'Missing')"`
  - Should print "Groq ready"
- [ ] **GitHub Test**: `gh repo list` - should show authenticated GitHub access
- [ ] **Bot Logging**: Check bot logs: `tmux capture-pane -t moltbot -p` - should show activity
- [ ] **Context Awareness**: Send message to bot that requires context - should respond appropriately
- [ ] **Persistence Check**: SSH out and back in, verify: `tmux list-sessions` - moltbot still running

**Expected Output**: All systems integrated and responding

**Phase 8 Complete**:

- [ ] ✅ Security: UFW, SSH, fail2ban active
- [ ] ✅ Runtime: Node.js, npm, Python installed and working
- [ ] ✅ Telegram: Bot created, authenticated, receiving messages
- [ ] ✅ AI: Groq API configured and accessible
- [ ] ✅ Bot: MoltBot running persistently with context awareness
- [ ] ✅ GitHub: CLI authenticated, git configured
- [ ] ✅ All systems: Integrated and operational

---

## Post-Completion

### Cost Optimization

- **Currently**: ~$72/month (Standard_D2s_v3 always on)
- **Optimized**: ~$10/month (stop VM when not in use)

**To stop VM and save**:

```bash
az vm deallocate --resource-group rg-openclaw-dev --name vm-openclaw-dev
```

**To start again**:

```bash
az vm start --resource-group rg-openclaw-dev --name vm-openclaw-dev
```

### Production Readiness

- [ ] Backup .env credentials (store securely)
- [ ] Document bot commands in README
- [ ] Set up log rotation for bot
- [ ] Enable VPS monitoring/alerts
- [ ] Schedule regular security updates

### Next Steps

- [ ] Deploy MoltBot to production
- [ ] Configure additional AI providers (Claude, etc.) if needed
- [ ] Add more complex bot commands
- [ ] Integrate with monitoring dashboard

---

## Troubleshooting Quick Reference

| Issue                      | Solution                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Can't SSH                  | Check firewall allows port 22: `sudo ufw allow 22/tcp`                                                           |
| SSH password fails         | Verify SSH hardening enabled key-only: `sudo sshd -t`                                                            |
| fail2ban bans my IP        | Wait 1 hour or: `sudo fail2ban-client set sshd unbanip <IP>`                                                     |
| Node.js not found          | `which node` - reinstall from NodeSource if missing                                                              |
| Bot not starting           | Check .env exists: `cat ~/.env`                                                                                  |
| Bot not receiving messages | Verify bot token: `echo $TELEGRAM_BOT_TOKEN`                                                                     |
| Groq API fails             | Check API key in .env: `grep GROQ ~/.env`                                                                        |
| GitHub CLI auth fails      | Re-authenticate: `gh auth logout && gh auth login`                                                               |
| Cloudflare tunnel dies     | Restart: `cloudflared tunnel run elzatona-vps`                                                                   |
| tmux session crashed       | Restart: `tmux kill-session -t moltbot && tmux new-session -d -s moltbot "cd ~/projects/moltbot && node bot.js"` |

---

## Estimated Timeline

| Phase       | Tasks               | Duration                              | Status      |
| ----------- | ------------------- | ------------------------------------- | ----------- |
| Setup Phase | Prerequisites check | ~5 min                                | ⏳          |
| Phase 1     | Security            | 25 min                                | ⏳          |
| Phase 2     | Dependencies        | 13 min                                | ⏳          |
| Phase 3     | Telegram            | 20 min                                | ⏳          |
| Phase 4     | AI Providers        | 20 min                                | ⏳          |
| Phase 5     | MoltBot             | 45 min                                | ⏳          |
| Phase 6     | GitHub CLI          | 18 min                                | ⏳          |
| Phase 6.5   | Hamada Context      | 30 min                                | ⏳          |
| Phase 7     | Cloudflare (opt)    | 35 min                                | ⏳ OPTIONAL |
| Phase 8     | Validation          | 25 min                                | ⏳          |
| **TOTAL**   | **24 tasks**        | **~3 hours** (or 3.5 with Cloudflare) | ⏳          |

---

## Notes

- All timestamps are relative; actual times may vary based on experience
- Each phase depends on previous phases being complete
- Cloudflare (Phase 7) is optional but recommended for security
- tmux keeps bot running even if SSH connection drops
- Regularly backup .env credentials to secure location
- Document any custom changes for future reference
