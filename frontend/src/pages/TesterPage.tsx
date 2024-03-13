import React from 'react';
import { useNavigate } from 'react-router-dom';

const TesterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate('/');
  };

  return (
    <div className="testerPageContainer">
      <h1>Hello</h1>
      <div className="buttonContainer">
        <button onClick={handleExitClick}>Exit</button>
      </div>
    </div>
  );
};

export default TesterPage;
