import React, { useState } from 'react';
import '../styles/pages/MoviePage.css';
import { useNavigate } from 'react-router-dom';

const movieTitles = ['Movie 1', 'Movie 2', 'Movie 3'];

const MoviePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Array<string>>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = movieTitles.filter((title) =>
      title.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestions(filteredSuggestions);
  };

  const handleCheckboxChange = (movie: string, isChecked: boolean) => {
    setSelectedMovies((prevMovies) => {
      if (isChecked) {
        // Add movie if checked and not already in the list
        return prevMovies.includes(movie) ? prevMovies : [...prevMovies, movie];
      } else {
        // Remove movie if unchecked
        return prevMovies.filter((m) => m !== movie);
      }
    });
  };

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };

  return (
    <div className="moviePageContainer">
      <div className="moveListConatainer">
        <h1>Selected Movies: {selectedMovies.join(', ')}</h1>
      </div>
      <h2>Movie Title Test</h2>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleSearchChange}
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
  );
};

export default MoviePage;
