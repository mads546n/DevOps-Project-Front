import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PurchaseHistory from './PurchaseHistoryTestStub';

describe('PurchaseHistory Component (Use Case #11)', () => {
  it('shows purchase history after navigating through profile', () => {
    render(<PurchaseHistory />);

    //events
    const profileButton = screen.getByRole('button', { name: /my profile/i });
    fireEvent.click(profileButton);

    const historyButton = screen.getByRole('button', { name: /my purchase history/i });
    fireEvent.click(historyButton);

    //End state
    expect(screen.getByText(/purchase history/i)).toBeInTheDocument();
    expect(screen.getByText(/antique vase/i)).toBeInTheDocument();
    expect(screen.getByText(/vintage painting/i)).toBeInTheDocument();
  });
});