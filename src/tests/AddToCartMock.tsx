import React, { useState } from 'react';

interface AddToCartProps {
  title: string;
  price: number;
}

export default function AddToCart({ title, price }: AddToCartProps) {
  const [inCart, setInCart] = useState<boolean>(false);

  const handleAddToCart = (): void => {
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

