terraform {
  # Terraform version is pinned to ensure reproducibility
  required_version = ">= 1.5.0, < 2.0.0"

  required_providers {
    azurerm = {
      # Azure provider pinned to avoid breaking changes
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
}

# Azure provider configuration
provider "azurerm" {
  # Required feature block, even if empty
  features {}
}
