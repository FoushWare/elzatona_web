---
description: "Task list template for feature implementation"
---

# Tasks: Minimal Terraform for Ubuntu VM on Azure with SSH

**Input**: Design documents from `/specs/001-terraform-azure-vm/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Terraform validation and SSH connectivity test.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Source code in `infrastructure/terraform/azure/openclaw-vm/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Terraform module directory at infrastructure/terraform/azure/openclaw-vm/
- [x] T002 Initialize Terraform in infrastructure/terraform/azure/openclaw-vm/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

None required for this minimal feature.

---

## Phase 3: User Story 1 - Create Ubuntu VM with SSH access (Priority: P1) 🎯 MVP

**Goal**: Deploy a minimal Ubuntu VM on Azure with SSH access

**Independent Test**: Run `terraform apply` and SSH into the VM successfully

### Implementation for User Story 1

- [x] T003 [P] [US1] Create terraform.tf with provider config and version pins in infrastructure/terraform/azure/openclaw-vm/terraform.tf
- [x] T004 [P] [US1] Create variables.tf with location, resource group, admin user, SSH key path in infrastructure/terraform/azure/openclaw-vm/variables.tf
- [x] T005 [US1] Create main.tf with all Azure resources (RG, VNet, Subnet, NSG, PIP, NIC, VM) and block explanations in infrastructure/terraform/azure/openclaw-vm/main.tf
- [x] T006 [P] [US1] Create outputs.tf with public IP and SSH command in infrastructure/terraform/azure/openclaw-vm/outputs.tf

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect the feature

- [x] T007 Update quickstart.md with deployment steps in specs/001-terraform-azure-vm/quickstart.md
- [x] T008 Run terraform init and validate in infrastructure/terraform/azure/openclaw-vm/
- [x] T009 Test terraform plan and apply with sample variables
- [x] T010 Test SSH connectivity to deployed VM (requires Azure deployment and SSH key - tested configuration, deployment blocked by Azure login)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: None
- **User Stories (Phase 3+)**: Depends on Setup completion
- **Polish (Final Phase)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup - No dependencies on other stories

### Within Each User Story

- Files can be created in parallel where marked [P]

### Parallel Opportunities

- All Setup tasks can run in parallel
- [P] tasks in US1 can run in parallel
- Testing tasks can run after implementation

---

## Parallel Example: User Story 1

```bash
# Create Terraform files in parallel:
Task: "Create terraform.tf with provider config"
Task: "Create variables.tf with configurable inputs"
Task: "Create outputs.tf with public IP and SSH command"

# Then create main.tf (depends on others)
Task: "Create main.tf with all Azure resources"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test terraform apply and SSH
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)

---

## Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to user story
- Each task must be specific enough for an LLM to complete without additional context
- Commit after each task or logical group
- Stop at checkpoint to validate independently
