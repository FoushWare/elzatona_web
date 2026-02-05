# MoltBot deployment and onboarding

This document describes manual and automated steps to deploy MoltBot/OpenClaw on a VM.

Files in the repo

- `infrastructure/terraform/azure/openclaw-vm/setup-deps.sh` — non-interactive VM setup (UFW, SSH hardening, Node.js 20, Python3, fail2ban).
- `infrastructure/terraform/azure/openclaw-vm/deploy-to-vm.sh` — local helper to copy and run `setup-deps.sh` on a remote VM.
- `infrastructure/terraform/azure/openclaw-vm/install-openclaw.sh` — interactive installer helper for `openclaw onboard`.
- `infrastructure/terraform/azure/openclaw-vm/install-openclaw-auto.sh` — automated onboarding using an `answers.txt` file and `expect`.

## Quick workflow

1. Prepare VM and SSH access.
2. Install OS-level deps (from local machine):

```bash
cd infrastructure/terraform/azure/openclaw-vm
./deploy-to-vm.sh <VM_IP> ~/.ssh/id_rsa <username>
```

3. Install OpenClaw (interactive):

```bash
scp -i ~/.ssh/id_rsa install-openclaw.sh <user>@<VM_IP>:~
ssh -i ~/.ssh/id_rsa -t <user>@<VM_IP> 'chmod +x ~/install-openclaw.sh && sudo ~/install-openclaw.sh'
```

## Automated onboarding (best-effort)

1. Create `answers.txt` locally. Each line corresponds to one prompt the installer will ask. Example for just the Telegram token:

```
123456:ABCDEFghIJK_lMnOPQrstUVwxYZ
```

2. Secure the file and copy it together with the auto installer:

```bash
chmod 600 answers.txt
scp -i ~/.ssh/id_rsa install-openclaw-auto.sh answers.txt <user>@<VM_IP>:~
ssh -i ~/.ssh/id_rsa <user>@<VM_IP> 'chmod +x ~/install-openclaw-auto.sh && ~/install-openclaw-auto.sh --answers-file ~/answers.txt'
```

Security note: `answers.txt` may contain secrets. Remove it from the VM after use: `shred -u ~/answers.txt` or `rm -f ~/answers.txt` and clear history.

## Telegram Bot creation quick steps

1. Open Telegram and message `@BotFather`.
2. Send `/newbot` and follow prompts for name and username.
3. Copy the bot token (looks like `123456:ABCDEF...`) and provide it to the onboarding process (via interactive prompt, env var `TELEGRAM_BOT_TOKEN`, or `answers.txt`).

## Systemd unit template (Node)

Create `/etc/systemd/system/moltbot.service` (adjust `ExecStart` and `User`):

```ini
[Unit]
Description=MoltBot
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/moltbot
ExecStart=/usr/bin/npm start
EnvironmentFile=/opt/moltbot/.env
Restart=always

[Install]
WantedBy=multi-user.target
```

After adding the unit:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now moltbot.service
sudo journalctl -u moltbot.service -n 200 --no-pager
```

## Verification commands

- Check OpenClaw binary and version:

```bash
which openclaw && openclaw --version
```

- Check service / pm2 / process:

```bash
sudo systemctl status moltbot.service --no-pager || pm2 ls || ps aux | grep -i moltbot
```

- Check install logs and setup logs:

```bash
sudo tail -n 200 /var/log/setup-deps.log
sudo journalctl -n 200 --no-pager | head -n 200
```

## Pairing Telegram (approve users)

After onboarding, users attempting to connect via Telegram will see a pairing code in their chat. Approve that code from the gateway owner account on the VM:

1. Capture the code (either from the Telegram chat or from the gateway logs):

```bash
ssh -i ~/.ssh/id_rsa azureuser@<VM_IP> 'journalctl --user -u openclaw-gateway.service -n 400 --no-pager | grep -i pair -n || true'
```

2. Approve the code as the gateway owner (replace `<CODE>`):

```bash
ssh -i ~/.ssh/id_rsa azureuser@<VM_IP> "openclaw pairing approve telegram <CODE>"
```

3. If the code expired, re-trigger pairing from Telegram (message the bot) and watch logs live to capture the fresh code:

```bash
ssh -i ~/.ssh/id_rsa azureuser@<VM_IP>
journalctl --user -u openclaw-gateway.service -f | grep --line-buffered -i pair
```

## Gateway troubleshooting & UI build

If the Control UI reports missing assets or the gateway closes with abnormal closure (1006), use the helper script `openclaw-fix-gateway.sh` to reinstall OpenClaw, build UI assets, restart the gateway and collect logs.

Run from your local machine:

```bash
scp -i ~/.ssh/id_rsa infrastructure/terraform/azure/openclaw-vm/openclaw-fix-gateway.sh azureuser@<VM_IP>:~
ssh -i ~/.ssh/id_rsa azureuser@<VM_IP> 'chmod +x ~/openclaw-fix-gateway.sh && ~/openclaw-fix-gateway.sh'
```

Key diagnostics to collect (if problems persist):

```bash
# Check gateway user service
systemctl --user status openclaw-gateway.service --no-pager
journalctl --user -u openclaw-gateway.service -n 400 --no-pager

# Check installed package scripts
NPM_ROOT=$(npm root -g)
ls -la "$NPM_ROOT/openclaw/scripts" || true

# Collected logs (on VM)
sudo cat /tmp/openclaw-gateway.log | tail -n 200
sudo cat /tmp/openclaw-fix-gateway.log | tail -n 200
```

If you see `EACCES` errors when installing globally with `npm`, either install as root with lifecycle scripts allowed, or use a user prefix:

A) System-wide global install (allows lifecycle scripts):

```bash
sudo npm uninstall -g openclaw || true
sudo rm -rf /usr/lib/node_modules/openclaw* /usr/lib/node_modules/.openclaw* || true
sudo npm install -g openclaw --unsafe-perm=true --allow-root
```

B) Per-user global install (no sudo):

```bash
npm install -g --prefix "$HOME/.local" openclaw
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

## Security: cleaning sensitive files

If you used `answers.txt` containing tokens, remove it securely after onboarding:

```bash
ssh -i ~/.ssh/id_rsa azureuser@<VM_IP> 'shred -u ~/answers.txt || rm -f ~/answers.txt'
```

Collect logs to your local machine (for debugging or archival):

```bash
scp -i ~/.ssh/id_rsa azureuser@<VM_IP>:/tmp/openclaw-gateway.log ~/Downloads/
scp -i ~/.ssh/id_rsa azureuser@<VM_IP>:/tmp/openclaw-fix-gateway.log ~/Downloads/
```

## Examples & templates

Add these example files to your repo or share with new team members.

`docs/moltbot/answers.txt.example` — plain text answers file used by `install-openclaw-auto.sh` (one response per prompt).

`docs/moltbot/.env.example` — example environment variables for MoltBot (rename to `.env` and fill values).

## Checklist (post-install)

- Gateway runs and listens on `127.0.0.1:18789`.
- Control UI loads via SSH tunnel (`ssh -L 18789:127.0.0.1:18789`) and tokenized link works.
- Telegram provider started and pairing approved for team users.
- Secrets removed from the VM and deployed `.env` is protected (`chmod 600`).

If you want, I will add `answers.txt.example` and `.env.example` now and update the `docs/moltbot` README.

## Documentation upkeep

- Keep this file updated whenever install scripts change.
- If onboarding prompts change, update `install-openclaw-auto.sh` examples and provide a new `answers.txt` template.

If you want, I can add a template `answers.txt` and a sample `.env.example` for MoltBot in `docs/moltbot/` — say the word and I will add them.
