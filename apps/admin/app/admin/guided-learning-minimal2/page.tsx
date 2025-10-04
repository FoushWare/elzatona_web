'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function GuidedLearningMinimal2Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test the imports (skip Firebase-dependent hooks)
    try {
      const { notify, useConfirmation } = require('@elzatona/shared/ui');

      console.log('✅ UI imports successful');
      setLoading(false);
    } catch (error) {
      console.error('❌ Import error:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Guided Learning Minimal 2</h1>
      <p>This page tests imports step by step.</p>
    </div>
  );
}
