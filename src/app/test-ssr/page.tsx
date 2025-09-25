export default function TestSSRPage() {
  return (
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
          Server-Side Rendered Page
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          This page is rendered on the server without any client-side
          JavaScript.
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
            If you can see this, Next.js routing is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
