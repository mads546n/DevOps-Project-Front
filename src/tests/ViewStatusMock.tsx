import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AuctionItem {
  id: number;
  title: string;
  status: string;
}

const mockAuctions: AuctionItem[] = [
  { id: 1, title: 'Golden Vase', status: 'Ongoing' },
  { id: 2, title: 'Vintage Painting', status: 'Ends Soon' },
  { id: 3, title: 'Modern Sculpture', status: 'Closed' },
];

export default function ViewStatusMock(): JSX.Element {
  const location = useLocation();
  const isHomepage = location.pathname === '/Home';
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);

  if (!isHomepage) {
    return <p>You are not on the homepage. Cannot view auction statuses.</p>;
  }

  return (
    <div>
      <h2>Available Auctions</h2>

      <ul data-testid="auction-list">
        {mockAuctions.map((auction) => (
          <li
            key={auction.id}
            data-testid={`auction-item-${auction.id}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedAuction(auction)}
          >
            {auction.title}
          </li>
        ))}
      </ul>

      {selectedAuction && (
        <p data-testid="auction-status">
          Status of <strong>{selectedAuction.title}</strong>: {selectedAuction.status}
        </p>
      )}
    </div>
  );
}
