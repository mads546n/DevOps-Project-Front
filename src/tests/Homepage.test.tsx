import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CheckHomepage from './HomepageMock';

describe('CheckHomepage Component', () => {
  it('renders correct message when user IS on /Home (Usecase: #1)', () => {
    // render component at /Home route
    render(
      <MemoryRouter initialEntries={['/Home']}>
        <Routes>
          <Route path="/Home" element={<CheckHomepage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/you are on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are not on the homepage/i)).toBeNull();
  });

  it('renders correct message when user is NOT on /Home (Usecase: #2)', () => {
    // render component at /Products route
    render(
      <MemoryRouter initialEntries={['/Products']}>
        <Routes>
          <Route path="*" element={<CheckHomepage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/you are not on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are on the homepage/i)).toBeNull();
  });
});


