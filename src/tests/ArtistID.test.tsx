import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CheckArtistProfile from './ArtistIDMock';

describe('CheckArtistProfile Component', () => {
  it('renders correct message when user navigates to /artist/:artistID (Usecase: #1)', () => {
    render(
      <MemoryRouter initialEntries={['/artist/789']}>
        <Routes>
          <Route path="/artist/:artistID" element={<CheckArtistProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/viewing artist profile for artist id: 789/i)).toBeInTheDocument();
    expect(screen.queryByText(/no artist id found/i)).toBeNull();
  });

  it('renders correct message when user navigates to /user/:userID (Usecase: #2)', () => {
    render(
      <MemoryRouter initialEntries={['/user/123']}>
        <Routes>
          {/* not matching /artist route */}
          <Route path="*" element={<CheckArtistProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no artist id found/i)).toBeInTheDocument();
    expect(screen.queryByText(/viewing artist profile/i)).toBeNull();
  });

  it('renders correct message when user is on /home (Usecase: #3)', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="*" element={<CheckArtistProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no artist id found/i)).toBeInTheDocument();
    expect(screen.queryByText(/viewing artist profile/i)).toBeNull();
  });
});
