'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      console.log('Login:', {
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Handle signup
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Signup:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1500" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(147,197,253,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.1)_1px,transparent_1px)]" />
      </div>

      <div className="max-w-md mx-auto px-4 relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-3xl">💾</span>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {isLogin ? 'Welcome Back!' : 'Join Frontend KodDev'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
            {isLogin
              ? 'Sign in to continue your learning journey and track your progress'
              : 'Create an account to save your progress, track achievements, and personalize your learning experience'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="relative">
          {/* Form Background with Glass Effect */}
          <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50" />

          <div className="relative bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-blue-900/50 dark:to-purple-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            {/* Toggle Buttons */}
            <div className="flex bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl p-1 mb-8 shadow-inner">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-0 transition-all duration-200"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className={`group/btn relative w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden ${
                  isLogin
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600'
                }`}
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                {/* Button Content */}
                <span className="relative flex items-center justify-center space-x-2">
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <CheckCircle className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform duration-200" />
                </span>
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-blue-900/50 dark:to-purple-900/50 text-gray-600 dark:text-gray-400 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="group relative inline-flex justify-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white/50 dark:bg-gray-700/50 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button className="group relative inline-flex justify-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white/50 dark:bg-gray-700/50 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            {!isLogin && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Why create an account?
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Save your learning progress across devices
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Track completed questions and challenges
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Earn badges and achievements
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Personalized study recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Sync your progress with the dashboard
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-bold transition-colors hover:underline"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
