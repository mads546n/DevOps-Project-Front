import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ViewStatusMock from './ViewStatusMock';

describe('Use Case #6: View auction status', () => {
  it('allows user to view the status of a selected auction on /Home', () => {
      //precondition
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<ViewStatusMock />} />
        </Routes>
      </MemoryRouter>
    );

    const auctionList = screen.getByTestId('auction-list');
    expect(auctionList).toBeInTheDocument();
    const item = screen.getByTestId('auction-item-2'); // Vintage Painting

    //event
    fireEvent.click(item);

    //end state
    expect(screen.getByTestId('auction-status')).toHaveTextContent(
      'Vintage Painting'
    );
    expect(screen.getByTestId('auction-status')).toHaveTextContent(
      'Ends Soon'
    );
  });

  it('shows unavailable message when not on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/OtherPage']}>
        <Routes>
          <Route path="*" element={<ViewStatusMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Cannot view auction statuses/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId('auction-list')).toBeNull();
  });
});
