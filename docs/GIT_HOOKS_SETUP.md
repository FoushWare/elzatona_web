# Git Hooks Setup

## Automated Build Cleanup and Server Restart

This project now includes automated Git hooks that:

### Post-Commit Hook (.git/hooks/post-commit)
- Automatically cleans build artifacts and restarts the development server
- Only runs on the main development branch (release/v1.0.0-main-website)
- Skips server restart on feature branches to avoid conflicts

### Post-Push Hook (.git/hooks/post-push)  
- Runs after every successful git push
- Kills existing servers and cleans build artifacts
- Restarts the development server with fresh build

### Benefits:
- ✅ No more build manifest errors
- ✅ Fresh server after every commit/push
- ✅ Consistent development environment
- ✅ Automatic cleanup of stale build files

### Usage:
- Just commit and push as normal - hooks run automatically
- Server will restart with clean build
- Check logs with: `tail -f dev.log`

