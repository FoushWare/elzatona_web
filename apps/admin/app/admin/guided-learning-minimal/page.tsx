'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Eye, Loader2, Plus, Save, X } from 'lucide-react';

export default function GuidedLearningMinimalPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Guided Learning Plans - Minimal
      </h1>
      <p>This is a minimal version to test the page structure.</p>

      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus className="h-4 w-4 inline mr-2" />
          Add New Plan
        </button>
      </div>
    </div>
  );
}
