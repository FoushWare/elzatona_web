"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuestionsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the canonical questions location in admin/content
    router.replace("/admin/content/questions");
  }, [router]);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-lg font-medium">Redirecting to Questions Management...</h1>
        <p className="text-gray-600 mt-2">Taking you to /admin/content/questions</p>
      </div>
    </div>
  );
}