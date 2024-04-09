import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/pages/MoviePage.css';

interface Movie {
  id: string;
  title: string;
  year: string;
  posterPath: string;
}

const MoviePage = () => {
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

  const imageSize = 'w200'; // Choose the appropriate image size

  const baseURL = 'https://image.tmdb.org/t/p/'; //base URL for any of the pathways

  const fullUrlSelected = baseURL + imageSize;

  return (
    <div className="moviePageContainer">
      <div className="headerContainer">
        <h1 className="header">Selected Movies:</h1>
        <div className="moviesList">
          {selectedMovies.map((movie, index) => (
            <div key={index} className="movieItem">
              <img
                className="selectedImages"
                src={fullUrlSelected + movie.posterPath}
              />
            </div>
          ))}
        </div>
        <button className="findButton">Compare</button>
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
    .slice(0, 25);
}
