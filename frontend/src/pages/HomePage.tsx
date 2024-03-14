import React from 'react';
import '../styles/pages/HomePage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage: React.FC = () => {
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
    navigate('/tester'); // Navigate to AboutPage path
  };

  return (
    <div className="homePageContainer">
      <div className="homePageTaskBar">
        <button className="homeTaskButton" onClick={handleMovieRecClick}>
          Movie Rec
        </button>
        <button className="homeTaskButton" onClick={handleTesterClick}>
          Tester
        </button>
        <button className="homeTaskButton" onClick={handleAboutClick}>
          About
        </button>
      </div>
      <div className="homeIntroContainer">
        <h1>IMAGE GOES HERE</h1>
        <h2>FlickFinder</h2>
        <body>
          Find your next Flick based on movies that you are currently enjoying
        </body>
        <button className="enterButton" onClick={handleEnterClick}>
          Enter
        </button>{' '}
        {/* Button for navigation */}
        <p>
          This website is designed to help you find and increase your knowledge
          of movies.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
