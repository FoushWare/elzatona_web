import { useState, useEffect } from "react";
import { useAuth } from "@elzatona/contexts";

interface UseHomePageStateReturn {
  hasActivePlan: boolean;
  activePlan: any;
  showAnimation: boolean;
}

export function useHomePageState(
  userType: string | null,
): UseHomePageStateReturn {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [activePlan, setActivePlan] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Simulate fetching user plan data
    if (!isLoading && isAuthenticated && userType === "guided") {
      // In a real app, you'd fetch this from an API
      const userHasPlan = localStorage.getItem("hasActivePlan") === "true";
      const currentPlan = localStorage.getItem("activePlan");

      setHasActivePlan(userHasPlan);
      if (userHasPlan && currentPlan) {
        try {
          setActivePlan(JSON.parse(currentPlan));
        } catch {
          setActivePlan(null);
        }
      } else {
        setActivePlan(null);
      }
    } else {
      setHasActivePlan(false);
      setActivePlan(null);
    }

    // Keep animations enabled - content should remain visible after animations complete
    // The showAnimation prop controls entrance animations, but content stays visible
    // No need to set it to false - animations will complete quickly and content remains visible
  }, [isAuthenticated, isLoading, userType]);

  return {
    hasActivePlan,
    activePlan,
    showAnimation,
  };
}
