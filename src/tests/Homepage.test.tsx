import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CheckHomepage from './HomepageMock';


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
    // Arrange
    setMockLocation('/Home');

    // Act
    render(<CheckHomepage />);

    // Assert
    expect(screen.getByText(/you are on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are not on the homepage/i)).toBeNull();
  });

// skal ændres til at lede efter noget andet, når homepagen er færdig
  it('renders correct message when user is NOT on /Home (Usecase: #2)', () => {
    // Arrange
    setMockLocation('/Products');

    // Act
    render(<CheckHomepage />);

    // Assert
    expect(screen.getByText(/you are not on the homepage/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are on the homepage/i)).toBeNull();
  });
});

