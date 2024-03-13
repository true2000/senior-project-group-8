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

  return (
    <div className="homePageContainer">
      <button className="aboutButton" onClick={handleAboutClick}>
        About
      </button>
      <h1>IMAGE GOES HERE</h1>
      <h2>FlickFinder</h2>
      <body>
        Find your next Flick based on movies that you are currently enjoying
      </body>
      <button className="enterButton" onClick={handleEnterClick}>
        Enter
      </button>{' '}
      {/* Button for navigation */}
      <caption>
        This website is designed to help you find and increase your knowledge of
        movies.
      </caption>
      <button className="enterButton" onClick={handleMovieRecClick}>
        Movie Rec
      </button>
    </div>
  );
};

export default HomePage;
