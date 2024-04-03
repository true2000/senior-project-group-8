import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AboutPage from './pages/AboutPage';
import MovieRecPage from './pages/MovieRecPage';
import TesterPage from './pages/TesterPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleHomeClick = () => {
    navigate('/'); // Navigate to your target path
  };

  const handleMoviesClick = () => {
    navigate('/movieRec'); // Navigate to your target path
  };

  const handleAboutClick = () => {
    navigate('/about'); // Navigate to your target path
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={handleHomeClick}>
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className="nav-link active"
                aria-current="page"
                onClick={handleMoviesClick}
              >
                Movies
              </a>
              <a className="nav-link" onClick={handleAboutClick}>
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/movieRec" element={<MovieRecPage />} />
          <Route path="/tester" element={<TesterPage />} />

          {/* Define more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
