import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FilterHomepageMock from './FilterArtworksMock';

describe('Use Case #4: Filter artworks on the homepage', () => {
    //precondition
  it('allows user to filter artworks on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<FilterHomepageMock />} />
        </Routes>
      </MemoryRouter>
    );

//event
    fireEvent.click(screen.getByTestId('filter-button'));

    const select = screen.getByTestId('filter-select');
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'category-modern' } });

    fireEvent.click(screen.getByTestId('confirm-filter'));

    //end state
    expect(screen.getByTestId('filter-result')).toHaveTextContent(
      'category-modern'
    );
  });

//might not be a relevant flow - alternative flow
  it('shows unavailable message when not on /Home', () => {
    render(
      <MemoryRouter initialEntries={['/Products']}>
        <Routes>
          <Route path="*" element={<FilterHomepageMock />} />
        </Routes>
      </MemoryRouter>
    );

//alternative end state
    expect(
      screen.getByText(/Filters unavailable/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId('filter-panel')).toBeNull();
  });
});
