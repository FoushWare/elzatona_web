'use client';

import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { swaggerSpec } from '@/lib/swagger-config';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRoleBasedAccess } from '@/hooks/useRoleBasedAccess';
import { AlertCircle, BookOpen, Code, Database, Shield } from 'lucide-react';

export default function APIDocumentationPage() {
  const { user: currentUser } = useAdminAuth();
  const { isAdmin } = useRoleBasedAccess();

  // Check permissions
  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <BookOpen className="h-8 w-8 mr-3 text-blue-500" />
                API Documentation
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Comprehensive API documentation for the Elzatona Learning
                Platform
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-1" />
                <span>REST API</span>
              </div>
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-1" />
                <span>Firebase</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>JWT Auth</span>
              </div>
            </div>
          </div>
        </div>

        {/* API Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Endpoints
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  50+
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Auth Methods
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  2
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Collections
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  13
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  API Version
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  v1.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Start Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                1. Authentication
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  POST /api/auth
                  <br />
                  {`{`}
                  <br />
                  &nbsp;&nbsp;"email": "user@example.com",
                  <br />
                  &nbsp;&nbsp;"password": "password123"
                  <br />
                  {`}`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                2. Use Token
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  Authorization: Bearer {'<token>'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Swagger UI */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Interactive API Documentation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explore and test API endpoints directly from this interface
            </p>
          </div>
          <div className="swagger-ui-container">
            <SwaggerUI
              spec={swaggerSpec}
              docExpansion="list"
              defaultModelsExpandDepth={2}
              defaultModelExpandDepth={2}
              tryItOutEnabled={true}
              requestInterceptor={request => {
                // Add authentication token if available
                const token = localStorage.getItem('auth-token');
                if (token) {
                  request.headers.Authorization = `Bearer ${token}`;
                }
                return request;
              }}
              responseInterceptor={response => {
                // Handle responses
                return response;
              }}
            />
          </div>
        </div>

        {/* API Information */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Base URLs
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  • Development:{' '}
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    http://localhost:3000
                  </code>
                </li>
                <li>
                  • Production:{' '}
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    https://api.elzatona.com
                  </code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Authentication
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• JWT Bearer Token</li>
                <li>• Admin JWT for admin operations</li>
                <li>• Token expires in 24 hours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Response Format
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• JSON format</li>
                <li>• Consistent error handling</li>
                <li>• Pagination support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Rate Limiting
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• 1000 requests per hour</li>
                <li>• 100 requests per minute</li>
                <li>• Admin endpoints: higher limits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
