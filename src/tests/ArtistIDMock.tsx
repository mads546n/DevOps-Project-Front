import React from 'react';
import { useParams } from 'react-router-dom';

export default function CheckArtistProfile(): JSX.Element {
  const { artistID } = useParams<{ artistID?: string }>();

  return (
    <div>
      <h2>Artist Profile Checker</h2>
      {artistID ? (
        <p>Viewing artist profile for artist ID: {artistID}</p>
      ) : (
        <p>No artist ID found. You are not on an artist profile page.</p>
      )}
    </div>
  );
}
