"use client";

import React, { useState } from "react";
import { useAdminAuth } from "@elzatona/contexts";

interface AdminLoginFormMoleculeProps {
  readonly onSuccess?: () => void;
}

/**
 * AdminLoginFormMolecule Component
 * Login form molecule for admin authentication
 * Matches the original styling from fix/main-branch-import-paths
 */
export function AdminLoginFormMolecule({
  onSuccess,
}: AdminLoginFormMoleculeProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.success) {
        // Don't redirect here - let the useEffect handle it
        // This prevents double redirects
        onSuccess?.();
      } else {
        setError(result.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Email Field */}
      <div suppressHydrationWarning>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
          placeholder="Enter your email"
          autoComplete="email"
          suppressHydrationWarning
        />
      </div>

      {/* Password Field */}
      <div suppressHydrationWarning>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
          placeholder="Enter your password"
          autoComplete="current-password"
          suppressHydrationWarning
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
