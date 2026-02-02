# Research: Minimal Terraform for Ubuntu VM on Azure with SSH

## Resolved Clarifications

- **VM Size**: Standard_B1s for cost-effectiveness (cheapest burstable VM).
- **Ubuntu Version**: 22.04 LTS (latest stable).
- **SSH Setup**: Public key authentication only, disable passwords.
- **Networking**: Minimal VNet/Subnet/NSG/PIP/NIC for SSH access.
- **Provider Version**: azurerm ~>3.0 for stability.

## Best Practices Researched

- **Resource Organization**: Group related resources in one module, use variables for configurability.
- **Security**: NSG with minimal rules (SSH only), SSH key auth.
- **Cost**: Use Basic SKU for PIP, Standard_LRS for OS disk, smallest VM size.
- **Idempotency**: Terraform ensures repeatable deployments.
- **Validation**: Use terraform validate and plan before apply.

## Decision: Terraform with azurerm Provider

**Rationale**: Terraform provides declarative infrastructure as code, supports Azure well via azurerm provider, and allows version control and reuse.

**Alternatives Considered**:

- ARM Templates: Azure-native but JSON-heavy, less reusable across clouds.
- Bicep: Simpler than ARM but still Azure-specific.
- Azure CLI/PowerShell: Imperative, not declarative.

## Patterns for Azure VM

- Use resource groups for isolation.
- Associate NSG with NIC for security.
- Static PIP for consistent SSH access.
- Ubuntu Canonical image for reliability.
