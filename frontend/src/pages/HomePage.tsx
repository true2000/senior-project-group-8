import React from 'react';
import '../styles/pages/HomePage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/moviesTest'); // Navigate to your target path
  };

  return (
    <div className="homePageContainer">
      <h1>IMAGE GOES HERE</h1>
      <h1>FlickFinder</h1>
      <p>
        Find your next Flick based on movies that you are currently enjoying
      </p>
      <button onClick={handleEnterClick}>Enter</button>{' '}
      {/* Button for navigation */}
      <p>
        This website is designed to help you find and increase your knowledge of
        movies.
      </p>
    </div>
  );
};

export default HomePage;
