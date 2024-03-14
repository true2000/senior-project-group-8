import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/pages/AboutPage.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };

  return (
    <div className="aboutPageContainer">
      <div className="aboutHeaderContainer">
        <h1 className="aboutHeader">Welcome to the group</h1>
      </div>

      <div className="purposeContainer">
        <h2>
          Purpose: We are a group of students at the University of Tulsa, and
          this is our senior project. We put together our passion for movies and
          decided to help others with a resource to find what they may be
          missing out on. So please grab some popcorn and enjoy our site and
          your next movie!
        </h2>
      </div>

      <div>
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
            src={require('../styles/images/paulsPhoto.jpg')}
            alt="image"
          />
          <div className="text">
            <h1>Paul Richnow</h1>
            <p>
              Student athlete at the University of Tulsa as a member of the Mens
              Soccer Team. Majoring in Computer Science. Specialises in
              front-end work.
            </p>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="button" onClick={handleEnterClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
