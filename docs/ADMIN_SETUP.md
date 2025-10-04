# Admin Setup Guide

This guide explains how to set up admin users for the Elzatona Web application in a production environment.

## 🔐 Production-Ready Admin Authentication

The admin authentication system is designed to be completely secure and production-ready:

- ✅ **No Hardcoded Credentials**: All authentication goes through Firebase
- ✅ **Role-Based Access**: Admin roles are stored in Firestore
- ✅ **Secure Authentication**: Uses Firebase Authentication
- ✅ **Real-time Updates**: Authentication state updates automatically
- ✅ **Comprehensive Error Handling**: Clear error messages for different scenarios

## 🚀 Setting Up Admin Users

### Method 1: Using the Admin Creation Script (Recommended)

1. **Set Environment Variables**:

   ```bash
   export FIREBASE_API_KEY="your-api-key"
   export FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   export FIREBASE_PROJECT_ID="your-project-id"
   export FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
   export FIREBASE_MESSAGING_SENDER_ID="123456789"
   export FIREBASE_APP_ID="your-app-id"
   ```

2. **Run the Admin Creation Script**:

   ```bash
   node scripts/create-admin-user.js
   ```

3. **Follow the Interactive Prompts**:
   - Enter admin email
   - Enter admin password
   - Enter admin name
   - Select role (admin/super-admin)

### Method 2: Manual Firebase Console Setup

1. **Create User in Firebase Console**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Authentication → Users
   - Click "Add User"
   - Enter email and password

2. **Create Admin Document in Firestore**:
   - Go to Firestore Database
   - Create a collection called `admins`
   - Add a document with the user's UID as the document ID
   - Add the following fields:
     ```json
     {
       "name": "Admin Name",
       "email": "admin@example.com",
       "role": "admin",
       "createdAt": "2024-01-01T00:00:00.000Z",
       "createdBy": "system",
       "isActive": true
     }
     ```

## 🔑 Admin Roles

### Admin

- Can manage learning cards
- Can manage questions
- Can manage learning plans
- Can view analytics

### Super Admin

- All admin permissions
- Can manage other admins
- Can access system settings
- Can view all user data

## 🛡️ Security Features

### Authentication Security

- Firebase Authentication handles all credential verification
- No passwords are stored in the application
- Secure token-based authentication
- Automatic session management

### Authorization Security

- Role-based access control
- Admin roles stored in Firestore
- Real-time role verification
- Automatic logout on role changes

### Error Handling

- Comprehensive error messages
- No sensitive information in error logs
- Rate limiting protection
- Network error handling

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# Firebase Configuration
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your-app-id
```

### Firestore Security Rules

Make sure your Firestore security rules allow admin access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow admins to read/write admin documents
    match /admins/{adminId} {
      allow read, write: if request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Allow admins to manage learning cards
    match /learningCards/{cardId} {
      allow read, write: if request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Add other admin-accessible collections here
  }
}
```

## 🚨 Security Best Practices

1. **Never hardcode credentials** in the codebase
2. **Use environment variables** for all configuration
3. **Regularly rotate admin passwords**
4. **Monitor admin access logs**
5. **Use strong passwords** (minimum 8 characters, mixed case, numbers, symbols)
6. **Enable two-factor authentication** for admin accounts
7. **Regularly audit admin permissions**
8. **Use HTTPS** in production
9. **Keep Firebase SDK updated**
10. **Monitor failed login attempts**

## 🔍 Troubleshooting

### Common Issues

1. **"No admin account found"**
   - User exists in Firebase Auth but not in Firestore `admins` collection
   - Solution: Create admin document in Firestore

2. **"Incorrect password"**
   - Wrong password entered
   - Solution: Reset password in Firebase Console

3. **"Too many failed attempts"**
   - Rate limiting triggered
   - Solution: Wait before trying again

4. **"Network error"**
   - Internet connection issue
   - Solution: Check connection and try again

### Debug Mode

To enable debug logging, set:

```bash
export FIREBASE_DEBUG=true
```

## 📞 Support

If you encounter issues with admin setup:

1. Check the browser console for error messages
2. Verify Firebase configuration
3. Check Firestore security rules
4. Ensure admin document exists in Firestore
5. Contact the development team with specific error messages

## 🔄 Updates

This admin system is designed to be easily extensible:

- Add new admin roles by updating the `AdminUser` interface
- Add new permissions by checking roles in components
- Add admin management features by creating new admin pages
- Add audit logging by tracking admin actions in Firestore

---

**Note**: This system is production-ready and follows security best practices. Never commit credentials or sensitive configuration to version control.
