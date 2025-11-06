// src/components/PurchaseHistory.jsx
import React, { useState } from 'react';

export default function PurchaseHistory() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // Mock purchase history data
  const purchases = [
    { id: 1, item: 'Antique Vase', price: 200 },
    { id: 2, item: 'Vintage Painting', price: 450 },
  ];

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleHistoryClick = () => {
    setIsHistoryVisible(true);
  };

  return (
    <div>
      {!isProfileOpen && (
        <button onClick={handleProfileClick}>My Profile</button>
      )}

      {isProfileOpen && !isHistoryVisible && (
        <button onClick={handleHistoryClick}>My Purchase History</button>
      )}

      {isHistoryVisible && (
        <div>
          <h2>Purchase History</h2>
          <ul>
            {purchases.map((p) => (
              <li key={p.id}>
                {p.item} — ${p.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}