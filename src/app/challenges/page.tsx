"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChallengesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    // Redirect to fundamentals page with category filter
    if (category) {
      router.replace(`/practice/fundamentals?category=${category}`);
    } else {
      router.replace("/practice/fundamentals");
    }
  }, [router, category]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to challenges...</p>
      </div>
    </div>
  );
}
