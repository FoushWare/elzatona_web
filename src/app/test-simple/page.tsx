'use client';

export default function TestSimplePage() {
  console.log('🔄 TestSimplePage: Component rendered');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      <p>This is a simple test page without any hooks.</p>
      <p>Check console for render messages.</p>
    </div>
  );
}
