# 🔑 Supabase Service Role Key - Step by Step

## ⚠️ **Important:** You have the ANON key, but you need the SERVICE ROLE key!

### **What you have (Anon Key):**

```
SUPABASE_SERVICE_ROLE_KEY_REDACTED
```

### **What you need (Service Role Key):**

- This is a DIFFERENT key
- It has full database access
- It bypasses Row Level Security (RLS)
- It's required for admin operations

---

## 🚀 **How to Get the Service Role Key:**

### **Step 1: Go to Supabase Dashboard**

**Direct Link:** https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq

### **Step 2: Navigate to API Settings**

1. Click **"Settings"** in the left sidebar
2. Click **"API"** in the settings menu

### **Step 3: Find the Service Role Key**

1. Scroll down to **"Project API keys"** section
2. You'll see TWO keys:
   - **anon/public** (this is what you already have)
   - **service_role** (this is what you need)

### **Step 4: Copy the Service Role Key**

1. Click the **"Copy"** button next to the **service_role** key
2. It will look something like:
   ```
   SUPABASE_SERVICE_ROLE_KEY_REDACTED
   ```

### **Step 5: Add to Your .env.local**

Add this line to your `.env.local` file:

```
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

---

## 🔍 **How to Identify the Service Role Key:**

The service role key will:

- Be longer than the anon key
- Have `"role":"service_role"` in the JWT payload (when decoded)
- Have full database permissions
- Be labeled as "service_role" in the Supabase dashboard

---

## ⚠️ **Security Warning:**

- **NEVER** expose the service role key in client-side code
- **NEVER** commit it to version control
- **ONLY** use it in server-side operations
- Keep it secure and rotate it periodically

---

## 🧪 **Test After Adding:**

Once you add the service role key, restart your server and test:

```bash
# Restart server
npm run dev

# Test admin login
curl -X POST http://localhost:3001/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-secure-admin-password"}'
```

---

## 📋 **Complete .env.local Update:**

Your `.env.local` should have BOTH keys:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

# OAuth Credentials (still need these)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here
```

---

## 🎯 **Next Steps:**

1. ✅ Get the service role key from Supabase dashboard
2. ✅ Add it to `.env.local`
3. 🔄 Set up Google OAuth
4. 🔄 Set up GitHub OAuth
5. 🧪 Test everything

**The service role key is the missing piece for admin operations!** 🔑
