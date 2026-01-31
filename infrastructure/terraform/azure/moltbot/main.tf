# MoltBot Azure Infrastructure
# Quick provision and teardown for development and testing

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Resource Group
resource "azurerm_resource_group" "moltbot" {
  name     = var.resource_group_name
  location = var.location
  
  tags = merge(
    var.tags,
    {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Purpose     = "MoltBot AI Agent Infrastructure"
    }
  )
}

# Storage Account for MoltBot data and logs
resource "azurerm_storage_account" "moltbot" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.moltbot.name
  location                 = azurerm_resource_group.moltbot.location
  account_tier             = "Standard"
  account_replication_type = var.storage_replication_type
  
  tags = var.tags
}

# Container for MoltBot logs
resource "azurerm_storage_container" "logs" {
  name                  = "moltbot-logs"
  storage_account_name  = azurerm_storage_account.moltbot.name
  container_access_type = "private"
}

# Container for MoltBot data
resource "azurerm_storage_container" "data" {
  name                  = "moltbot-data"
  storage_account_name  = azurerm_storage_account.moltbot.name
  container_access_type = "private"
}

# App Service Plan
resource "azurerm_service_plan" "moltbot" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.moltbot.name
  location            = azurerm_resource_group.moltbot.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  
  tags = var.tags
}

# Linux Web App for MoltBot
resource "azurerm_linux_web_app" "moltbot" {
  name                = var.web_app_name
  resource_group_name = azurerm_resource_group.moltbot.name
  location            = azurerm_service_plan.moltbot.location
  service_plan_id     = azurerm_service_plan.moltbot.id
  
  site_config {
    always_on = var.environment == "production" ? true : false
    
    application_stack {
      node_version = "18-lts"
    }
    
    cors {
      allowed_origins = var.allowed_origins
    }
  }
  
  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "18-lts"
    "STORAGE_ACCOUNT_NAME"         = azurerm_storage_account.moltbot.name
    "STORAGE_ACCOUNT_KEY"          = azurerm_storage_account.moltbot.primary_access_key
    "STORAGE_CONNECTION_STRING"    = azurerm_storage_account.moltbot.primary_connection_string
    "ENVIRONMENT"                  = var.environment
  }
  
  tags = var.tags
}

# Application Insights for monitoring
resource "azurerm_application_insights" "moltbot" {
  name                = var.app_insights_name
  resource_group_name = azurerm_resource_group.moltbot.name
  location            = azurerm_resource_group.moltbot.location
  application_type    = "Node.JS"
  
  tags = var.tags
}

# Key Vault for secrets
resource "azurerm_key_vault" "moltbot" {
  name                       = var.key_vault_name
  resource_group_name        = azurerm_resource_group.moltbot.name
  location                   = azurerm_resource_group.moltbot.location
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false
  
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id
    
    secret_permissions = [
      "Get",
      "List",
      "Set",
      "Delete",
      "Purge"
    ]
  }
  
  tags = var.tags
}

# Data source for current Azure config
data "azurerm_client_config" "current" {}
