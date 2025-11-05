// AuctionPrice.jsx
import React, { useState } from 'react';


export default function AuctionBetButton() {
  const [price, setPrice] = useState('');
  const [submittedPrice, setSubmittedPrice] = useState(null);

  const handleSubmit = () => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      setSubmittedPrice(numericPrice);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter your bid"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Bid</button>
      {submittedPrice !== null && <p>Current price: ${submittedPrice}</p>}
    </div>
  );
}
