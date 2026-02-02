# Terraform Command Cheat Sheet

> Quick reference for all Terraform commands you'll need

---

## 🚀 Essential Commands (Use Daily)

### Initialize Project

```bash
terraform init
```

**What it does:** Downloads Azure provider, sets up working directory  
**When:** First time in a new project, or after adding new providers  
**Output:** Creates `.terraform/` folder and lock file

---

### Preview Changes

```bash
terraform plan
```

**What it does:** Shows what Terraform will create/change/destroy (doesn't actually do it!)  
**When:** Before every `apply` to see what will happen  
**Output:** List of changes with `+` (create), `~` (modify), `-` (destroy)

**Save plan to file:**

```bash
terraform plan -out=myplan.tfplan
```

---

### Apply Changes (Create Infrastructure)

```bash
terraform apply
```

**What it does:** Creates/updates infrastructure  
**When:** After reviewing `plan` and you're ready to make changes  
**Asks:** "Do you want to perform these actions?" (type `yes`)

**Skip confirmation:**

```bash
terraform apply -auto-approve
```

**Apply saved plan:**

```bash
terraform apply myplan.tfplan
```

---

### Destroy Infrastructure

```bash
terraform destroy
```

**What it does:** Deletes ALL infrastructure  
**When:** Done testing, want to save money  
**Asks:** "Do you really want to destroy all resources?" (type `yes`)

**Skip confirmation:**

```bash
terraform destroy -auto-approve
```

**Destroy specific resource:**

```bash
terraform destroy -target=azurerm_linux_web_app.moltbot
```

---

## 📊 Information Commands

### Show Current State

```bash
terraform show
```

**What it does:** Shows all created resources and their properties  
**Output:** Complete infrastructure details

**Show as JSON:**

```bash
terraform show -json
terraform show -json | jq  # Pretty print with jq
```

---

### List Resources

```bash
terraform state list
```

**What it does:** Lists all resources Terraform is managing  
**Output:**

```
azurerm_resource_group.moltbot
azurerm_storage_account.moltbot
azurerm_linux_web_app.moltbot
...
```

---

### Show Specific Resource

```bash
terraform state show azurerm_resource_group.moltbot
```

**What it does:** Shows details of one specific resource

---

### Get Outputs

```bash
terraform output
```

**What it does:** Shows all output values (URLs, connection strings, etc.)

**Get specific output:**

```bash
terraform output web_app_url
```

**Save outputs to file:**

```bash
terraform output -json > outputs.json
```

---

## 🔧 Validation & Formatting

### Validate Configuration

```bash
terraform validate
```

**What it does:** Checks if your Terraform files are correct  
**When:** After writing/editing `.tf` files  
**Output:** "Success!" or error messages

---

### Format Code

```bash
terraform fmt
```

**What it does:** Formats Terraform files nicely (like Prettier)  
**When:** After editing files, before committing

**Show what changed:**

```bash
terraform fmt -diff
```

**Format all subdirectories:**

```bash
terraform fmt -recursive
```

---

## 🔄 State Management

### Refresh State

```bash
terraform refresh
```

**What it does:** Updates Terraform's memory (state) from real infrastructure  
**When:** Someone changed something manually in Azure Portal

---

### Pull State

```bash
terraform state pull
```

**What it does:** Downloads and shows the state file  
**Output:** JSON with all resource details

---

### List State Resources

```bash
terraform state list
```

**What it does:** Shows all resources in state

---

### Remove Resource from State

```bash
terraform state rm azurerm_resource_group.moltbot
```

**What it does:** Makes Terraform forget about a resource (doesn't delete from Azure!)  
**When:** You want to manage a resource manually, not with Terraform

---

### Move/Rename Resource

```bash
terraform state mv azurerm_resource_group.old azurerm_resource_group.new
```

**What it does:** Renames a resource in state

---

## 🌍 Workspace Commands (Multiple Environments)

### List Workspaces

```bash
terraform workspace list
```

**Output:**

```
  default
* dev
  staging
  production
```

(`*` = current workspace)

---

### Create Workspace

```bash
terraform workspace new dev
```

**What it does:** Creates new isolated environment  
**Each workspace has:** Separate state file (independent infrastructure)

---

### Switch Workspace

```bash
terraform workspace select dev
```

**What it does:** Switch to different environment

---

### Delete Workspace

```bash
terraform workspace delete staging
```

**What it does:** Deletes workspace (must be empty first - destroy resources)

---

## 🔍 Debugging Commands

### Enable Debug Logging

```bash
export TF_LOG=DEBUG
terraform apply
```

**Levels:** TRACE, DEBUG, INFO, WARN, ERROR

---

### Save Logs to File

```bash
export TF_LOG=DEBUG
export TF_LOG_PATH=./terraform.log
terraform apply
```

---

### Disable Logging

```bash
unset TF_LOG
unset TF_LOG_PATH
```

---

### Force Unlock State

```bash
terraform force-unlock <lock-id>
```

**What it does:** Unlocks state if another process crashed  
**When:** See "state lock" error  
**⚠️ Careful:** Only use if you're sure no other terraform is running!

---

## 🔌 Provider Commands

### Initialize Providers

```bash
terraform init
```

---

### Upgrade Providers

```bash
terraform init -upgrade
```

**What it does:** Updates providers to latest allowed versions

---

### Lock Provider Versions

```bash
terraform providers lock
```

---

## 📥 Import Existing Resources

### Import Resource

```bash
terraform import azurerm_resource_group.moltbot /subscriptions/<sub-id>/resourceGroups/rg-moltbot-dev
```

**What it does:** Imports manually created Azure resource into Terraform  
**When:** You created something in Azure Portal and want Terraform to manage it

---

## 🎯 Target Specific Resources

### Plan for Specific Resource

```bash
terraform plan -target=azurerm_linux_web_app.moltbot
```

---

### Apply to Specific Resource

```bash
terraform apply -target=azurerm_linux_web_app.moltbot
```

---

### Destroy Specific Resource

```bash
terraform destroy -target=azurerm_linux_web_app.moltbot
```

---

## 💾 Backup & Recovery

### Backup State

```bash
cp terraform.tfstate terraform.tfstate.backup
```

---

### Restore State

```bash
cp terraform.tfstate.backup terraform.tfstate
```

---

## 🧹 Cleanup Commands

### Clean Terraform Files

```bash
rm -rf .terraform
rm .terraform.lock.hcl
rm terraform.tfstate*
rm *.tfplan
```

---

### Reinitialize

```bash
rm -rf .terraform
terraform init
```

---

## ⚙️ Variable Commands

### Set Variable via Command Line

```bash
terraform apply -var="location=westus"
```

---

### Use Variable File

```bash
terraform apply -var-file="terraform.production.tfvars"
```

---

### Use Environment Variable

```bash
export TF_VAR_location="eastus"
terraform apply
```

---

## 🔐 Sensitive Data

### Hide Sensitive Outputs

```bash
terraform output -json | jq 'del(.sensitive_key)'
```

---

### Show Sensitive Output

```bash
terraform output -raw storage_connection_string
```

---

## 📋 Graph & Dependencies

### Generate Dependency Graph

```bash
terraform graph | dot -Tpng > graph.png
```

**Requires:** `graphviz` (`brew install graphviz`)

---

## 🎓 Help Commands

### General Help

```bash
terraform -help
```

---

### Command-Specific Help

```bash
terraform apply -help
terraform plan -help
terraform destroy -help
```

---

### Version Info

```bash
terraform version
```

---

## 🚀 Quick Workflows

### Complete First-Time Setup

```bash
# 1. Login
az login

# 2. Navigate
cd infrastructure/terraform/azure/moltbot

# 3. Configure
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars

# 4. Initialize
terraform init

# 5. Validate
terraform validate

# 6. Preview
terraform plan

# 7. Deploy
terraform apply

# 8. Get info
terraform output
```

---

### Daily Dev Workflow

```bash
# Morning: Create
terraform apply -auto-approve

# Evening: Destroy
terraform destroy -auto-approve
```

---

### Update Configuration

```bash
# 1. Edit
nano terraform.tfvars

# 2. Preview
terraform plan

# 3. Apply if looks good
terraform apply
```

---

### Emergency Destroy

```bash
terraform destroy -auto-approve
```

---

### Check What Terraform Knows

```bash
# List resources
terraform state list

# Show everything
terraform show

# Get outputs
terraform output
```

---

## 📱 Makefile Commands (If Using Our Makefile)

```bash
make help          # Show all commands
make init          # Initialize
make plan          # Preview changes
make provision     # Quick deploy (auto-approve)
make destroy       # Destroy infrastructure
make destroy-auto  # Destroy without confirmation
make status        # Show current state
make output        # Show outputs
make validate      # Validate files
make format        # Format files
make clean         # Clean Terraform files
```

---

## 🎯 Most Common Commands (90% of Usage)

```bash
terraform init              # Once per project
terraform plan              # Before every change
terraform apply             # Create/update infrastructure
terraform destroy           # Delete everything
terraform output            # Get connection info
terraform state list        # See what exists
terraform show              # See details
```

---

## 💡 Pro Tips

1. **Always `plan` before `apply`**

   ```bash
   terraform plan && terraform apply
   ```

2. **Save plans for review**

   ```bash
   terraform plan -out=review.tfplan
   # Review it
   terraform apply review.tfplan
   ```

3. **Use auto-approve for scripts**

   ```bash
   terraform apply -auto-approve
   ```

4. **Format before committing**

   ```bash
   terraform fmt -recursive
   git add .
   git commit
   ```

5. **Check costs before applying**
   ```bash
   terraform plan | grep "Plan:"
   # Plan: 8 to add, 0 to change, 0 to destroy
   ```

---

## 🆘 Emergency Commands

### Something's Broken, Start Fresh

```bash
terraform destroy -auto-approve
rm -rf .terraform terraform.tfstate*
terraform init
terraform apply
```

---

### State is Corrupted

```bash
# Use backup
cp terraform.tfstate.backup terraform.tfstate

# Or refresh from Azure
terraform refresh
```

---

### Can't Destroy (Resources Still Exist)

```bash
# Force refresh
terraform refresh

# Try again
terraform destroy -auto-approve

# If still fails, manually delete in Azure Portal
# Then remove from state
terraform state rm <resource-name>
```

---

## 📚 Remember

- `init` → Download providers (first time)
- `plan` → Preview changes (always!)
- `apply` → Make changes (create/update)
- `destroy` → Delete everything (save money!)
- `output` → Get important info (URLs, keys)

**Golden Rule:** Always run `terraform plan` before `terraform apply`!
