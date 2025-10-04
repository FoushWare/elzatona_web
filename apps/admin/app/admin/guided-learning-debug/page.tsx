'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Eye, Loader2, Plus, Save, X } from 'lucide-react';

// Test individual imports step by step
console.log('Testing imports step by step...');

// Test 1: Basic React hooks
console.log('✅ React hooks work');

// Test 2: Lucide icons
console.log('✅ Lucide icons work');

// Test 3: Shared hooks (skip Firebase-dependent ones)
console.log('⚠️ Skipping Firebase-dependent hooks in admin app');

// Test 4: Shared UI components
let notify = null;
let useConfirmation = null;
try {
  const uiModule = require('@elzatona/shared/ui');
  notify = uiModule.notify;
  useConfirmation = uiModule.useConfirmation;
  console.log('✅ notify and useConfirmation imported successfully');
} catch (error) {
  console.error('❌ UI components import failed:', error);
}

export default function GuidedLearningDebugPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const results = [
      'React hooks: ✅',
      'Lucide icons: ✅',
      'Firebase hooks: ⚠️ Skipped in admin app',
      `notify: ${notify ? '✅' : '❌'}`,
      `useConfirmation: ${useConfirmation ? '✅' : '❌'}`,
    ];
    setTestResults(results);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Guided Learning Debug Page</h1>
      <p className="mb-4">
        Testing individual component imports to identify the issue.
      </p>

      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
            {result}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Test Components:</h2>
        <div className="space-y-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
            <Plus className="w-4 h-4 inline mr-2" />
            Plus Icon Test
          </div>
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded">
            <Save className="w-4 h-4 inline mr-2" />
            Save Icon Test
          </div>
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded">
            <Trash2 className="w-4 h-4 inline mr-2" />
            Trash Icon Test
          </div>
        </div>
      </div>
    </div>
  );
}
