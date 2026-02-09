# Task 11: Test & Validate

> **Time**: 30-45 minutes  
> **Prerequisites**: All previous tasks completed

---

## Checklist

- [ ] Run component tests
- [ ] Test Telegram communication
- [ ] Test AI provider connections
- [ ] Test GitHub CLI integration
- [ ] Validate pairing security
- [ ] Run full end-to-end test
- [ ] Document any issues

---

## Overview

This final task validates that all components work together correctly before using Hamada in production.

---

## Step 1: Pre-Test Checklist

Verify all components are in place:

```bash
# SSH into VPS
ssh moltbot

# Run comprehensive check
cat << 'EOF' | bash
echo "🔍 Running Pre-Test Checklist..."
echo "================================"

# 1. Check Node.js
echo -n "Node.js: "
node --version 2>/dev/null && echo "✅" || echo "❌ Not installed"

# 2. Check npm packages
echo -n "MoltBot dependencies: "
cd ~/moltbot && npm list --depth=0 >/dev/null 2>&1 && echo "✅" || echo "❌ Missing"

# 3. Check credentials
echo -n "Credentials file: "
[ -f ~/.moltbot-credentials ] && echo "✅" || echo "❌ Missing"

# 4. Check context files
echo -n "Context files: "
[ -f ~/moltbot/context/hamada-memory.md ] && echo "✅" || echo "❌ Missing"

# 5. Check GitHub CLI
echo -n "GitHub CLI: "
gh --version >/dev/null 2>&1 && echo "✅" || echo "❌ Not installed"

# 6. Check GitHub auth
echo -n "GitHub auth: "
gh auth status >/dev/null 2>&1 && echo "✅" || echo "❌ Not authenticated"

# 7. Check Cloudflare (optional)
echo -n "Cloudflare tunnel (optional): "
cloudflared --version >/dev/null 2>&1 && echo "✅ Installed" || echo "⚠️ Not installed"

# 8. Check systemd service
echo -n "SystemD service: "
systemctl is-enabled moltbot >/dev/null 2>&1 && echo "✅ Enabled" || echo "⚠️ Not enabled"

echo "================================"
echo "Pre-test checklist complete!"
EOF
```

---

## Step 2: Test AI Provider Connections

### Test Groq API

```bash
source ~/.moltbot-credentials

curl -s https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [{"role": "user", "content": "Reply with only: Hamada test OK"}],
    "max_tokens": 20
  }' | jq -r '.choices[0].message.content // "❌ API Error"'
```

### Test GLM-4 API (if configured)

```bash
# Test GLM-4 connection
curl -s https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $GLM4_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-4-flash",
    "messages": [{"role": "user", "content": "Reply with only: Hamada test OK"}]
  }' | jq -r '.choices[0].message.content // "❌ API Error or not configured"'
```

### Test Claude API (if configured)

```bash
# Test Claude (sparingly - paid API)
if [ -n "$ANTHROPIC_API_KEY" ]; then
  curl -s https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "claude-3-haiku-20240307",
      "max_tokens": 20,
      "messages": [{"role": "user", "content": "Reply with only: Hamada test OK"}]
    }' | jq -r '.content[0].text // "❌ API Error"'
else
  echo "⚠️ Claude not configured (optional)"
fi
```

---

## Step 3: Test Telegram Bot

### Send Test Message from Server

```bash
source ~/.moltbot-credentials

# Send test message
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=🤖 Hamada VPS Test - $(date '+%Y-%m-%d %H:%M:%S UTC')" \
  -d "parse_mode=Markdown" | jq -r '.ok'
```

**Expected:** `true` and you should receive the message in Telegram.

### Verify Bot Webhook (if using)

```bash
# Check webhook status
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getWebhookInfo" | jq
```

### Test Bot Response Loop

```bash
cd ~/moltbot

# Create simple test script
cat > test-telegram.js << 'EOF'
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log('🔍 Starting Telegram connection test...');

bot.on('text', (ctx) => {
  console.log(`✅ Received message: "${ctx.message.text}"`);
  ctx.reply(`🤖 Test received: "${ctx.message.text}"`);
});

bot.launch().then(() => {
  console.log('✅ Bot connected to Telegram!');
  console.log('📱 Send a message to your bot in Telegram...');
  console.log('⏱️  Test will auto-stop in 60 seconds...');

  setTimeout(() => {
    console.log('🛑 Test complete. Stopping bot.');
    bot.stop();
    process.exit(0);
  }, 60000);
}).catch(err => {
  console.error('❌ Failed to connect:', err.message);
  process.exit(1);
});
EOF

# Run test (60 second timeout)
node test-telegram.js
```

**Action:** While the test runs, send a message to Hamada in Telegram. You should see it logged and get a reply.

---

## Step 4: Test GitHub CLI Integration

```bash
# Test GitHub auth
gh auth status

# Test repo access
gh repo view --json name,owner

# Test issue listing
gh issue list --limit 5 --json number,title

# Test creating a test branch (then delete it)
git checkout -b test-hamada-integration
git checkout -
git branch -d test-hamada-integration

echo "✅ GitHub CLI integration working!"
```

---

## Step 5: Test Pairing Code Security

```bash
cd ~/moltbot

# Create security test script
cat > test-pairing.js << 'EOF'
const ContextLoader = require('./context-loader');

console.log('🔐 Testing pairing code security...\n');

const ctx = new ContextLoader();
ctx.load();

// Test correct code
const correctCode = 'HAMADA-2026';
const wrongCode = 'WRONG-CODE';

console.log(`Testing correct code (${correctCode}):`,
  ctx.validatePairingCode(correctCode) ? '✅ Accepted' : '❌ Rejected');

console.log(`Testing wrong code (${wrongCode}):`,
  ctx.validatePairingCode(wrongCode) ? '❌ SECURITY ISSUE!' : '✅ Rejected correctly');

console.log('\n🔐 Pairing security test complete!');
EOF

node test-pairing.js
```

**Expected output:**

```
Testing correct code (HAMADA-2026): ✅ Accepted
Testing wrong code (WRONG-CODE): ✅ Rejected correctly
```

---

## Step 6: Full End-to-End Test

Run the complete MoltBot and test all features:

```bash
cd ~/moltbot

# Start bot in foreground for testing
node hamada-bot.js
```

### In Telegram, test these commands:

| Command       | Expected Response                        |
| ------------- | ---------------------------------------- |
| `/start`      | Welcome message with pairing code prompt |
| `HAMADA-2026` | Pairing successful message               |
| `/help`       | List of all available commands           |
| `/status`     | System status including GitHub           |
| `/issue 1`    | Details of issue #1 (if exists)          |
| Any text      | AI-powered response                      |
| `/refactor`   | Refactoring assistant prompt             |

### Test AI Response Quality

Send this message to Hamada in Telegram:

```
Can you explain what the elzatona_web project is about and what tech stack it uses?
```

**Expected:** Hamada should respond with accurate information from the context file (Next.js, TypeScript, Vitest, etc.)

---

## Step 7: Stress Test (Optional)

```bash
# Test handling multiple rapid messages
cat > stress-test.js << 'EOF'
const https = require('https');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

console.log('🔥 Running stress test (5 rapid messages)...\n');

const messages = [
  'Test message 1',
  'Test message 2',
  'Test message 3',
  '/help',
  '/status'
];

messages.forEach((msg, i) => {
  setTimeout(() => {
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`;
    https.get(url, (res) => {
      console.log(`Message ${i + 1}: ${res.statusCode === 200 ? '✅' : '❌'}`);
    });
  }, i * 500); // 500ms between messages
});

setTimeout(() => {
  console.log('\n✅ Stress test complete!');
  process.exit(0);
}, 5000);
EOF

node stress-test.js
```

---

## Step 8: Start Production Service

Once all tests pass:

```bash
# Stop any test instances
pkill -f "node.*hamada" || true

# Start systemd service
sudo systemctl start moltbot
sudo systemctl status moltbot

# Check logs
journalctl -u moltbot -f --no-pager -n 20
```

---

## Step 9: Create Health Check Script

```bash
cat > ~/moltbot/health-check.sh << 'EOF'
#!/bin/bash
# Hamada Health Check Script

echo "🏥 Hamada Health Check - $(date)"
echo "================================"

# Check if bot process is running
if pgrep -f "node.*hamada" > /dev/null; then
  echo "✅ Bot process: Running"
else
  echo "❌ Bot process: NOT RUNNING"
fi

# Check systemd service
if systemctl is-active --quiet moltbot; then
  echo "✅ SystemD service: Active"
else
  echo "❌ SystemD service: Inactive"
fi

# Check memory usage
MEM=$(free -m | awk 'NR==2{printf "%.0f%%", $3*100/$2}')
echo "📊 Memory usage: $MEM"

# Check disk usage
DISK=$(df -h / | awk 'NR==2{print $5}')
echo "💾 Disk usage: $DISK"

# Check recent errors
ERRORS=$(journalctl -u moltbot --since "1 hour ago" -p err --no-pager -q | wc -l)
echo "⚠️  Errors (last hour): $ERRORS"

# Test Telegram API (quick)
source ~/.moltbot-credentials
TELEGRAM_OK=$(curl -s -o /dev/null -w "%{http_code}" "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe")
if [ "$TELEGRAM_OK" = "200" ]; then
  echo "✅ Telegram API: Connected"
else
  echo "❌ Telegram API: Error ($TELEGRAM_OK)"
fi

# Test Groq API (quick)
GROQ_OK=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  "https://api.groq.com/openai/v1/models")
if [ "$GROQ_OK" = "200" ]; then
  echo "✅ Groq API: Connected"
else
  echo "⚠️  Groq API: Error ($GROQ_OK)"
fi

echo "================================"
EOF

chmod +x ~/moltbot/health-check.sh

# Run health check
~/moltbot/health-check.sh
```

---

## Step 10: Add Health Check Cron

```bash
# Add to crontab (runs every 30 minutes)
(crontab -l 2>/dev/null; echo "*/30 * * * * ~/moltbot/health-check.sh >> ~/moltbot/logs/health.log 2>&1") | crontab -

# Verify
crontab -l | grep health-check
```

---

## Troubleshooting Guide

### Bot Not Responding

```bash
# Check if running
pgrep -f hamada

# Check logs
journalctl -u moltbot -n 50 --no-pager

# Restart service
sudo systemctl restart moltbot
```

### Telegram Connection Issues

```bash
# Verify token
source ~/.moltbot-credentials
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe" | jq

# Check for webhook conflicts
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook"
```

### AI Not Responding

```bash
# Check API keys
source ~/.moltbot-credentials
echo "Groq key present: $([ -n "$GROQ_API_KEY" ] && echo 'Yes' || echo 'No')"

# Test API directly
curl -s https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $GROQ_API_KEY" | jq '.data[0].id'
```

### GitHub CLI Issues

```bash
# Re-authenticate
gh auth login --web

# Verify
gh auth status
```

### High Memory Usage

```bash
# Check node process memory
ps aux | grep node | grep -v grep

# Restart service (clears memory)
sudo systemctl restart moltbot
```

---

## Final Validation Checklist

| Test                               | Status |
| ---------------------------------- | ------ |
| Pre-test checklist passes          | ⬜     |
| Groq API responds                  | ⬜     |
| GLM-4 API responds (if configured) | ⬜     |
| Telegram bot receives messages     | ⬜     |
| Telegram bot sends responses       | ⬜     |
| GitHub CLI authenticated           | ⬜     |
| Pairing code security works        | ⬜     |
| Bot knows project context          | ⬜     |
| SystemD service running            | ⬜     |
| Health check script works          | ⬜     |

---

## 🎉 Setup Complete!

Congratulations! Hamada is now:

- ✅ Running on your VPS
- ✅ Connected to Telegram
- ✅ Powered by free AI (Groq/GLM-4)
- ✅ Integrated with GitHub
- ✅ Configured with project context
- ✅ Secured with pairing code
- ✅ Monitored with health checks

### Daily Commands You'll Use

```
/start - Begin session
/status - Check system status
/issue <n> - Work on issue
/refactor <file> - Improve code
/test - Run tests
/help - All commands
```

### Next Steps

1. **Start using Hamada daily** for code tasks
2. **Iterate on context** - Update `hamada-memory.md` as project evolves
3. **Add more skills** - Extend `skills.json` for new capabilities
4. **Monitor costs** - Check API usage weekly
5. **Contribute back** - Share your improvements!

---

## Quick Reference Card

Save this for quick access:

```
┌──────────────────────────────────────────────┐
│ 🤖 HAMADA QUICK REFERENCE                    │
├──────────────────────────────────────────────┤
│ SSH: ssh moltbot                             │
│ Start: sudo systemctl start moltbot          │
│ Stop: sudo systemctl stop moltbot            │
│ Logs: journalctl -u moltbot -f               │
│ Health: ~/moltbot/health-check.sh            │
├──────────────────────────────────────────────┤
│ Telegram Commands:                           │
│ /start /help /status /issue /refactor /test  │
├──────────────────────────────────────────────┤
│ Pairing Code: HAMADA-2026                    │
│ Bot: @HamadaElzatonaBot                      │
└──────────────────────────────────────────────┘
```

---

## Back to Overview

➡️ [README - MoltBot Setup Overview](./README.md)
