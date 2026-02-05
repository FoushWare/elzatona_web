# Resource group acts as a logical boundary and kill switch
resource "azurerm_resource_group" "this" {
  name     = var.resource_group_name
  location = var.location
}

# Virtual network isolates the VM
resource "azurerm_virtual_network" "this" {
  name                = "vnet-openclaw"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}

# Subnet for the VM
resource "azurerm_subnet" "this" {
  name                 = "subnet-openclaw"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Network security group controlling inbound/outbound traffic
resource "azurerm_network_security_group" "this" {
  name                = "nsg-openclaw"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name

  # Allow SSH access to the VM
  security_rule {
    name                       = "AllowSSH"
    priority                   = 1000
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Public IP required for SSH access from your machine
resource "azurerm_public_ip" "this" {
  name                = "pip-openclaw"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Network interface connects VM to network and public IP
resource "azurerm_network_interface" "this" {
  name                = "nic-openclaw"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name

  ip_configuration {
    name                          = "ipconfig"
    subnet_id                     = azurerm_subnet.this.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.this.id
  }
}

# Associate NSG with NIC to enforce security rules
resource "azurerm_network_interface_security_group_association" "this" {
  network_interface_id      = azurerm_network_interface.this.id
  network_security_group_id = azurerm_network_security_group.this.id
}

# Linux virtual machine hosting OpenClaw
resource "azurerm_linux_virtual_machine" "this" {
  name                = "vm-openclaw"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  size                = var.vm_size

  # SSH-only authentication, no passwords
  disable_password_authentication = true
  admin_username                  = var.admin_username
  network_interface_ids           = [azurerm_network_interface.this.id]

  # SSH public key used for secure access
  admin_ssh_key {
    username   = var.admin_username
    public_key = file(var.ssh_public_key_path)
  }

  # Ubuntu 22.04 LTS image
  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  # OS disk configuration
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  # Cloud-init for automated security hardening
  custom_data = filebase64("${path.module}/cloud-init-secure.yaml")

  # Tags improve clarity and cost tracking
  tags = {
    purpose = "openclaw-agent"
    env     = "dev"
  }
}
