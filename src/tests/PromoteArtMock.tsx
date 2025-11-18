import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function PromoteArtMock(): JSX.Element {
  const { artistID } = useParams<{ artistID?: string }>();
  const isVerifiedArtist = Boolean(artistID);

  const [tabOpen, setTabOpen] = useState(false);
  const [partnerMenu, setPartnerMenu] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [success, setSuccess] = useState(false);

  const myAuctions = ["Sunset", "Portrait", "Dreamscape"];

  if (!isVerifiedArtist) {
    return <p>You are not a verified artist. Cannot promote auctions.</p>;
  }

  const toggleAuction = (title: string) => {
    setSelected((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const confirmPromotion = () => {
    if (selected.length > 0 || subscribed) {
      setSuccess(true);
    }
  };

  return (
    <div>
      <h2>Promote My Art</h2>
      <p data-testid="artist-id-display">Artist ID: {artistID}</p>

      <button data-testid="my-auctions-tab" onClick={() => setTabOpen(true)}>
        My Auctions
      </button>

      {tabOpen && (
        <button
          data-testid="partner-program-btn"
          onClick={() => setPartnerMenu(true)}
        >
          Partner Program
        </button>
      )}

      {partnerMenu && (
        <div data-testid="partner-menu">
          <h3>Partner Program</h3>

          {/* Subscription alternative flow */}
          <button
            data-testid="subscribe-btn"
            onClick={() => {
              setSubscribed(true);
              setSelected([]);
            }}
          >
            Subscribe (Auto-Promote All)
          </button>

          {!subscribed && (
            <div>
              <p>Select auctions to promote:</p>
              {myAuctions.map((auction) => (
                <label key={auction}>
                  <input
                    type="checkbox"
                    data-testid={`checkbox-${auction}`}
                    checked={selected.includes(auction)}
                    onChange={() => toggleAuction(auction)}
                  />
                  {auction}
                </label>
              ))}
            </div>
          )}

          <button data-testid="confirm-btn" onClick={confirmPromotion}>
            Confirm Promotion
          </button>
        </div>
      )}

      {success && (
        <p data-testid="success-message">Promotion activated successfully!</p>
      )}
    </div>
  );
}
