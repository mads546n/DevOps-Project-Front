import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ReviewArtMock from './ReviewArtMock';

describe('Use Case #12: Review ongoing art auctions', () => {
  it('allows the user to review an auction on /Home', () => {
      //precondition
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<ReviewArtMock />} />
        </Routes>
      </MemoryRouter>
    );

    //event
    fireEvent.click(screen.getByTestId('auction-item-1'));

    fireEvent.change(screen.getByTestId('rating-select'), {
      target: { value: '4' },
    });

    fireEvent.click(screen.getByTestId('confirm-rating'));

    //end state
    expect(screen.getByTestId('rating-result')).toHaveTextContent('4 stars');
  });

  it('allows user to change their rating', () => {
      //precondition
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<ReviewArtMock />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('auction-item-2'));

    fireEvent.change(screen.getByTestId('rating-select'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByTestId('confirm-rating'));

    expect(screen.getByTestId('rating-result')).toHaveTextContent('2 stars');

    //event
    fireEvent.change(screen.getByTestId('rating-select'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByTestId('confirm-rating'));

    expect(screen.getByTestId('rating-result')).toHaveTextContent('5 stars');
  });

  it('shows unavailable message when not on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/Other']}>
        <Routes>
          <Route path="*" element={<ReviewArtMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Reviews unavailable/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId('auction-list')).toBeNull();
  });
});
