import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/MovieRecPage.css';

const MovieRecPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate('/');
  };

  return (
    <div className="movieRecContainer">
      <h1>Hello</h1>
      <div className="buttonContainer">
        <button onClick={handleExitClick}>Exit</button>
      </div>
    </div>
  );
};

export default MovieRecPage;
