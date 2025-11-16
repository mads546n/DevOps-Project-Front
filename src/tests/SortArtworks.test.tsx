import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SortHomepageMock from './SortArtworksMock';

describe('Use Case #5: Sort artworks on the homepage', () => {
  it('allows user to sort artworks when on /Home', () => {
      //precondition
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<SortHomepageMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Sort Artworks/i)).toBeInTheDocument();

    //event
    fireEvent.click(screen.getByTestId('sort-button'));

    fireEvent.change(screen.getByTestId('sort-select'), {
      target: { value: 'price-asc' },
    });

    fireEvent.click(screen.getByTestId('confirm-button'));

    //endstate
    expect(screen.getByTestId('sorted-result')).toHaveTextContent(
      'price-asc'
    );
  });

  it('shows unavailable message when user is NOT on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/Products']}>
        <Routes>
          <Route path="*" element={<SortHomepageMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Sorting unavailable/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Sort Artworks/i)
    ).toBeNull();
  });
});
