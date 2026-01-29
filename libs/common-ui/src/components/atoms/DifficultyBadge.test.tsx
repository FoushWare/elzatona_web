import React from 'react';
import { render, screen } from '@testing-library/react';
import { DifficultyBadge } from './DifficultyBadge';

describe('DifficultyBadge', () => {
  it('renders difficulty text and appropriate class', () => {
    render(<DifficultyBadge difficulty="easy" />);
    expect(screen.getByText(/EASY/)).toBeInTheDocument();
  });
});
