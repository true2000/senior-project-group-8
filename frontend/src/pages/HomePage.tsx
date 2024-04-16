import React from 'react';
import '../styles/pages/HomePage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/movies'); // Navigate to your MoviePage path
  };

  return (
    <div className="homePageContainer">
      <div className="homeIntroContainer">
        <img
          className="logoImage"
          src={require('../styles/images/homePagePhoto.png')}
        ></img>
        <h3>
          Find your next Flick based on movies that you are currently enjoying
        </h3>
        <button className="enterButton" onClick={handleEnterClick}>
          Enter
        </button>{' '}
        {/* Button for navigation */}
      </div>
    </div>
  );
};

export default HomePage;
