# Azure region where all resources will be created
variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "westeurope"
}

# Resource group name to allow clean teardown
variable "resource_group_name" {
  description = "Resource group name"
  type        = string
  default     = "rg-openclaw-dev"
}

# VM admin username used for SSH login
variable "admin_username" {
  description = "Linux admin username"
  type        = string
  default     = "azureuser"
}

# Public SSH key used for secure access
variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
}

# VM size (SKU) for the virtual machine
variable "vm_size" {
  description = "Azure VM size"
  type        = string
  default     = "Standard_D2s_v3"
}
