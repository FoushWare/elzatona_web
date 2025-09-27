'use client';

import { useState, useEffect } from 'react';

export default function DebugConsolePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('useEffect started');

    const fetchData = async () => {
      try {
        addLog('Starting API call to /api/learning-paths');
        const response = await fetch('/api/learning-paths');
        addLog(`Response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        addLog(`API call successful, received ${result.length} items`);
        setData(result);
        setError(null);
      } catch (err) {
        addLog(`API call failed: ${err}`);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        addLog('API call completed, setting loading to false');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Console Page</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>Error: {error || 'none'}</p>
        <p>Data: {data ? `${data.length} items` : 'none'}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Console Logs:</h2>
        <div className="bg-gray-100 p-2 rounded font-mono text-sm max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
