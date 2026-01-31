# Task 4: Install Dependencies

> **Time**: 15-20 minutes  
> **Prerequisites**: VPS secured and accessible

---

## Checklist

- [ ] Install Node.js 20 LTS
- [ ] Install npm/pnpm
- [ ] Install Python 3 and pip
- [ ] Install Homebrew (Linuxbrew)
- [ ] Install Docker
- [ ] Install development tools
- [ ] Verify all installations

---

## Step 1: Install Node.js 20 LTS

MoltBot requires Node.js 18+ (we'll use 20 LTS).

```bash
# SSH into your VM
ssh moltbot

# Install Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
# Should show: v20.x.x

npm --version
# Should show: 10.x.x
```

### Install pnpm (Optional but Recommended)

```bash
# Install pnpm globally
npm install -g pnpm

# Verify
pnpm --version
```

---

## Step 2: Install Python 3 and pip

Some tools (like certain AI SDKs) need Python.

```bash
# Python 3 should be pre-installed, verify:
python3 --version
# Should show: Python 3.10.x or higher

# Install pip if not present
sudo apt install -y python3-pip python3-venv

# Verify pip
pip3 --version

# Install pipx for isolated tools
sudo apt install -y pipx
pipx ensurepath
```

---

## Step 3: Install Homebrew (Linuxbrew)

Homebrew makes it easy to install many developer tools.

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH (follow the instructions shown after install)
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Install recommended dependencies
sudo apt install -y build-essential
brew install gcc

# Verify
brew --version
```

---

## Step 4: Install Docker

Docker is needed for running MoltBot in a container (optional but recommended).

```bash
# Install Docker using official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add current user to docker group (no sudo needed)
sudo usermod -aG docker $USER

# Apply group changes (or logout/login)
newgrp docker

# Verify
docker --version
docker run hello-world

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Verify
docker compose version
```

---

## Step 5: Install Warp Terminal (Optional)

Warp is a modern terminal, but it's primarily for local use. On VPS, you'll use standard terminal + tmux.

For **local machine** (macOS):

```bash
# On your local Mac
brew install --cask warp
```

For **VPS**, we'll use tmux instead:

```bash
# tmux should already be installed from Task 3
# If not:
sudo apt install -y tmux

# Install tmux plugin manager (optional)
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

---

## Step 6: Install Development Tools

```bash
# Git (should be installed)
git --version

# jq (JSON processor)
sudo apt install -y jq

# GitHub CLI
type -p curl >/dev/null || sudo apt install curl -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

# Verify
gh --version

# Install Copilot CLI extension
gh extension install github/gh-copilot
```

---

## Step 7: Install AI/ML Tools

```bash
# Install Aider (AI coding assistant)
pipx install aider-chat

# Verify
aider --version

# Install OpenAI Python SDK (for some integrations)
pip3 install openai anthropic groq
```

---

## Step 8: Configure Node.js Memory

For large projects like elzatona_web:

```bash
# Add to .bashrc
echo 'export NODE_OPTIONS="--max-old-space-size=3072"' >> ~/.bashrc
source ~/.bashrc
```

---

## Verification

Run this script to verify all installations:

```bash
#!/bin/bash
echo "=== Dependency Check ==="

echo -n "Node.js: "
node --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "npm: "
npm --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "pnpm: "
pnpm --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "Python: "
python3 --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "pip: "
pip3 --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "Docker: "
docker --version 2>/dev/null || echo "NOT INSTALLED"

echo -n "GitHub CLI: "
gh --version 2>/dev/null | head -n1 || echo "NOT INSTALLED"

echo -n "Homebrew: "
brew --version 2>/dev/null | head -n1 || echo "NOT INSTALLED"

echo -n "tmux: "
tmux -V 2>/dev/null || echo "NOT INSTALLED"

echo -n "Aider: "
aider --version 2>/dev/null || echo "NOT INSTALLED"

echo "=== Check Complete ==="
```

Save as `check-deps.sh` and run:

```bash
chmod +x check-deps.sh
./check-deps.sh
```

### Expected Output

```
=== Dependency Check ===
Node.js: v20.x.x
npm: 10.x.x
pnpm: 8.x.x
Python: Python 3.10.x
pip: pip 22.x.x
Docker: Docker version 24.x.x
GitHub CLI: gh version 2.x.x
Homebrew: Homebrew 4.x.x
tmux: tmux 3.x
Aider: aider x.x.x
=== Check Complete ===
```

---

## Installed Tools Summary

| Tool       | Version | Purpose             |
| ---------- | ------- | ------------------- |
| Node.js    | 20.x    | Runtime for MoltBot |
| npm/pnpm   | Latest  | Package management  |
| Python 3   | 3.10+   | AI SDK dependencies |
| Docker     | Latest  | Container runtime   |
| GitHub CLI | Latest  | Git operations      |
| Homebrew   | Latest  | Package management  |
| tmux       | 3.x     | Session persistence |
| Aider      | Latest  | AI coding assistant |

---

## Quick Reference

```bash
# Start tmux session
tmux new -s moltbot

# Detach from tmux: Ctrl+B, then D
# Reattach: tmux attach -t moltbot

# Check Node.js memory limit
node -e "console.log(v8.getHeapStatistics().heap_size_limit / 1024 / 1024 + ' MB')"

# Update all npm global packages
npm update -g

# Update Homebrew packages
brew update && brew upgrade
```

---

## Troubleshooting

### npm install fails (memory)

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Or use swap (should already be set up from Task 2)
free -h
```

### Docker permission denied

```bash
# Ensure user is in docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Homebrew not found after install

```bash
# Add to PATH
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
```

---

## Next Task

Once all dependencies are installed, proceed to:  
➡️ [Task 5: Setup Telegram Bot](./05-setup-telegram-bot.md)
