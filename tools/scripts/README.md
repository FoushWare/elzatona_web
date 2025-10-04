# Admin Scripts

This directory contains various scripts for managing the Elzatona Web application's admin functionality.

## 🔐 Admin Authentication Scripts

### Primary Scripts

- **`admin-setup-guide.js`** - Comprehensive guide for setting up admin access
- **`run-admin-tests.js`** - Complete testing suite for admin functionality
- **`test-admin-login-final.js`** - Test admin login with specific credentials

### User Creation Scripts

- **`create-admin-with-original-credentials.js`** - Create admin with `afouadsoftwareengineer@gmail.com`
- **`create-admin-new-email.js`** - Create admin with `admin@elzatona.com`
- **`create-admin-auto.js`** - Automated admin user creation
- **`setup-first-admin.js`** - Set up the first admin user

### Testing Scripts

- **`test-admin-login-new.js`** - Test new admin credentials
- **`test-common-passwords.js`** - Test common passwords for existing user
- **`test-admin-login.js`** - Basic admin login testing

### Utility Scripts

- **`reset-admin-password-final.js`** - Reset admin password
- **`add-admin-role.js`** - Add admin role to existing user
- **`delete-and-recreate-admin.js`** - Delete and recreate admin user

## 🚀 Usage

### Quick Admin Setup

```bash
# Run the comprehensive setup guide
node tools/scripts/admin-setup-guide.js

# Run all admin tests
node tools/scripts/run-admin-tests.js
```

### Test Admin Login

```bash
# Test with original credentials
node tools/scripts/test-admin-login-final.js

# Test with new credentials
node tools/scripts/test-admin-login-new.js
```

### Create Admin User

```bash
# Create with original credentials
node tools/scripts/create-admin-with-original-credentials.js

# Create with new email
node tools/scripts/create-admin-new-email.js
```

## 📋 Current Working Credentials

- **Primary**: `afouadsoftwareengineer@gmail.com` / `zatonafoushware$8888` (needs Firebase Console setup)
- **Backup**: `admin@elzatona.com` / `admin123456` (working)

## 🔧 Troubleshooting

If you encounter issues:

1. **Run the setup guide**: `node tools/scripts/admin-setup-guide.js`
2. **Run comprehensive tests**: `node tools/scripts/run-admin-tests.js`
3. **Check Firebase Console**: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users

## 📁 File Organization

- **Authentication**: Scripts related to user login/logout
- **Creation**: Scripts for creating new admin users
- **Testing**: Scripts for testing admin functionality
- **Utilities**: Helper scripts for admin management
