'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useAuth } from '@elzatona/shared-contexts';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let success = false;

      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(
          formData.name,
          formData.email,
          formData.password
        );
      }

      if (success) {
        router.push('/');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            {isLogin
              ? 'Sign in to continue your learning journey'
              : 'Join us and start your frontend development journey'}
          </p>
        </div>

        {/* Auth Form */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {!isLogin && (
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Full Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                    placeholder='Enter your full name'
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
                <p className='text-red-800 dark:text-red-200 text-sm'>
                  {error}
                </p>
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
            >
              {loading ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className='h-5 w-5' />
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className='mt-6 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setFormData({ name: '', email: '', password: '' });
              }}
              className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
            >
              {isLogin ? 'Create an account' : 'Sign in instead'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
          <div className='bg-white dark:bg-gray-800 rounded-lg p-4 shadow'>
            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
              Learn
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Access comprehensive learning paths
            </p>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-lg p-4 shadow'>
            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
              Practice
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Solve coding challenges and tasks
            </p>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-lg p-4 shadow'>
            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
              Interview
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Prepare with AI-powered interviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
