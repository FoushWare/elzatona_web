'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@elzatona/components';
import { Input } from '@elzatona/components';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <Card className='mb-6 sm:mb-8 border border-gray-200 dark:border-gray-700'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-semibold'>Search Questions</CardTitle>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='flex space-x-2'>
          <Input
            placeholder='Search questions by title, content, tags...'
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className='flex-1 h-11'
          />
        </div>
      </CardContent>
    </Card>
  );
}

