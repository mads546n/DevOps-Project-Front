import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuctionBetButton from './AuctionBetTestStub';
import { describe, it, expect } from 'vitest';


describe('AuctionPrice Component', () => {
  it('updates auction price on submit (Usecase: #3)', () => {
    render(<AuctionBetButton />);
    const input = screen.getByPlaceholderText(/enter your bid/i);
    const button = screen.getByRole('button', { name: /submit bid/i });

    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(button);

    expect(screen.getByText(/current price: \$150/i)).toBeInTheDocument();
  });
});
