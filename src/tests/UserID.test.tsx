import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CheckUserProfile from './UserIDMock';

describe('CheckUserProfile Component', () => {
  it('renders correct message when user navigates to /user/:userID (Usecase: #1)', () => {
    render(
      <MemoryRouter initialEntries={['/user/123']}>
        <Routes>
          <Route path="/user/:userID" element={<CheckUserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/viewing user profile for user id: 123/i)).toBeInTheDocument();
    expect(screen.queryByText(/no user id found/i)).toBeNull();
  });

  it('renders correct message when user navigates to /artist/:artistID (Usecase: #2)', () => {
    render(
      <MemoryRouter initialEntries={['/artist/999']}>
        <Routes>
          {/* no /user/:userID route here on purpose */}
          <Route path="*" element={<CheckUserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no user id found/i)).toBeInTheDocument();
    expect(screen.queryByText(/viewing user profile/i)).toBeNull();
  });

  it('renders correct message when user is on /home (Usecase: #3)', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="*" element={<CheckUserProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no user id found/i)).toBeInTheDocument();
    expect(screen.queryByText(/viewing user profile/i)).toBeNull();
  });
});

