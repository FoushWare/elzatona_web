import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function verify() {
    console.log("🔍 Running System Smoke Test...");

    // 1. Check Env
    if (!supabaseUrl || !supabaseKey) {
        console.error("   ❌ Environment variables missing.");
        process.exit(1);
    }
    console.log("   ✅ Environment variables present.");

    // 2. Check Supabase Connectivity
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: cat, error: catError } = await supabase.from("categories").select("count");

    if (catError) {
        console.error("   ❌ Supabase connection failed:", catError.message);
        process.exit(1);
    }
    console.log("   ✅ Supabase connection successful.");

    // 3. Check Data Presence
    const { count: qCount } = await supabase.from("questions").select("*", { count: 'exact', head: true });
    console.log(`   📊 Questions in DB: ${qCount || 0}`);

    console.log("\n🚀 System is HEALTHY.");
}

verify();
