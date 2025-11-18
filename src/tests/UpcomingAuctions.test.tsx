import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UpcomingAuctionsMock from './UpcomingAuctionsMock';

describe('Use Case #7: View upcoming auctions', () => {
  it('shows upcoming auctions when the user presses the Upcoming tab on /Home', () => {
      //precondition
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<UpcomingAuctionsMock />} />
        </Routes>
      </MemoryRouter>
    );

    const upcomingTab = screen.getByTestId('upcoming-tab');
    expect(upcomingTab).toBeInTheDocument();

    //event
    fireEvent.click(upcomingTab);

    //end state
    const list = screen.getByTestId('upcoming-list');
    expect(list).toBeInTheDocument();

    expect(screen.getByTestId('upcoming-item-1')).toHaveTextContent(
      'Antique Jewelry Auction'
    );
  });

  it('shows unavailable message when not on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/OtherPage']}>
        <Routes>
          <Route path="*" element={<UpcomingAuctionsMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Cannot display upcoming auctions/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId('upcoming-list')).toBeNull();
  });
});
