import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/pages/MovieRecPage.css';
import { useNavigate } from 'react-router-dom';

interface Movie {
  name: string;
  image: string;
}

const MovieRecPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
  };

  const [movies, setMovies] = useState<Movie[]>([]); // Initialize moviesData state as an empty string
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ movies: Movie[] }>(
          `http://127.0.0.1:5000/movies?page=${page}`,
        );
        const newMovies = response.data.movies;
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        if (newMovies.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
      setIsLoading(false);
    };

    if (hasMore) {
      fetchMovies();
    }
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  const handleClosingPopup = () => {
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movieRecPageContainer">
      <div className="movieRecHeader">
        <button className="backButton" onClick={handleBackButton}>
          Back
        </button>
        <h1>Find Your Favourite Movies</h1>
      </div>
      <div className="genreHeader">
        {' '}
        <h1>Movie Recommendations (Raw JSON)</h1>
      </div>
      <div className="movieRecContainer">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <img
              src={movie.image}
              alt={movie.name}
              onClick={() => handleMovieClick(movie)}
            />
          </div>
        ))}
        {selectedMovie && (
          <div className="popup">
            <button onClick={handleClosingPopup}>Close</button>
            <h2>{selectedMovie.name}</h2>
            <img src={selectedMovie.image} alt={selectedMovie.name} />
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
      <div className="genreHeader">
        <h1>Another Genre</h1>
      </div>
      <div className="movieRecContainer">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <img
              src={movie.image}
              alt={movie.name}
              onClick={() => handleMovieClick(movie)}
            />
          </div>
        ))}
        {selectedMovie && (
          <div className="popup">
            <button onClick={handleClosingPopup}>Close</button>
            <h2>{selectedMovie.name}</h2>
            <img src={selectedMovie.image} alt={selectedMovie.name} />
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
    </div>
  );
};

export default MovieRecPage;
