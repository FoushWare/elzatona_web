# Data Model: Minimal Terraform for Ubuntu VM on Azure with SSH

## Entities

### Resource Group

- **Name**: `rg-minimal-vm`
- **Fields**: name (string), location (string)
- **Purpose**: Logical container for all Azure resources
- **Relationships**: Contains VNet, NSG, PIP, VM

### Virtual Network (VNet)

- **Name**: `vnet-minimal`
- **Fields**: name, address_space (list of CIDR), location, resource_group_name
- **Purpose**: Network isolation
- **Relationships**: Contains Subnet

### Subnet

- **Name**: `subnet-minimal`
- **Fields**: name, address_prefixes (list of CIDR), resource_group_name, virtual_network_name
- **Purpose**: Subnet for VM
- **Relationships**: Contains NIC

### Network Security Group (NSG)

- **Name**: `nsg-minimal`
- **Fields**: name, location, resource_group_name, security_rules (list)
- **Purpose**: Firewall rules (allow SSH)
- **Relationships**: Associated with NIC

### Public IP

- **Name**: `pip-minimal`
- **Fields**: name, location, resource_group_name, allocation_method (Static), sku (Basic)
- **Purpose**: Public IP for SSH access
- **Relationships**: Attached to NIC

### Network Interface (NIC)

- **Name**: `nic-minimal`
- **Fields**: name, location, resource_group_name, ip_configuration (subnet_id, public_ip_id)
- **Purpose**: Network interface for VM
- **Relationships**: Associated with NSG, attached to VM

### Virtual Machine (VM)

- **Name**: `vm-minimal`
- **Fields**: name, location, resource_group_name, size (Standard_B1s), admin_username, admin_ssh_key, os_disk, source_image_reference
- **Purpose**: Ubuntu VM with SSH access
- **Relationships**: Uses NIC

## Relationships

- Resource Group → VNet (contains)
- VNet → Subnet (contains)
- Subnet → NIC (contains)
- NSG → NIC (associated)
- PIP → NIC (attached)
- NIC → VM (attached)

## Validation Rules

- All resources in same location and resource group.
- NSG allows TCP 22 from any source.
- VM uses Ubuntu 22.04 LTS image.
- SSH key file must exist at specified path.
