# Task 1: Activate Student Resources

> **Time**: 30-60 minutes  
> **Prerequisites**: School email address, GitHub account

---

## Checklist

- [ ] GitHub Student Developer Pack
- [ ] Azure for Students ($100 credit)
- [ ] GitHub Copilot (free for students)
- [ ] Cloudflare account (free tier)
- [ ] GLM-4 API key (free tier)
- [ ] Groq API key (free tier)
- [ ] Brave Search API key (optional)

---

## Step 1: GitHub Student Developer Pack

This unlocks many free resources including GitHub Copilot and Azure credits.

1. Go to: https://education.github.com/pack
2. Click **"Sign up for Student Developer Pack"**
3. Verify with your school email or upload proof of enrollment
4. Wait for approval (usually 1-7 days)

### What You Get

- ✅ GitHub Copilot (free)
- ✅ Azure $100 credit
- ✅ GitHub Pro features
- ✅ Free domains, cloud credits, and more

---

## Step 2: Azure for Students

1. Go to: https://azure.microsoft.com/en-us/free/students/
2. Click **"Start free"**
3. Sign in with your school email
4. Complete verification
5. **No credit card required!**

### Verify Activation

```bash
# After setup, you should see:
# Subscription: Azure for Students
# Credit: $100.00
```

---

## Step 3: GitHub Copilot (Free for Students)

Once your Student Pack is approved:

1. Go to: https://github.com/settings/copilot
2. Click **"Enable GitHub Copilot"**
3. Select **"I am a student"** (free tier)
4. Configure settings

### Get Copilot API Access (for MoltBot)

GitHub Copilot doesn't have a direct API, but you can use it through:

- **Copilot CLI**: `gh copilot` commands
- **Copilot in VS Code**: For local development
- **GitHub Models**: Limited API access (preview)

```bash
# Install Copilot CLI extension
gh extension install github/gh-copilot

# Test it
gh copilot explain "what does this code do"
```

---

## Step 4: GLM-4 API (Free Tier)

Zhipu AI's GLM-4 offers a generous free tier for students.

1. Go to: https://open.bigmodel.cn/
2. Create account (may need Chinese phone, or use international version)
3. Get API key from dashboard
4. Free tier: ~1M tokens/month

### Alternative: Zhipu International

```bash
# API endpoint
https://open.bigmodel.cn/api/paas/v4/chat/completions

# Save your key
export GLM_API_KEY="your-key-here"
```

---

## Step 5: Groq API (Free Tier)

Groq provides extremely fast inference with a free tier.

1. Go to: https://console.groq.com/
2. Sign up with GitHub
3. Get API key
4. Free tier: ~500K tokens/day

```bash
# Save your key
export GROQ_API_KEY="gsk_xxx"
```

### Supported Models (Free)

- `llama-3.1-70b-versatile` - Best quality
- `llama-3.1-8b-instant` - Fastest
- `mixtral-8x7b-32768` - Good for long context

---

## Step 6: Cloudflare Account

Free tier is sufficient for our needs.

1. Go to: https://cloudflare.com
2. Create account
3. No payment required for free tier

### What We'll Use

- **Zero Trust Tunnel**: Secure access to VPS
- **DNS**: Domain management (optional)
- **WAF**: Web application firewall (optional)

---

## Step 7: Brave Search API (Optional)

For web search capabilities.

1. Go to: https://brave.com/search/api/
2. Sign up for free tier
3. Get API key
4. Free: 2,000 queries/month

```bash
export BRAVE_API_KEY="BSAxx"
```

---

## Save Your Credentials

Create a secure file (DO NOT COMMIT TO GIT):

```bash
# Create credentials file
cat > ~/.moltbot-credentials << 'EOF'
# MoltBot Credentials - DO NOT SHARE OR COMMIT

# Azure
AZURE_SUBSCRIPTION_ID="xxx"

# AI Providers
GROQ_API_KEY="gsk_xxx"
GLM_API_KEY="xxx"
ANTHROPIC_API_KEY="sk-ant-xxx"  # Optional, paid

# Search
BRAVE_API_KEY="BSAxx"  # Optional

# Telegram (from Task 5)
TELEGRAM_BOT_TOKEN="xxx"

# GitHub (from Task 8)
GITHUB_TOKEN="ghp_xxx"
EOF

# Secure the file
chmod 600 ~/.moltbot-credentials
```

---

## Verification Checklist

Run these commands to verify setup:

```bash
# Check Azure CLI (install first if needed)
az account show

# Check GitHub CLI
gh auth status

# Check Copilot CLI
gh copilot --version

# Test Groq API
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.1-8b-instant", "messages": [{"role": "user", "content": "Hello"}]}'
```

---

## Cost Summary

| Service             | Cost     | Notes                        |
| ------------------- | -------- | ---------------------------- |
| GitHub Student Pack | **FREE** | Must verify student status   |
| Azure VPS           | **FREE** | $100 credit covers ~3 months |
| GitHub Copilot      | **FREE** | For students                 |
| GLM-4               | **FREE** | 1M tokens/month              |
| Groq                | **FREE** | 500K tokens/day              |
| Cloudflare          | **FREE** | Free tier sufficient         |
| Brave Search        | **FREE** | 2K queries/month             |
| **Total**           | **$0**   | Until you need Claude/GPT-4  |

---

## Next Task

Once all resources are activated, proceed to:  
➡️ [Task 2: Create Azure VPS](./02-create-azure-vps.md)
