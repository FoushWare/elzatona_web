#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=== Staging files ==="
git add .github/workflows/deploy-main.yml apps/website/vercel.json apps/admin/vercel.json

echo "=== Committing ==="
git commit -m "fix(deployment): resolve Vercel build failures by preserving monorepo structure

- Add npm install at root level before deployment to ensure workspace deps are available  
- Create apps/website/vercel.json with proper build configuration
- Enhance apps/admin/vercel.json with installCommand and NODE_ENV
- This fixes the Admin deploy failure (exit code 1) from failing to resolve @elzatona packages"

echo "=== Pushing to origin ==="
git push origin fix/content-management-modal-hides-navbar

echo "✅ CD fix committed and pushed successfully"
