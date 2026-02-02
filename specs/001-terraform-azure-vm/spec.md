# Feature Specification: Minimal Terraform for Ubuntu VM on Azure with SSH

**Feature Branch**: `feature/001-terraform-azure-vm`  
**Created**: 2026-02-02  
**Status**: Draft  
**Input**: User description: "Write minimal Terraform to create an Ubuntu VM on Azure with SSH access, explain every block briefly."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Create Ubuntu VM with SSH access (Priority: P1)

As a developer, I want to deploy a minimal Ubuntu VM on Azure with SSH access so I can install software and run commands.

**Why this priority**: This is the core functionality requested.

**Independent Test**: Can be fully tested by running `terraform apply` and successfully SSHing into the VM with `ssh azureuser@<public-ip>`.

**Acceptance Scenarios**:

1. **Given** an Azure subscription with permissions, **When** `terraform apply` is run, **Then** an Ubuntu VM is created with a public IP.
2. **Given** the VM is deployed, **When** SSH command is run with the private key, **Then** connection succeeds and Ubuntu prompt appears.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST create an Ubuntu 22.04 LTS VM on Azure.
- **FR-002**: System MUST configure SSH access using public key authentication only (no passwords).
- **FR-003**: System MUST provide a public IP for SSH access.
- **FR-004**: System MUST include minimal networking (VNet, Subnet, NSG with SSH rule).

### Key Entities _(include if feature involves data)_

- **VM**: Ubuntu Linux virtual machine with SSH key.
- **Network Resources**: Resource Group, Virtual Network, Subnet, Network Security Group, Public IP, Network Interface.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Terraform `plan` and `apply` complete without errors.
- **SC-002**: SSH connection to the VM succeeds using the provided key.
- **SC-003**: VM runs Ubuntu 22.04 LTS as verified by `lsb_release -a` over SSH.
