'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Layers,
  HelpCircle,
  Settings,
  Users,
  FileText,
} from 'lucide-react';

export default function AdminNavbarSimple() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/content/questions', label: 'Questions', icon: HelpCircle },
    { href: '/admin/learning-cards', label: 'Learning Cards', icon: Layers },
    {
      href: '/admin/guided-learning',
      label: 'Guided Learning',
      icon: BookOpen,
    },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/audio', label: 'Audio', icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 text-white hover:text-red-100 transition-colors"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Settings className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
