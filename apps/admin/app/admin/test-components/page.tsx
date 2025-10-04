'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Eye, Loader2, Plus, Save, X } from 'lucide-react';

// Test individual imports
console.log('Testing imports...');

try {
  const { useLearningPlanTemplates } = require('@elzatona/shared/hooks');
  console.log('✅ useLearningPlanTemplates imported successfully');
} catch (error) {
  console.error('❌ useLearningPlanTemplates import failed:', error);
}

try {
  const { notify } = require('@elzatona/shared/ui');
  console.log('✅ notify imported successfully');
} catch (error) {
  console.error('❌ notify import failed:', error);
}

try {
  const { useConfirmation } = require('@elzatona/shared/ui');
  console.log('✅ useConfirmation imported successfully');
} catch (error) {
  console.error('❌ useConfirmation import failed:', error);
}

export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Component Import Test
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check the browser console for import test results.
          </p>
        </div>
      </div>
    </div>
  );
}
