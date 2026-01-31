# MoltBot Azure Infrastructure - Terraform

Quick provision and teardown infrastructure for MoltBot AI Agent on Azure.

## Prerequisites

1. **Azure CLI** - Already installed ✓
2. **Terraform** - Install via:
   ```bash
   brew install terraform
   ```
3. **Azure Subscription** - Active Azure subscription with appropriate permissions

## Quick Start

### 1. Login to Azure

```bash
az login
az account set --subscription "<your-subscription-id>"
```

### 2. Configure Variables

```bash
cd infrastructure/terraform/azure/moltbot
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your specific values
```

### 3. Initialize Terraform

```bash
terraform init
```

### 4. Preview Changes

```bash
terraform plan
```

### 5. Deploy Infrastructure

```bash
terraform apply
```

### 6. Destroy Infrastructure (when done)

```bash
terraform destroy
```

## What Gets Provisioned

- **Resource Group** - Container for all MoltBot resources
- **Storage Account** - For logs and data persistence
  - Container: `moltbot-logs`
  - Container: `moltbot-data`
- **App Service Plan** - Linux-based hosting plan (B1 SKU by default)
- **Web App** - Node.js 18 LTS application
- **Application Insights** - Monitoring and telemetry
- **Key Vault** - Secure secrets management

## Cost Management

**Development SKU (B1):**

- ~$13/month for App Service Plan
- ~$1-5/month for Storage (depending on usage)
- ~$2/month for Application Insights (first 5GB free)
- Total: ~$16-20/month

**To minimize costs:**

1. Use `terraform destroy` when not actively developing
2. Consider Free tier (F1) for App Service during initial testing
3. Switch to consumption-based plans for production

## Quick Commands

### Provision

```bash
make provision  # or: terraform apply -auto-approve
```

### Destroy

```bash
make destroy    # or: terraform destroy -auto-approve
```

### Check Status

```bash
make status     # or: terraform show
```

### Get Outputs

```bash
terraform output
terraform output -json > outputs.json
terraform output web_app_url
```

## Environment-Specific Configurations

### Development

```bash
terraform workspace select dev || terraform workspace new dev
terraform apply -var-file="terraform.tfvars"
```

### Staging

```bash
terraform workspace select staging || terraform workspace new staging
terraform apply -var-file="terraform.staging.tfvars"
```

### Production

```bash
terraform workspace select production || terraform workspace new production
terraform apply -var-file="terraform.production.tfvars"
```

## Important Notes

1. **Unique Names**: Storage account and web app names must be globally unique across Azure
2. **Resource Cleanup**: Always run `terraform destroy` to avoid ongoing charges
3. **State Management**: Consider using Azure Storage backend for team collaboration
4. **Secrets**: Never commit `terraform.tfvars` - it's in `.gitignore`

## Outputs After Deployment

After successful deployment, you'll get:

- Web App URL
- Storage connection strings
- Application Insights keys
- Key Vault URI

Access them via:

```bash
terraform output web_app_url
terraform output -json
```

## Troubleshooting

### Name Already Exists

If you get "name already exists" errors, update these variables to unique values:

- `storage_account_name`
- `web_app_name`
- `key_vault_name`

### Authentication Issues

```bash
az login --use-device-code
az account show
```

### State Lock Issues

```bash
terraform force-unlock <lock-id>
```

## Next Steps

1. Configure CI/CD pipeline for automated deployments
2. Set up remote state backend in Azure Storage
3. Add monitoring alerts and dashboards
4. Configure custom domains and SSL certificates
