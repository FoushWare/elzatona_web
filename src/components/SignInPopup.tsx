'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';

interface SignInPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  onSuccess: () => void;
}

export const SignInPopup: React.FC<SignInPopupProps> = ({
  isOpen,
  onClose,
  onSkip,
  onSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
  } = useFirebaseAuth();

  // Reset loading state when popup opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(false);
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;
      if (isSignUp) {
        result = await signUpWithEmail(
          formData.email,
          formData.password,
          formData.displayName
        );
      } else {
        result = await signInWithEmail(formData.email, formData.password);
      }

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Google sign-in failed');
      }
    } catch (err) {
      setError('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithGithub();
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'GitHub sign-in failed');
      }
    } catch (err) {
      setError('GitHub sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isSignUp
                ? 'Join Elzatona to access guided learning features'
                : 'Sign in to access your personalized learning experience'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Continue with Google
              </span>
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required={isSignUp}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? 'Please wait...'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSkip}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
