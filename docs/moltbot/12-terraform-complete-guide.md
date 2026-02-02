# Terraform for MoltBot - Complete Beginner's Guide 🚀

> **What is Terraform?** Think of it as a blueprint system for cloud infrastructure. Instead of clicking buttons in Azure portal, you write code that describes what you want, and Terraform creates it for you. Best part? You can destroy everything with one command when you're done!

---

## 📚 Table of Contents

1. [What is Terraform and Why Use It?](#what-is-terraform-and-why-use-it)
2. [Installation](#installation)
3. [Core Concepts Explained Simply](#core-concepts-explained-simply)
4. [Your First Terraform Project](#your-first-terraform-project)
5. [Understanding the MoltBot Configuration](#understanding-the-moltbot-configuration)
6. [Complete Command Reference](#complete-command-reference)
7. [Common Workflows](#common-workflows)
8. [Troubleshooting](#troubleshooting)
9. [Cost Management](#cost-management)

---

## What is Terraform and Why Use It?

### The Problem Without Terraform

Imagine you need to create MoltBot infrastructure on Azure:

1. 🖱️ Click through Azure Portal
2. 📝 Fill 20+ forms
3. ⏰ Takes 30-45 minutes
4. ❌ Easy to forget steps or make mistakes
5. 💸 Forget to delete resources → expensive surprise bills

### The Solution With Terraform

```bash
terraform apply    # Creates everything in 3 minutes
terraform destroy  # Deletes everything in 2 minutes
```

**That's it!** No clicking, no forgetting steps, no surprise bills.

---

## Installation

### Install Terraform (macOS)

```bash
# Install using Homebrew
brew install terraform

# Verify installation
terraform version
# Should show: Terraform v1.x.x
```

### Install Azure CLI (Already done! ✅)

You already have Azure CLI installed. Verify:

```bash
az --version
# Should show Azure CLI version
```

---

## Core Concepts Explained Simply

### 1. Infrastructure as Code (IaC)

**Normal way:** Click buttons → Infrastructure created → Can't recreate it exactly  
**Terraform way:** Write code → Run command → Infrastructure created → Can recreate anytime

### 2. Terraform Files

Think of these as different sections of a blueprint:

```
main.tf               # The main blueprint (what to build)
variables.tf          # Settings you can change (like colors, sizes)
outputs.tf            # Information you get back (like addresses, keys)
terraform.tfvars      # Your specific choices (dev, staging, prod)
```

### 3. The Terraform Workflow (Like Cooking!)

```
terraform init     # 1. Get your ingredients (download providers)
terraform plan     # 2. Read the recipe (preview changes)
terraform apply    # 3. Cook the meal (create infrastructure)
terraform destroy  # 4. Clean the kitchen (delete everything)
```

### 4. State File (Terraform's Memory)

Terraform creates a `terraform.tfstate` file that remembers what it built.

**IMPORTANT:** This file is like a receipt - don't delete it or Terraform forgets what it created!

```
terraform.tfstate  → Terraform's memory of what exists
```

### 5. Providers (Like App Stores)

Providers are plugins that know how to talk to different clouds:

```hcl
provider "azurerm" {    # Azure provider (talks to Microsoft Azure)
  features {}
}

# Other providers you might see:
# provider "aws" { }     # Amazon Web Services
# provider "google" { }  # Google Cloud Platform
```

---

## Your First Terraform Project

### Understanding File Structure

Our MoltBot infrastructure lives here:

```
infrastructure/terraform/azure/moltbot/
├── main.tf                      # 🏗️ Main infrastructure definition
├── variables.tf                 # ⚙️ Configuration options
├── outputs.tf                   # 📊 Results after creation
├── terraform.tfvars.example     # 📝 Example configuration
├── .gitignore                   # 🔒 Don't commit secrets!
├── provision.sh                 # 🚀 Quick deploy script
├── destroy.sh                   # 🗑️ Quick cleanup script
├── Makefile                     # 📜 Common commands
└── README.md                    # 📖 Documentation
```

### Reading main.tf (The Blueprint)

Let's break down what each section does:

#### 1. Terraform Configuration Block

```hcl
terraform {
  required_version = ">= 1.0"  # Needs Terraform 1.0 or newer

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"  # Where to download Azure plugin
      version = "~> 3.0"              # Use version 3.x
    }
  }
}
```

**Translation:** "I need Terraform 1.0+ and the Azure plugin version 3.x"

#### 2. Provider Configuration

```hcl
provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}
```

**Translation:** "Let me delete resource groups even if they have stuff inside"

#### 3. Resource Group (Container for Everything)

```hcl
resource "azurerm_resource_group" "moltbot" {
  name     = var.resource_group_name  # Name from variables
  location = var.location              # Region from variables

  tags = {
    Environment = "dev"
    Purpose     = "MoltBot AI Agent"
  }
}
```

**Translation:** "Create a folder in Azure called 'rg-moltbot-dev' in 'eastus' region"

#### 4. Storage Account (For Files and Logs)

```hcl
resource "azurerm_storage_account" "moltbot" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.moltbot.name
  location                 = azurerm_resource_group.moltbot.location
  account_tier             = "Standard"
  account_replication_type = "LRS"  # Locally Redundant Storage (cheapest)
}
```

**Translation:** "Create cloud storage for MoltBot's files"

#### 5. App Service Plan (The Server)

```hcl
resource "azurerm_service_plan" "moltbot" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.moltbot.name
  location            = azurerm_resource_group.moltbot.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku  # B1 = Basic tier ($13/month)
}
```

**Translation:** "Rent a Linux server (B1 size, ~$13/month)"

#### 6. Web App (Where MoltBot Runs)

```hcl
resource "azurerm_linux_web_app" "moltbot" {
  name                = var.web_app_name
  service_plan_id     = azurerm_service_plan.moltbot.id

  site_config {
    application_stack {
      node_version = "18-lts"  # Node.js 18
    }
  }

  app_settings = {
    "STORAGE_ACCOUNT_NAME" = azurerm_storage_account.moltbot.name
    "ENVIRONMENT"          = "dev"
  }
}
```

**Translation:** "Create a web app running Node.js 18, connected to storage"

#### 7. Application Insights (Monitoring)

```hcl
resource "azurerm_application_insights" "moltbot" {
  name                = var.app_insights_name
  application_type    = "Node.JS"
}
```

**Translation:** "Set up monitoring so I can see logs and errors"

#### 8. Key Vault (Secure Secrets Storage)

```hcl
resource "azurerm_key_vault" "moltbot" {
  name                       = var.key_vault_name
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false  # Can permanently delete
}
```

**Translation:** "Create a secure vault for API keys and passwords"

---

## Complete Command Reference

### 1. Initial Setup (Do Once Per Project)

```bash
# Navigate to Terraform directory
cd infrastructure/terraform/azure/moltbot

# Initialize Terraform (downloads Azure provider)
terraform init

# What happens:
# - Downloads azurerm provider (~50MB)
# - Creates .terraform/ folder
# - Creates .terraform.lock.hcl file
# Output: "Terraform has been successfully initialized!"
```

**What `init` does:**

- 📥 Downloads the Azure plugin (provider)
- 📁 Creates `.terraform/` folder (like node_modules)
- 🔒 Creates lock file (like package-lock.json)

### 2. Configuration

```bash
# Copy example configuration
cp terraform.tfvars.example terraform.tfvars

# Edit your configuration
nano terraform.tfvars
# or
code terraform.tfvars
```

**Example terraform.tfvars:**

```hcl
environment             = "dev"
location                = "eastus"
resource_group_name     = "rg-moltbot-dev"
storage_account_name    = "stmoltbotdev001"    # MUST be globally unique!
web_app_name            = "app-moltbot-dev-001" # MUST be globally unique!
key_vault_name          = "kv-moltbot-dev-001"  # MUST be globally unique!
```

**Naming Rules (Important!):**

- Storage account: 3-24 chars, only lowercase letters and numbers
- Web app: Letters, numbers, hyphens
- Key vault: 3-24 chars, letters, numbers, hyphens

### 3. Login to Azure

```bash
# Login to Azure (opens browser)
az login

# See your subscriptions
az account list --output table

# Set active subscription (if you have multiple)
az account set --subscription "Azure for Students"

# Verify you're logged in
az account show
```

### 4. Preview Changes (Always Do This!)

```bash
# See what Terraform will create (doesn't actually create anything)
terraform plan

# Save the plan to a file (optional)
terraform plan -out=myplan.tfplan
```

**What you'll see:**

```
Terraform will perform the following actions:

  # azurerm_resource_group.moltbot will be created
  + resource "azurerm_resource_group" "moltbot" {
      + id       = (known after apply)
      + name     = "rg-moltbot-dev"
      + location = "eastus"
    }

  # azurerm_storage_account.moltbot will be created
  + resource "azurerm_storage_account" "moltbot" {
      + name                     = "stmoltbotdev001"
      + resource_group_name      = "rg-moltbot-dev"
      ...
    }

Plan: 8 to add, 0 to change, 0 to destroy.
```

**Reading the plan:**

- `+` = Will create
- `-` = Will destroy
- `~` = Will modify
- `(known after apply)` = Will know value after creation

### 5. Apply Changes (Create Infrastructure)

```bash
# Create infrastructure (will ask for confirmation)
terraform apply

# Create without confirmation (auto-approve)
terraform apply -auto-approve

# Apply a saved plan
terraform apply myplan.tfplan
```

**What happens:**

1. Shows you the plan again
2. Asks: `Do you want to perform these actions?`
3. Type `yes` and press Enter
4. Creates resources one by one
5. Shows progress bars
6. Takes ~2-5 minutes
7. Creates `terraform.tfstate` file

**Output example:**

```
azurerm_resource_group.moltbot: Creating...
azurerm_resource_group.moltbot: Creation complete after 2s
azurerm_storage_account.moltbot: Creating...
azurerm_storage_account.moltbot: Still creating... [10s elapsed]
azurerm_storage_account.moltbot: Creation complete after 23s

Apply complete! Resources: 8 added, 0 changed, 0 destroyed.

Outputs:
web_app_url = "https://app-moltbot-dev-001.azurewebsites.net"
```

### 6. View Current Infrastructure

```bash
# Show everything Terraform created
terraform show

# Show in prettier format
terraform show -json | jq

# List all resources
terraform state list
```

**Example output:**

```
azurerm_resource_group.moltbot
azurerm_storage_account.moltbot
azurerm_storage_container.logs
azurerm_storage_container.data
azurerm_service_plan.moltbot
azurerm_linux_web_app.moltbot
azurerm_application_insights.moltbot
azurerm_key_vault.moltbot
```

### 7. Get Outputs (Important Info)

```bash
# Show all outputs
terraform output

# Show specific output
terraform output web_app_url

# Show all outputs as JSON
terraform output -json

# Save outputs to file
terraform output -json > outputs.json
```

**Example outputs:**

```
resource_group_name = "rg-moltbot-dev"
web_app_url = "https://app-moltbot-dev-001.azurewebsites.net"
storage_account_name = "stmoltbotdev001"
key_vault_name = "kv-moltbot-dev-001"
```

### 8. Modify Infrastructure

```bash
# Edit your terraform.tfvars or main.tf
nano terraform.tfvars

# See what will change
terraform plan

# Apply changes
terraform apply
```

**Example change:**

```hcl
# Change SKU from B1 to B2 (more powerful)
app_service_sku = "B2"
```

### 9. Destroy Infrastructure (Important!)

```bash
# Destroy everything (asks for confirmation)
terraform destroy

# Destroy without confirmation
terraform destroy -auto-approve

# Destroy specific resource only
terraform destroy -target=azurerm_linux_web_app.moltbot
```

**What happens:**

1. Shows what will be deleted
2. Asks: `Do you really want to destroy all resources?`
3. Type `yes`
4. Deletes everything in reverse order
5. Takes ~2-3 minutes
6. Leaves `terraform.tfstate` file (now empty)

**CRITICAL:** Always destroy when not using to avoid charges!

### 10. Validation and Formatting

```bash
# Check if configuration is valid
terraform validate

# Format files nicely
terraform fmt

# Format and show which files changed
terraform fmt -diff

# Format recursively
terraform fmt -recursive
```

### 11. Refresh State

```bash
# Update state from real infrastructure
terraform refresh

# Use this if someone changed something in Azure Portal
# and you want Terraform to know about it
```

### 12. Import Existing Resources

```bash
# If you created something manually and want Terraform to manage it
terraform import azurerm_resource_group.moltbot /subscriptions/xxx/resourceGroups/rg-moltbot-dev
```

---

## Common Workflows

### Workflow 1: First Time Setup (Complete)

```bash
# 1. Navigate to directory
cd infrastructure/terraform/azure/moltbot

# 2. Copy and configure
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars  # Edit with your values

# 3. Login to Azure
az login
az account set --subscription "Azure for Students"

# 4. Initialize Terraform
terraform init

# 5. Validate configuration
terraform validate

# 6. Preview changes
terraform plan

# 7. Create infrastructure
terraform apply
# Type 'yes' when asked

# 8. Save outputs
terraform output > deployed-info.txt

# 9. Verify in Azure Portal
az resource list --resource-group rg-moltbot-dev --output table
```

### Workflow 2: Quick Deploy (Using Scripts)

```bash
cd infrastructure/terraform/azure/moltbot

# Option 1: Interactive provision
./provision.sh

# Option 2: Quick provision (auto-approve)
make provision

# Option 3: Manual but quick
terraform init
terraform apply -auto-approve
```

### Workflow 3: Daily Development

```bash
# Morning: Create infrastructure
cd infrastructure/terraform/azure/moltbot
terraform apply -auto-approve

# ... work on MoltBot ...

# Evening: Destroy to save money
terraform destroy -auto-approve
```

### Workflow 4: Update Configuration

```bash
# 1. Edit configuration
nano terraform.tfvars

# 2. Preview changes
terraform plan

# 3. Apply if looks good
terraform apply

# Example: Change SKU
# Old: app_service_sku = "B1"
# New: app_service_sku = "B2"
```

### Workflow 5: Complete Cleanup

```bash
# 1. Destroy infrastructure
terraform destroy -auto-approve

# 2. Clean Terraform files (optional)
rm -rf .terraform
rm .terraform.lock.hcl
rm terraform.tfstate*
rm *.tfplan

# 3. Start fresh
terraform init
```

### Workflow 6: Using Workspaces (Dev/Staging/Prod)

```bash
# List workspaces
terraform workspace list

# Create and switch to dev workspace
terraform workspace new dev
terraform apply -var-file="terraform.dev.tfvars"

# Create and switch to staging
terraform workspace new staging
terraform apply -var-file="terraform.staging.tfvars"

# Switch back to dev
terraform workspace select dev

# Each workspace has its own state!
```

---

## Understanding Terraform State

### What is State?

Terraform creates a `terraform.tfstate` file that tracks:

- What resources were created
- Resource IDs
- Current configuration
- Dependencies between resources

**Think of it as:** Terraform's memory or receipt

### State File Structure

```json
{
  "version": 4,
  "terraform_version": "1.6.0",
  "resources": [
    {
      "type": "azurerm_resource_group",
      "name": "moltbot",
      "instances": [
        {
          "attributes": {
            "id": "/subscriptions/.../resourceGroups/rg-moltbot-dev",
            "name": "rg-moltbot-dev",
            "location": "eastus"
          }
        }
      ]
    }
  ]
}
```

### State Commands

```bash
# List all resources in state
terraform state list

# Show specific resource
terraform state show azurerm_resource_group.moltbot

# Remove resource from state (doesn't delete from Azure!)
terraform state rm azurerm_resource_group.moltbot

# Move/rename resource in state
terraform state mv azurerm_resource_group.moltbot azurerm_resource_group.new_name

# Pull state and show
terraform state pull
```

### State Best Practices

```bash
# ✅ DO: Keep state file backed up
cp terraform.tfstate terraform.tfstate.backup

# ✅ DO: Use remote state for teams (advanced)
terraform {
  backend "azurerm" {
    storage_account_name = "tfstate"
    container_name       = "tfstate"
    key                  = "moltbot.tfstate"
  }
}

# ❌ DON'T: Manually edit state file
# ❌ DON'T: Commit state file to git (has secrets!)
# ❌ DON'T: Delete state file (Terraform loses memory!)
```

---

## Variables Deep Dive

### Variable Types

```hcl
# String
variable "location" {
  type    = string
  default = "eastus"
}

# Number
variable "instance_count" {
  type    = number
  default = 2
}

# Boolean
variable "enable_https" {
  type    = bool
  default = true
}

# List
variable "allowed_ips" {
  type    = list(string)
  default = ["1.2.3.4", "5.6.7.8"]
}

# Map/Object
variable "tags" {
  type = map(string)
  default = {
    Environment = "dev"
    Project     = "MoltBot"
  }
}
```

### Using Variables

```hcl
# In main.tf
resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name      # String variable
  location = var.location                  # String variable
  tags     = var.tags                      # Map variable
}
```

### Setting Variable Values (Priority Order)

```bash
# 1. Command line (highest priority)
terraform apply -var="location=westus"

# 2. terraform.tfvars file
echo 'location = "eastus"' > terraform.tfvars

# 3. Environment variables
export TF_VAR_location="eastus"
terraform apply

# 4. Default value in variables.tf (lowest priority)
variable "location" {
  default = "eastus"
}
```

---

## Cost Management & Monitoring

### Checking Current Costs

```bash
# Using Azure CLI
az consumption usage list \
  --start-date 2026-01-01 \
  --end-date 2026-01-31 \
  --query "[].{Name:instanceName, Cost:pretaxCost}" \
  --output table

# Using Azure Portal
# Go to: Cost Management + Billing → Cost Analysis
```

### Cost Estimates (January 2026)

**Development (B1 SKU):**

```
App Service Plan (B1):        ~$13.00/month ($0.018/hour)
Storage Account (LRS):        ~$0.50/month (first few GB)
Application Insights:         ~$2.00/month (first 5GB free)
Key Vault:                    ~$0.50/month
Data Transfer:                ~$1.00/month
─────────────────────────────────────────────
Total:                        ~$17/month

Daily cost if always running: ~$0.57/day
Hourly cost:                  ~$0.024/hour
```

**Cost Optimization:**

```bash
# Use Free tier for testing
app_service_sku = "F1"  # Free tier

# Use smaller SKU
app_service_sku = "B1"  # $13/month instead of S1 ($70/month)

# Destroy when not using
terraform destroy  # $0/month when destroyed!
```

### Auto-Shutdown (Save Money!)

```bash
# Create a script to auto-destroy
cat > auto-destroy.sh << 'EOF'
#!/bin/bash
# Destroy infrastructure at 6 PM daily
cd /path/to/terraform/moltbot
terraform destroy -auto-approve
EOF

# Schedule with cron
crontab -e
# Add: 0 18 * * * /path/to/auto-destroy.sh
```

---

## Troubleshooting

### Error: "Resource Already Exists"

**Problem:** Someone already used that name (names are globally unique)

```bash
Error: A resource with the ID "/subscriptions/.../storageAccounts/stmoltbotdev001" already exists
```

**Solution:** Change to unique name in `terraform.tfvars`:

```hcl
storage_account_name = "stmoltbotdev002"  # Try different number
web_app_name         = "app-moltbot-dev-002"
```

### Error: "Authentication Failed"

**Problem:** Not logged in to Azure

```bash
Error: Error building account: Error getting authenticated object ID: ...
```

**Solution:**

```bash
# Login again
az login

# Verify
az account show

# Try terraform again
terraform plan
```

### Error: "Invalid Provider Configuration"

**Problem:** Azure provider not initialized

```bash
Error: Provider configuration not present
```

**Solution:**

```bash
# Initialize Terraform
terraform init

# If that doesn't work, clean and reinit
rm -rf .terraform
rm .terraform.lock.hcl
terraform init
```

### Error: "State Lock"

**Problem:** Another terraform process is running

```bash
Error: Error acquiring the state lock
```

**Solution:**

```bash
# Wait for other process to finish, OR

# Force unlock (use carefully!)
terraform force-unlock <lock-id>
```

### Error: "Plan is Stale"

**Problem:** Saved plan is outdated

```bash
Error: the saved plan is stale
```

**Solution:**

```bash
# Create fresh plan
rm *.tfplan
terraform plan -out=newplan.tfplan
terraform apply newplan.tfplan
```

### Error: "Quota Exceeded"

**Problem:** Hit Azure subscription limits

```bash
Error: Quota exceeded for this resource type
```

**Solution:**

```bash
# Check your quotas
az vm list-usage --location eastus --output table

# Request increase or use different region
location = "westus"  # Try different region
```

### Debugging Tips

```bash
# Enable detailed logging
export TF_LOG=DEBUG
terraform apply

# Save logs to file
export TF_LOG=DEBUG
export TF_LOG_PATH=./terraform.log
terraform apply

# Disable logging
unset TF_LOG
unset TF_LOG_PATH

# Refresh state to match reality
terraform refresh

# Show what Terraform thinks exists
terraform state list
terraform show
```

---

## Advanced Topics

### Remote State (Team Collaboration)

```hcl
# backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "tfstate12345"
    container_name       = "tfstate"
    key                  = "moltbot.tfstate"
  }
}
```

```bash
# Initialize with remote backend
terraform init

# Migrate local state to remote
terraform init -migrate-state
```

### Modules (Reusable Components)

```hcl
# modules/web-app/main.tf
variable "name" {}
variable "location" {}

resource "azurerm_linux_web_app" "this" {
  name     = var.name
  location = var.location
}

# Use the module
module "moltbot_app" {
  source   = "./modules/web-app"
  name     = "moltbot"
  location = "eastus"
}
```

### Data Sources (Query Existing Resources)

```hcl
# Get existing resource group
data "azurerm_resource_group" "existing" {
  name = "existing-rg"
}

# Use its properties
resource "azurerm_storage_account" "new" {
  resource_group_name = data.azurerm_resource_group.existing.name
  location            = data.azurerm_resource_group.existing.location
}
```

### Conditional Resources

```hcl
# Create only in production
resource "azurerm_firewall" "example" {
  count = var.environment == "production" ? 1 : 0

  name     = "firewall"
  location = var.location
}
```

### Loops

```hcl
# Create multiple storage containers
resource "azurerm_storage_container" "containers" {
  for_each = toset(["logs", "data", "backups", "temp"])

  name                 = each.value
  storage_account_name = azurerm_storage_account.moltbot.name
}
```

---

## Quick Reference Card

### Essential Commands (Memorize These!)

```bash
# Initialize (first time)
terraform init

# See what will happen
terraform plan

# Create infrastructure
terraform apply

# Destroy everything
terraform destroy

# Show current state
terraform show

# Get outputs
terraform output

# Format code
terraform fmt

# Validate config
terraform validate
```

### File Purposes

```
main.tf           → What to build
variables.tf      → Settings I can change
outputs.tf        → Info I get back
terraform.tfvars  → My specific values (DON'T COMMIT!)
.gitignore        → Protect secrets
```

### Common Patterns

```bash
# Daily work
terraform apply -auto-approve    # Morning: Create
# ... do work ...
terraform destroy -auto-approve  # Evening: Destroy

# Check cost
az consumption usage list

# Update config
nano terraform.tfvars
terraform plan
terraform apply
```

---

## Next Steps

1. **Practice:** Deploy and destroy a few times
2. **Experiment:** Change SKUs, regions, names
3. **Learn:** Try adding new resources
4. **Automate:** Use the provision/destroy scripts
5. **Optimize:** Track costs and optimize

---

## Resources

- **Terraform Docs:** https://www.terraform.io/docs
- **Azure Provider:** https://registry.terraform.io/providers/hashicorp/azurerm
- **Terraform Learn:** https://learn.hashicorp.com/terraform
- **Azure Pricing:** https://azure.microsoft.com/pricing/calculator

---

## Summary

**Terraform in 3 sentences:**

1. Write code describing your infrastructure
2. Run `terraform apply` to create it
3. Run `terraform destroy` to delete it

**Key Benefits:**

- ✅ No manual clicking
- ✅ Reproducible
- ✅ Version controlled
- ✅ Easy to destroy (no surprise bills!)
- ✅ Team collaboration

**Remember:**

- Always `terraform plan` before `apply`
- Always `terraform destroy` when done testing
- Never commit `terraform.tfvars` (has secrets)
- Keep `terraform.tfstate` safe (it's Terraform's memory)

Happy Terraforming! 🚀
