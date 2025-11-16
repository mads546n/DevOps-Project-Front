import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const upcomingMockData = [
  { id: 1, title: 'Antique Jewelry Auction', date: '2025-12-01' },
  { id: 2, title: 'Rare Book Collection', date: '2025-12-10' },
  { id: 3, title: 'Fine Art Winter Event', date: '2026-01-05' },
];

export default function UpcomingAuctionsMock(): JSX.Element {
  const location = useLocation();
  const isHomepage = location.pathname === '/Home';

  const [showUpcoming, setShowUpcoming] = useState(false);

  if (!isHomepage) {
    return <p>You are not on the homepage. Cannot display upcoming auctions.</p>;
  }

  return (
    <div>
      <h2>Auction Tabs</h2>

      <button
        data-testid="upcoming-tab"
        onClick={() => setShowUpcoming(true)}
      >
        Upcoming
      </button>

      {showUpcoming && (
        <ul data-testid="upcoming-list">
          {upcomingMockData.map((auction) => (
            <li key={auction.id} data-testid={`upcoming-item-${auction.id}`}>
              {auction.title} — {auction.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
