# File Path Conventions

## Standard Format

To avoid confusion between package roots and source directories, we use the following conventions:

### For Shared Libraries

**Format:** `@elzatona/[package]` → `lib/[relative-path]`

**Examples:**

- `@elzatona/components` → `lib/components/molecules/AdminMetricCard.tsx`
- `@elzatona/hooks` → `lib/useAdminStats.ts`
- `@elzatona/contexts` → `lib/AdminAuthProvider.tsx`

**Full Path Mapping:**

- `@elzatona/components` → `libs/components/src/lib/components/...`
- `@elzatona/hooks` → `libs/hooks/src/lib/...`
- `@elzatona/contexts` → `libs/contexts/src/lib/...`
- `@elzatona/types` → `libs/types/src/lib/...`
- `@elzatona/utilities` → `libs/utilities/src/lib/...`

### For App Files

**Format:** Full path from repository root

**Examples:**

- `apps/website/src/app/admin/dashboard/page.tsx`
- `apps/website/src/app/admin/dashboard/page.test.tsx`

### Import Statements

**In Code:**

```typescript
// ✅ DO: Use package alias
import { AdminMetricCard } from "@elzatona/components";
import { useAdminStats } from "@elzatona/hooks";
```

**In Documentation:**

```markdown
<!-- ✅ DO: Use package alias → relative path -->

- `@elzatona/components` → `lib/components/molecules/AdminMetricCard.tsx`
- `@elzatona/hooks` → `lib/useAdminStats.ts`
```

## Rationale

1. **Clarity**: Package aliases (`@elzatona/components`) are what developers see in imports
2. **Consistency**: All shared libraries follow the same pattern
3. **Simplicity**: Shorter paths that map clearly to actual file locations
4. **No Confusion**: Avoids mixing `libs/components` and `libs/components/src`
