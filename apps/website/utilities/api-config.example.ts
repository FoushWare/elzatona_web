/**
 * API Configuration Usage Examples
 *
 * This file shows how to use the centralized API configuration
 * in different scenarios. Copy these patterns to your API routes.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// Example file - not meant to be compiled
// import {
//   getApiConfig,
//   getSupabaseConfig,
//   getFetchConfig,
//   logApiConfig,
// } from "@/lib/utils/api-config";

// ============================================================================
// EXAMPLE 1: Basic API Route with Environment Detection
// ============================================================================

export async function GET_BasicExample(_request: NextRequest) {
  // Get all environment-specific configuration
  const config = getApiConfig();

  // Environment is automatically detected
  // Just change APP_ENV in .env file to switch

  return NextResponse.json({
    success: true,
    environment: config.environment,
    isTest: config.isTest,
    projectRef: config.headers["X-Project-Ref"],
  });
}

// ============================================================================
// EXAMPLE 2: Supabase Client with Automatic Headers
// ============================================================================

export async function GET_SupabaseExample(_request: NextRequest) {
  // Get Supabase configuration (includes headers automatically)
  const supabaseConfig = getSupabaseConfig();

  // Create client with environment-specific headers
  const supabase = createClient(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: supabaseConfig.headers, // Headers set automatically!
      },
    },
  );

  // Use supabase client...
  const { data, error } = await supabase.from("questions").select("*");

  return NextResponse.json({ data, error });
}

// ============================================================================
// EXAMPLE 3: External API Call with Environment Headers
// ============================================================================

export async function POST_ExternalApiExample(_request: NextRequest) {
  const config = getApiConfig();

  // Get fetch configuration with environment headers
  const fetchConfig = getFetchConfig({
    Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
    "Custom-Header": "value",
  });

  // Make API call - headers include X-Environment, X-Project-Ref automatically
  const response = await fetch("https://api.example.com/data", {
    method: "POST",
    headers: fetchConfig.headers,
    body: JSON.stringify({ data: "example" }),
  });

  return NextResponse.json({ success: true });
}

// ============================================================================
// EXAMPLE 4: Environment-Specific Logic
// ============================================================================

export async function GET_ConditionalExample(_request: NextRequest) {
  const config = getApiConfig();

  // Environment-specific behavior
  if (config.isTest) {
    // Test-specific logic
    return NextResponse.json({
      data: { testMode: true, mockData: "test" },
      environment: "test",
    });
  }

  // Production logic
  return NextResponse.json({
    data: { realData: "production" },
    environment: "production",
  });
}

// ============================================================================
// EXAMPLE 5: Complete API Route Pattern
// ============================================================================

// Log config on module load (optional, for debugging)
logApiConfig("My API Route");

export async function GET_CompleteExample(_request: NextRequest) {
  try {
    // 1. Get configuration (one import, everything you need)
    const config = getApiConfig();

    // 2. Get Supabase client with correct config
    const supabaseConfig = getSupabaseConfig();
    const supabase = createClient(
      supabaseConfig.url,
      supabaseConfig.serviceRoleKey,
      {
        global: { headers: supabaseConfig.headers },
      },
    );

    // 3. Use environment-specific features
    if (config.enableDebugLogging) {
      console.log("🔍 Debug mode enabled");
    }

    // 4. Your API logic here...
    const { data, error } = await supabase.from("questions").select("*");

    if (error) {
      throw error;
    }

    // 5. Return response with environment info (optional)
    return NextResponse.json({
      success: true,
      data,
      environment: config.environment,
      headers: config.headers, // Shows which environment was used
    });
  } catch (error) {
    const config = getApiConfig();
    console.error(`[${config.environment}] API Error:`, error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        environment: config.environment,
      },
      { status: 500 },
    );
  }
}

// ============================================================================
// KEY POINTS:
// ============================================================================
//
// 1. ONE IMPORT: import { getApiConfig } from '@/lib/utils/api-config';
// 2. ONE VARIABLE: Set APP_ENV=test or APP_ENV=production in .env file
// 3. EVERYTHING SWITCHES: Database, headers, timeouts, feature flags
// 4. NO MANUAL CONFIG: Headers are set automatically based on environment
// 5. SINGLE SOURCE OF TRUTH: All APIs use the same configuration
//
// ============================================================================
