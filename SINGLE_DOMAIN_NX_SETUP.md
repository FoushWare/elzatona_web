# 🌐 Single Domain Setup for Nx Monorepo

## **🎯 Domain Strategy: elzatona-web.com**

Based on your Hostinger domain and GitHub issue #109, here's how to deploy both web and admin apps under one domain.

## **📋 Recommended Approach: Subdirectory Routing**

### **URL Structure**

- **Main Website**: `https://elzatona-web.com/`
- **Admin Dashboard**: `https://elzatona-web.com/admin`
- **API Routes**: `https://elzatona-web.com/api/*`

### **Benefits**

- ✅ **Single SSL Certificate** - One domain, one certificate
- ✅ **Shared Authentication** - Same-origin cookies work seamlessly
- ✅ **Cost Effective** - No additional domain/subdomain costs
- ✅ **SEO Friendly** - All content under main domain
- ✅ **Simple DNS** - No complex subdomain configuration

## **🔧 Implementation Options**

### **Option A: Unified Next.js App (Simplest)**

Deploy as one app with routing:

```
apps/web/
├── app/
│   ├── page.tsx           # Main website (/)
│   ├── admin/
│   │   ├── page.tsx       # Admin dashboard (/admin)
│   │   ├── content/       # Admin content pages
│   │   └── layout.tsx     # Admin-specific layout
│   └── api/               # Shared API routes
```

### **Option B: Reverse Proxy Setup**

Deploy both apps separately and use reverse proxy routing.

### **Option C: Vercel Rewrites (Recommended for Vercel)**

Use Vercel's built-in routing to handle multiple apps.

## **🚀 Implementation: Unified App for elzatona-web.com**

### **🎯 Perfect Solution for Your Setup**

Based on your Hostinger domain and GitHub issue #109, here's the complete solution:

## **📁 Unified App Structure**

```
apps/web/
├── app/
│   ├── page.tsx                    # Main website (elzatona-web.com/)
│   ├── about/                      # About pages
│   ├── learning-paths/             # Learning content
│   ├── admin/                      # Admin dashboard (elzatona-web.com/admin)
│   │   ├── page.tsx               # Admin home (/admin)
│   │   ├── dashboard/             # Admin dashboard (/admin/dashboard)
│   │   ├── content/               # Content management (/admin/content)
│   │   ├── users/                 # User management (/admin/users)
│   │   └── layout.tsx             # Admin-specific layout
│   └── api/                       # API routes (shared by web and admin)
│       ├── auth/                  # Authentication
│       ├── questions/             # Questions API
│       └── admin/                 # Admin-specific APIs
```

## **🌐 URL Structure**

- **Main Website**: `https://elzatona-web.com/`
- **Learning Paths**: `https://elzatona-web.com/learning-paths`
- **Admin Login**: `https://elzatona-web.com/admin`
- **Admin Dashboard**: `https://elzatona-web.com/admin/dashboard`
- **Content Management**: `https://elzatona-web.com/admin/content`
- **API Endpoints**: `https://elzatona-web.com/api/*`

## **✅ Benefits for Your Setup**

- ✅ **Single Domain**: Perfect for your elzatona-web.com domain
- ✅ **Hostinger Compatible**: Works with your current hosting setup
- ✅ **Cost Effective**: No additional domains or subdomains needed
- ✅ **SEO Friendly**: All content under main domain authority
- ✅ **Shared Authentication**: Same-origin cookies work seamlessly
- ✅ **Simple SSL**: One certificate covers everything

## **🔧 Ready-to-Use Configuration Files**

I've created these files for you:

- ✅ `apps/web/next.config.unified.ts` - Next.js config for single domain
- ✅ `vercel.unified.json` - Vercel deployment config
- ✅ `tools/scripts/unify-apps.js` - Migration script

## **🚀 Quick Setup (3 Commands)**

```bash
# 1. Run the unification script
node tools/scripts/unify-apps.js

# 2. Test locally
npm run dev:unified

# 3. Deploy to your domain
npm run deploy:unified
```

## **🎯 Hostinger DNS Configuration**

For your elzatona-web.com domain, you'll need:

### **DNS Records (Hostinger)**

```
Type    Name    Value                           TTL
A       @       76.76.19.61 (Vercel IP)       3600
CNAME   www     elzatona-web.com               3600
```

### **Vercel Domain Setup**

1. Add `elzatona-web.com` to your Vercel project
2. Add `www.elzatona-web.com` as an alias
3. Vercel will provide the IP addresses for your DNS

## **🔒 Security Configuration**

### **Admin Route Protection**

```typescript
// Automatic in next.config.unified.ts
headers: [
  {
    source: '/admin/(.*)',
    headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      { key: 'Cache-Control', value: 'no-cache, no-store' },
    ],
  },
];
```

### **Authentication Flow**

- **Public Routes**: `/`, `/about`, `/learning-paths`
- **Protected Routes**: `/admin/*` (requires authentication)
- **API Routes**: `/api/*` (shared by both web and admin)

## **📊 Performance Optimizations**

### **Bundle Splitting**

```typescript
// Automatic admin bundle separation
cacheGroups: {
  admin: {
    test: /[\\/]app[\\/]admin[\\/]/,
    name: 'admin',
    chunks: 'all'
  }
}
```

### **Caching Strategy**

- **Public Pages**: Long-term caching
- **Admin Pages**: No caching for security
- **API Routes**: Appropriate cache headers

## **🚀 Deployment Process**

### **Step 1: Unify Your Apps**

```bash
node tools/scripts/unify-apps.js
```

### **Step 2: Test Locally**

```bash
npm run dev:unified
# Visit: http://localhost:3000 (main site)
# Visit: http://localhost:3000/admin (admin)
```

### **Step 3: Deploy to Vercel**

```bash
npm run deploy:unified
```

### **Step 4: Configure Domain**

1. In Vercel dashboard, add `elzatona-web.com`
2. Update your Hostinger DNS with Vercel's values
3. Wait for DNS propagation (up to 24 hours)

## **🎉 Final Result**

After setup, your single domain will serve:

- ✅ **Main Website** at `https://elzatona-web.com/`
- ✅ **Admin Dashboard** at `https://elzatona-web.com/admin`
- ✅ **All API Routes** at `https://elzatona-web.com/api/*`
- ✅ **Shared Authentication** across all routes
- ✅ **Optimized Performance** with smart caching
- ✅ **SEO Optimized** main site, admin pages excluded

This setup is **perfect** for your Hostinger domain and resolves the nameserver issues mentioned in GitHub issue #109!
