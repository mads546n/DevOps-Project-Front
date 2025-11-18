import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const mockFilters = [
  { id: 'price-low', label: 'Price: Low' },
  { id: 'price-high', label: 'Price: High' },
  { id: 'category-modern', label: 'Modern Art' },
  { id: 'category-classic', label: 'Classic Art' },
];

export default function FilterHomepageMock(): JSX.Element {
  const location = useLocation();
  const isHomepage = location.pathname === '/Home';

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [confirmedFilter, setConfirmedFilter] = useState<string>('');

  if (!isHomepage) {
    return <p>You are not on the homepage. Filters unavailable.</p>;
  }

  return (
    <div>
      <h2>Filter Artworks</h2>

      <button data-testid="filter-button" onClick={() => setFiltersOpen(true)}>
        Filter
      </button>

      {filtersOpen && (
        <div data-testid="filter-panel">
          <label htmlFor="filter-select">Choose filter:</label>
          <select
            id="filter-select"
            data-testid="filter-select"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">-- choose filter --</option>
            {mockFilters.map((filter) => (
              <option key={filter.id} value={filter.id}>
                {filter.label}
              </option>
            ))}
          </select>

          <button
            data-testid="confirm-filter"
            onClick={() => setConfirmedFilter(selectedFilter)}
          >
            Confirm
          </button>
        </div>
      )}

      {confirmedFilter && (
        <p data-testid="filter-result">
          Filter applied: <strong>{confirmedFilter}</strong>
        </p>
      )}
    </div>
  );
}
