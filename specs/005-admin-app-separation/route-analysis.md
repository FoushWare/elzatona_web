# Route Analysis for Admin App Separation

**Date**: 2026-01-30  
**Purpose**: T001-T003 analysis for Phase 1 implementation

## Route Comparison Results

### Website Admin Routes (`apps/website/src/app/admin/`)
```
admin/
├── content/              # DUPLICATE - exists in admin app
├── content-management/   # DUPLICATE - exists in admin app  
├── frontend-tasks/       # DUPLICATE - exists in admin app
├── layout.tsx           # UNIQUE - admin layout for website
├── learning-cards/       # MIGRATION NEEDED - missing in admin app
├── login/               # DUPLICATE - exists in admin app
├── logs/                # MIGRATION NEEDED - missing in admin app
├── page.test.tsx        # UNIQUE - test file
├── page.tsx             # UNIQUE - admin home page
├── problem-solving/     # DUPLICATE - exists in admin app
├── questions/           # MIGRATION NEEDED - missing in admin app  
└── users/               # MIGRATION NEEDED - missing in admin app
```

### Admin App Routes (`apps/admin/src/app/admin/`)
```
admin/
├── content/              # EXISTS - canonical version
├── content-management/   # EXISTS - canonical version
├── dashboard/            # UNIQUE - admin dashboard (already migrated)
├── frontend-tasks/       # EXISTS - canonical version
├── layout.tsx           # EXISTS - admin app layout
├── learning-cards/       # MISSING - needs migration from website
├── login/               # EXISTS - canonical version
├── page.tsx             # EXISTS - admin home page
└── problem-solving/     # EXISTS - canonical version
```

## API Route Analysis

### Website API Routes (`apps/website/src/app/api/`)
```
api/
├── admin/               # Admin-specific APIs
├── auth/                # Authentication
├── cards/               # DUPLICATE - exists in admin app
├── categories/          # DUPLICATE - exists in admin app  
├── check-project/       # Website-specific
├── code/                # Website-specific
├── dashboard/           # Mixed usage (admin + user)
├── flashcards/          # Website-specific
├── frontend-tasks/      # Admin-specific
├── guided-learning/     # Website-specific
├── learning-paths/      # Website-specific
├── plans/               # Website-specific
├── progress/            # Website-specific
├── questions/           # DUPLICATE - exists in admin app
├── sections/            # Website-specific
├── seed-plan-questions/ # Website-specific
├── topics/              # DUPLICATE - exists in admin app
├── user/                # Website-specific
└── users/               # Admin-specific
```

### Admin API Routes (`apps/admin/src/app/api/`)
```
api/
├── admin/               # Admin-specific APIs (consolidated)
├── cards/               # EXISTS - canonical version
├── categories/          # EXISTS - canonical version
├── questions/           # EXISTS - canonical version
└── topics/              # EXISTS - canonical version
```

## Migration Requirements

### Routes Needing Migration (Website → Admin)
1. **learning-cards/** - Complete page structure + components
2. **logs/** - Log viewing and filtering functionality  
3. **users/** - User management functionality
4. **questions/** - Question management (may redirect to content/questions)

### Duplicate Routes to Consolidate
1. **content/** - Verify admin app version is canonical
2. **content-management/** - Verify admin app version is canonical
3. **frontend-tasks/** - Verify admin app version is canonical  
4. **login/** - Verify admin app version is canonical
5. **problem-solving/** - Verify admin app version is canonical

### API Routes Requiring Migration
1. **frontend-tasks** API - Move to admin app
2. **users** API - Move to admin app  
3. **admin** API - Verify admin app has complete functionality

## Component Dependencies

### Shared Libraries in Use
- `@elzatona/common-ui` - UI components
- `@elzatona/database` - Database operations
- `@elzatona/types` - Type definitions
- `@elzatona/contexts` - React contexts
- `@elzatona/hooks` - Custom hooks

### Local Component Analysis Needed
- Check for hardcoded imports between apps
- Verify all components use shared libraries correctly
- Identify any direct file imports that need updating

## Implementation Priority

### Phase 1 Complete ✅
- [x] T001: Route analysis complete
- [x] T002: Dependencies documented  
- [x] T003: API inventory complete
- [ ] T004: Create backup (next)

### Critical Path for Phase 2
1. Verify both apps build successfully
2. Ensure admin app runs on port 3001
3. Test shared library imports
4. Create admin API structure