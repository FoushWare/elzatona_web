# Quick Reference - Admin Scripts

## 🚀 Most Common Commands

### Test Admin Login

```bash
# Test with your original credentials
node tools/scripts/test-admin-login-final.js

# Run comprehensive tests
node tools/scripts/run-admin-tests.js
```

### Setup Admin Access

```bash
# Get setup instructions
node tools/scripts/admin-setup-guide.js

# Create admin with working credentials
node tools/scripts/create-admin-new-email.js
```

### Troubleshooting

```bash
# Test common passwords
node tools/scripts/test-common-passwords.js

# Reset admin password
node tools/scripts/reset-admin-password-final.js
```

## 📧 Current Working Credentials

- **Email**: `admin@elzatona.com`
- **Password**: `admin123456`
- **Admin Panel**: http://localhost:3001/admin/login

## 🔧 For Your Original Credentials

To use `afouadsoftwareengineer@gmail.com`:

1. Run: `node tools/scripts/admin-setup-guide.js`
2. Follow the Firebase Console instructions
3. Test with: `node tools/scripts/test-admin-login-final.js`

## 📁 All Scripts Location

All admin scripts are now organized in: `tools/scripts/`

See `tools/scripts/README.md` for complete documentation.
