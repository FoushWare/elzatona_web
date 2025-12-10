#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

console.log("🛡️ Creating Admins Table and User\n");

// Supabase configuration - REQUIRES environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  console.error("Please set these in your .env.local file");
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setupAdmin() {
  try {
    console.log("🔄 Step 1: Creating admins table...");

    // First, let's try to create the table using a direct SQL query
    const { error: tableError } = await supabase
      .from("admins")
      .select("*")
      .limit(1);

    if (
      tableError &&
      tableError.message.includes('relation "public.admins" does not exist')
    ) {
      console.log("📝 Table does not exist, creating it...");

      // We'll need to use the SQL editor or create the table manually
      // For now, let's try to create the admin user first and see what happens
      console.log(
        "⚠️  Table creation requires manual SQL execution in Supabase dashboard",
      );
      console.log("   Please run this SQL in your Supabase SQL editor:");
      console.log(`
CREATE TABLE admins (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage admins" ON admins FOR ALL USING (
  auth.role() = 'service_role'
);
      `);
      return;
    }

    console.log("✅ Admins table exists or created successfully");

    console.log("🔄 Step 2: Creating admin user...");

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@elzatona.com";
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = "Super Admin";
    const adminRole = "super_admin";

    if (!adminPassword) {
      console.error(
        "❌ Missing INITIAL_ADMIN_PASSWORD in environment variables",
      );
      console.error(
        "Please set INITIAL_ADMIN_PASSWORD in your .env.local file",
      );
      return;
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          name: adminName,
          role: adminRole,
        },
      });

    if (authError) {
      console.log(
        "⚠️  User already exists in auth, proceeding with admin table setup...",
      );

      const { data: existingUser, error: getUserError } =
        await supabase.auth.admin.listUsers();

      if (getUserError) {
        console.error("❌ Error getting existing user:", getUserError.message);
        return;
      }

      const user = existingUser.users.find((u) => u.email === adminEmail);
      if (!user) {
        console.error("❌ Could not find existing user");
        return;
      }
      console.log("✅ Found existing auth user:", user.id);

      // Check if admin record already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", adminEmail)
        .single();

      if (existingAdmin) {
        console.log("✅ Admin record already exists");
      } else {
        // Try to create admin record
        const { error: insertError } = await supabase.from("admins").insert({
          id: user.id,
          email: adminEmail,
          name: adminName,
          role: adminRole,
        });

        if (insertError) {
          console.error("❌ Error creating admin record:", insertError.message);
          return;
        }

        console.log("✅ Admin record created successfully");
      }
    } else {
      console.log("✅ Auth user created successfully:", authData.user?.id);

      // Create admin record
      const { error: insertError } = await supabase.from("admins").insert({
        id: authData.user.id,
        email: adminEmail,
        name: adminName,
        role: adminRole,
      });

      if (insertError) {
        console.error("❌ Error creating admin record:", insertError.message);
        return;
      }

      console.log("✅ Admin record created successfully");
    }

    console.log("\n🎯 Admin setup complete!");
    console.log("You can now login at:");
    console.log("   URL: http://localhost:3001/admin/login");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);
  } catch (error) {
    console.error("❌ Error setting up admin:", error.message);
  }
}

// Run the setup
setupAdmin();
