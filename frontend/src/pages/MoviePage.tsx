import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/pages/MoviePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Movie {
  id: string;
  title: string;
  year: string;
  posterPath: string;
}

const MoviePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [moviesData, setMoviesData] = useState<Movie[][]>(
    Array.from({ length: 26 }, () => []),
  );
  const [loading, setLoading] = useState(false);

  const handleCompareClick = async () => {
    if (selectedMovies.length === 0) {
      alert('Please select at least one movie.');
      return;
    }
    const movieIds = selectedMovies.map((movie) => movie.id).join(',');
    const url = `http://127.0.0.1:5000/movies?ids=${movieIds}`;

    setLoading(true);

    try {
      const response = await axios.get(url);
      navigate('/recommendations', { state: { movies: response.data } });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const moviesDataPromises = alphabet.map((letter) => {
      return fetch(`/data/${letter}.csv`)
        .then((response) => response.text())
        .then((csvData) => {
          const parsedData = Papa.parse(csvData, { header: false })
            .data as string[][];
          return parsedData
            .map((row) => ({
              id: row[0] || '',
              title: row[1] ? row[1].trim() : '',
              year: row[2] || '',
              posterPath: row[3] || '',
            }))
            .filter((movie) => movie.title);
        });
    });

    Promise.all(moviesDataPromises).then((dataArrays) => {
      const structuredData = dataArrays.map((data) => {
        return data.filter((movie) => movie.title && movie.title.trim() !== '');
      });
      setMoviesData(structuredData);
    });
  }, []);

  useEffect(() => {
    updateSuggestions();
  }, [searchTerm]); // This effect listens for changes to searchTerm

  const updateSuggestions = () => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = searchStrings(searchTerm.trim(), moviesData);
    setSuggestions(filteredSuggestions);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (movie: Movie, isChecked: boolean) => {
    setSelectedMovies((prevMovies) => {
      if (isChecked) {
        return prevMovies.find((m) => m.id === movie.id)
          ? prevMovies
          : [...prevMovies, movie];
      } else {
        return prevMovies.filter((m) => m.id !== movie.id);
      }
    });
  };

  const removeMovie = (movieId: string) => {
    const updatedMovies = selectedMovies.filter(
      (movie) => movie.id !== movieId,
    );
    setSelectedMovies(updatedMovies);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    movieId: string,
  ) => {
    e.dataTransfer.setData('movieId', movieId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => {
    const draggedMovieId = e.dataTransfer.getData('movieId');
    const updatedMovies = [...selectedMovies];
    const draggedMovie = updatedMovies.find(
      (movie) => movie.id === draggedMovieId,
    );

    if (draggedMovie) {
      const draggedIndex = updatedMovies.findIndex(
        (movie) => movie.id === draggedMovieId,
      );
      updatedMovies.splice(draggedIndex, 1); // Remove dragged movie from its original position
      updatedMovies.splice(targetIndex, 0, draggedMovie); // Insert dragged movie at the new position
      setSelectedMovies(updatedMovies);
    }
  };

  const imageSize = 'w200'; // Choose the appropriate image size

  const baseURL = 'https://image.tmdb.org/t/p/'; //base URL for any of the pathways

  const fullUrlSelected = baseURL + imageSize;

  return (
    <div className="moviePageContainer">
      <div className="headerContainer">
        <h1 className="header">Selected Movies:</h1>
        <div className="moviesList">
          {selectedMovies.map((movie, index) => (
            <div
              key={index}
              className="movieItem"
              onDragStart={(e) => handleDragStart(e, movie.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              draggable
            >
              <img
                className="selectedImages"
                src={fullUrlSelected + movie.posterPath}
                alt={movie.title}
              />
              <button
                className="removeButton"
                onClick={() => removeMovie(movie.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <button
          className="findButton"
          onClick={handleCompareClick}
          disabled={selectedMovies.length === 0 || loading} // Disable button when loading
        >
          {loading ? ( // Show spinner if loading, otherwise show button text
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Compare'
          )}
        </button>
      </div>

      <div className="searchContainer">
        <h1>Add Your Movie Titles</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              {suggestion.title + '\t(' + suggestion.year.slice(0, 4) + ')'}
              <input
                type="checkbox"
                title="Select movie"
                checked={selectedMovies.some(
                  (movie) => movie.id === suggestion.id,
                )}
                onChange={(e) =>
                  handleCheckboxChange(suggestion, e.target.checked)
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviePage;

function searchStrings(query: string, moviesData: Movie[][]): Movie[] {
  if (!query) return [];

  const firstLetter = query[0].toUpperCase();
  const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(firstLetter);
  if (index === -1) return [];

  return moviesData[index]
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 15);
}
