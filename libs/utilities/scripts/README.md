# Scripts Directory

This directory contains essential scripts for development, deployment, and maintenance.

## Essential Scripts

### Environment & Configuration

- `verify-env-setup.mjs` - Verify environment setup
- `verify-supabase-keys.js` - Verify Supabase keys
- `fix-production-anon-key.js` - Fix production anon key
- `check-env.js` - Check environment configuration

## Usage

All scripts should be run from the project root:

```bash
node libs/utilities/scripts/script-name.js
```

## Adding New Scripts

When adding new scripts:

1. Place them in this directory
2. Update this README with description
3. Ensure scripts are necessary (not temporary/debugging)
4. Add proper error handling and documentation

## Script Categories

- **Environment:** Setup and verification scripts
- **Database:** Migration and seeding scripts
- **Deployment:** Build and deployment scripts
- **Maintenance:** Cleanup and optimization scripts
