import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SortHomepageMock(): JSX.Element {
  const location = useLocation();
  const isHomepage = location.pathname === '/Home';

  const [selectedSort, setSelectedSort] = useState<string>('');
  const [confirmedSort, setConfirmedSort] = useState<string>('');

  if (!isHomepage) {
    return <p>You are not on the homepage. Sorting unavailable.</p>;
  }

  return (
    <div>
      <h2>Sort Artworks</h2>

      <button data-testid="sort-button">Sort</button>

      {/* Dropdown to choose a sort option */}
      <select
        data-testid="sort-select"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <option value="">-- choose sort option --</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="date-new">Newest</option>
      </select>

      <button
        data-testid="confirm-button"
        onClick={() => setConfirmedSort(selectedSort)}
      >
        Confirm
      </button>

      {confirmedSort && (
        <p data-testid="sorted-result">
          Sorted by: <strong>{confirmedSort}</strong>
        </p>
      )}
    </div>
  );
}