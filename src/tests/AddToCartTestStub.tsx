// src/components/AuctionItem.jsx
import React, { useState } from 'react';

export default function AddToCart(
    { title, price }: { title: string; price: number }) {
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    setInCart(true);
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <button onClick={handleAddToCart} disabled={inCart}>
        {inCart ? 'Added to Cart' : 'Add to Cart'}
      </button>

      {inCart && <p>This auction has been added to your cart.</p>}
    </div>
  );
}
