# Implementation Plan: Minimal Terraform for Ubuntu VM on Azure with SSH

**Branch**: `feature/001-terraform-azure-vm` | **Date**: 2026-02-02 | **Spec**: [specs/001-terraform-azure-vm/spec.md](specs/001-terraform-azure-vm/spec.md)
**Input**: Feature specification from `/specs/001-terraform-azure-vm/spec.md`

## Summary

Create a minimal, well-commented Terraform configuration to deploy an Ubuntu 22.04 LTS VM on Azure with SSH access using public key authentication. Include brief explanations for each Terraform block. The solution should be cost-effective (B1s size), secure (SSH-only), and easy to deploy/destroy.

## Technical Context

**Language/Version**: Terraform >=1.5.0, HCL  
**Primary Dependencies**: azurerm provider ~>3.0  
**Storage**: Azure VM OS disk (Standard_LRS)  
**Testing**: terraform validate/plan/apply; manual SSH test  
**Target Platform**: Azure (Linux VM)  
**Performance Goals**: Deployment time <5 minutes, low cost  
**Constraints**: Minimal resources, SSH public key required, no password auth  
**Scale/Scope**: Single VM, no auto-scaling or multi-VM

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Spec-Driven**: Feature has a detailed spec in `.github/specs/`?
- [x] **Testable**: Plan includes terraform validation and SSH connectivity testing?
- [x] **Strict Types**: HCL provides type safety for variables and resources?
- [x] **Security**: SSH key authentication only, no hardcoded secrets?
- [x] **Predictable**: Terraform declarative model ensures predictable deployments?

## Project Structure

### Documentation (this feature)

```text
specs/001-terraform-azure-vm/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Not applicable (no API)
```

### Source Code (repository root)

```text
infrastructure/terraform/azure/minimal-vm/
├── main.tf              # Core resources
├── variables.tf         # Configurable inputs
├── outputs.tf           # Exposed values
└── terraform.tf         # Provider config
```

**Structure Decision**: Simple Terraform module in `infrastructure/terraform/azure/minimal-vm/` for easy reuse and isolation.
