# File Path Conventions

## Standard Format

To avoid confusion between package roots and source directories, we use the following conventions:

### For Shared Libraries

**Format:** `@elzatona/[package]` → `[relative-path]` (no `lib/` prefix)

**Examples:**

- `@elzatona/common-ui` → `components/molecules/AdminMetricCard.tsx`
- `@elzatona/hooks` → `useAdminStats.ts`
- `@elzatona/contexts` → `AdminAuthProvider.tsx`

**Full Path Mapping:**

- `@elzatona/common-ui` → `libs/common-ui/src/components/...`
- `@elzatona/hooks` → `libs/hooks/src/lib/...` (currently)
- `@elzatona/contexts` → `libs/contexts/src/lib/...` (currently)
- `@elzatona/types` → `libs/types/src/lib/...` (currently)
- `@elzatona/utilities` → `libs/utilities/src/lib/...` (currently)

**Note:** The `lib/` folder in the physical structure is an implementation detail. Documentation uses the simplified logical structure without `lib/` to avoid confusion.

### For App Files

**Format:** Full path from repository root

**Examples:**

- `apps/website/src/app/admin/dashboard/page.tsx`
- `apps/website/src/app/admin/dashboard/page.test.tsx`

### Import Statements

**In Code:**

```typescript
// ✅ DO: Use package alias
import { AdminMetricCard } from "@elzatona/common-ui";
import { useAdminStats } from "@elzatona/hooks";
```

**In Documentation:**

```markdown
<!-- ✅ DO: Use package alias → relative path (no lib/ prefix) -->

- `@elzatona/common-ui` → `components/molecules/AdminMetricCard.tsx`
- `@elzatona/hooks` → `useAdminStats.ts`
```

## Rationale

1. **Clarity**: Package aliases (`@elzatona/common-ui`) are what developers see in imports
2. **Consistency**: All shared libraries follow the same pattern
3. **Simplicity**: Shorter paths that map clearly to actual file locations
4. **No Confusion**: Avoids mixing `libs/common-ui` and `libs/common-ui/src`
5. **Logical Structure**: Shows the logical organization, not the physical `lib/` nesting (which is an implementation detail)
