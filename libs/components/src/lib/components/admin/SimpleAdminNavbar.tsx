"use client";

import React from "react";
import Link from "next/link";

export default function SimpleAdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 transition-colors duration-200 text-white hover:text-red-100"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-600 font-bold text-sm">
              E
            </div>
            <span className="text-lg font-bold">Admin</span>
          </Link>

          {/* Simple right side - just the logo and text */}
          <div className="flex items-center">
            <span className="text-sm text-white/80">
              Elzatona Learning Platform
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
