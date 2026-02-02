# MoltBot Setup Guide - "Hamada" AI Assistant

> **Project**: elzatona_web  
> **Bot Name**: Hamada 🤖  
> **Purpose**: Automated refactoring, issue resolution, and contribution preparation

---

## Overview

This guide sets up **MoltBot** (named "Hamada") - an AI coding assistant that runs on a VPS and communicates via Telegram. It will help with:

- Refactoring the elzatona_web codebase
- Fixing GitHub issues
- Adding tests and security improvements
- Preparing the project for open-source contribution
- Implementing gamification features

---

## Free Student Resources

### ✅ Completely Free for Students

| Resource              | What You Get               | How to Access                                                |
| --------------------- | -------------------------- | ------------------------------------------------------------ |
| **GitHub Copilot**    | Unlimited code completions | [Student Pack](https://education.github.com/pack)            |
| **Azure $100 Credit** | VPS hosting                | [Azure Students](https://azure.microsoft.com/free/students/) |
| **GitHub Codespaces** | 90 core-hours/month        | Included in Student Pack                                     |
| **Cloudflare**        | Free tier (security/DNS)   | [cloudflare.com](https://cloudflare.com)                     |
| **Telegram Bot API**  | Unlimited                  | Free for everyone                                            |
| **GLM-4 (Zhipu AI)**  | Free tier available        | [open.bigmodel.cn](https://open.bigmodel.cn)                 |
| **Groq**              | Free tier (fast inference) | [groq.com](https://groq.com)                                 |
| **Mistral**           | Free tier                  | [mistral.ai](https://mistral.ai)                             |

### 💰 Paid but Affordable

| Resource             | Cost                       | Notes                       |
| -------------------- | -------------------------- | --------------------------- |
| **Anthropic Claude** | ~$3-15/day                 | Best quality, use sparingly |
| **OpenAI GPT-4**     | ~$5-20/day                 | Good alternative            |
| **Brave Search API** | Free tier: 2000 queries/mo | For web search              |

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Telegram      │────▶│   VPS (Azure)   │────▶│   GitHub        │
│   (You)         │◀────│   MoltBot       │◀────│   elzatona_web  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   AI Providers  │
                        │   - Copilot     │
                        │   - GLM-4       │
                        │   - Claude      │
                        └─────────────────┘
```

---

## Task Breakdown

Complete these tasks in order:

| #   | Task                       | File                                                                     | Status |
| --- | -------------------------- | ------------------------------------------------------------------------ | ------ |
| 1   | Activate Student Resources | [01-activate-student-resources.md](./01-activate-student-resources.md)   | ⬜     |
| 2   | Create Azure VPS           | [02-create-azure-vps.md](./02-create-azure-vps.md)                       | ⬜     |
| 3   | Secure the VPS             | [03-secure-vps.md](./03-secure-vps.md)                                   | ⬜     |
| 4   | Install Dependencies       | [04-install-dependencies.md](./04-install-dependencies.md)               | ⬜     |
| 5   | Setup Telegram Bot         | [05-setup-telegram-bot.md](./05-setup-telegram-bot.md)                   | ⬜     |
| 6   | Configure AI Providers     | [06-configure-ai-providers.md](./06-configure-ai-providers.md)           | ⬜     |
| 7   | Install MoltBot            | [07-install-moltbot.md](./07-install-moltbot.md)                         | ⬜     |
| 8   | Setup GitHub CLI           | [08-setup-github-cli.md](./08-setup-github-cli.md)                       | ⬜     |
| 9   | Configure Cloudflare       | [09-configure-cloudflare.md](./09-configure-cloudflare.md)               | ⬜     |
| 10  | Train Hamada (Context)     | [10-train-hamada-context.md](./10-train-hamada-context.md)               | ⬜     |
| 11  | Test & Validate            | [11-test-and-validate.md](./11-test-and-validate.md)                     | ⬜     |
| 12  | **Terraform Guide** 🆕     | [12-terraform-complete-guide.md](./12-terraform-complete-guide.md)       | ⬜     |
| 13  | **Terraform Commands** 🆕  | [13-terraform-command-reference.md](./13-terraform-command-reference.md) | ⬜     |

---

## 🚀 NEW: Terraform Quick Provision

Instead of manually creating VPS through Azure Portal, you can now use **Terraform** to deploy everything with one command!

### Why Terraform?

- ✅ **Quick Deploy:** Create entire infrastructure in 3 minutes
- ✅ **Quick Destroy:** Delete everything in 2 minutes (avoid costs!)
- ✅ **Reproducible:** Same setup every time
- ✅ **No Manual Clicking:** All automated

### Quick Start (If You Know Terraform)

```bash
cd infrastructure/terraform/azure/moltbot
./provision.sh      # Creates everything
./destroy.sh        # Deletes everything
```

### Learning Terraform (If You Don't Know It Yet)

**Complete Learning Path:**

1. **📘 Beginner's Guide** - [12-terraform-complete-guide.md](./12-terraform-complete-guide.md)
   - What is Terraform? (explained simply)
   - Core concepts with examples
   - Understanding MoltBot infrastructure
   - Complete workflows
   - Troubleshooting

2. **📋 Command Reference** - [13-terraform-command-reference.md](./13-terraform-command-reference.md)
   - All commands you'll need
   - Copy-paste ready examples
   - Quick reference cheat sheet
   - Common workflows
   - Emergency fixes

**Estimated learning time:** 30-45 minutes (read both guides)  
**Actual infrastructure creation:** 3 minutes  
**Money saved:** Destroy when not using → $0/month

---

## Quick Reference

### Option A: Manual VPS Setup (Original Method)

```bash
# SSH to VPS
ssh -i ~/.ssh/azure-moltbot.pem azureuser@<VM-IP>

# Start MoltBot
tmux new -s hamada
cd ~/moltbot && npm start
```

### Option B: Terraform Setup (New Method) 🆕

```bash
# Create infrastructure
cd infrastructure/terraform/azure/moltbot
terraform init
terraform apply

# Destroy when done
terraform destroy
```

### Telegram Commands

```
/start - Initialize Hamada
/help - Show available commands
/refactor <file> - Request refactoring
/issue <number> - Work on GitHub issue
/status - Check current task status
```

---

## About This Project

**elzatona_web** is a platform to help frontend developers (starting with React) prepare for technical interviews. The project is being:

1. Refactored for code quality
2. Secured with proper testing
3. Prepared for open-source contribution
4. Enhanced with gamification features

**Hamada** (this bot) will assist with these goals autonomously.

---

_Created: January 29, 2026_
