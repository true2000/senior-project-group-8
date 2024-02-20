import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        {/* Define more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
