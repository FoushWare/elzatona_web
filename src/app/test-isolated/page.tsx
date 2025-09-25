'use client';

import { useState, useEffect } from 'react';

export default function TestIsolatedPage() {
  const [hydrated, setHydrated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('TestIsolatedPage: useEffect running!');
    setMounted(true);
    setHydrated(true);
    console.log('TestIsolatedPage: Client-side hydrated!');
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <head>
          <title>Isolated Test Page</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px',
                }}
              ></div>
              <p style={{ color: '#6b7280', fontSize: '18px' }}>
                Server-side rendering...
              </p>
            </div>
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Isolated Test Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '16px',
              }}
            >
              Client-side hydrated!
            </h1>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              React hydration is working correctly.
            </p>
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p style={{ color: '#374151', fontSize: '14px' }}>
                Hydrated: {hydrated ? 'Yes' : 'No'}
                <br />
                Mounted: {mounted ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
