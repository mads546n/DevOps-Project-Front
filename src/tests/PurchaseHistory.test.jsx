import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PurchaseHistory from './PurchaseHistoryTestStub';

describe('PurchaseHistory Component (Use Case #11)', () => {
  it('shows purchase history after navigating through profile', () => {
    render(<PurchaseHistory />);

    // Step 1: User presses 'My Profile'
    const profileButton = screen.getByRole('button', { name: /my profile/i });
    fireEvent.click(profileButton);

    // Step 2: 'My Purchase History' button appears
    const historyButton = screen.getByRole('button', { name: /my purchase history/i });
    fireEvent.click(historyButton);

    // Step 3: User can view their purchase history
    expect(screen.getByText(/purchase history/i)).toBeInTheDocument();
    expect(screen.getByText(/antique vase/i)).toBeInTheDocument();
    expect(screen.getByText(/vintage painting/i)).toBeInTheDocument();
  });
});