import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/pages/MoviePage.css';
import { useNavigate } from 'react-router-dom';

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
              id: row[0] || '', // Providing default empty string if undefined
              title: row[1] ? row[1].trim() : '', // Check for undefined before trim
              year: row[2] || '',
              posterPath: row[3] || '',
            }))
            .filter((movie) => movie.title); // Filter out movies without titles
        });
    });

    Promise.all(moviesDataPromises).then((dataArrays) => {
      const structuredData = dataArrays.map((data) => {
        // Since we're already filtering out undefined titles, this step might be redundant
        return data.filter((movie) => movie.title && movie.title.trim() !== '');
      });
      setMoviesData(structuredData);
    });
  }, []);

  const updateSuggestions = () => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
    } else {
      // Assuming searchStrings function is adapted to use moviesData
      const filteredSuggestions = searchStrings(searchTerm.trim(), moviesData);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSuggestions();
    }
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

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };

  return (
    <div className="moviePageContainer">
      <div className="headerContainer">
        <h1 className="header">Selected Movies:</h1>
        <div className="moviesList">
          {selectedMovies.map((movie, index) => (
            <div key={index} className="movieItem">
              <span>{movie.title}</span>: <span>{movie.posterPath}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="searchContainer">
        <button onClick={handleEnterClick}>Exit</button>
        <h1>Movie Title Test</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              {suggestion.title}
              <input
                type="checkbox"
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
    .slice(0, 50);
}
