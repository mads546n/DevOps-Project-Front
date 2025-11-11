import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuctionItem from './AddToCartMock';

describe('AuctionItem Component', () => {
  it('adds auction to cart when "Add to Cart" is clicked (Usecase: #8)', () => {
    render(<AuctionItem title="Vintage Painting" price={500} />);

    const addButton = screen.getByRole<HTMLButtonElement>('button', { name: /add to cart/i });

    // Prereq: before clicking
    expect(addButton).toBeEnabled();
    expect(screen.queryByText(/this auction has been added/i)).toBeNull();

    // Event: user clicks button
    fireEvent.click(addButton);

    // End state: after clicking
    expect(addButton).toBeDisabled();
    expect(addButton).toHaveTextContent(/added to cart/i);
    expect(
      screen.getByText(/this auction has been added to your cart/i)
    ).toBeInTheDocument();
  });
});
