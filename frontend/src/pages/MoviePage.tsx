import React from 'react';
import '../styles/pages/MoviePage.css';
import { useNavigate } from 'react-router-dom';

const MoviePage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation
  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };
  return (
    <div className="moviePageContainer">
      <h1>Movie Title Test</h1>
      <button onClick={handleEnterClick}>exit</button>{' '}
      {/* Button for navigation */}
    </div>
  );
};

export default MoviePage;
