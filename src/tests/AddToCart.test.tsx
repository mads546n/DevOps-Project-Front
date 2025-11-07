// src/components/AuctionItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AddToCart from './AddToCartTestStub';

describe('AuctionItem Component', () => {
  it('adds auction to cart when "Add to Cart" is clicked (Usecase: #8)', () => {
    render(<AddToCart title="Vintage Painting" price={500} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });

    //Prereq
    expect(addButton).toBeEnabled();
    expect(screen.queryByText(/this auction has been added/i)).toBeNull();

    //Event
    fireEvent.click(addButton);

    //End state
    expect(addButton).toBeDisabled();
    expect(addButton).toHaveTextContent(/added to cart/i);
    expect(
      screen.getByText(/this auction has been added to your cart/i)
    ).toBeInTheDocument();
  });
});
