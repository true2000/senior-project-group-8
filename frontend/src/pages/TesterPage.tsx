import React from 'react';
import '../styles/pages/TesterPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TesterPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/movies'); // Navigate to your MoviePage path
  };

  const handleAboutClick = () => {
    navigate('/about'); // Navigate to AboutPage path
  };

  const handleMovieRecClick = () => {
    navigate('/movieRec'); // Navigate to AboutPage path
  };

  const handleTesterClick = () => {
    navigate('/'); // Navigate to AboutPage path
  };

  return (
    <div className="testerPageContainer">
      <div className="testerPageTaskBar">
        <button className="taskButton" onClick={handleMovieRecClick}>
          Movie Rec
        </button>
        <button className="taskButton" onClick={handleTesterClick}>
          back
        </button>
        <button className="taskButton" onClick={handleAboutClick}>
          About
        </button>
        <button className="taskButton" onClick={handleEnterClick}>
          Enter
        </button>{' '}
      </div>
    </div>
  );
};

export default TesterPage;
