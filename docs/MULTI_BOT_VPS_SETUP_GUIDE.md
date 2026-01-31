# Multi-Bot VPS Setup Guide for Automated Refactoring

> **Goal**: Run AI coding agents (Claude, GPT-based tools, Aider, etc.) on a cloud VPS to perform automated refactoring tasks overnight while you sleep.

---

## Table of Contents

1. [Overview & Feasibility](#overview--feasibility)
2. [Cloud Provider Comparison](#cloud-provider-comparison)
3. [Recommended Setup: Azure Student](#recommended-setup-azure-student)
4. [Alternative: AWS Free Tier](#alternative-aws-free-tier)
5. [Alternative: GitHub Codespaces](#alternative-github-codespaces)
6. [Multi-Bot Tools & Options](#multi-bot-tools--options)
7. [Step-by-Step Setup (Azure)](#step-by-step-setup-azure)
8. [Step-by-Step Setup (AWS)](#step-by-step-setup-aws)
9. [Running Overnight Tasks](#running-overnight-tasks)
10. [Cost Estimation & Limits](#cost-estimation--limits)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting](#troubleshooting)

---

## Overview & Feasibility

### Is This Possible?

✅ **Yes, it's possible** to run AI coding agents on a VPS to automate refactoring tasks.

### What You Need

1. **Cloud VPS** (Azure, AWS, or GitHub Codespaces)
2. **AI Coding Agent** (Aider, Claude Code, GPT-Engineer, etc.)
3. **API Keys** (Anthropic Claude, OpenAI, etc.)
4. **Your Repository** cloned on the VPS
5. **Task Queue/Script** to run overnight

### Limitations

| Aspect                  | Limitation                                                   |
| ----------------------- | ------------------------------------------------------------ |
| **Free Tier Compute**   | Limited CPU/RAM (may be slow for large projects)             |
| **API Costs**           | AI API calls cost money (not covered by free tiers)          |
| **Session Persistence** | Need `tmux`/`screen` to keep sessions alive                  |
| **Autonomy**            | Agents need clear instructions; can't handle ambiguous tasks |

---

## Cloud Provider Comparison

| Provider              | Free Tier                                | Best For             | Limitations         |
| --------------------- | ---------------------------------------- | -------------------- | ------------------- |
| **Azure (Student)**   | $100 credit + 12 months free services    | ✅ **Recommended**   | Credit expires      |
| **AWS Free Tier**     | 750 hrs/month t2.micro (1 vCPU, 1GB RAM) | Good for light tasks | Very limited RAM    |
| **GitHub Codespaces** | 60 hrs/month (2-core) or 30 hrs (4-core) | Best dev experience  | Monthly hour limit  |
| **Google Cloud**      | $300 credit for 90 days                  | Alternative          | Credit expires fast |

### Verdict

🏆 **Azure Student Pack is the best option** because:

- $100 free credit (more than enough for a month of VPS)
- Can spin up a B2s (2 vCPU, 4GB RAM) which is sufficient
- Student verification is straightforward

---

## Recommended Setup: Azure Student

### Prerequisites

1. **GitHub Student Developer Pack** - [Apply here](https://education.github.com/pack)
2. **Azure for Students** - [Activate here](https://azure.microsoft.com/en-us/free/students/)
3. **API Key** for your AI provider (Anthropic, OpenAI, etc.)

### What You Get (Azure Student)

- **$100 Azure credit** (no credit card required)
- **12 months** of free services including:
  - 750 hours of B1s VM (1 vCPU, 1GB RAM)
  - Or use credits for B2s (2 vCPU, 4GB RAM) ~$30/month

---

## Alternative: AWS Free Tier

### What You Get

- **750 hours/month** of t2.micro (1 vCPU, 1GB RAM) for 12 months
- **30GB EBS storage**

### Limitations

⚠️ **t2.micro (1GB RAM) is very limited** for Node.js monorepos like this project.

### When to Use AWS

- If Azure verification fails
- For very lightweight tasks only
- Combined with swap space (see setup below)

---

## Alternative: GitHub Codespaces

### What You Get (with Student Pack)

- **90 core-hours/month** free
- Pre-configured dev environment
- No VM management needed

### Limitations

- Hours run out fast (30-60 hrs depending on core count)
- Can't leave running overnight without burning hours
- Better for interactive work, not overnight automation

---

## Multi-Bot Tools & Options

### Recommended Tools for Automated Refactoring

| Tool                                                                 | Description                  | Best For                   | API Required         |
| -------------------------------------------------------------------- | ---------------------------- | -------------------------- | -------------------- |
| **[Aider](https://aider.chat)**                                      | CLI-based AI pair programmer | ✅ Overnight automation    | Claude/GPT API       |
| **[Claude Code](https://claude.ai)**                                 | Anthropic's coding agent     | Interactive refactoring    | Anthropic API        |
| **[GPT-Engineer](https://github.com/gpt-engineer-org/gpt-engineer)** | Full project generation      | New features               | OpenAI API           |
| **[Sweep](https://sweep.dev)**                                       | GitHub bot for issues→PRs    | Issue-based refactoring    | Built-in (free tier) |
| **[Cursor](https://cursor.sh)**                                      | AI-powered IDE               | Interactive (not headless) | Built-in             |

### Best for Overnight Automation: **Aider**

Aider is the best choice because:

- Runs entirely in CLI (no GUI needed)
- Can process a list of tasks from a file
- Works with Claude or GPT models
- Creates git commits automatically
- Can run in `--yes` mode for unattended operation

---

## Step-by-Step Setup (Azure)

### Step 1: Activate Azure Student Account

```bash
# 1. Go to: https://azure.microsoft.com/en-us/free/students/
# 2. Sign in with your school email
# 3. Verify student status
# 4. Get $100 credit
```

### Step 2: Create a Virtual Machine

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → **"Virtual Machine"**
3. Configure:

| Setting            | Value                                      |
| ------------------ | ------------------------------------------ |
| **Subscription**   | Azure for Students                         |
| **Resource Group** | Create new: `refactor-bot-rg`              |
| **VM Name**        | `refactor-bot`                             |
| **Region**         | Closest to you                             |
| **Image**          | Ubuntu Server 22.04 LTS                    |
| **Size**           | B2s (2 vCPU, 4GB RAM) ~$30/mo from credits |
| **Authentication** | SSH public key (recommended)               |
| **Username**       | `azureuser`                                |

4. **Networking**: Allow SSH (port 22)
5. Click **"Review + create"** → **"Create"**

### Step 3: Connect to Your VM

```bash
# Download your SSH key from Azure or use existing
ssh -i ~/.ssh/your-key.pem azureuser@<VM-PUBLIC-IP>
```

### Step 4: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install essential tools
sudo apt install -y git tmux htop

# Install pnpm (if your project uses it)
npm install -g pnpm

# Install Aider (AI coding agent)
pip install aider-chat

# Or install with pipx (isolated)
sudo apt install -y pipx
pipx install aider-chat
```

### Step 5: Clone Your Repository

```bash
# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add this key to GitHub: Settings → SSH Keys

# Clone your repo
git clone git@github.com:FoushWare/elzatona_web.git
cd elzatona_web

# Install dependencies
npm install
```

### Step 6: Configure API Keys

```bash
# Create environment file for API keys
nano ~/.aider.env

# Add your API key (choose one):
ANTHROPIC_API_KEY=sk-ant-xxx  # For Claude
# OR
OPENAI_API_KEY=sk-xxx         # For GPT-4

# Load in shell
echo 'source ~/.aider.env' >> ~/.bashrc
source ~/.bashrc
```

### Step 7: Create Task File for Overnight Work

```bash
# Create a file with refactoring tasks
nano ~/refactor-tasks.md
```

Example content:

```markdown
# Overnight Refactoring Tasks

1. Fix all TypeScript errors in libs/common-ui
2. Add JSDoc comments to all exported functions in libs/utilities
3. Convert all `any` types to proper types in libs/types
4. Add unit tests for TaskSidebar component
5. Refactor TaskCodeEditor to use composition pattern
```

### Step 8: Run Aider in Unattended Mode

```bash
# Start a tmux session (persists after disconnect)
tmux new -s refactor

# Navigate to project
cd ~/elzatona_web

# Run Aider with your task file
aider --model claude-3-5-sonnet-20241022 \
      --yes \
      --auto-commits \
      --message "Read the tasks from ~/refactor-tasks.md and complete them one by one. Create a git commit after each task." \
      libs/common-ui/src/**/*.tsx \
      libs/types/src/**/*.ts

# Detach from tmux: Ctrl+B, then D
# Reattach later: tmux attach -t refactor
```

---

## Step-by-Step Setup (AWS)

### Step 1: Create AWS Account

1. Go to [AWS Free Tier](https://aws.amazon.com/free/)
2. Create account (credit card required but won't be charged for free tier)
3. Verify email

### Step 2: Launch EC2 Instance

1. Go to EC2 Dashboard
2. Click **"Launch Instance"**
3. Configure:

| Setting           | Value                      |
| ----------------- | -------------------------- |
| **Name**          | `refactor-bot`             |
| **AMI**           | Ubuntu Server 22.04 LTS    |
| **Instance Type** | t2.micro (free tier)       |
| **Key Pair**      | Create new or use existing |
| **Storage**       | 30GB gp2 (free tier max)   |

4. Launch instance

### Step 3: Add Swap Space (Critical for t2.micro)

```bash
# Connect to instance
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>

# Create 4GB swap file (compensates for 1GB RAM)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Step 4: Follow Steps 4-8 from Azure Setup

The remaining steps are identical to the Azure setup above.

---

## Running Overnight Tasks

### Option 1: Aider with Task List

```bash
# Create tasks file
cat > ~/tasks.txt << 'EOF'
Fix TypeScript errors in libs/common-ui/src/components/organisms/TaskSidebar.tsx
Add proper error handling to apps/website/src/app/api/frontend-tasks/[id]/route.ts
Write unit tests for DifficultyBadge component
EOF

# Run Aider with auto-yes
tmux new -s overnight
aider --yes --auto-commits --message "Complete these tasks: $(cat ~/tasks.txt)" libs/**/*.tsx
```

### Option 2: Script-Based Automation

```bash
# Create automation script
cat > ~/run-refactor.sh << 'EOF'
#!/bin/bash
cd ~/elzatona_web
git checkout develop
git pull origin develop

# Run Aider for each task
aider --yes --model claude-3-5-sonnet-20241022 --message "
1. Run npm run type-check and fix all TypeScript errors
2. Run npm run lint and fix all linting errors
3. Commit changes with message 'chore: fix type and lint errors'
" libs/**/*.ts libs/**/*.tsx

# Push results
git push origin develop
EOF

chmod +x ~/run-refactor.sh

# Run in tmux
tmux new -s overnight './run-refactor.sh'
```

### Option 3: Scheduled Runs with Cron

```bash
# Edit crontab
crontab -e

# Run every night at 2 AM
0 2 * * * /home/azureuser/run-refactor.sh >> /home/azureuser/refactor.log 2>&1
```

---

## Cost Estimation & Limits

### Azure Student

| Resource          | Free Allowance  | Estimated Usage | Cost           |
| ----------------- | --------------- | --------------- | -------------- |
| B2s VM (4GB RAM)  | $100 credit     | ~$30/month      | ✅ Covered     |
| Storage (32GB)    | Included        | ~$2/month       | ✅ Covered     |
| **Anthropic API** | ❌ Not included | ~$5-20/night    | 💰 **You pay** |

### AWS Free Tier

| Resource      | Free Allowance  | Limitation          |
| ------------- | --------------- | ------------------- |
| t2.micro      | 750 hrs/month   | Only 1GB RAM (slow) |
| Storage       | 30GB            | Sufficient          |
| **API Costs** | ❌ Not included | 💰 **You pay**      |

### API Cost Estimates (Anthropic Claude)

| Task Size                  | Tokens       | Estimated Cost |
| -------------------------- | ------------ | -------------- |
| Small refactor (1 file)    | ~10K tokens  | ~$0.03         |
| Medium refactor (10 files) | ~100K tokens | ~$0.30         |
| Large overnight session    | ~1M tokens   | ~$3.00         |

💡 **Tip**: Use Claude 3.5 Sonnet (~$3/1M input, $15/1M output) for best cost/performance.

---

## Security Considerations

### ⚠️ Important Security Rules

1. **Never commit API keys** to your repository
2. **Use environment variables** for all secrets
3. **Restrict SSH access** to your IP only
4. **Enable 2FA** on your cloud accounts
5. **Review AI-generated code** before merging to main

### Secure API Key Storage

```bash
# Use environment variables, never hardcode
export ANTHROPIC_API_KEY="sk-ant-xxx"

# Or use a secrets manager
# Azure: Key Vault
# AWS: Secrets Manager
```

### Firewall Rules

```bash
# Azure: Network Security Group
# Only allow SSH from your IP
az network nsg rule create \
  --resource-group refactor-bot-rg \
  --nsg-name refactor-bot-nsg \
  --name AllowSSH \
  --priority 100 \
  --source-address-prefixes YOUR_IP/32 \
  --destination-port-ranges 22 \
  --access Allow
```

---

## Troubleshooting

### Problem: VM runs out of memory

```bash
# Add swap space
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Problem: SSH connection drops overnight

```bash
# Use tmux to persist sessions
tmux new -s refactor
# Run your commands
# Detach: Ctrl+B, D
# Reattach: tmux attach -t refactor
```

### Problem: Aider makes incorrect changes

```bash
# Use --dry-run first to preview
aider --dry-run --message "your task"

# Review changes before committing
aider --no-auto-commits --message "your task"
```

### Problem: npm install fails (out of memory)

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=3072"

# Or use swap (see above)
```

---

## Quick Start Checklist

- [ ] Activate Azure Student account ($100 credit)
- [ ] Create B2s VM (2 vCPU, 4GB RAM)
- [ ] SSH into VM and install dependencies
- [ ] Clone your repository
- [ ] Get Anthropic API key ($5-10 to start)
- [ ] Install Aider: `pip install aider-chat`
- [ ] Create task file with refactoring goals
- [ ] Run in tmux session overnight
- [ ] Review changes in the morning

---

## Summary

| Question                          | Answer                                 |
| --------------------------------- | -------------------------------------- |
| **Can I do this with free tier?** | ✅ Yes (Azure Student is best)         |
| **Is it fully free?**             | ⚠️ VPS is free, but AI API costs money |
| **Best cloud for this?**          | 🏆 Azure Student ($100 credit)         |
| **Best AI tool for automation?**  | 🏆 Aider (CLI-based, unattended mode)  |
| **Can it run overnight?**         | ✅ Yes, use tmux + auto-commits        |
| **Will it work on this project?** | ✅ Yes, but need 4GB+ RAM              |

---

## Next Steps

1. **Today**: Activate Azure Student account
2. **Tonight**: Spin up VM and install dependencies
3. **Tomorrow**: Test with small refactoring task
4. **This week**: Set up overnight automation pipeline

---

_Document created: January 29, 2026_
_Project: elzatona_web / 004-frontend-task-detail_
