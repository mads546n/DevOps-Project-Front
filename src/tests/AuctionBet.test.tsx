import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuctionBetButton from './AuctionBetMock';

describe('AuctionPrice Component', () => {
  it('updates auction price on submit (Usecase: #3)', () => {
    render(<AuctionBetButton />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/enter your bid/i);
    const button = screen.getByRole<HTMLButtonElement>('button', { name: /submit bid/i });

    // Event
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(button);

    // End state
    expect(screen.getByText(/current price: \$150/i)).toBeInTheDocument();
  });
});
