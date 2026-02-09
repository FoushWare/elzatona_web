# Task 2: Create Azure VPS

> **Time**: 20-30 minutes  
> **Prerequisites**: Azure Student account activated

---

## Checklist

- [ ] Create Resource Group
- [ ] Create Virtual Machine (B2s recommended)
- [ ] Configure networking
- [ ] Download SSH key
- [ ] Connect to VM

---

## VM Specifications

| Setting     | Recommended               | Minimum               |
| ----------- | ------------------------- | --------------------- |
| **Size**    | B2s (2 vCPU, 4GB RAM)     | B1s (1 vCPU, 1GB RAM) |
| **OS**      | Ubuntu 22.04 LTS          | Ubuntu 22.04 LTS      |
| **Storage** | 32GB SSD                  | 30GB SSD              |
| **Cost**    | ~$30/month (from credits) | ~$8/month             |

💡 **B2s is recommended** because MoltBot + Node.js + Git operations need 4GB RAM.

---

## Step 1: Create Resource Group

### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for **"Resource groups"**
3. Click **"+ Create"**
4. Configure:
   - **Subscription**: Azure for Students
   - **Resource group**: `moltbot-rg`
   - **Region**: Choose closest to you
5. Click **"Review + create"** → **"Create"**

### Via Azure CLI

```bash
# Install Azure CLI (if not installed)
# macOS
brew install azure-cli

# Login
az login

# Create resource group
az group create \
  --name moltbot-rg \
  --location eastus
```

---

## Step 2: Create Virtual Machine

### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"+ Create a resource"**
3. Select **"Virtual Machine"**
4. Configure **Basics**:

| Setting              | Value                              |
| -------------------- | ---------------------------------- |
| Subscription         | Azure for Students                 |
| Resource group       | moltbot-rg                         |
| Virtual machine name | `moltbot-vm`                       |
| Region               | (same as resource group)           |
| Availability options | No infrastructure redundancy       |
| Security type        | Standard                           |
| Image                | Ubuntu Server 22.04 LTS - x64 Gen2 |
| VM architecture      | x64                                |
| Size                 | **B2s** (2 vCPU, 4GB RAM)          |

5. Configure **Administrator account**:

| Setting               | Value                 |
| --------------------- | --------------------- |
| Authentication type   | SSH public key        |
| Username              | `azureuser`           |
| SSH public key source | Generate new key pair |
| Key pair name         | `moltbot-key`         |

6. Configure **Inbound port rules**:

| Setting              | Value                |
| -------------------- | -------------------- |
| Public inbound ports | Allow selected ports |
| Select inbound ports | SSH (22)             |

7. Click **"Next: Disks"**
   - OS disk type: Standard SSD
   - Size: 32GB

8. Click **"Next: Networking"**
   - Keep defaults (new VNet, public IP)

9. Click **"Review + create"** → **"Create"**

10. **Download the SSH private key** when prompted!

### Via Azure CLI

```bash
# Create VM with SSH key
az vm create \
  --resource-group moltbot-rg \
  --name moltbot-vm \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard \
  --os-disk-size-gb 32

# Get public IP
az vm show \
  --resource-group moltbot-rg \
  --name moltbot-vm \
  --show-details \
  --query publicIps \
  --output tsv
```

---

## Step 3: Save SSH Key

Move the downloaded key to your SSH directory:

```bash
# Move key (adjust filename if different)
mv ~/Downloads/moltbot-key.pem ~/.ssh/

# Set correct permissions
chmod 600 ~/.ssh/moltbot-key.pem

# Add to SSH config for easy access
cat >> ~/.ssh/config << 'EOF'

Host moltbot
    HostName <VM-PUBLIC-IP>
    User azureuser
    IdentityFile ~/.ssh/moltbot-key.pem
EOF

# Replace <VM-PUBLIC-IP> with actual IP
```

---

## Step 4: Connect to VM

```bash
# Method 1: Using SSH config
ssh moltbot

# Method 2: Direct connection
ssh -i ~/.ssh/moltbot-key.pem azureuser@<VM-PUBLIC-IP>
```

### First Connection Checklist

When you first connect:

```bash
# Verify you're connected
hostname
# Should show: moltbot-vm

# Check system info
uname -a
# Should show: Linux ... Ubuntu ...

# Check memory (should be ~4GB for B2s)
free -h

# Check disk space
df -h
```

---

## Step 5: Initial System Update

```bash
# Update package list
sudo apt update

# Upgrade packages
sudo apt upgrade -y

# Install essential utilities
sudo apt install -y \
  curl \
  wget \
  git \
  vim \
  htop \
  tmux \
  unzip \
  build-essential

# Set timezone (optional)
sudo timedatectl set-timezone Africa/Cairo  # Change to your timezone
```

---

## Step 6: Add Swap Space (Recommended)

Even with 4GB RAM, swap is useful for memory-intensive operations:

```bash
# Create 4GB swap file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
free -h
# Should show ~4GB swap
```

---

## Cost Tracking

Check your Azure credit usage:

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for **"Cost Management"**
3. Click **"Cost analysis"**
4. View spending

### Estimated Monthly Cost

| Resource       | Cost/Month |
| -------------- | ---------- |
| B2s VM (24/7)  | ~$30       |
| Storage (32GB) | ~$2        |
| Bandwidth      | ~$1        |
| **Total**      | ~$33/month |

💡 Your $100 credit covers ~3 months of operation!

---

## Troubleshooting

### Can't connect via SSH

```bash
# Check if VM is running
az vm show --resource-group moltbot-rg --name moltbot-vm --query "powerState" -o tsv

# Start VM if stopped
az vm start --resource-group moltbot-rg --name moltbot-vm

# Check NSG rules allow SSH
az network nsg rule list \
  --resource-group moltbot-rg \
  --nsg-name moltbot-vmNSG \
  --output table
```

### Permission denied (SSH key)

```bash
# Ensure correct permissions
chmod 600 ~/.ssh/moltbot-key.pem
chmod 700 ~/.ssh
```

### VM is slow

```bash
# Check memory usage
free -h

# Check CPU usage
top

# If memory is full, add more swap
sudo fallocate -l 8G /swapfile2
sudo chmod 600 /swapfile2
sudo mkswap /swapfile2
sudo swapon /swapfile2
```

---

## Quick Reference

```bash
# SSH to VM
ssh moltbot

# Stop VM (save credits when not using)
az vm stop --resource-group moltbot-rg --name moltbot-vm
az vm deallocate --resource-group moltbot-rg --name moltbot-vm

# Start VM
az vm start --resource-group moltbot-rg --name moltbot-vm

# Get VM IP
az vm show -g moltbot-rg -n moltbot-vm --show-details --query publicIps -o tsv
```

---

## Next Task

Once VM is created and accessible, proceed to:  
➡️ [Task 3: Secure the VPS](./03-secure-vps.md)
