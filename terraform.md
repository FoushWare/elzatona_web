# Terraform Constitution

This constitution defines the non-negotiable rules governing all Terraform
code generated, modified, or reviewed within this repository.

All agents, tools, and contributors MUST comply with these rules.
If a specification conflicts with this constitution, the constitution prevails.

---

## 1. Infrastructure as Code First

### Principle

All infrastructure MUST be defined and managed using Terraform.

### Implications

- Manual changes through cloud consoles are forbidden.
- All infrastructure changes must be version-controlled.
- Terraform state must be treated as a critical system artifact.

### Enforcement

- Every infrastructure change must be represented as Terraform code.
- Drift must be resolvable by reapplying Terraform.

---

## 2. Minimal and Explicit Resources

### Principle

Terraform code MUST prefer minimal, explicit, and readable configurations.

### Implications

- No unused resources.
- No implicit defaults when clarity is improved by explicit values.
- No premature abstraction.

### Enforcement

- Modules MUST NOT be introduced unless explicitly required by the spec.
- Each resource must justify its existence.

---

## 3. Mandatory Code Commentary

### Principle

Every Terraform file and every major block MUST be documented with comments.

### Implications

- Each `provider`, `resource`, `data`, `variable`, and `output` block
  MUST include comments explaining:
  - Why it exists
  - What it controls
  - What breaks if it is removed or changed
- Complex expressions MUST be explained inline.

### Enforcement

- Undocumented Terraform code is considered incomplete.
- Agents MUST add comments when generating or modifying code.

---

## 4. Agent Autonomy Boundaries

### Principle

Agents MAY generate Terraform code but MUST NOT perform state-changing actions.

### Implications

- Agents may NOT run:
  - `terraform apply`
  - `terraform destroy`
  - any command that mutates state
- Agents may suggest commands but not execute them.

### Enforcement

- All state changes require explicit human execution.
- Plans must be reviewed by a human before apply.

---

## 5. Terraform Plan as a Contract

### Principle

The Terraform plan is a contract that MUST be reviewed before execution.

### Implications

- `terraform plan` output must be readable and understandable.
- Destructive changes must be clearly visible.

### Enforcement

- Apply MUST NOT proceed without reviewing the plan.
- Large diffs must be broken into smaller changes.

---

## 6. Version and Provider Control

### Principle

Terraform and provider versions MUST be pinned explicitly.

### Implications

- No floating versions.
- No implicit provider upgrades.

### Enforcement

- `required_version` must be defined.
- Providers must declare version constraints.

---

## 7. Security by Default

### Principle

Infrastructure MUST be secure by default.

### Implications

- No open ingress (e.g., `0.0.0.0/0`) unless explicitly justified.
- Secrets MUST NOT be hardcoded.
- Access must follow least-privilege principles.

### Enforcement

- Security-related resources MUST include comments explaining exposure.
- Unsafe defaults require explicit approval in the spec.

---

## 8. Cost Awareness

### Principle

Infrastructure MUST minimize unnecessary cost.

### Implications

- Default instance sizes must be minimal.
- Auto-scaling must define upper bounds.
- Test infrastructure must be easy to destroy.

### Enforcement

- Resources must be destroyable without manual cleanup.
- Long-lived resources must be explicitly justified.

---

## 9. Destruction Safety

### Principle

Infrastructure must be safely destroyable.

### Implications

- `terraform destroy` must not fail due to hidden dependencies.
- Critical resources must be clearly marked and documented.

### Enforcement

- Destructive behavior must be visible in the plan.
- Agents must warn about destructive changes.

---

## 10. Readability Over Cleverness

### Principle

Terraform code MUST optimize for human readability over compactness.

### Implications

- Clear naming over short naming.
- Simple expressions over clever ones.
- Duplication is acceptable if it improves clarity.

### Enforcement

- Code that is hard to explain is considered incorrect.
- Agents must prefer clarity when generating code.

---

## Final Authority

This constitution applies to:

- All Terraform code
- All agents generating Terraform
- All reviews and changes

Violations must be corrected before merge or apply.
