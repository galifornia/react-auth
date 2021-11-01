import React, { useEffect, useState } from 'react';

export const Home = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    // !FIXME
    const hostname = 'http://localhost:8000';
    (async () => {
      await fetch(`${hostname}/api/v1/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.id !== 0) {
            setName(json.name);
          }
        });
    })();
    return () => {
      // cleanup;
    };
  }, []);
  return <div>{name ? `Hello ${name}` : 'You are not authenticated'}</div>;
};
