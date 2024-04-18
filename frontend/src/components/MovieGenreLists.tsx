/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/pages/MovieGenreList.css';

interface Movie {
  title: string;
  year: string;
  posterPath: string;
  description: string;
}

const MovieGenreLists: React.FC<{ csvFilePath: string }> = ({
  csvFilePath,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchAndParseMovies = async () => {
      try {
        const response = await fetch(csvFilePath);
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        const moviesData = parsedData.map((row: any) => ({
          title: row.title,
          year: row.year,
          posterPath: row.poster_path,
          description: row.overview,
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error('Failed to fetch and parse CSV:', error);
      }
    };

    fetchAndParseMovies();
  }, [csvFilePath]);

  const imageSize = 'w200'; // Choose the appropriate image size
  const baseURL = 'https://image.tmdb.org/t/p/'; //base URL for any of the pathways
  const fullURL = baseURL + imageSize;

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-container">
      <div className="movie-row">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={fullURL + movie.posterPath}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              Close
            </button>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.year}</p>
            <p>{selectedMovie.description}</p>
            <img
              src={fullURL + selectedMovie.posterPath}
              alt={selectedMovie.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGenreLists;
