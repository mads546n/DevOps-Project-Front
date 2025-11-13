import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CheckHomepage from './HomepageMock';

//Slet den her, hvis vi bruger router. Skal først lige forhøres.
const setMockLocation = (pathname: string) => {
  const mockLocation = {
    ...window.location,
    pathname,
  };
  Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
  });
};

describe('CheckHomepage Component', () => {
  it('renders correct message when user IS on /Home (Usecase: #1)', () => {
    //precondition
    setMockLocation('/Home');

    //event
    render(<CheckHomepage />);

    //end-state
    expect(screen.getByText(/you are on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are not on the homepage/i)).toBeNull();
  });

// skal ændres til at lede efter noget andet, når homepagen er færdig
  it('renders correct message when user is NOT on /Home (Usecase: #2)', () => {
    //precondition
    setMockLocation('/Products');

    //event
    render(<CheckHomepage />);

    //act
    expect(screen.getByText(/you are not on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are on the homepage/i)).toBeNull();
  });
});

