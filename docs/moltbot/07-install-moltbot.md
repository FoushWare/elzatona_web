# Task 7: Install MoltBot

> **Time**: 30-45 minutes  
> **Prerequisites**: All previous tasks completed

---

## Checklist

- [ ] Clone MoltBot repository
- [ ] Install dependencies
- [ ] Configure environment
- [ ] Setup Docker (optional)
- [ ] Configure Hamada personality
- [ ] Start the bot
- [ ] Verify connectivity

---

## Option A: Install via npm (Recommended)

### Step 1: Create Project Directory

```bash
# SSH into VPS
ssh moltbot

# Create MoltBot directory
mkdir -p ~/moltbot
cd ~/moltbot
```

### Step 2: Initialize Project

```bash
# Initialize npm project
npm init -y

# Install MoltBot core dependencies
npm install telegraf dotenv axios openai @anthropic-ai/sdk

# Install additional utilities
npm install winston node-cron simple-git
```

### Step 3: Create Main Bot File

```bash
cat > ~/moltbot/index.js << 'EOF'
require('dotenv').config({ path: process.env.HOME + '/.moltbot-credentials' });
const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'hamada.log' }),
    new winston.transports.Console()
  ]
});

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Security: Only respond to allowed chat
bot.use((ctx, next) => {
  if (ctx.chat?.id.toString() !== ALLOWED_CHAT_ID) {
    logger.warn(`Unauthorized access attempt from chat ${ctx.chat?.id}`);
    return ctx.reply('⛔ Unauthorized. I only talk to my creator!');
  }
  return next();
});

// Welcome message
bot.start((ctx) => {
  ctx.reply(`🤖 *Hamada is online!*

I'm your AI assistant for the elzatona_web project.

*Available commands:*
/help - Show all commands
/status - Check system status
/refactor <file> - Refactor a file
/issue <number> - Work on GitHub issue
/test - Run tests
/lint - Run linting
/build - Build project
/logs - View recent logs
/stop - Cancel current task

Let's make elzatona_web ready for open source! 🚀`, { parse_mode: 'Markdown' });
});

// Help command
bot.command('help', (ctx) => {
  ctx.reply(`📚 *Hamada Commands*

*Code Tasks:*
/refactor <file> - AI-powered refactoring
/issue <n> - Work on GitHub issue #n
/test - Run project tests
/lint - Run ESLint
/build - Build the project

*System:*
/status - System & project status
/logs - Recent activity
/stop - Cancel running task

*AI Providers:*
Using: Groq (free) → GLM (free) → Claude (paid)

Need help? Just ask! 💬`, { parse_mode: 'Markdown' });
});

// Status command
bot.command('status', async (ctx) => {
  try {
    const { stdout: memory } = await execAsync('free -h | grep Mem');
    const { stdout: disk } = await execAsync('df -h / | tail -1');
    const { stdout: uptime } = await execAsync('uptime -p');

    ctx.reply(`📊 *System Status*

🖥️ *Memory:*
\`${memory.trim()}\`

💾 *Disk:*
\`${disk.trim()}\`

⏱️ *Uptime:* ${uptime.trim()}

🤖 *Hamada:* Online and ready!`, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply(`❌ Error getting status: ${error.message}`);
  }
});

// Run tests
bot.command('test', async (ctx) => {
  ctx.reply('🧪 Running tests... This may take a while.');
  logger.info('Running tests');

  try {
    const { stdout, stderr } = await execAsync('cd ~/elzatona_web && npm run test:unit:vitest 2>&1 | tail -50', {
      timeout: 300000 // 5 minutes
    });
    ctx.reply(`✅ *Test Results:*\n\`\`\`\n${stdout.slice(-3000)}\n\`\`\``, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply(`❌ Tests failed:\n\`\`\`\n${error.message.slice(-2000)}\n\`\`\``, { parse_mode: 'Markdown' });
  }
});

// Run lint
bot.command('lint', async (ctx) => {
  ctx.reply('🔍 Running linter...');
  logger.info('Running lint');

  try {
    const { stdout } = await execAsync('cd ~/elzatona_web && npm run lint 2>&1 | tail -50', {
      timeout: 120000
    });
    ctx.reply(`✅ *Lint Results:*\n\`\`\`\n${stdout.slice(-3000)}\n\`\`\``, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply(`⚠️ Lint issues:\n\`\`\`\n${error.stdout?.slice(-2000) || error.message}\n\`\`\``, { parse_mode: 'Markdown' });
  }
});

// Build project
bot.command('build', async (ctx) => {
  ctx.reply('🏗️ Building project...');
  logger.info('Running build');

  try {
    const { stdout } = await execAsync('cd ~/elzatona_web && npm run build:check 2>&1 | tail -30', {
      timeout: 600000 // 10 minutes
    });
    ctx.reply(`✅ *Build successful!*\n\`\`\`\n${stdout.slice(-2000)}\n\`\`\``, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply(`❌ Build failed:\n\`\`\`\n${error.message.slice(-2000)}\n\`\`\``, { parse_mode: 'Markdown' });
  }
});

// View logs
bot.command('logs', async (ctx) => {
  try {
    const { stdout } = await execAsync('tail -30 ~/moltbot/hamada.log');
    ctx.reply(`📜 *Recent Logs:*\n\`\`\`\n${stdout.slice(-3000)}\n\`\`\``, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply('No logs available yet.');
  }
});

// Work on GitHub issue
bot.command('issue', async (ctx) => {
  const issueNum = ctx.message.text.split(' ')[1];
  if (!issueNum) {
    return ctx.reply('Usage: /issue <number>\nExample: /issue 42');
  }

  ctx.reply(`🔍 Fetching issue #${issueNum}...`);
  logger.info(`Working on issue #${issueNum}`);

  try {
    const { stdout } = await execAsync(`cd ~/elzatona_web && gh issue view ${issueNum}`);
    ctx.reply(`📋 *Issue #${issueNum}:*\n\`\`\`\n${stdout.slice(0, 3000)}\n\`\`\`\n\nShall I work on this? Reply with details.`, { parse_mode: 'Markdown' });
  } catch (error) {
    ctx.reply(`❌ Error fetching issue: ${error.message}`);
  }
});

// Handle text messages (AI conversation)
bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  logger.info(`Received message: ${message}`);

  // Simple response for now - will be enhanced with AI
  ctx.reply(`🤔 Processing your request...\n\nMessage received: "${message}"\n\nAI integration coming soon!`);
});

// Error handling
bot.catch((err, ctx) => {
  logger.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply(`❌ An error occurred: ${err.message}`);
});

// Start bot
bot.launch().then(() => {
  logger.info('🤖 Hamada is online!');
  console.log('🤖 Hamada bot started successfully!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
EOF
```

### Step 4: Create Environment Loader

```bash
cat > ~/moltbot/.env << 'EOF'
# Load credentials from home directory
# Actual values are in ~/.moltbot-credentials
EOF
```

### Step 5: Start the Bot

```bash
# Test run
cd ~/moltbot
node index.js

# If working, stop with Ctrl+C and run in tmux
tmux new -s hamada
cd ~/moltbot && node index.js

# Detach: Ctrl+B, then D
```

---

## Option B: Install via Docker

### Step 1: Create Dockerfile

```bash
cat > ~/moltbot/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Install git and other tools
RUN apk add --no-cache git curl bash

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY . .

# Start bot
CMD ["node", "index.js"]
EOF
```

### Step 2: Create docker-compose.yml

```bash
cat > ~/moltbot/docker-compose.yml << 'EOF'
version: '3.8'

services:
  hamada:
    build: .
    container_name: hamada-bot
    restart: unless-stopped
    env_file:
      - /home/azureuser/.moltbot-credentials
    volumes:
      - ./logs:/app/logs
      - /home/azureuser/elzatona_web:/workspace:rw
    working_dir: /app
    networks:
      - hamada-network

networks:
  hamada-network:
    driver: bridge
EOF
```

### Step 3: Build and Run

```bash
cd ~/moltbot

# Build image
docker compose build

# Start container
docker compose up -d

# Check logs
docker compose logs -f
```

---

## Step 6: Configure Hamada's Personality

Create a system prompt for Hamada:

```bash
cat > ~/moltbot/config/system-prompt.txt << 'EOF'
You are Hamada, an AI coding assistant working on the elzatona_web project.

## About You
- Name: Hamada 🤖
- Role: AI coding assistant and pair programmer
- Personality: Helpful, knowledgeable, and encouraging

## About the Project
elzatona_web is a platform to help frontend developers (starting with React) prepare for technical interviews. The project is being:
1. Refactored for code quality
2. Secured with proper testing
3. Prepared for open-source contribution
4. Enhanced with gamification features

## About the Creator
- Frontend developer and Team Lead
- Building this as a side project
- Goal: Help developers stand out in interviews
- Planning to add more languages/frameworks later
- Making it open-source for community contributions

## Your Tasks
1. Help refactor code to improve quality
2. Fix GitHub issues securely
3. Add tests and documentation
4. Implement gamification features
5. Prepare codebase for open-source contributions

## Guidelines
- Always prioritize security
- Write clean, maintainable code
- Add tests for new features
- Follow existing code patterns
- Be encouraging and supportive
- Explain your changes clearly

## Tech Stack
- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- Nx monorepo
- Vitest for testing
- ESLint + Prettier
EOF
```

---

## Step 7: Setup Auto-Start

Create a systemd service to start Hamada on boot:

```bash
sudo cat > /etc/systemd/system/hamada.service << 'EOF'
[Unit]
Description=Hamada AI Bot
After=network.target

[Service]
Type=simple
User=azureuser
WorkingDirectory=/home/azureuser/moltbot
ExecStart=/usr/bin/node index.js
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable hamada
sudo systemctl start hamada

# Check status
sudo systemctl status hamada
```

---

## Step 8: Test the Bot

1. Open Telegram
2. Find your bot (@HamadaElzatonaBot)
3. Send `/start`
4. Try commands:
   - `/status` - Should show system info
   - `/help` - Should show commands
   - `/test` - Should attempt to run tests

---

## Verification Checklist

- [ ] Bot responds to `/start`
- [ ] Bot responds to `/status` with system info
- [ ] Bot only responds to your chat ID
- [ ] Bot runs in background (tmux or systemd)
- [ ] Logs are being written

---

## Quick Reference

```bash
# Start bot manually
cd ~/moltbot && node index.js

# Start in tmux
tmux new -s hamada 'cd ~/moltbot && node index.js'

# Start with systemd
sudo systemctl start hamada

# View logs
tail -f ~/moltbot/hamada.log

# Restart bot
sudo systemctl restart hamada

# Check bot status
sudo systemctl status hamada
```

---

## Troubleshooting

### Bot not responding

```bash
# Check if process is running
ps aux | grep node

# Check systemd status
sudo systemctl status hamada

# Check logs
tail -100 ~/moltbot/hamada.log
```

### "Unauthorized" message

Your chat ID might be wrong. Verify:

```bash
# Check configured chat ID
grep TELEGRAM_CHAT_ID ~/.moltbot-credentials

# Get actual chat ID by sending message to bot and checking updates
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates"
```

### Commands timing out

Increase timeout in the script or run commands in background.

---

## Next Task

Once MoltBot is running, proceed to:  
➡️ [Task 8: Setup GitHub CLI](./08-setup-github-cli.md)
