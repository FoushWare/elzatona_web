"use client";

import React from "react";
import { useUserType } from "@elzatona/contexts";

function TestPage() {
  const { userType } = useUserType();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-xl text-gray-600">
          User Type: {userType || "Not set"}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          If you can see this, the basic imports are working!
        </p>
      </div>
    </div>
  );
}

export default TestPage;
