"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useNavigation } from "@/context/NavigationContext";

interface LoadingLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Enhanced Link Component with Loading State
 *
 * Shows loading indicator when navigating
 * Provides better UX during page transitions
 */
export function LoadingLink({
  children,
  className,
  onClick,
  ...linkProps
}: LoadingLinkProps) {
  const router = useRouter();
  const { setIsNavigating } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Set navigating state
    setIsNavigating(true);

    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Reset after a delay (navigation will complete)
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  return (
    <Link {...linkProps} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
