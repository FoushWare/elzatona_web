# Task 3: Secure the VPS

> **Time**: 20-30 minutes  
> **Prerequisites**: Azure VM created and accessible via SSH

---

## Checklist

- [ ] Configure UFW firewall
- [ ] Disable password authentication
- [ ] Configure SSH hardening
- [ ] Install fail2ban
- [ ] Set up automatic updates
- [ ] Configure Azure NSG

---

## Security Principle

**Default Deny**: Block everything, then allow only what's needed.

```
┌─────────────────────────────────────────────────┐
│                    INTERNET                      │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              Azure NSG (Layer 1)                 │
│  ✅ Allow: SSH (22) from YOUR IP only           │
│  ❌ Deny: Everything else inbound               │
│  ✅ Allow: All outbound                         │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              UFW Firewall (Layer 2)              │
│  ✅ Allow: SSH (22)                             │
│  ❌ Deny: Everything else inbound               │
│  ✅ Allow: All outbound                         │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              fail2ban (Layer 3)                  │
│  🔒 Block IPs after failed SSH attempts         │
└─────────────────────────────────────────────────┘
```

---

## Step 1: Configure UFW Firewall

```bash
# SSH into your VM first
ssh moltbot

# Check UFW status
sudo ufw status

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (IMPORTANT: do this before enabling!)
sudo ufw allow ssh
# Or explicitly: sudo ufw allow 22/tcp

# Enable UFW
sudo ufw enable
# Type 'y' to confirm

# Verify
sudo ufw status verbose
```

### Expected Output

```
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere
22/tcp (v6)                ALLOW IN    Anywhere (v6)
```

---

## Step 2: Disable Password Authentication

Edit SSH config to only allow key-based authentication:

```bash
# Backup original config
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Edit SSH config
sudo nano /etc/ssh/sshd_config
```

Find and modify these lines:

```
# Disable password authentication
PasswordAuthentication no
PubkeyAuthentication yes

# Disable root login
PermitRootLogin no

# Disable empty passwords
PermitEmptyPasswords no

# Use Protocol 2 only
Protocol 2

# Reduce login grace time
LoginGraceTime 30

# Limit authentication attempts
MaxAuthTries 3

# Disable X11 forwarding (not needed)
X11Forwarding no
```

Restart SSH:

```bash
# Validate config first
sudo sshd -t

# If no errors, restart
sudo systemctl restart sshd

# Test connection in NEW terminal before closing current one!
# ssh moltbot
```

⚠️ **IMPORTANT**: Test SSH in a new terminal before closing your current session!

---

## Step 3: Install fail2ban

fail2ban automatically blocks IPs that have too many failed login attempts.

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local
```

Find the `[sshd]` section and modify:

```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

This means:

- Ban IP after 3 failed attempts
- Ban duration: 1 hour (3600 seconds)
- Reset counter after 10 minutes (600 seconds)

```bash
# Restart fail2ban
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

---

## Step 4: Configure Azure NSG (Network Security Group)

Restrict SSH access to your IP only (via Azure Portal or CLI).

### Get Your Current IP

```bash
# On your local machine
curl ifconfig.me
```

### Via Azure CLI

```bash
# On your local machine
MY_IP=$(curl -s ifconfig.me)

# Update NSG rule to allow SSH only from your IP
az network nsg rule update \
  --resource-group moltbot-rg \
  --nsg-name moltbot-vmNSG \
  --name default-allow-ssh \
  --source-address-prefixes "$MY_IP/32" \
  --priority 100

# Verify
az network nsg rule list \
  --resource-group moltbot-rg \
  --nsg-name moltbot-vmNSG \
  --output table
```

### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your VM → **Networking**
3. Click on the **SSH** inbound rule
4. Change **Source** from "Any" to "IP Addresses"
5. Enter your IP: `YOUR_IP/32`
6. Save

💡 **Note**: If your IP changes (dynamic IP), you'll need to update this rule.

---

## Step 5: Set Up Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Enable automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades
# Select "Yes"

# Verify configuration
cat /etc/apt/apt.conf.d/20auto-upgrades
```

Should show:

```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

---

## Step 6: Additional Hardening (Optional)

### Disable Unused Services

```bash
# List running services
systemctl list-units --type=service --state=running

# Disable services you don't need (example)
sudo systemctl disable --now snapd  # If not using snaps
```

### Set Up Login Notifications

Get notified when someone logs in:

```bash
# Create notification script
sudo nano /etc/profile.d/ssh-login-notify.sh
```

Add:

```bash
#!/bin/bash
# Send notification on SSH login (modify for your preferred method)
echo "SSH Login: $(whoami) from $(echo $SSH_CLIENT | awk '{print $1}') at $(date)" >> /var/log/ssh-logins.log
```

```bash
sudo chmod +x /etc/profile.d/ssh-login-notify.sh
```

### Install Lynis (Security Auditor)

```bash
# Install Lynis
sudo apt install -y lynis

# Run security audit
sudo lynis audit system

# Review recommendations
sudo cat /var/log/lynis-report.dat
```

---

## Verification Checklist

Run these checks to verify security:

```bash
# 1. UFW is active and configured
sudo ufw status verbose

# 2. SSH is key-only
sudo sshd -T | grep -E "passwordauthentication|pubkeyauthentication|permitrootlogin"
# Should show:
# passwordauthentication no
# pubkeyauthentication yes
# permitrootlogin no

# 3. fail2ban is running
sudo fail2ban-client status sshd

# 4. Automatic updates enabled
systemctl status unattended-upgrades

# 5. Only necessary ports are open
sudo netstat -tulpn | grep LISTEN
```

---

## Security Summary

| Protection         | Status      | Notes                         |
| ------------------ | ----------- | ----------------------------- |
| **Firewall (UFW)** | ✅          | Deny all incoming except SSH  |
| **Azure NSG**      | ✅          | SSH from your IP only         |
| **Password Auth**  | ❌ Disabled | Key-based only                |
| **Root Login**     | ❌ Disabled | Use azureuser + sudo          |
| **fail2ban**       | ✅          | Auto-ban after 3 failures     |
| **Auto Updates**   | ✅          | Security patches auto-install |

---

## Quick Reference

```bash
# Check firewall
sudo ufw status

# Check failed login attempts
sudo fail2ban-client status sshd

# Unban an IP (if you accidentally ban yourself)
sudo fail2ban-client set sshd unbanip YOUR_IP

# Check SSH login log
sudo tail -f /var/log/auth.log

# Check who's logged in
who
w
```

---

## Troubleshooting

### Locked Out of SSH

If you can't SSH in:

1. Use Azure Serial Console:
   - Azure Portal → VM → Support + troubleshooting → Serial console

2. Reset SSH via Azure:
   ```bash
   az vm user update \
     --resource-group moltbot-rg \
     --name moltbot-vm \
     --username azureuser \
     --ssh-key-value "$(cat ~/.ssh/your-key.pub)"
   ```

### fail2ban Banned Your IP

```bash
# Via Azure Serial Console or after IP change:
sudo fail2ban-client set sshd unbanip YOUR_IP
```

---

## Next Task

Once VPS is secured, proceed to:  
➡️ [Task 4: Install Dependencies](./04-install-dependencies.md)
