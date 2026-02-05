#!/bin/bash
# cleanup-git.sh - Remove unneeded files from git tracking

set -euo pipefail

echo "Current git status:"
git status --short

echo ""
echo "Files to remove (private SSH key + untracked deployment files):"
echo "  - infrastructure/terraform/azure/openclaw-vm/elzatona_deploy (PRIVATE KEY - NEVER COMMIT)"
echo ""

# Remove private SSH deploy key
if [ -f "infrastructure/terraform/azure/openclaw-vm/elzatona_deploy" ]; then
  rm infrastructure/terraform/azure/openclaw-vm/elzatona_deploy
  echo "✅ Removed private deploy key (elzatona_deploy)"
fi

# Commit the change
echo ""
echo "Committing cleanup..."
git add -A
git commit -m "chore: remove private SSH deploy key from repository" -m "Never commit SSH private keys or API tokens. Keep them secure on VPS only."

echo ""
echo "Final status:"
git status --short

echo ""
echo "✅ Cleanup complete!"
