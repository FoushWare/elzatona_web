# Task 6: Configure AI Providers

> **Time**: 20-30 minutes  
> **Prerequisites**: Student accounts activated (Task 1)

---

## Checklist

- [ ] Configure GitHub Copilot
- [ ] Setup Groq (free, fast)
- [ ] Setup GLM-4 (free)
- [ ] Setup Anthropic Claude (optional, paid)
- [ ] Create provider fallback chain
- [ ] Test all providers

---

## AI Provider Strategy

Use **free providers first**, fall back to paid only when needed:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Provider Priority                      │
├─────────────────────────────────────────────────────────────┤
│  1. GitHub Copilot (FREE for students)                       │
│     └─ Use for: Code completion, simple refactoring          │
│                                                              │
│  2. Groq - Llama 3.1 70B (FREE tier)                        │
│     └─ Use for: Complex reasoning, code review               │
│                                                              │
│  3. GLM-4 (FREE tier)                                       │
│     └─ Use for: Backup, multilingual support                 │
│                                                              │
│  4. Claude 3.5 Sonnet (PAID - use sparingly)                │
│     └─ Use for: Critical decisions, complex bugs             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: GitHub Copilot Setup

### Verify Copilot Access

1. Go to: https://github.com/settings/copilot
2. Ensure it shows "Active" under your student subscription

### Install Copilot CLI

```bash
# SSH into VPS
ssh moltbot

# Install Copilot CLI extension
gh auth login  # If not already logged in
gh extension install github/gh-copilot

# Verify
gh copilot --version
```

### Using Copilot CLI

```bash
# Explain code
gh copilot explain "what does this function do"

# Suggest command
gh copilot suggest "find all TypeScript files with errors"

# Get help
gh copilot --help
```

### Limitations

⚠️ **Copilot CLI has no direct API** - it's interactive only. MoltBot will use it via shell commands for specific tasks.

---

## Step 2: Groq Setup (Free & Fast)

Groq offers **free** access to Llama 3.1 70B with very fast inference.

### Get API Key

1. Go to: https://console.groq.com/
2. Sign in with GitHub
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_`)

### Configure on VPS

```bash
# Add to credentials file
nano ~/.moltbot-credentials

# Add this line:
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Test Groq API

```bash
source ~/.moltbot-credentials

curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-70b-versatile",
    "messages": [{"role": "user", "content": "Hello, I am Hamada the AI assistant!"}],
    "max_tokens": 100
  }'
```

### Groq Models (Free Tier)

| Model                     | Best For          | Speed     |
| ------------------------- | ----------------- | --------- |
| `llama-3.1-70b-versatile` | Complex reasoning | Fast      |
| `llama-3.1-8b-instant`    | Simple tasks      | Very fast |
| `mixtral-8x7b-32768`      | Long context      | Fast      |
| `gemma2-9b-it`            | Balanced          | Fast      |

### Free Tier Limits

- ~14,400 requests/day
- ~500,000 tokens/day
- Rate limit: 30 requests/minute

---

## Step 3: GLM-4 Setup (Free)

Zhipu AI's GLM-4 is a capable model with a free tier.

### Get API Key

1. Go to: https://open.bigmodel.cn/ (or https://www.zhipuai.cn/ for international)
2. Create account
3. Navigate to API Keys section
4. Create new key

### Configure on VPS

```bash
# Add to credentials file
nano ~/.moltbot-credentials

# Add this line:
GLM_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GLM_API_BASE="https://open.bigmodel.cn/api/paas/v4"
```

### Test GLM-4 API

```bash
source ~/.moltbot-credentials

curl -X POST "${GLM_API_BASE}/chat/completions" \
  -H "Authorization: Bearer $GLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-4",
    "messages": [{"role": "user", "content": "Hello, I am Hamada!"}],
    "max_tokens": 100
  }'
```

### GLM Models

| Model         | Description          |
| ------------- | -------------------- |
| `glm-4`       | Latest, most capable |
| `glm-4-flash` | Faster, lighter      |
| `glm-4-air`   | Balanced             |

---

## Step 4: Anthropic Claude Setup (Optional - Paid)

For complex tasks that free models can't handle well.

### Get API Key

1. Go to: https://console.anthropic.com/
2. Sign up/login
3. Go to **API Keys** → **Create Key**
4. Add payment method ($5 minimum)

### Configure on VPS

```bash
# Add to credentials file
nano ~/.moltbot-credentials

# Add this line:
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Test Claude API

```bash
source ~/.moltbot-credentials

curl -X POST "https://api.anthropic.com/v1/messages" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello, I am Hamada!"}]
  }'
```

### Claude Models & Pricing

| Model             | Input    | Output   | Best For      |
| ----------------- | -------- | -------- | ------------- |
| claude-3-5-sonnet | $3/1M    | $15/1M   | ✅ Best value |
| claude-3-opus     | $15/1M   | $75/1M   | Complex tasks |
| claude-3-haiku    | $0.25/1M | $1.25/1M | Simple tasks  |

---

## Step 5: Brave Search API (Optional)

For web search capabilities.

### Get API Key

1. Go to: https://brave.com/search/api/
2. Sign up for free tier
3. Get API key

### Configure on VPS

```bash
# Add to credentials file
nano ~/.moltbot-credentials

# Add this line:
BRAVE_API_KEY="BSAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Test Search

```bash
source ~/.moltbot-credentials

curl -X GET "https://api.search.brave.com/res/v1/web/search?q=react+testing+library" \
  -H "X-Subscription-Token: $BRAVE_API_KEY"
```

---

## Step 6: Create Provider Configuration

Create a unified config file for MoltBot:

```bash
# Create config directory
mkdir -p ~/moltbot/config

# Create provider config
cat > ~/moltbot/config/providers.json << 'EOF'
{
  "providers": {
    "groq": {
      "enabled": true,
      "priority": 1,
      "apiBase": "https://api.groq.com/openai/v1",
      "model": "llama-3.1-70b-versatile",
      "maxTokens": 4096,
      "rateLimit": {
        "requestsPerMinute": 30,
        "tokensPerDay": 500000
      }
    },
    "glm": {
      "enabled": true,
      "priority": 2,
      "apiBase": "https://open.bigmodel.cn/api/paas/v4",
      "model": "glm-4",
      "maxTokens": 4096
    },
    "anthropic": {
      "enabled": false,
      "priority": 3,
      "apiBase": "https://api.anthropic.com/v1",
      "model": "claude-3-5-sonnet-20241022",
      "maxTokens": 4096,
      "comment": "Enable only for critical tasks (paid)"
    }
  },
  "fallback": {
    "enabled": true,
    "order": ["groq", "glm", "anthropic"]
  },
  "costControl": {
    "maxDailySpend": 5.00,
    "warningThreshold": 3.00,
    "preferFreeProviders": true
  }
}
EOF
```

---

## Step 7: Test All Providers Script

Create a script to test all configured providers:

```bash
cat > ~/test-providers.sh << 'EOF'
#!/bin/bash
source ~/.moltbot-credentials

echo "=== Testing AI Providers ==="
echo ""

# Test Groq
echo "1. Testing Groq..."
GROQ_RESPONSE=$(curl -s -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.1-8b-instant", "messages": [{"role": "user", "content": "Say hello"}], "max_tokens": 10}')

if echo "$GROQ_RESPONSE" | jq -e '.choices[0].message.content' > /dev/null 2>&1; then
  echo "   ✅ Groq: Working"
else
  echo "   ❌ Groq: Failed - $GROQ_RESPONSE"
fi

# Test GLM (if configured)
if [ -n "$GLM_API_KEY" ]; then
  echo "2. Testing GLM-4..."
  GLM_RESPONSE=$(curl -s -X POST "https://open.bigmodel.cn/api/paas/v4/chat/completions" \
    -H "Authorization: Bearer $GLM_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"model": "glm-4-flash", "messages": [{"role": "user", "content": "Say hello"}], "max_tokens": 10}')

  if echo "$GLM_RESPONSE" | jq -e '.choices[0].message.content' > /dev/null 2>&1; then
    echo "   ✅ GLM-4: Working"
  else
    echo "   ❌ GLM-4: Failed"
  fi
else
  echo "2. GLM-4: Not configured (skipped)"
fi

# Test Anthropic (if configured)
if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo "3. Testing Claude..."
  CLAUDE_RESPONSE=$(curl -s -X POST "https://api.anthropic.com/v1/messages" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "Content-Type: application/json" \
    -d '{"model": "claude-3-haiku-20240307", "max_tokens": 10, "messages": [{"role": "user", "content": "Say hello"}]}')

  if echo "$CLAUDE_RESPONSE" | jq -e '.content[0].text' > /dev/null 2>&1; then
    echo "   ✅ Claude: Working"
  else
    echo "   ❌ Claude: Failed"
  fi
else
  echo "3. Claude: Not configured (skipped)"
fi

# Test GitHub Copilot CLI
echo "4. Testing GitHub Copilot CLI..."
if gh copilot --version > /dev/null 2>&1; then
  echo "   ✅ Copilot CLI: Installed"
else
  echo "   ❌ Copilot CLI: Not installed"
fi

echo ""
echo "=== Test Complete ==="
EOF

chmod +x ~/test-providers.sh
./test-providers.sh
```

---

## Cost-Saving Tips

### 1. Use Free Providers First

```
groq (free) → glm (free) → claude (paid)
```

### 2. Cache Responses

Don't re-query for the same questions.

### 3. Use Smaller Models for Simple Tasks

```
Simple task → llama-3.1-8b-instant (fast, free)
Complex task → llama-3.1-70b (slower, free)
Critical task → claude-3.5-sonnet (paid)
```

### 4. Set Daily Spending Limits

Configure MoltBot to stop using paid APIs after $X/day.

### 5. Batch Similar Requests

Combine multiple small queries into one larger request.

---

## Final Credentials File

Your `~/.moltbot-credentials` should look like:

```bash
# MoltBot Credentials - DO NOT SHARE OR COMMIT

# Telegram Bot
TELEGRAM_BOT_TOKEN="7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TELEGRAM_CHAT_ID="123456789"
TELEGRAM_BOT_NAME="Hamada"

# AI Providers (Free)
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GLM_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GLM_API_BASE="https://open.bigmodel.cn/api/paas/v4"

# AI Providers (Paid - Optional)
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Search (Optional)
BRAVE_API_KEY="BSAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# GitHub (from Task 8)
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## Next Task

Once AI providers are configured, proceed to:  
➡️ [Task 7: Install MoltBot](./07-install-moltbot.md)
