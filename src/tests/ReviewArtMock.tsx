import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AuctionItem {
  id: number;
  title: string;
}

const mockAuctions: AuctionItem[] = [
  { id: 1, title: 'Sunset Landscape' },
  { id: 2, title: 'Portrait of a Lady' },
  { id: 3, title: 'Abstract Horizon' },
];

export default function ReviewArtMock(): JSX.Element {
  const location = useLocation();
  const isHomepage = location.pathname === '/Home';

  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [confirmedRating, setConfirmedRating] = useState<number | null>(null);

  if (!isHomepage) {
    return <p>You are not on the homepage. Reviews unavailable.</p>;
  }

  return (
    <div>
      <h2>Ongoing Auctions</h2>

      {/* List of auctions */}
      <ul data-testid="auction-list">
        {mockAuctions.map((auction) => (
          <li
            key={auction.id}
            data-testid={`auction-item-${auction.id}`}
            onClick={() => {
              setSelectedAuction(auction);
              setRating(null);
              setConfirmedRating(null);
            }}
            style={{ cursor: 'pointer' }}
          >
            {auction.title}
          </li>
        ))}
      </ul>

      {/* Review section */}
      {selectedAuction && (
        <div data-testid="review-section">
          <h3>Review: {selectedAuction.title}</h3>

          <label htmlFor="rating-select">Choose rating:</label>
          <select
            id="rating-select"
            data-testid="rating-select"
            value={rating ?? ''}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="">-- select --</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <button
            data-testid="confirm-rating"
            onClick={() => {
              if (rating !== null) {
                setConfirmedRating(rating);
              }
            }}
          >
            Confirm Review
          </button>

          {confirmedRating && (
            <p data-testid="rating-result">
              You rated this auction: {confirmedRating} star
              {confirmedRating > 1 ? 's' : ''}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
