# Implementation Tasks: VPS Setup for OpenClaw/MoltBot

**Feature Branch**: `002-vps-setup`  
**Created**: 2026-02-02  
**Spec**: [spec.md](spec.md)

---

## Phase 1: Security Hardening (Priority P1)

### Task 1.1: Configure UFW Firewall

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. SSH into the VPS: `ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55`
2. Check UFW status: `sudo ufw status`
3. Set default policies:
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   ```
4. Allow SSH: `sudo ufw allow ssh`
5. Enable UFW: `sudo ufw enable`
6. Verify: `sudo ufw status verbose`

**Validation**: UFW status shows "deny (incoming), allow (outgoing)" with SSH allowed

---

### Task 1.2: Disable Password Authentication

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Backup SSH config: `sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup`
2. Edit SSH config: `sudo nano /etc/ssh/sshd_config`
3. Set these values:
   ```
   PasswordAuthentication no
   PubkeyAuthentication yes
   PermitRootLogin no
   PermitEmptyPasswords no
   LoginGraceTime 30
   MaxAuthTries 3
   X11Forwarding no
   ```
4. Validate config: `sudo sshd -t`
5. Restart SSH: `sudo systemctl restart sshd`
6. **Test in NEW terminal before closing current session!**

**Validation**: Password auth fails, key auth succeeds

---

### Task 1.3: Install and Configure fail2ban

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Install: `sudo apt install -y fail2ban`
2. Create local config: `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`
3. Edit config: `sudo nano /etc/fail2ban/jail.local`
4. Configure [sshd] section:
   ```ini
   [sshd]
   enabled = true
   port = ssh
   filter = sshd
   logpath = /var/log/auth.log
   maxretry = 3
   bantime = 3600
   findtime = 600
   ```
5. Restart: `sudo systemctl restart fail2ban && sudo systemctl enable fail2ban`
6. Verify: `sudo fail2ban-client status sshd`

**Validation**: fail2ban shows enabled for sshd jail

---

## Phase 2: Install Dependencies (Priority P2)

### Task 2.1: Install Node.js 20 LTS

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Install via NodeSource:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
2. Verify: `node --version` (should show v20.x.x)
3. Verify npm: `npm --version` (should show 10.x.x)

**Validation**: `node -v` returns v20.x.x, `npm -v` returns 10.x.x

---

### Task 2.2: Verify Python and Install pip

**Time Estimate**: 3 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Check Python: `python3 --version` (should be 3.10+)
2. Install pip: `sudo apt install -y python3-pip python3-venv`
3. Verify: `pip3 --version`

**Validation**: Python 3.10+ and pip3 are available

---

### Task 2.3: Install Development Tools

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Update packages: `sudo apt update && sudo apt upgrade -y`
2. Install tools:
   ```bash
   sudo apt install -y build-essential git curl wget tmux htop
   ```
3. Verify: `git --version`

**Validation**: git and build-essential installed

---

## Phase 3: Telegram Bot Setup (Priority P3)

### Task 3.1: Create Bot with BotFather

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Open Telegram, search for @BotFather
2. Send `/newbot`
3. Name: "Hamada AI Assistant"
4. Username: Choose unique name ending in "Bot"
5. Save the bot token (format: `7123456789:AAHxxx...`)
6. Configure description: `/setdescription`
7. Configure about: `/setabouttext`

**Validation**: Bot token received and saved

---

### Task 3.2: Get Chat ID

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Start a chat with your new bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Find your chat ID in the response JSON
5. Save the chat ID

**Validation**: Chat ID obtained (numeric value)

---

### Task 3.3: Create Credentials File on VPS

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. SSH into VPS
2. Create credentials file:
   ```bash
   nano ~/.moltbot-credentials
   ```
3. Add content:
   ```bash
   TELEGRAM_BOT_TOKEN="your_bot_token"
   TELEGRAM_CHAT_ID="your_chat_id"
   ```
4. Secure the file: `chmod 600 ~/.moltbot-credentials`

**Validation**: File exists with proper permissions (600)

---

## Phase 4: AI Providers (Priority P4)

### Task 4.1: Configure Groq API

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Go to: https://console.groq.com/
2. Sign in with GitHub
3. Create API Key (starts with `gsk_`)
4. Add to credentials file:
   ```bash
   GROQ_API_KEY="gsk_xxxxx"
   ```
5. Test API:
   ```bash
   source ~/.moltbot-credentials
   curl -s https://api.groq.com/openai/v1/chat/completions \
     -H "Authorization: Bearer $GROQ_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model": "llama-3.1-8b-instant", "messages": [{"role": "user", "content": "Say OK"}], "max_tokens": 10}'
   ```

**Validation**: API returns valid response

---

### Task 4.2: Install GitHub Copilot CLI (Optional)

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Authenticate GitHub CLI first (see Phase 6)
2. Install Copilot extension:
   ```bash
   gh extension install github/gh-copilot
   ```
3. Test: `gh copilot --version`

**Validation**: Copilot CLI responds to commands

---

## Phase 5: Install MoltBot (Priority P5)

### Task 5.1: Create MoltBot Project

**Time Estimate**: 15 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Create directory: `mkdir -p ~/moltbot && cd ~/moltbot`
2. Initialize npm: `npm init -y`
3. Install dependencies:
   ```bash
   npm install telegraf dotenv axios openai winston node-cron simple-git
   ```

**Validation**: `npm list` shows all packages installed

---

### Task 5.2: Create Bot Script

**Time Estimate**: 20 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Create main file: `nano ~/moltbot/index.js`
2. Copy the bot code from docs/moltbot/07-install-moltbot.md
3. Test run: `node ~/moltbot/index.js`

**Validation**: Bot starts without errors

---

### Task 5.3: Configure Persistent Running

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Install tmux (already done in 2.3)
2. Create new session: `tmux new -s hamada`
3. Start bot: `cd ~/moltbot && node index.js`
4. Detach: `Ctrl+B` then `D`
5. Reattach later: `tmux attach -t hamada`

**Alternative**: Create systemd service for auto-start on boot

**Validation**: Bot runs after SSH disconnect

---

## Phase 6.5: Train Hamada Context (Priority P6)

### Task 6.5.1: Create Hamada Context File

**Time Estimate**: 20 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Create context directory: `mkdir -p ~/moltbot/context`
2. Create context file: `nano ~/moltbot/context/hamada-memory.md`
3. Add comprehensive content including:
   - Hamada's identity and role
   - Creator info and goals
   - Project overview (elzatona_web)
   - Tech stack (Next.js 15+, TypeScript, Supabase, etc.)
   - Project structure (apps, libs, monorepo)
   - Coding standards and patterns
   - Current priorities

**Reference**: See docs/moltbot/10-train-hamada-context.md for complete template

**Validation**: File contains at least 500 words of project knowledge

---

### Task 6.5.2: Load Context in MoltBot

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Update bot initialization: `nano ~/moltbot/index.js`
2. Load context file on startup:
   ```javascript
   const fs = require("fs");
   const hamadaMemory = fs.readFileSync(
     process.env.HOME + "/moltbot/context/hamada-memory.md",
     "utf-8",
   );
   ```
3. Pass context to AI provider initialization
4. Test bot with `/context` command to verify context is loaded

**Validation**: Bot responds with knowledge about the project

---

## Phase 7 (Optional): Cloudflare Tunnel (Priority P8 - Optional)

### Task 7.1: Install cloudflared

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Download cloudflared: `wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb`
2. Install: `sudo dpkg -i cloudflared-linux-amd64.deb`
3. Verify: `cloudflared --version`
4. Clean up: `rm cloudflared-linux-amd64.deb`

**Validation**: cloudflared installed and version shows

---

### Task 7.2: Authenticate Cloudflare

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Login: `cloudflared tunnel login`
2. Copy URL from terminal
3. Open in browser on local machine
4. Select Cloudflare account and authorize
5. Wait for certificate to be saved

**Validation**: `~/.cloudflared/cert.pem` exists

---

### Task 7.3: Create Zero Trust Tunnel

**Time Estimate**: 15 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Create tunnel: `cloudflared tunnel create hamada-tunnel`
2. Configure tunnel in `~/.cloudflared/config.yml`
3. Route SSH traffic to localhost:22
4. Test connection via tunnel
5. (Optional) Close public SSH access

**Reference**: See docs/moltbot/09-configure-cloudflare.md for full setup

**Validation**: Can SSH through Cloudflare tunnel

---

## Phase 8: Validation (Priority P9)

### Task 8.1: Run Pre-Test Checklist

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Run the validation script from docs/moltbot/11-test-and-validate.md
2. Check all components show ✅
3. Document any issues

**Validation**: All checklist items pass

---

### Task 8.2: End-to-End Test

**Time Estimate**: 15 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Send `/start` to Telegram bot
2. Verify welcome message received
3. Send `/status` command
4. Verify system status returned
5. Test AI provider via bot command
6. Verify AI response received

**Validation**: Complete flow works end-to-end

---

## Summary

| Phase                      | Name           | Tasks        | Est. Time    |
| -------------------------- | -------------- | ------------ | ------------ |
| 1                          | Security       | 3            | 25 min       |
| 2                          | Dependencies   | 3            | 13 min       |
| 3                          | Telegram       | 3            | 20 min       |
| 4                          | AI Providers   | 2            | 20 min       |
| 5                          | MoltBot        | 3            | 45 min       |
| 6                          | GitHub CLI     | 3            | 18 min       |
| 6.5                        | Hamada Context | 2            | 30 min       |
| 7 (Optional)               | Cloudflare     | 3            | 35 min       |
| 8                          | Validation     | 2            | 25 min       |
| **Total**                  |                | **24 tasks** | **~3.5 hrs** |
| **Total (w/o Cloudflare)** |                | **21 tasks** | **~3 hrs**   |

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Run the validation script from docs/moltbot/11-test-and-validate.md
2. Check all components show ✅
3. Document any issues

**Validation**: All checklist items pass

---

### Task 7.2: End-to-End Test

**Time Estimate**: 15 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Send `/start` to Telegram bot
2. Verify welcome message received
3. Send `/status` command
4. Verify system status returned
5. Test AI provider via bot command
6. Verify AI response received

**Validation**: Complete flow works end-to-end

---

## Summary

| Phase           | Tasks  | Est. Time    | Status |
| --------------- | ------ | ------------ | ------ |
| 1. Security     | 3      | 25 min       | ⬜     |
| 2. Dependencies | 3      | 13 min       | ⬜     |
| 3. Telegram     | 3      | 20 min       | ⬜     |
| 4. AI Providers | 2      | 20 min       | ⬜     |
| 5. MoltBot      | 3      | 45 min       | ⬜     |
| 6. GitHub CLI   | 3      | 18 min       | ⬜     |
| 7. Validation   | 2      | 25 min       | ⬜     |
| **Total**       | **19** | **~2.5 hrs** | ⬜     |
