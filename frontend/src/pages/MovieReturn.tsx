import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pages/MovieReturn.css';

const MovieReturn = () => {
  const location = useLocation();
  const { movies } = location.state || {}; // Access state passed along with navigate
  console.log(movies);

  return (
    <div className="movieReturnContainer">
      <h1>Movie Comparison</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
};

export default MovieReturn;
