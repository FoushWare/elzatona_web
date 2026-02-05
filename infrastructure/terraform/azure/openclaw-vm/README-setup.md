Setup automation for VM

Files:

- `setup-deps.sh`: non-interactive script that installs dependencies (Node.js 20, Python3, build tools), enables `fail2ban`, applies UFW and SSH hardening, and writes verification to `/var/log/setup-deps.log`.
- `deploy-to-vm.sh`: local helper that copies `setup-deps.sh` to the VM and runs it non-interactively.

Quick usage (run from your local machine):

1. Copy & run (recommended):

```bash
./deploy-to-vm.sh 104.40.244.55 ~/.ssh/id_rsa azureuser
```

2. Or copy manually and run on the VM:

```bash
scp -i ~/.ssh/id_rsa setup-deps.sh azureuser@104.40.244.55:~
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
chmod +x ~/setup-deps.sh
sudo bash ~/setup-deps.sh
```

Log: `/var/log/setup-deps.log` on the VM

## OpenClaw / MoltBot installation

Manual:

1. SSH into the VM:

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
```

2. Run the interactive installer on the VM:

```bash
cd ~/  # or wherever you put the helper scripts
chmod +x install-openclaw.sh
./install-openclaw.sh
```

Automated (best-effort):

1. Create an answers file locally with one response per prompt (plain text), e.g. `answers.txt`.
2. Copy the script and answers file to the VM and run the automated installer:

```bash
scp -i ~/.ssh/id_rsa install-openclaw-auto.sh answers.txt azureuser@104.40.244.55:~
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55 'chmod +x ~/install-openclaw-auto.sh && ~/install-openclaw-auto.sh --answers-file ~/answers.txt'
```

Notes:

- The automated onboarding uses `expect` to feed the answers file to `openclaw onboard`. It is a best-effort approach — prompts may change between versions and you should verify the results.
- After onboarding, check for running services (`systemctl status moltbot.service`) or `pm2 ls` if the installer registers the process there.
