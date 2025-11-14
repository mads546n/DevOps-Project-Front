import React from 'react';
import { useParams } from 'react-router-dom';

export default function CheckUserProfile(): JSX.Element {
  const { userID } = useParams<{ userID?: string }>();

  return (
    <div>
      <h2>User Profile Checker</h2>
      {userID ? (
        <p>Viewing user profile for user ID: {userID}</p>
      ) : (
        <p>No user ID found. You are not on a user profile page.</p>
      )}
    </div>
  );
}
