# 🚀 Vercel Deployment Guide - Nx Monorepo

## **✅ Yes, Your Nx Structure Works with Vercel Free Tier!**

Your Nx monorepo is **fully compatible** with Vercel's free tier. Here's how to deploy it properly.

## **📊 Vercel Free Tier Limits (You're Within Them)**

- ✅ **3 projects max** - You have 2 apps (web + admin)
- ✅ **100GB bandwidth/month** - More than enough for most projects
- ✅ **1000 serverless functions/day** - Your API routes are covered
- ✅ **Unlimited static files** - Your assets are fine
- ✅ **Custom domains** - You can use your own domain

## **🎯 Deployment Strategy**

### **Option 1: Two Separate Vercel Projects (Recommended)**

Deploy each app as a separate Vercel project:

1. **Web App** (`apps/web`) → `your-domain.com`
2. **Admin App** (`apps/admin`) → `admin.your-domain.com`

### **Option 2: Single Project with Subdomains**

Deploy from root with routing to different apps.

## **🔧 Step-by-Step Deployment**

### **Step 1: Deploy Web App**

1. **Connect to Vercel:**

   ```bash
   cd apps/web
   npx vercel
   ```

2. **Configure Project Settings:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && npx nx build web`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && npm install`

3. **Environment Variables:**
   ```
   NEXT_PUBLIC_APP_NAME=GreatFrontendHub
   NX_DAEMON=false
   NX_PARALLEL=1
   ```

### **Step 2: Deploy Admin App**

1. **Create New Vercel Project:**

   ```bash
   cd apps/admin
   npx vercel
   ```

2. **Configure Project Settings:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/admin`
   - **Build Command**: `cd ../.. && npx nx build admin`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && npm install`

## **⚙️ Vercel Configuration Files Created**

### **Root `vercel.json`** (for single project deployment)

```json
{
  "buildCommand": "npx nx build web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install"
}
```

### **`apps/web/vercel.json`** (for web app)

```json
{
  "buildCommand": "cd ../.. && npx nx build web",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && npm install"
}
```

### **`apps/admin/vercel.json`** (for admin app)

```json
{
  "buildCommand": "cd ../.. && npx nx build admin",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && npm install"
}
```

## **🚀 Performance Optimizations for Vercel**

### **1. Nx Build Optimizations**

```json
{
  "build": {
    "env": {
      "NX_DAEMON": "false",
      "NX_PARALLEL": "1"
    }
  }
}
```

### **2. Next.js Optimizations**

- ✅ **Standalone output** for smaller deployments
- ✅ **Bundle splitting** for better caching
- ✅ **Image optimization** with WebP/AVIF
- ✅ **Compression** enabled

### **3. Serverless Function Limits**

- ✅ **10-second timeout** configured
- ✅ **API routes** properly structured
- ✅ **Cold start optimization**

## **🔄 CI/CD with GitHub + Vercel**

### **Automatic Deployments**

1. **Connect GitHub Repository** to Vercel
2. **Configure Build Settings** per app
3. **Set Environment Variables**
4. **Enable Auto-Deploy** on push

### **Branch Deployments**

- **Main Branch** → Production
- **Feature Branches** → Preview deployments
- **Pull Requests** → Automatic previews

## **📱 Domain Configuration**

### **Web App**

- **Production**: `your-domain.com`
- **Preview**: `your-app-git-branch.vercel.app`

### **Admin App**

- **Production**: `admin.your-domain.com`
- **Preview**: `admin-git-branch.vercel.app`

## **🔧 Troubleshooting Common Issues**

### **Build Fails**

**Problem**: "Cannot find module '@elzatona/shared/ui'"
**Solution**: Update import paths or use relative imports temporarily

```typescript
// Instead of:
import { Button } from '@elzatona/shared/ui';

// Use:
import { Button } from '../../libs/shared/ui/src';
```

### **Function Timeout**

**Problem**: API routes timing out
**Solution**: Optimize database queries and add caching

```typescript
// Add to API routes
export const config = {
  maxDuration: 10, // Vercel free tier limit
};
```

### **Bundle Size Too Large**

**Problem**: Deployment fails due to size
**Solution**: Enable tree shaking and code splitting

```javascript
// next.config.ts
experimental: {
  optimizePackageImports: ['@heroicons/react', 'lucide-react'],
}
```

## **💰 Cost Optimization Tips**

### **Free Tier Best Practices**

1. **Optimize Images** - Use Next.js Image component
2. **Enable Caching** - Set proper cache headers
3. **Minimize API Calls** - Use SWR or React Query
4. **Static Generation** - Use SSG where possible
5. **Bundle Optimization** - Remove unused dependencies

### **Bandwidth Optimization**

- ✅ **Compress assets** with gzip/brotli
- ✅ **Optimize images** with WebP/AVIF
- ✅ **Use CDN** for static assets
- ✅ **Implement caching** strategies

## **📊 Monitoring & Analytics**

### **Vercel Analytics (Free)**

- ✅ **Page views** and **unique visitors**
- ✅ **Performance metrics** (Core Web Vitals)
- ✅ **Geographic data**
- ✅ **Referrer information**

### **Function Monitoring**

- ✅ **Invocation count** tracking
- ✅ **Duration monitoring**
- ✅ **Error rate** tracking

## **🎯 Deployment Checklist**

### **Before Deployment**

- [ ] Test builds locally: `npm run build:all`
- [ ] Verify environment variables
- [ ] Check bundle sizes
- [ ] Test API routes
- [ ] Validate responsive design

### **After Deployment**

- [ ] Test production URLs
- [ ] Verify SSL certificates
- [ ] Check Core Web Vitals
- [ ] Test admin functionality
- [ ] Monitor function usage

## **🚀 Quick Deploy Commands**

```bash
# Deploy web app
cd apps/web && npx vercel --prod

# Deploy admin app
cd apps/admin && npx vercel --prod

# Deploy both (if using monorepo setup)
npx vercel --prod
```

## **✅ Success Criteria**

- [ ] Web app deploys successfully
- [ ] Admin app deploys successfully
- [ ] All API routes work
- [ ] Static assets load properly
- [ ] Performance scores are good
- [ ] Within Vercel free tier limits

---

**🎉 Your Nx monorepo is perfectly suited for Vercel's free tier!**

The structure actually **improves** your Vercel experience by:

- **Shared dependencies** reduce bundle sizes
- **Incremental builds** speed up deployments
- **Clear separation** makes debugging easier
- **Optimized caching** improves performance
