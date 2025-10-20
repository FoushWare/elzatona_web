'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Loader2, Mail, Github, BookOpen, Eye, EyeOff } from 'lucide-react';

interface SignInPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SignInPopup: React.FC<SignInPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  // Close popup and call success callback when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onSuccess();
    }
  }, [isAuthenticated, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        });
        if (error) throw error;
      }
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Github sign-in failed');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-lg max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
              <BookOpen className='w-6 h-6 text-white' />
            </div>
            <div>
              <DialogTitle className='text-2xl font-bold text-gray-900 dark:text-white'>
                {isLogin ? 'Welcome Back!' : 'Join Elzatona'}
              </DialogTitle>
              <DialogDescription className='text-gray-600 dark:text-gray-400 text-base'>
                {isLogin
                  ? 'Sign in to access your guided learning plans'
                  : 'Create your account to start your learning journey'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-6 py-2'>
          {/* Social Sign In */}
          <div className='space-y-3'>
            <Button
              onClick={handleGoogleSignIn}
              variant='outline'
              className='w-full h-12 text-base font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-xl'
              disabled={isSubmitting}
            >
              <Mail className='w-5 h-5 mr-3' />
              Continue with Google
            </Button>
            <Button
              onClick={handleGithubSignIn}
              variant='outline'
              className='w-full h-12 text-base font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-xl'
              disabled={isSubmitting}
            >
              <Github className='w-5 h-5 mr-3' />
              Continue with Github
            </Button>
          </div>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-gray-200 dark:border-gray-700' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400 font-medium'>
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {!isLogin && (
              <div className='space-y-2'>
                <Label
                  htmlFor='name'
                  className='text-sm font-semibold text-gray-700 dark:text-gray-300'
                >
                  Full Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  disabled={isSubmitting}
                  className='h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-colors duration-200'
                  placeholder='Enter your full name'
                />
              </div>
            )}

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm font-semibold text-gray-700 dark:text-gray-300'
              >
                Email Address
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className='h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-colors duration-200'
                placeholder='Enter your email address'
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-semibold text-gray-700 dark:text-gray-300'
              >
                Password
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className='h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-colors duration-200 pr-12'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className='space-y-2'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-sm font-semibold text-gray-700 dark:text-gray-300'
                >
                  Confirm Password
                </Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    disabled={isSubmitting}
                    className='h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-colors duration-200 pr-12'
                    placeholder='Confirm your password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className='text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800'>
                {error}
              </div>
            )}

            <Button
              type='submit'
              className='w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className='w-5 h-5 mr-2 animate-spin' />
              ) : null}
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className='text-center'>
            <button
              type='button'
              onClick={() => setIsLogin(!isLogin)}
              className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-base transition-colors duration-200 hover:underline'
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
