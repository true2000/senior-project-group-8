import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/pages/AboutPage.css';
// import image from '../styles/images/image2.jpeg';

const AboutPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };
  //Not sure why I cannot import an image normally and implement it but using require works
  // <img src={image} alt="image" />     This was the last code I had instead along with the import
  return (
    <div className="aboutPageContainer">
      <h1 className="aboutHeader">Welcome to the group</h1>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image.png')}
          alt="image"
        />
        <div className="text">
          <h1>Devin Pattison</h1>
          <p>Add Info...</p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image2.jpeg')}
          alt="image"
        />
        <div className="text">
          <h1>Luke Lambert</h1>
          <p>Add Info...</p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image3.jpeg')}
          alt="image"
        />
        <div className="text">
          <h1>Ryan Nock</h1>
          <p>Add Info...</p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/image4.jpeg')}
          alt="image"
        />
        <div className="text">
          <h1>Paul Richnow</h1>
          <p>Add Info... </p>
        </div>
      </div>
      <div className="buttonContainer">
        <button onClick={handleEnterClick}> Back </button>
      </div>
    </div>
  );
};

export default AboutPage;
