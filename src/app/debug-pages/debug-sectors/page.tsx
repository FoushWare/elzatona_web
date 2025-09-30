'use client';

import { useState, useEffect } from 'react';
import { useSectorGrading } from '@/hooks/useSectorGrading';

export default function DebugSectorsPage() {
  const pathId = 'javascript-deep-dive';
  const { sectors, isLoading, error } = useSectorGrading(pathId);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('Component mounted');
  }, []);

  useEffect(() => {
    addLog(`isLoading: ${isLoading}`);
  }, [isLoading]);

  useEffect(() => {
    addLog(`error: ${error}`);
  }, [error]);

  useEffect(() => {
    addLog(`sectors: ${sectors ? 'loaded' : 'null'}`);
    if (sectors) {
      addLog(`sectors.sectors.length: ${sectors.sectors.length}`);
    }
  }, [sectors]);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Debug Sectors Page
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Status
        </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p>
            <strong>isLoading:</strong> {isLoading ? 'true' : 'false'}
          </p>
          <p>
            <strong>error:</strong> {error || 'null'}
          </p>
          <p>
            <strong>sectors:</strong> {sectors ? 'loaded' : 'null'}
          </p>
          {sectors && (
            <div>
              <p>
                <strong>sectors.sectors.length:</strong>{' '}
                {sectors.sectors.length}
              </p>
              <p>
                <strong>sectors.pathName:</strong> {sectors.pathName}
              </p>
              <p>
                <strong>sectors.overallGrade:</strong> {sectors.overallGrade}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Sectors Data
        </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {sectors ? (
            <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-auto">
              {JSON.stringify(sectors, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No sectors data</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Console Logs
        </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow max-h-96 overflow-auto">
          {logs.map((log, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 dark:text-gray-300 font-mono"
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
