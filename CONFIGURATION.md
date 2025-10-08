# 🔧 Configuration Setup Guide

This guide explains how to set up the environment configuration for the Elzatona Web application. **All environment variables are required** to ensure explicit configuration and prevent accidental use of insecure defaults.

## 📋 Environment Variables

**ALL environment variables are required** - no defaults are provided to ensure explicit configuration and prevent accidental use of insecure defaults.

### Core Configuration (REQUIRED)

```bash
# JWT Configuration (REQUIRED for production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Port Configuration (REQUIRED)
ADMIN_PORT=3001
WEB_PORT=3000

# URL Configuration (REQUIRED)
ADMIN_URL=http://localhost:3001
WEB_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3000

# API Configuration (REQUIRED)
ADMIN_API_BASE_URL=http://localhost:3001/api
ADMIN_API_TIMEOUT=10000
```

### Admin Credentials (REQUIRED)

```bash
# Initial Admin Setup
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=your-secure-admin-password
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin
```

### Security Configuration

```bash
# Security Settings
BCRYPT_SALT_ROUNDS=12
ADMIN_SESSION_TIMEOUT=86400000
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
```

### Database Configuration

```bash
# Database Settings
ADMIN_COLLECTION_NAME=admins
```

### Feature Flags

```bash
# Feature Toggles
ALLOW_ADMIN_CREATION=true
REQUIRE_EMAIL_VERIFICATION=false
ENABLE_AUDIT_LOGGING=true
```

## 🚀 Quick Setup

1. **Copy the environment template:**

   ```bash
   cp env.example .env
   ```

2. **Edit the .env file with your values:**

   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Validate your configuration:**

   ```bash
   npx tsx src/scripts/validate-config.ts
   ```

4. **Start the application:**
   ```bash
   ./start-dev.sh  # Uses validation script
   # OR
   npm run dev
   ```

## 🔧 Configuration Scripts

### Validate Configuration

```bash
npx tsx src/scripts/validate-config.ts
```

Validates that all required environment variables are set.

### Initialize Admin

```bash
INITIAL_ADMIN_EMAIL=admin@example.com INITIAL_ADMIN_PASSWORD=securepassword npx tsx src/scripts/initialize-admin.ts
```

Creates the initial admin account.

### Update Admin Password

```bash
UPDATE_ADMIN_EMAIL=admin@example.com UPDATE_ADMIN_PASSWORD=newpassword npx tsx src/scripts/update-admin-password.ts
```

Updates an existing admin password.

### Test Admin Authentication

```bash
TEST_ADMIN_EMAIL=admin@example.com TEST_ADMIN_PASSWORD=password npx tsx src/scripts/test-admin-auth.ts
```

Tests admin authentication API.

## 🌐 Production Deployment

For production deployment, ensure all environment variables are set in your deployment platform:

### Vercel

Set environment variables in the Vercel dashboard under Project Settings > Environment Variables.

### Docker

Use environment files or docker-compose with environment variables.

### Kubernetes

Use ConfigMaps and Secrets for environment variables.

## 🔒 Security Notes

- **Never commit .env files** to version control
- **Use strong, unique JWT secrets** in production
- **Rotate admin passwords** regularly
- **Use HTTPS** in production URLs
- **Enable audit logging** in production

## 🐛 Troubleshooting

### Configuration Validation Errors

If you get configuration validation errors:

1. Check that all required variables are set in .env
2. Ensure no typos in variable names
3. Verify URLs are properly formatted
4. Check that ports are available

### Port Conflicts

If you get port conflicts:

1. Change ADMIN_PORT and WEB_PORT in .env
2. Update corresponding URLs (ADMIN_URL, WEB_URL)
3. Update API base URL (ADMIN_API_BASE_URL)

### Authentication Issues

If admin authentication fails:

1. Verify INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD are set
2. Run the admin initialization script
3. Check Firebase configuration
4. Verify JWT_SECRET is set

## 📚 Additional Resources

- [Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Configuration](https://firebase.google.com/docs/web/setup)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

---

**Remember**: This application is designed to be production-ready with no hardcoded values. All configuration must be provided through environment variables.
