output "resource_group_name" {
  description = "Name of the created resource group"
  value       = azurerm_resource_group.moltbot.name
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.moltbot.name
}

output "storage_connection_string" {
  description = "Storage account connection string"
  value       = azurerm_storage_account.moltbot.primary_connection_string
  sensitive   = true
}

output "web_app_url" {
  description = "URL of the deployed web app"
  value       = "https://${azurerm_linux_web_app.moltbot.default_hostname}"
}

output "web_app_name" {
  description = "Name of the web app"
  value       = azurerm_linux_web_app.moltbot.name
}

output "app_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.moltbot.instrumentation_key
  sensitive   = true
}

output "app_insights_connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.moltbot.connection_string
  sensitive   = true
}

output "key_vault_name" {
  description = "Name of the Key Vault"
  value       = azurerm_key_vault.moltbot.name
}

output "key_vault_uri" {
  description = "URI of the Key Vault"
  value       = azurerm_key_vault.moltbot.vault_uri
}
