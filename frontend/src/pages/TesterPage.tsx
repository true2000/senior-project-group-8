import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/TesterPage.css';

const TesterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate('/');
  };

  return (
    <div className="title-page">
      <header className="header">
        <h1>Title</h1>
      </header>
      <nav className="nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <main className="main">
        <p>Welcome to our website!</p>
      </main>
      <footer className="footer">
        <p>&copy; 2024 MyWebsite</p>
      </footer>
      <div className="buttonContainer">
        <button onClick={handleExitClick}> Back </button>
      </div>
    </div>
  );
};

export default TesterPage;
