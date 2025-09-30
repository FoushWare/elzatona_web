'use client';

import { useEffect, useState } from 'react';
import { firestoreService } from '@/lib/firestore-service';

export default function DebugFirebasePage() {
  const [status, setStatus] = useState('Loading...');
  const [templates, setTemplates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        setStatus('Testing Firebase connection...');
        const templates = await firestoreService.getLearningPlanTemplates();
        setTemplates(templates);
        setStatus(`Success! Found ${templates.length} templates`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('Error occurred');
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Firebase Debug Page</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className="text-lg">{status}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Learning Plan Templates
          </h2>
          {templates.length > 0 ? (
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="border rounded p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                  <p className="text-sm text-gray-500">
                    Duration: {template.duration} days
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No templates found</p>
          )}
        </div>
      </div>
    </div>
  );
}
