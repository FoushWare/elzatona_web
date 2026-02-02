# VPS Setup Implementation Plan

**Feature**: Complete VPS Setup for OpenClaw/MoltBot  
**Feature Branch**: `002-vps-setup`  
**Created**: 2026-02-03  
**Estimated Duration**: ~3-3.5 hours (depending on Cloudflare inclusion)  
**VM IP**: 104.40.244.55  
**Tech Stack**: Ubuntu 22.04, Node.js 20 LTS, Telegram Bot, Azure VPS

---

## Overview

This plan transforms a minimal Azure VM into a fully functional, secure OpenClaw/MoltBot server that:

- **Secures** the VPS with UFW, SSH hardening, and fail2ban
- **Installs** runtime dependencies (Node.js, npm, git, Python)
- **Configures** Telegram bot for remote control
- **Connects** AI providers (Groq, GitHub Copilot, optionally Claude)
- **Installs** and runs MoltBot with persistent sessions
- **Enables** GitHub integration for code operations
- **Trains** Hamada with project context
- **Optionally** adds Cloudflare security layer
- **Validates** end-to-end functionality

---

## Timeline

```
Start
  │
  ├─ Phase 1: Security (25 min)
  │  ├─ UFW Firewall
  │  ├─ SSH Hardening
  │  └─ fail2ban
  │
  ├─ Phase 2: Dependencies (13 min)
  │  ├─ Node.js 20 LTS
  │  ├─ Python 3
  │  └─ Development Tools
  │
  ├─ Phase 3: Telegram (20 min)
  │  ├─ Create Bot via BotFather
  │  ├─ Get Chat ID
  │  └─ Store Credentials
  │
  ├─ Phase 4: AI Providers (20 min)
  │  ├─ Groq (Free)
  │  └─ GitHub Copilot CLI (Free for students)
  │
  ├─ Phase 5: MoltBot (45 min)
  │  ├─ Create Project
  │  ├─ Install Dependencies
  │  └─ Configure Persistence (tmux)
  │
  ├─ Phase 6: GitHub CLI (18 min)
  │  ├─ Install & Authenticate
  │  ├─ Configure Git Identity
  │  └─ Clone Repository
  │
  ├─ Phase 6.5: Hamada Context (30 min)
  │  ├─ Create Context File
  │  └─ Load Context in Bot
  │
  ├─ Phase 7 (Optional): Cloudflare (35 min)
  │  ├─ Install cloudflared
  │  ├─ Authenticate
  │  └─ Create Zero Trust Tunnel
  │
  ├─ Phase 8: Validation (25 min)
  │  ├─ Pre-Test Checklist
  │  └─ End-to-End Test
  │
  └─ Complete ✅
     Ready for production use
```

---

## Phases Breakdown

### Phase 1: Security Hardening (25 min)

**Objective**: Prevent unauthorized access and brute-force attacks

**Tasks**:

1. **UFW Firewall** (5 min)
   - Default deny incoming
   - Allow SSH only
   - Enable and verify

2. **SSH Hardening** (10 min)
   - Disable password authentication
   - Enable key-based auth only
   - Reduce login grace time
   - Limit auth attempts

3. **fail2ban** (10 min)
   - Install and configure
   - Ban IPs after 3 failed attempts
   - 1-hour ban duration

**Validation**: SSH works with key, password fails, fail2ban active

---

### Phase 2: Install Dependencies (13 min)

**Objective**: Set up runtime environment

**Tasks**:

1. **Node.js 20 LTS** (5 min)
   - Via NodeSource
   - npm included

2. **Python 3** (3 min)
   - Verify installation
   - Install pip

3. **Development Tools** (5 min)
   - git, build-essential
   - curl, wget, tmux

**Validation**: All binaries present and working

---

### Phase 3: Telegram Bot Setup (20 min)

**Objective**: Create communication channel

**Tasks**:

1. **Create Bot** (10 min)
   - Use BotFather
   - Get token
   - Configure description

2. **Get Chat ID** (5 min)
   - Message the bot
   - Extract chat ID from API

3. **Store Credentials** (5 min)
   - Create ~/.moltbot-credentials
   - Set permissions to 600

**Validation**: Bot responds to messages

---

### Phase 4: AI Providers (20 min)

**Objective**: Connect AI backends

**Tasks**:

1. **Groq API** (10 min)
   - Sign up (free)
   - Get API key
   - Add to credentials

2. **GitHub Copilot CLI** (10 min)
   - Authenticate gh
   - Install copilot extension
   - Test commands

**Validation**: Both APIs respond to test queries

---

### Phase 5: Install MoltBot (45 min)

**Objective**: Set up the bot application

**Tasks**:

1. **Create Project** (15 min)
   - npm init
   - Install telegraf, dotenv, axios, winston

2. **Create Bot Script** (20 min)
   - Copy from docs/moltbot/07-install-moltbot.md
   - Update with credentials
   - Test run

3. **Persistent Running** (10 min)
   - Use tmux for session management
   - Auto-start on boot (optional)

**Validation**: Bot starts and connects to Telegram

---

### Phase 6: GitHub CLI Setup (18 min)

**Objective**: Enable code operations

**Tasks**:

1. **Install & Authenticate** (10 min)
   - Install GitHub CLI
   - Device code login
   - Verify with `gh auth status`

2. **Configure Git** (3 min)
   - user.name
   - user.email

3. **Clone Repository** (5 min)
   - gh repo clone FoushWare/elzatona_web
   - Verify checkout

**Validation**: Can pull/push code, access GitHub

---

### Phase 6.5: Train Hamada Context (30 min)

**Objective**: Give bot project knowledge

**Tasks**:

1. **Create Context File** (20 min)
   - ~/moltbot/context/hamada-memory.md
   - Include:
     - Project overview
     - Tech stack
     - Coding standards
     - Team info
     - Goals

2. **Load in Bot** (10 min)
   - Update index.js
   - Load file on startup
   - Test with /context command

**Validation**: Bot knows about elzatona_web

---

### Phase 7 (Optional): Cloudflare Tunnel (35 min)

**Objective**: Add security layer (optional)

**Tasks**:

1. **Install cloudflared** (10 min)
   - Download binary
   - Install via dpkg

2. **Authenticate** (10 min)
   - Login to Cloudflare
   - Authorize application

3. **Create Tunnel** (15 min)
   - Create Zero Trust tunnel
   - Route SSH traffic
   - Test connection

**Validation**: SSH via tunnel works

**Note**: This phase is optional and can be skipped if not needed

---

### Phase 8: Validation (25 min)

**Objective**: Verify everything works

**Tasks**:

1. **Pre-Test Checklist** (10 min)
   - Node.js installed ✅
   - MoltBot dependencies ✅
   - Credentials file ✅
   - GitHub CLI auth ✅
   - Systemd service ✅

2. **End-to-End Test** (15 min)
   - Send /start → receive welcome ✅
   - Send /status → get response ✅
   - Test AI provider ✅
   - Verify all components ✅

**Validation**: System ready for production

---

## Prerequisites Checklist

Before starting:

- [ ] SSH key pair generated (`~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`)
- [ ] Azure VM provisioned and running (104.40.244.55)
- [ ] Can SSH into VM
- [ ] Telegram account created
- [ ] GitHub account (preferably with Student Pack)
- [ ] Groq account (free)
- [ ] Firewalled/No other services running on VPS

---

## Key Commands Reference

### Quick Start

```bash
# SSH into VPS
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

# Later: reattach tmux session
tmux attach -t hamada

# Stop the bot (from tmux)
# Ctrl+B then type: kill-session -t hamada
```

### Phase by Phase

```bash
# Phase 1: Security
sudo ufw enable
sudo systemctl restart sshd
sudo systemctl enable fail2ban

# Phase 2: Dependencies
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Phase 3: Telegram
# Manually create bot with BotFather

# Phase 4: AI Providers
source ~/.moltbot-credentials
curl -s https://api.groq.com/openai/v1/chat/completions ...

# Phase 5: MoltBot
cd ~/moltbot && npm install
node index.js

# Phase 6: GitHub
gh auth login
gh repo clone FoushWare/elzatona_web

# Phase 6.5: Hamada Context
cat ~/moltbot/context/hamada-memory.md

# Phase 7 (Optional): Cloudflare
cloudflared tunnel login
cloudflared tunnel create hamada-tunnel

# Phase 8: Validation
# Run validation scripts from docs/moltbot/11-test-and-validate.md
```

---

## Troubleshooting Quick Reference

| Issue                        | Solution                                     |
| ---------------------------- | -------------------------------------------- |
| SSH times out                | Check Azure NSG rules, UFW status            |
| Node not found               | Restart terminal or source ~/.bashrc         |
| Telegram bot doesn't respond | Check token in credentials file, restart bot |
| Groq API fails               | Verify API key, check rate limits            |
| GitHub auth fails            | Re-run `gh auth login` with device code      |
| Bot doesn't start on boot    | Create systemd service or use tmux attach    |

---

## Post-Completion Checklist

Once all phases are complete:

- [ ] VPS is fully secured
- [ ] All dependencies installed
- [ ] Telegram bot operational
- [ ] AI providers connected
- [ ] MoltBot running
- [ ] GitHub integration working
- [ ] Hamada context loaded
- [ ] Validation tests passed
- [ ] (Optional) Cloudflare tunnel configured
- [ ] Bot survives VPS restart
- [ ] Can send commands via Telegram
- [ ] Bot responds with AI assistance

---

## Cost Analysis

| Service           | Cost              | Notes                                       |
| ----------------- | ----------------- | ------------------------------------------- |
| Azure VM (D2s_v3) | ~$0.10/hr         | Stop when idle                              |
| Telegram Bot      | Free              | Unlimited                                   |
| Groq (Free tier)  | Free              | ~10 requests/min                            |
| GitHub Copilot    | Free              | Student Pack only                           |
| Cloudflare        | Free              | Optional                                    |
| **Total**         | **~$72-90/month** | **Can reduce to ~$10/month by stopping VM** |

**Recommendation**: Stop VM when not actively using the bot (`az vm deallocate ...`)

---

## Next Steps

1. Read through this entire plan
2. Start with Phase 1 (Security) when ready
3. Work through each phase sequentially
4. Mark tasks complete as you go
5. Refer to docs/moltbot/\*.md files for detailed instructions
6. Use troubleshooting guide if issues arise
7. Run validation phase to confirm everything works

---

## Questions & Support

Refer to:

- [docs/moltbot/03-secure-vps.md](../../../docs/moltbot/03-secure-vps.md) - Security details
- [docs/moltbot/04-install-dependencies.md](../../../docs/moltbot/04-install-dependencies.md) - Dependencies
- [docs/moltbot/07-install-moltbot.md](../../../docs/moltbot/07-install-moltbot.md) - Bot installation
- [docs/moltbot/10-train-hamada-context.md](../../../docs/moltbot/10-train-hamada-context.md) - Context setup
- [docs/moltbot/11-test-and-validate.md](../../../docs/moltbot/11-test-and-validate.md) - Validation

---

**Status**: 🟡 Planning Complete, Ready for Execution  
**Last Updated**: 2026-02-03  
**Branch**: `002-vps-setup`
