import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Error({ statusCode }: { statusCode: number }) {
  const router = useRouter();

  useEffect(() => {
    // If this is a 404 on an admin route, redirect to login
    if (statusCode === 404 && router.pathname.startsWith("/admin")) {
      router.replace("/admin/login");
    }
  }, [router, statusCode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {statusCode || "Error"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Something went wrong
        </p>
        <button
          onClick={() => router.push("/admin/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Admin Login
        </button>
      </div>
    </div>
  );
}
