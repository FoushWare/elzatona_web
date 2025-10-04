'use client';

import React from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export default function AdminLoginNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/admin/login"
            className="flex items-center space-x-2 text-white hover:text-red-100 transition-colors"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Settings className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xl font-bold">Admin Login</span>
          </Link>

          {/* Login Info */}
          <div className="text-white text-sm">Admin Panel Access</div>
        </div>
      </div>
    </nav>
  );
}
