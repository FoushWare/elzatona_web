# Environment Setup for Data Seeding

## Quick Setup

The script reads from both `.env.local` and `.env.test.local`:

### 1. `.env.local` (Main Database)

```bash
# This should already exist in your .env.local (for main database)
SUPABASE_SERVICE_ROLE_KEY=your_main_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
```

### 2. `.env.test.local` (Testing Database)

```bash
# Add this line for the testing database service role key
TESTING_SUPABASE_SERVICE_ROLE_KEY=your_testing_service_role_key_here
```

## Where to Get the Keys

### Testing Database (zatona-web-testing)

1. Go to: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api
2. Scroll to "Project API keys"
3. Find "service_role" (secret)
4. Click the 👁️ icon to reveal
5. Copy the key
6. Add to `.env.test.local` as `TESTING_SUPABASE_SERVICE_ROLE_KEY` (or `.env.local` as fallback)

### Main Database (zatona-web)

1. Go to: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api
2. Scroll to "Project API keys"
3. Find "service_role" (secret)
4. Click the 👁️ icon to reveal
5. Copy the key
6. Add to `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` (should already exist)

## Example Configuration

### `.env.local`

```bash
# Main Database (zatona-web)
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_main_service_role_key_here
```

### `.env.test.local`

```bash
# Testing Database (zatona-web-testing)
TESTING_SUPABASE_SERVICE_ROLE_KEY=your_testing_service_role_key_here
```

## Verify Setup

After adding the keys, run:

```bash
npm run seed:testing-to-main
```

The script will verify that both keys are present before starting.
