"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Suspense } from "react";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] || "";
const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      })
    : null;

type CallbackState = "loading" | "success" | "error";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<CallbackState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) {
        setState("error");
        setErrorMessage("Authentication is not configured.");
        return;
      }

      try {
        // Check for error in URL params (OAuth errors)
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (error) {
          setState("error");
          setErrorMessage(errorDescription || error);
          return;
        }

        // Get session from URL (handles OAuth callback)
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setState("error");
          setErrorMessage(sessionError.message);
          return;
        }

        if (session) {
          setState("success");

          // Store auth state for other components
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem(
            "frontend-koddev-user",
            JSON.stringify({
              id: session.user.id,
              email: session.user.email,
            }),
          );

          // Dispatch custom event to notify other components
          window.dispatchEvent(new Event("auth-state-changed"));

          // Redirect after short delay
          const redirectTo = searchParams.get("redirect") || "/";
          setTimeout(() => {
            router.push(redirectTo);
          }, 1500);
        } else {
          // No session and no error - might be email confirmation
          setState("error");
          setErrorMessage("No session found. Please try signing in again.");
        }
      } catch (err) {
        setState("error");
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {state === "loading" && (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Completing Sign In
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your credentials...
              </p>
            </>
          )}

          {state === "success" && (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sign In Successful!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Redirecting you to your destination...
              </p>
            </>
          )}

          {state === "error" && (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sign In Failed
              </h1>
              <p className="text-red-600 dark:text-red-400 mb-6">
                {errorMessage}
              </p>
              <button
                onClick={() => router.push("/auth")}
                className="w-full h-12 flex items-center justify-center text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
