# Task 9: Configure Cloudflare (Optional)

> **Time**: 20-30 minutes  
> **Prerequisites**: Cloudflare account, VPS running

---

## Checklist

- [ ] Create Cloudflare account
- [ ] Install cloudflared
- [ ] Create Zero Trust tunnel
- [ ] Configure tunnel for SSH (optional)
- [ ] Setup DNS (if you have a domain)
- [ ] Test connectivity

---

## Why Cloudflare?

Cloudflare Zero Trust provides:

- **Secure tunnel**: Access VPS without exposing ports
- **No public IP needed**: Works behind NAT
- **DDoS protection**: Built-in security
- **Free tier**: Sufficient for our needs

```
┌──────────────────────────────────────────────────────────────┐
│                     Without Cloudflare                        │
├──────────────────────────────────────────────────────────────┤
│  Internet ──▶ Public IP:22 ──▶ VPS                           │
│              (exposed to attacks)                             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     With Cloudflare Tunnel                    │
├──────────────────────────────────────────────────────────────┤
│  Internet ──▶ Cloudflare ──▶ Encrypted Tunnel ──▶ VPS        │
│              (protected)     (no open ports)                  │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 1: Create Cloudflare Account

1. Go to: https://dash.cloudflare.com/sign-up
2. Sign up with email
3. Verify email
4. Free plan is sufficient

---

## Step 2: Install cloudflared on VPS

```bash
# SSH into VPS
ssh moltbot

# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

# Install
sudo dpkg -i cloudflared-linux-amd64.deb

# Verify
cloudflared --version

# Clean up
rm cloudflared-linux-amd64.deb
```

---

## Step 3: Authenticate cloudflared

```bash
# Login to Cloudflare
cloudflared tunnel login
```

This will show a URL. Open it in your browser:

1. Copy the URL from terminal
2. Open in browser on your local machine
3. Select your Cloudflare account
4. Authorize cloudflared

After authorization, a certificate is saved to `~/.cloudflared/cert.pem`

---

## Step 4: Create a Tunnel

```bash
# Create tunnel (name it 'hamada-tunnel')
cloudflared tunnel create hamada-tunnel

# This creates a tunnel ID and credentials file
# Note the tunnel ID (UUID format)

# List tunnels
cloudflared tunnel list
```

---

## Step 5: Configure Tunnel

Create configuration file:

```bash
mkdir -p ~/.cloudflared

cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: <TUNNEL_ID>
credentials-file: /home/azureuser/.cloudflared/<TUNNEL_ID>.json

ingress:
  # SSH access (optional - for browser-based SSH)
  - hostname: ssh.yourdomain.com
    service: ssh://localhost:22

  # Catch-all (required)
  - service: http_status:404
EOF
```

Replace `<TUNNEL_ID>` with your actual tunnel ID.

---

## Step 6: Route DNS (If You Have a Domain)

If you have a domain managed by Cloudflare:

```bash
# Create DNS route
cloudflared tunnel route dns hamada-tunnel ssh.yourdomain.com
```

### Without a Domain

You can use Cloudflare's `trycloudflare.com` for testing:

```bash
# Quick tunnel (no DNS needed)
cloudflared tunnel --url localhost:22
```

This gives you a temporary URL like `https://random-words.trycloudflare.com`

---

## Step 7: Run Tunnel as Service

```bash
# Install as system service
sudo cloudflared service install

# Start the service
sudo systemctl start cloudflared

# Enable on boot
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared
```

---

## Step 8: Access via Cloudflare (Optional SSH Tunnel)

### For Browser-Based SSH

1. Go to Cloudflare Dashboard → Zero Trust
2. Navigate to Access → Applications
3. Create application:
   - Type: Self-hosted
   - Application domain: `ssh.yourdomain.com`
   - Configure access policies

### For Local SSH Client

Install cloudflared locally:

```bash
# macOS
brew install cloudflared

# Then SSH through tunnel
ssh -o ProxyCommand="cloudflared access ssh --hostname ssh.yourdomain.com" azureuser@ssh.yourdomain.com
```

---

## Simplified Setup (Just Security)

If you don't need the tunnel features, just use Cloudflare for:

### 1. Basic Security Monitoring

```bash
# Install Cloudflare WARP (optional VPN)
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list
sudo apt update && sudo apt install cloudflare-warp

# Register
warp-cli register
warp-cli connect
```

### 2. Cloudflare DNS (1.1.1.1)

Configure VPS to use Cloudflare DNS:

```bash
# Edit resolv.conf
echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf
echo "nameserver 1.0.0.1" | sudo tee -a /etc/resolv.conf
```

---

## Skip Cloudflare (Alternative Security)

If you prefer not to use Cloudflare, ensure these security measures from Task 3:

- [x] UFW firewall enabled
- [x] SSH key-only authentication
- [x] fail2ban installed
- [x] Azure NSG restricting SSH to your IP
- [x] Automatic security updates

These provide adequate security for most use cases.

---

## Verification Checklist

If using full tunnel:

```bash
# Tunnel running
sudo systemctl status cloudflared

# Tunnel connected
cloudflared tunnel info hamada-tunnel

# Can access via tunnel (from local machine)
curl https://ssh.yourdomain.com
```

If using basic setup:

```bash
# DNS working
nslookup google.com

# WARP connected (if installed)
warp-cli status
```

---

## Quick Reference

```bash
# Tunnel management
cloudflared tunnel list
cloudflared tunnel info <name>
cloudflared tunnel run <name>

# Service management
sudo systemctl status cloudflared
sudo systemctl restart cloudflared

# Quick temporary tunnel
cloudflared tunnel --url localhost:8080
```

---

## Troubleshooting

### Tunnel not connecting

```bash
# Check logs
sudo journalctl -u cloudflared -f

# Test tunnel manually
cloudflared tunnel run hamada-tunnel
```

### Certificate errors

```bash
# Re-authenticate
cloudflared tunnel login
```

### DNS not resolving

```bash
# Check DNS route
cloudflared tunnel route dns list
```

---

## Next Task

Once Cloudflare is configured (or skipped), proceed to:  
➡️ [Task 10: Train Hamada (Context)](./10-train-hamada-context.md)
