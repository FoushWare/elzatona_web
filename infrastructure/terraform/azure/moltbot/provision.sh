#!/bin/bash

# MoltBot Azure Infrastructure - Quick Provision Script
# This script provides a quick way to provision MoltBot infrastructure on Azure

set -e

echo "🚀 MoltBot Azure Infrastructure Provisioner"
echo "==========================================="
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   brew install azure-cli"
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install it first:"
    echo "   brew install terraform"
    exit 1
fi

# Check if logged in to Azure
echo "🔐 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "⚠️  Not logged in to Azure. Logging in..."
    az login
fi

# Show current subscription
SUBSCRIPTION=$(az account show --query name -o tsv)
echo "✅ Logged in to Azure"
echo "📋 Current subscription: $SUBSCRIPTION"
echo ""

# Ask for confirmation
read -p "Continue with this subscription? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted. Use 'az account set --subscription <name>' to change subscription."
    exit 1
fi

# Navigate to terraform directory
cd "$(dirname "$0")"

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "⚠️  terraform.tfvars not found. Creating from example..."
    cp terraform.tfvars.example terraform.tfvars
    echo "✏️  Please edit terraform.tfvars with your specific values."
    read -p "Press Enter after editing terraform.tfvars to continue..."
fi

# Initialize Terraform
echo ""
echo "🔧 Initializing Terraform..."
terraform init

# Validate configuration
echo ""
echo "✅ Validating Terraform configuration..."
terraform validate

# Show plan
echo ""
echo "📋 Showing execution plan..."
terraform plan

# Ask for confirmation to apply
echo ""
read -p "Apply these changes? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted."
    exit 1
fi

# Apply configuration
echo ""
echo "🚀 Provisioning infrastructure..."
terraform apply -auto-approve

# Show outputs
echo ""
echo "✅ Infrastructure provisioned successfully!"
echo ""
echo "📊 Outputs:"
terraform output

echo ""
echo "🎉 Done! Your MoltBot infrastructure is ready."
echo ""
echo "To destroy the infrastructure when you're done:"
echo "  cd infrastructure/terraform/azure/moltbot"
echo "  terraform destroy"
echo ""
