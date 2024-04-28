import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pages/MovieReturn.css';

interface IMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

interface LocationState {
  movies: IMovie[];
}

const MovieReturn: React.FC = () => {
  const location = useLocation();
  const movies = (location.state as LocationState).movies; // Type assertion here

  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div className="movieReturnContainer">
      <h1>Movie Comparison</h1>
      {movies ? (
        <div className="movies-list-rec">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movieItem-rec"
              onClick={() => handleMovieClick(movie)}
            >
              <h3>
                {truncateTitle(movie.title, 15)} (
                {new Date(movie.release_date).getFullYear()})
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

      {selectedMovie && (
        <div className="popup-rec">
          <div className="popup-content-rec">
            <h2>{selectedMovie.title}</h2>
            <p>
              Released: {new Date(selectedMovie.release_date).getFullYear()}
            </p>
            <div className="retPopimg">
              <img
                src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
              />
            </div>
            <p>{selectedMovie.overview}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieReturn;
