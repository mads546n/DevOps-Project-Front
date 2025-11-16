import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CreateAuctionMock from './CreateAuctionMock';

describe('Use Case #14: Create Auctions + Use Case #15: Edit Parameters of Auctions', () => {
    //precondition
  const setup = () =>
    render(
      <MemoryRouter initialEntries={['/Artist/123']}>
        <Routes>
          <Route path="/Artist/:artistID" element={<CreateAuctionMock />} />
        </Routes>
      </MemoryRouter>
    );

//event
  it('validates full correct parameters as eligible', () => {
    setup();

    fireEvent.click(screen.getByTestId('my-auctions-tab'));
    fireEvent.click(screen.getByTestId('create-auction-btn'));

    fireEvent.change(screen.getByTestId('title-input'), {
      target: { value: 'Perfect Title' },
    });

    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'A very nice artwork.' },
    });

    fireEvent.change(screen.getByTestId('price-input'), {
      target: { value: '1000' },
    });

    const validFile = new File(['x'], 'image.png', { type: 'image/png' });

    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [validFile] },
    });

    fireEvent.click(screen.getByTestId('confirm-create'));

//end state - normal flow
    expect(screen.getByTestId('success-message')).toBeInTheDocument();
    expect(screen.queryByTestId('error-list')).toBeNull();
  });

//alternative flow
  it('rejects title longer than 25 characters', () => {
    setup();

    fireEvent.click(screen.getByTestId('my-auctions-tab'));
    fireEvent.click(screen.getByTestId('create-auction-btn'));

    fireEvent.change(screen.getByTestId('title-input'), {
      target: { value: 'This title is definitely too long for the limit' },
    });

    fireEvent.click(screen.getByTestId('confirm-create'));

//end state alternative flow
    expect(screen.getByTestId('error-list')).toHaveTextContent(
      'Title must be between 1 and 25 characters.'
    );
  });

//alternative flow
  it('requires a description', () => {
    setup();

    fireEvent.click(screen.getByTestId('my-auctions-tab'));
    fireEvent.click(screen.getByTestId('create-auction-btn'));

    fireEvent.change(screen.getByTestId('title-input'), {
      target: { value: 'Valid' },
    });

    fireEvent.change(screen.getByTestId('price-input'), {
      target: { value: '50' },
    });

    const file = new File(['x'], 'image.png', { type: 'image/png' });

    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByTestId('confirm-create'));

//end state alternative flow
    expect(screen.getByTestId('error-list')).toHaveTextContent(
      'Description is required.'
    );
  });

//alternative flow
  it('blocks non-artist users (no artistID)', () => {
    render(
      <MemoryRouter initialEntries={['/Artist']}>
        <Routes>
          <Route path="/Artist" element={<CreateAuctionMock />} />
        </Routes>
      </MemoryRouter>
    );

//end state alternative flow
    expect(
      screen.getByText(/not a verified artist/i)
    ).toBeInTheDocument();
  });
});
