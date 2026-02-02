# Public IP used to SSH into the VM
output "vm_public_ip" {
  description = "Public IP address of the OpenClaw VM"
  value       = azurerm_public_ip.this.ip_address
}

# SSH command for convenience
output "ssh_command" {
  description = "SSH command to connect to the VM"
  value       = "ssh ${var.admin_username}@${azurerm_public_ip.this.ip_address}"
}
