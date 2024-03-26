import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/pages/MoviePage.css';
import { useNavigate } from 'react-router-dom';

const MoviePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Array<string>>([]);
  const [moviesData, setMoviesData] = useState<string[][]>(
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
          return parsedData.map((row) => row[1]); // Assuming movie titles are in the second column
        });
    });

    Promise.all(moviesDataPromises).then((dataArrays) => {
      const structuredData = dataArrays.map((data) => {
        // Filter out undefined or null values if any
        return data.filter((title) => title != null && title.trim() !== '');
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

  const handleCheckboxChange = (movie: string, isChecked: boolean) => {
    setSelectedMovies((prevMovies) => {
      if (isChecked) {
        return prevMovies.includes(movie) ? prevMovies : [...prevMovies, movie];
      } else {
        return prevMovies.filter((m) => m !== movie);
      }
    });
  };

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };

  return (
    <div className="moviePageContainer">
      <div className="headerContainer">
        <h1 className="header">Selected Movies: {selectedMovies.join(', ')}</h1>
      </div>
      <div className="searchContainer">
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
              {suggestion}
              <input
                type="checkbox"
                checked={selectedMovies.includes(suggestion)}
                onChange={(e) =>
                  handleCheckboxChange(suggestion, e.target.checked)
                }
              />
            </li>
          ))}
        </ul>
        <button onClick={handleEnterClick}>Exit</button>
      </div>
    </div>
  );
};

export default MoviePage;

function searchStrings(query: string, moviesData: string[][]): string[] {
  if (!query) return [];

  // Convert the first character of the query to uppercase to match the array index
  const firstLetter = query[0].toUpperCase();
  const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(firstLetter);

  // If the first character of the query is not a letter or is not found, return an empty array
  if (index === -1) return [];

  // Filter the movies in the sub-array that correspond to the first letter of the query
  // Check if the movie title includes the query string (case-insensitive)
  return moviesData[index]
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 50);
}
