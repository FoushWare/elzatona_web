# Task 5: Setup Telegram Bot

> **Time**: 10-15 minutes  
> **Prerequisites**: Telegram account

---

## Checklist

- [ ] Create bot with BotFather
- [ ] Get bot token
- [ ] Configure bot settings
- [ ] Get your chat ID
- [ ] Test bot connectivity

---

## Overview

We'll create a Telegram bot named **Hamada** 🤖 that will:

- Receive commands from you
- Execute tasks on the VPS
- Report results back

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   You        │───▶│   Telegram   │───▶│   MoltBot    │
│   (Phone)    │◀───│   Servers    │◀───│   (VPS)      │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Step 1: Create Bot with BotFather

1. Open Telegram app (mobile or desktop)
2. Search for **@BotFather**
3. Start a chat and send: `/newbot`
4. Follow the prompts:

```
You: /newbot

BotFather: Alright, a new bot. How are we going to call it?
          Please choose a name for your bot.

You: Hamada AI Assistant

BotFather: Good. Now let's choose a username for your bot.
          It must end in `bot`. Like this, for example: TetrisBot

You: HamadaElzatonaBot

BotFather: Done! Congratulations on your new bot. You will find it at
          t.me/HamadaElzatonaBot. You can now add a description, about
          section and profile picture for your bot...

          Use this token to access the HTTP API:
          7123456789:TOKEN

          Keep your token secure and store it safely...
```

⚠️ **IMPORTANT**: Save the token! It looks like: `7123456789:TOKEN`

---

## Step 2: Configure Bot Settings

While still in BotFather, configure these settings:

### Set Description

```
/setdescription

Select bot: @HamadaElzatonaBot

Description: 🤖 Hamada - AI Assistant for elzatona_web project.
Helps with refactoring, testing, and GitHub issue management.
```

### Set About Text

```
/setabouttext

Select bot: @HamadaElzatonaBot

About: I'm Hamada, an AI coding assistant that helps with:
• Code refactoring
• Running tests
• Fixing GitHub issues
• Preparing open-source contributions

Created for the elzatona_web project.
```

### Set Bot Picture (Optional)

```
/setuserpic

Select bot: @HamadaElzatonaBot

[Send an image - maybe a robot emoji or project logo]
```

### Set Commands

```
/setcommands

Select bot: @HamadaElzatonaBot

[Send this text:]
start - Initialize Hamada
help - Show available commands
status - Check bot and task status
refactor - Request code refactoring
issue - Work on a GitHub issue
test - Run tests
lint - Run linting
build - Build the project
logs - View recent logs
stop - Stop current task
```

---

## Step 3: Get Your Chat ID

The bot needs your chat ID to know who to communicate with.

### Method 1: Using @userinfobot

1. Search for **@userinfobot** on Telegram
2. Start a chat
3. It will reply with your user info including **Id**:

```
Id: 123456789
First: Your
Last: Name
...
```

### Method 2: Using the Bot API

1. Start a chat with your new bot (@HamadaElzatonaBot)
2. Send any message to it (like "hello")
3. Open this URL in browser (replace TOKEN):

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

4. Find your chat ID in the response:

```json
{
  "ok": true,
  "result": [{
    "message": {
      "chat": {
        "id": 123456789,  <-- This is your chat ID
        "first_name": "Your",
        "type": "private"
      }
    }
  }]
}
```

---

## Step 4: Save Credentials

On your VPS, add the Telegram credentials:

```bash
# SSH into VPS
ssh moltbot

# Edit credentials file
nano ~/.moltbot-credentials
```

Add these lines:

```bash
# Telegram Bot
TELEGRAM_BOT_TOKEN="7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TELEGRAM_CHAT_ID="123456789"
TELEGRAM_BOT_NAME="Hamada"
```

Secure the file:

```bash
chmod 600 ~/.moltbot-credentials
```

---

## Step 5: Test Bot Connectivity

Create a simple test script:

```bash
# On VPS
cat > ~/test-telegram.sh << 'EOF'
#!/bin/bash
source ~/.moltbot-credentials

MESSAGE="🤖 Hamada is online and ready to help with elzatona_web!"

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=${MESSAGE}" \
  -d "parse_mode=Markdown"
EOF

chmod +x ~/test-telegram.sh
./test-telegram.sh
```

You should receive a message in Telegram from your bot!

---

## Step 6: Enable Bot Privacy Mode (Optional)

If you want the bot to receive all messages in groups (not just commands):

```
/setprivacy

Select bot: @HamadaElzatonaBot

Choose: Disable

BotFather: Privacy mode is disabled for HamadaElzatonaBot.
```

---

## Telegram Bot Reference

### Sending Messages (from VPS)

```bash
# Simple text message
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=Hello from Hamada!"

# Markdown formatted
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=*Bold* and _italic_ text" \
  -d "parse_mode=Markdown"

# Send a document
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  -F "document=@/path/to/file.txt"
```

### Receiving Messages

MoltBot will handle this, but for testing:

```bash
# Get updates (messages sent to bot)
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" | jq
```

---

## Bot Commands Reference

After setup, these commands will be available:

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `/start`           | Initialize Hamada, show welcome message |
| `/help`            | Show all available commands             |
| `/status`          | Check bot status, current tasks, memory |
| `/refactor <file>` | Refactor a specific file                |
| `/issue <number>`  | Work on GitHub issue #number            |
| `/test`            | Run project tests                       |
| `/lint`            | Run linting checks                      |
| `/build`           | Build the project                       |
| `/logs`            | Show recent activity logs               |
| `/stop`            | Cancel current running task             |

---

## Verification Checklist

- [ ] Bot created with BotFather
- [ ] Token saved securely on VPS
- [ ] Chat ID obtained and saved
- [ ] Test message sent successfully
- [ ] Commands configured in BotFather

---

## Troubleshooting

### Bot not responding

```bash
# Check if token is correct
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"

# Should return bot info, not error
```

### "Unauthorized" error

```bash
# Token might be wrong or revoked
# Go to BotFather and use /token to get a new one
```

### Can't find chat ID

1. Make sure you've sent a message to the bot first
2. Check `/getUpdates` again
3. Try using @userinfobot instead

---

## Security Notes

⚠️ **Never share your bot token** - anyone with it can control your bot

⚠️ **Restrict chat ID** - MoltBot should only respond to your chat ID

⚠️ **Don't commit credentials** - Keep them in `~/.moltbot-credentials`

---

## Next Task

Once Telegram bot is set up, proceed to:  
➡️ [Task 6: Configure AI Providers](./06-configure-ai-providers.md)
