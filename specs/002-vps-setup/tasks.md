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

## Phase 6: GitHub CLI Setup (Priority P6)

### Task 6.1: Install and Authenticate GitHub CLI

**Time Estimate**: 10 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Install GitHub CLI:
   ```bash
   type -p curl >/dev/null || sudo apt install curl -y
   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
   sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
   sudo apt update
   sudo apt install gh -y
   ```
2. Authenticate: `gh auth login`
3. Choose: GitHub.com → HTTPS → Login with web browser
4. Use device code on local machine

**Validation**: `gh auth status` shows "Logged in"

---

### Task 6.2: Configure Git Identity

**Time Estimate**: 3 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Set name: `git config --global user.name "Your Name"`
2. Set email: `git config --global user.email "your@email.com"`
3. Verify: `git config --list`

**Validation**: Git identity configured

---

### Task 6.3: Clone Repository

**Time Estimate**: 5 minutes  
**Status**: ⬜ Not Started

**Steps**:

1. Clone: `gh repo clone FoushWare/elzatona_web ~/elzatona_web`
2. Verify: `cd ~/elzatona_web && git status`

**Validation**: Repository cloned successfully

---

## Phase 7: Validation (Priority P7)

### Task 7.1: Run Pre-Test Checklist

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
