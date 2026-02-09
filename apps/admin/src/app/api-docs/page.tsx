"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function AdminAPIDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin API Documentation</h1>
        <p className="text-gray-600 mb-8">
          Interactive API documentation for the Elzatona Admin application. All
          endpoints require authentication unless specified otherwise.
        </p>
        <SwaggerUI url="/api/swagger" />
      </div>
    </div>
  );
}
