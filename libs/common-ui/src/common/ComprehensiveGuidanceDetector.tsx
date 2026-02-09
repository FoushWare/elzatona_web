"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { usePathname } from "next/navigation";
import { UserGuidanceSystem } from "./UserGuidanceSystem";
import { useUserType } from "@elzatona/contexts";

interface WindowWithTestFlags extends Window {
  __DISABLE_GUIDANCE_MODALS__?: boolean;
  __TEST_MODE__?: boolean;
}

export const ComprehensiveGuidanceDetector: React.FC = () => {
  const {
    isFirstVisit: _isFirstVisit,
    setIsFirstVisit,
    userType,
    setUserType: _setUserType,
    setHasCompletedOnboarding,
  } = useUserType();
  const [showGuidance, setShowGuidance] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show guidance on admin pages
    if (pathname?.startsWith("/admin")) {
      return;
    }

    // Don't show guidance during testing
    if (
      typeof globalThis.window !== "undefined" &&
      ((globalThis.window as WindowWithTestFlags).__DISABLE_GUIDANCE_MODALS__ ||
        (globalThis.window as WindowWithTestFlags).__TEST_MODE__)
    ) {
      return;
    }

    // Check if this is truly a first visit
    if (typeof globalThis.window !== "undefined") {
      const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

      if (!hasVisitedBefore && !userType) {
        // This is a first visit and no user type is set
        setShowGuidance(true);
        setIsFirstVisit(true);
        localStorage.setItem("hasVisitedBefore", "true");
      }
    }
  }, [userType, setIsFirstVisit, pathname]);

  const handleGuidanceComplete = () => {
    setShowGuidance(false);
    setIsFirstVisit(false);
    setHasCompletedOnboarding(true);
  };

  const handleGuidanceClose = () => {
    setShowGuidance(false);
    setIsFirstVisit(false);
    setHasCompletedOnboarding(true);
  };

  // Don't show guidance on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <UserGuidanceSystem
      isOpen={showGuidance && !userType}
      onClose={handleGuidanceClose}
      onComplete={handleGuidanceComplete}
    />
  );
};
