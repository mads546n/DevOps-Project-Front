import React from 'react';

export default function CheckHomepage(): JSX.Element {
  const isHomepage = window.location.pathname === '/Home';

  return (
    <div>
      <h2>Homepage Checker</h2>
      {isHomepage ? (
        <p>You are on the homepage.</p>
      ) : (
        <p>You are not on the homepage.</p>
      )}
    </div>
  );
}
