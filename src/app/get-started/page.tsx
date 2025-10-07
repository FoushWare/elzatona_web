'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Play,
  Code,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Users,
  Award,
  Map,
  Compass,
  ExternalLink,
} from 'lucide-react';
import { UserTypeSelector } from '@/shared/components/common/UserTypeSelector';
import { LoadingTransition } from '@/shared/components/common/LoadingTransition';
import { SignInPopup } from '@/shared/components/auth/SignInPopup';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';

type UserType = 'guided' | 'self-directed' | null;

export default function GetStartedPage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const { isAuthenticated } = useFirebaseAuth();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [pendingUserType, setPendingUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);

    if (type === 'guided') {
      // For guided learning, show sign-in popup if not authenticated
      if (!isAuthenticated) {
        setPendingUserType(type);
        setShowSignInPopup(true);
      } else {
        // Already authenticated, proceed directly
        setIsNavigating(true);
        setTimeout(() => {
          router.push('/guided-learning');
        }, 1500);
      }
    } else {
      // For self-directed, proceed directly
      setIsNavigating(true);
      setTimeout(() => {
        router.push('/browse-practice-questions');
      }, 1500);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInPopup(false);
    if (pendingUserType === 'guided') {
      setIsNavigating(true);
      setTimeout(() => {
        router.push('/guided-learning');
      }, 1500);
    }
    setPendingUserType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Loading Transition */}
      <LoadingTransition
        isVisible={isNavigating}
        message="Loading your learning experience..."
        duration={1500}
      />

      {/* User Type Selection */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Style
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select how you'd like to learn and we'll customize your experience
              accordingly.
            </p>
          </div>
          <UserTypeSelector onSelect={handleUserTypeSelect} />
        </div>
      </div>

      {/* Sign In Popup */}
      <SignInPopup
        isOpen={showSignInPopup}
        onClose={() => {
          setShowSignInPopup(false);
          setPendingUserType(null);
        }}
        onSuccess={handleSignInSuccess}
      />
    </div>
  );
}
