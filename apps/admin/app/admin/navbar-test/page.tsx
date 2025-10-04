'use client';

import React from 'react';

// Test individual components
function TestAdminNavbar() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Navbar Test</h1>
      <p>Testing individual components to identify the issue.</p>

      <div className="mt-4 space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Test 1: Basic Navbar Structure</h3>
          <nav className="bg-gray-100 p-4 rounded">
            <div className="flex justify-between items-center">
              <div>Logo</div>
              <div>Menu</div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TestAdminNavbar;
