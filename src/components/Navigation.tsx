"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
// import { useTranslation } from "@/hooks/useTranslation";
// import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const { t, isRTL } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Practice",
      items: [
        { href: "/coding", label: "Coding" },
        { href: "/system-design", label: "System Design" },
        { href: "/practice/fundamentals", label: "Frontend Fundamentals" },
        { href: "/practice/advanced", label: "Advanced Topics" },
      ],
    },
    {
      label: "Learn",
      items: [
        { href: "/resources", label: "External Resources" },
        { href: "/learning-paths", label: "Learning Paths" },
        { href: "/study-plans", label: "Study Plans" },
        { href: "/preparation-guides", label: "Preparation Guides" },
        { href: "/git-tips", label: "Git Tips & Tricks" },
        {
          href: "/authentication-strategies",
          label: "Authentication Strategies",
        },
        { href: "/blog", label: "Blog & Articles" },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            GreatFrontendHub
          </Link>

          {/* Desktop Navigation */}
          <div
            ref={dropdownRef}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : "text-muted-foreground hover:text-blue-600 hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                        openDropdown === item.label
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                          : "text-muted-foreground hover:text-blue-600 hover:bg-muted"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-md shadow-lg border border-border z-50">
                        <div className="py-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                  : "text-muted-foreground hover:text-blue-600 hover:bg-muted"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dark Mode Toggle and Mobile menu button */}
          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-muted-foreground hover:text-blue-600 p-2 rounded-md"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                          : "text-muted-foreground hover:text-blue-600 hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <div className="px-3 py-2 text-base font-medium text-foreground border-b border-border">
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive(subItem.href)
                                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                : "text-muted-foreground hover:text-blue-600 hover:bg-muted"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
