import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pages/MovieReturn.css';

interface IMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface LocationState {
  movies: IMovie[];
}

const MovieReturn: React.FC = () => {
  const location = useLocation();
  const movies = (location.state as LocationState).movies; // Type assertion here

  return (
    <div className="movieReturnContainer">
      <h1>Movie Comparison</h1>
      {movies ? (
        <div>
          {movies.map((movie) => (
            <div key={movie.id} className="movieItem">
              <h3>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieReturn;
