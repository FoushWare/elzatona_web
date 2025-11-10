'use client';

import React from 'react';
// Note: This is a test page, uses API routes if needed

export default function StaticTestPage() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Static Test Page</h1>
      <div className='mb-4'>
        <p className='text-lg'>This is a static test page</p>
      </div>
      <div className='space-y-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold'>Test Question 1</h3>
          <p className='text-sm text-gray-600'>React - beginner</p>
        </div>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold'>Test Question 2</h3>
          <p className='text-sm text-gray-600'>JavaScript - intermediate</p>
        </div>
      </div>
    </div>
  );
}
