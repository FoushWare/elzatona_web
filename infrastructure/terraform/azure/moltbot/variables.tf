variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-moltbot-dev"
}

variable "storage_account_name" {
  description = "Storage account name (must be globally unique, 3-24 chars, lowercase alphanumeric)"
  type        = string
  default     = "stmoltbotdev001"
}

variable "storage_replication_type" {
  description = "Storage account replication type"
  type        = string
  default     = "LRS"
}

variable "app_service_plan_name" {
  description = "App Service Plan name"
  type        = string
  default     = "asp-moltbot-dev"
}

variable "app_service_sku" {
  description = "App Service Plan SKU (B1, S1, P1v2, etc.)"
  type        = string
  default     = "B1"
}

variable "web_app_name" {
  description = "Web App name (must be globally unique)"
  type        = string
  default     = "app-moltbot-dev-001"
}

variable "app_insights_name" {
  description = "Application Insights name"
  type        = string
  default     = "appi-moltbot-dev"
}

variable "key_vault_name" {
  description = "Key Vault name (must be globally unique, 3-24 chars)"
  type        = string
  default     = "kv-moltbot-dev-001"
}

variable "allowed_origins" {
  description = "CORS allowed origins"
  type        = list(string)
  default     = ["http://localhost:3000", "http://localhost:4200"]
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Project   = "MoltBot"
    ManagedBy = "Terraform"
  }
}
