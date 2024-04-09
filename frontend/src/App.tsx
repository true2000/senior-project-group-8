import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AboutPage from './pages/AboutPage';
import MovieRecPage from './pages/MovieRecPage';
import TesterPage from './pages/TesterPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
          <div className="container-fluid" style={{ marginLeft: '20px' }}>
            <a className="navbar-brand" href="/">
              <img
                src={require('../src/styles/images/navBarSecondPhoto.png')}
                alt="NavBar Logo"
                style={{ width: '100px', height: '50px' }}
              />
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
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="movieRec"
                >
                  Movies
                </a>
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="movies"
                >
                  Recommendation
                </a>
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="tester"
                >
                  Tester
                </a>
              </div>
            </div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
              style={{ marginRight: '20px' }}
            >
              <div className="navbar-nav">
                <a className="nav-link" href="about">
                  About
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/movieRec" element={<MovieRecPage />} />
          <Route path="/tester" element={<TesterPage />} />

          {/* Define more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
