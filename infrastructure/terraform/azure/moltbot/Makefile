.PHONY: help init plan apply destroy status clean provision

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

init: ## Initialize Terraform
	terraform init

plan: ## Show execution plan
	terraform plan

apply: plan ## Apply infrastructure changes
	terraform apply

provision: ## Quick provision (auto-approve)
	terraform apply -auto-approve

destroy: ## Destroy all infrastructure
	terraform destroy

destroy-auto: ## Destroy all infrastructure (auto-approve) - USE WITH CAUTION
	terraform destroy -auto-approve

status: ## Show current infrastructure state
	terraform show

output: ## Show all outputs
	terraform output

output-json: ## Show outputs as JSON
	terraform output -json

validate: ## Validate Terraform files
	terraform validate

format: ## Format Terraform files
	terraform fmt -recursive

clean: ## Clean Terraform files
	rm -rf .terraform
	rm -f .terraform.lock.hcl
	rm -f terraform.tfstate*

refresh: ## Refresh state
	terraform refresh

console: ## Open Terraform console
	terraform console

workspace-list: ## List workspaces
	terraform workspace list

workspace-dev: ## Switch to dev workspace
	terraform workspace select dev || terraform workspace new dev

workspace-staging: ## Switch to staging workspace
	terraform workspace select staging || terraform workspace new staging

workspace-prod: ## Switch to production workspace
	terraform workspace select production || terraform workspace new production
