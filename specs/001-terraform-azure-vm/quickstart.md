# Quickstart: Minimal Terraform for Ubuntu VM on Azure with SSH

## Prerequisites

- Azure CLI installed and logged in (`az login`)
- Terraform >=1.5.0 installed
- SSH key pair (`ssh-keygen -t rsa -b 2048 -f ~/.ssh/azure_vm`)

## Deployment

1. Clone or navigate to the repository.
2. Change to the module directory:

   ```bash
   cd infrastructure/terraform/azure/minimal-vm
   ```

3. Initialize Terraform:

   ```bash
   terraform init
   ```

4. Plan the deployment:

   ```bash
   terraform plan -var="ssh_public_key_path=~/.ssh/azure_vm.pub"
   ```

5. Apply the configuration:

   ```bash
   terraform apply -var="ssh_public_key_path=~/.ssh/azure_vm.pub"
   ```

6. Note the public IP from outputs.

## SSH Access

```bash
ssh -i ~/.ssh/azure_vm azureuser@<public-ip>
```

Verify Ubuntu version:

```bash
lsb_release -a
```

## Teardown

```bash
terraform destroy -var="ssh_public_key_path=~/.ssh/azure_vm.pub"
```

## Troubleshooting

- **Provider auth error**: Ensure `az login` and correct subscription.
- **SkuNotAvailable**: Change VM size in variables.tf.
- **SSH fails**: Check NSG rules and key permissions (`chmod 600 ~/.ssh/azure_vm`).
