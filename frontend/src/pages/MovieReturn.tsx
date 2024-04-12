import React from 'react';
import { useLocation } from 'react-router-dom';

const MovieReturn = () => {
  const location = useLocation();
  const { movies } = location.state || {}; // Access state passed along with navigate

  return (
    <div>
      <h1>Movie Comparison</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
};

export default MovieReturn;
