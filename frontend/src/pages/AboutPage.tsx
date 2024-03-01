import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/pages/AboutPage.css';
// import image from '../styles/images/image.png';

const AboutPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };
  //Not sure why I cannot import an image normally and implement it but using require works
  // <img src={image} alt="image" />     This was the last code I had instead along with the import
  return (
    <div className="aboutPageContainer">
      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image.png')}
          alt="image"
        />
        <div className="text">
          <h1>Paul Richnow</h1>
          <p>testing if it actually works</p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image.png')}
          alt="image"
        />
        <div className="text">
          <h1>Luke Lambert</h1>
          <p>Would really be a miracle</p>
        </div>
      </div>

      <button onClick={handleEnterClick}> Hello </button>
    </div>
  );
};

export default AboutPage;
