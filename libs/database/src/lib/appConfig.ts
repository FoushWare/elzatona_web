// Database Configuration
// v1.0 - Environment-based database configuration

// Type-safe environment variable access
const getEnvVar = (key: string, defaultValue: string = ""): string => {
  if (typeof globalThis.window !== "undefined") {
    // Client-side: use window.env or similar
    return (globalThis.window as any).env?.[key] || defaultValue;
  }
  // Server-side: use process.env
  return (process as any).env?.[key] || defaultValue;
};

export interface AppConfig {
  database: {
    provider: "firebase" | "supabase";
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
    supabase: {
      url: string;
      anonKey: string;
      serviceRoleKey?: string;
    };
  };
  features: {
    enableRealtime: boolean;
    enableOfflineSupport: boolean;
    enableCaching: boolean;
  };
}

// Get database configuration from environment variables
export const getDatabaseConfig = (): AppConfig["database"] => {
  const useFirebase = getEnvVar("NEXT_PUBLIC_USE_FIREBASE") === "true";

  if (useFirebase) {
    return {
      provider: "firebase",
      firebase: {
        apiKey: getEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
        authDomain: getEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
        projectId: getEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
        storageBucket: getEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
        messagingSenderId: getEnvVar(
          "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
        ),
        appId: getEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
      },
      supabase: {
        url: "",
        anonKey: "",
        serviceRoleKey: "",
      },
    };
  } else {
    return {
      provider: "supabase",
      firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
      },
      supabase: {
        url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
        anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
        serviceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY"),
      },
    };
  }
};

// Get app configuration
export const getAppConfig = (): AppConfig => {
  return {
    database: getDatabaseConfig(),
    features: {
      enableRealtime: getEnvVar("NEXT_PUBLIC_ENABLE_REALTIME") === "true",
      enableOfflineSupport:
        getEnvVar("NEXT_PUBLIC_ENABLE_OFFLINE_SUPPORT") === "true",
      enableCaching: getEnvVar("NEXT_PUBLIC_ENABLE_CACHING") === "true",
    },
  };
};

// Database service factory with environment configuration
export const createDatabaseServiceFromEnv = () => {
  const config = getDatabaseConfig();

  if (config.provider === "firebase") {
    // Convert Firebase config to our DatabaseConfig format
    const dbConfig = {
      url: `https://${config.firebase.projectId}.firebaseapp.com`,
      key: config.firebase.apiKey,
    };

    // Dynamic import to avoid build-time errors
    try {
      const { FirebaseDatabaseService } = eval("require")(
        "./FirebaseDatabaseService",
      );
      return new FirebaseDatabaseService(dbConfig);
    } catch (error) {
      console.warn("Firebase not available, falling back to Supabase");
      return createSupabaseService(config.supabase);
    }
  } else {
    return createSupabaseService(config.supabase);
  }
};

// Helper function to create Supabase service
const createSupabaseService = (
  supabaseConfig: AppConfig["database"]["supabase"],
) => {
  const dbConfig = {
    url: supabaseConfig.url,
    key: supabaseConfig.anonKey,
    serviceRoleKey: supabaseConfig.serviceRoleKey,
  };

  try {
    const { SupabaseDatabaseService } = eval("require")(
      "./SupabaseDatabaseService",
    );
    return new SupabaseDatabaseService(dbConfig);
  } catch (error) {
    console.error("Failed to create Supabase service:", error);
    throw new Error("Database service creation failed");
  }
};
