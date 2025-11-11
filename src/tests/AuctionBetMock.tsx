import React, { useState, ChangeEvent } from 'react';

export default function AuctionBetButton() {
  const [price, setPrice] = useState<string>('');
  const [submittedPrice, setSubmittedPrice] = useState<number | null>(null);

  const handleSubmit = (): void => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      setSubmittedPrice(numericPrice);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPrice(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter your bid"
        value={price}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit Bid</button>
      {submittedPrice !== null && <p>Current price: ${submittedPrice}</p>}
    </div>
  );
}

