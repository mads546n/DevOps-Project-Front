import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuctionValidation } from './useAuctionValidationMock';

export default function CreateAuctionMock(): JSX.Element {
  const { artistID } = useParams<{ artistID?: string }>();
  const isVerifiedArtist = Boolean(artistID);

  const [tabOpen, setTabOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [success, setSuccess] = useState(false);

  const { errors, validate } = useAuctionValidation();

  if (!isVerifiedArtist) {
    return <p>You are not a verified artist. Cannot create auctions.</p>;
  }

  const handleConfirm = () => {
    const isValid = validate({ title, description, startingPrice, file });
    if (isValid) setSuccess(true);
  };

  return (
    <div>
      <h2>Artist Auction Tools</h2>
      <p data-testid="artist-id-display">Artist ID: {artistID}</p>

      <button data-testid="my-auctions-tab" onClick={() => setTabOpen(true)}>
        My Auctions
      </button>

      {tabOpen && (
        <button data-testid="create-auction-btn" onClick={() => setCreating(true)}>
          Create Auction
        </button>
      )}

      {creating && (
        <div data-testid="create-form">
          <label>
            Title (1–25 chars):
            <input
              data-testid="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              data-testid="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Starting Price:
            <input
              data-testid="price-input"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
            />
          </label>

          <label>
            PNG File:
            <input
              type="file"
              accept=".png"
              data-testid="file-input"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button data-testid="confirm-create" onClick={handleConfirm}>
            Confirm
          </button>

          {errors.length > 0 && (
            <ul data-testid="error-list">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {success && (
        <p data-testid="success-message">Auction created: {title}</p>
      )}
    </div>
  );
}
