import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/pages/MovieRecPage.css';
import axios from 'axios'; // Use: 'npm install axios' to get the package.

const MovieRecPage: React.FC = () => {
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState<string>(''); // Initialize moviesData state as an empty string

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/movies');
        setMoviesData(JSON.stringify(response.data, null, 2)); // Convert JSON object to pretty-printed string
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleExitClick = () => {
    navigate('/');
  };

  return (
    <div className="movieRecContainer">
      <h1>Movie Recommendations (Raw JSON)</h1>
      <pre>{moviesData}</pre> {/* Display raw JSON data */}
      <div className="buttonContainer">
        <button onClick={handleExitClick}>Exit</button>
      </div>
    </div>
  );
};

export default MovieRecPage;
