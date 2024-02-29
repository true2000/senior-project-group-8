import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation
  const handleEnterClick = () => {
    navigate('/'); // Navigate to your target path
  };

  return (
    <div className="aboutPageContainer">
      <h1>About Page</h1>
      <button onClick={handleEnterClick}>YUH</button>
    </div>
  );
};

export default AboutPage;
