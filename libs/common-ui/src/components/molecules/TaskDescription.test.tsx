import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskDescription } from './TaskDescription';

describe('TaskDescription', () => {
  it('renders description and requirements', () => {
    render(<TaskDescription description="<p>Hi</p>" requirements={["one"]} hints={['hint1']} />);
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('one')).toBeInTheDocument();
  });

  it('toggles hints when clicked', () => {
    render(<TaskDescription description="<p>Hi</p>" hints={['hint1']} />);
    const toggle = screen.getByRole('button', { name: /Show hint 1/i });
    fireEvent.click(toggle);
    expect(screen.getByText('hint1')).toBeInTheDocument();
  });
});
