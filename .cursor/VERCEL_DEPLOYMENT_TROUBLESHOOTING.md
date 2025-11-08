# Vercel Deployment Troubleshooting

## Error: write EPIPE

This error typically indicates a network connection issue during file upload to Vercel.

## Quick Fixes

### 1. Retry the Deployment

```bash
vercel --prod
```

Sometimes it's just a temporary network issue.

### 2. Check Network Connection

```bash
# Test Vercel API
curl -I https://api.vercel.com

# Check your internet connection
ping -c 3 vercel.com
```

### 3. Use Alternative Deployment Method

**Option A: Deploy via GitHub (Recommended)**

- Push your code to GitHub
- Vercel will automatically deploy from GitHub
- More reliable than CLI for large projects

**Option B: Deploy without large files**

```bash
# Exclude large files from deployment
vercel --prod --no-verify
```

### 4. Check File Sizes

Large files can cause EPIPE errors:

```bash
# Find large files
find . -type f -size +10M -not -path "./node_modules/*" -not -path "./.git/*"

# Check .vercelignore
cat .vercelignore 2>/dev/null || echo ".vercelignore not found"
```

### 5. Clear Vercel Cache

```bash
# Clear local Vercel cache
rm -rf .vercel

# Try again
vercel --prod
```

### 6. Check Vercel Status

Visit: https://www.vercel-status.com/

If Vercel is experiencing issues, wait and retry.

## Common Causes

1. **Network instability** - Temporary connection issues
2. **Large file uploads** - Files > 100MB can timeout
3. **Vercel API issues** - Check status page
4. **Rate limiting** - Too many deployments in short time
5. **Firewall/proxy** - Corporate networks may block uploads

## Solutions

### For Large Projects

1. **Use GitHub integration** (most reliable)
   - Connect repo in Vercel dashboard
   - Auto-deploys on push

2. **Optimize build output**

   ```bash
   # Check build size
   du -sh .next

   # Optimize if needed
   npm run build
   ```

3. **Deploy incrementally**
   - Deploy smaller changes
   - Avoid deploying everything at once

### For Network Issues

1. **Use different network**
   - Try different WiFi
   - Use mobile hotspot
   - Try VPN

2. **Increase timeout**
   ```bash
   # Set longer timeout (if supported)
   export VERCEL_TIMEOUT=300000
   vercel --prod
   ```

### For Persistent Issues

1. **Link project explicitly**

   ```bash
   vercel link
   vercel --prod
   ```

2. **Check Vercel CLI version**

   ```bash
   vercel --version
   # Update if old: npm install -g vercel@latest
   ```

3. **Use Vercel Dashboard**
   - Deploy via web interface
   - More reliable for large projects

## Alternative: Deploy via GitHub

**Recommended approach:**

1. **Push to GitHub:**

   ```bash
   git add -A
   git commit -m "feat: ready for deployment"
   git push
   ```

2. **Vercel will auto-deploy:**
   - If GitHub integration is set up
   - More reliable than CLI
   - Better error handling

3. **Check deployment in dashboard:**
   - Visit: https://vercel.com/dashboard
   - See deployment status
   - View build logs

## Quick Commands

```bash
# Check status
vercel whoami
vercel inspect

# Retry deployment
vercel --prod

# Deploy with verbose output
vercel --prod --debug

# Link project if needed
vercel link
```

## Next Steps

1. ✅ **Try retry** - Often works on second attempt
2. ✅ **Check network** - Ensure stable connection
3. ✅ **Use GitHub** - Most reliable method
4. ✅ **Check Vercel status** - May be service issue

---

**Most reliable:** Push to GitHub and let Vercel auto-deploy!
