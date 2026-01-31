#!/bin/bash

# MoltBot Azure Infrastructure - Quick Destroy Script
# This script provides a quick way to destroy MoltBot infrastructure on Azure

set -e

echo "🗑️  MoltBot Azure Infrastructure Destroyer"
echo "=========================================="
echo ""
echo "⚠️  WARNING: This will destroy ALL MoltBot infrastructure!"
echo ""

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed."
    exit 1
fi

# Navigate to terraform directory
cd "$(dirname "$0")"

# Check if terraform state exists
if [ ! -f "terraform.tfstate" ] && [ ! -f ".terraform/terraform.tfstate" ]; then
    echo "ℹ️  No Terraform state found. Nothing to destroy."
    exit 0
fi

# Show current resources
echo "📋 Current infrastructure:"
terraform show

echo ""
read -p "Are you SURE you want to destroy all resources? (yes/no) " -r
echo ""
if [[ ! $REPLY == "yes" ]]; then
    echo "❌ Aborted. Infrastructure preserved."
    exit 1
fi

# Destroy infrastructure
echo ""
echo "🗑️  Destroying infrastructure..."
terraform destroy -auto-approve

echo ""
echo "✅ Infrastructure destroyed successfully!"
echo ""
