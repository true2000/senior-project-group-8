import { useEffect, useState } from 'react';
import React from 'react';
import '../styles/pages/TesterPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

interface ImageInfo {
  imageUrl: string;
  title: string;
  description: string;
}

interface Movie {
  name: string;
  image: string;
}

const Popup: React.FC<ImageInfo & { onClose: () => void }> = ({
  imageUrl,
  title,
  description,
  onClose,
}) => {
  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="popup-content">
          <img src={imageUrl} alt={title} />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const TesterPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Initialize moviesData state as an empty string

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<{ movies: Movie[] }>(
          'http://127.0.0.1:5000/movies',
        );
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate(); // Hook for navigation

  const handleEnterClick = () => {
    navigate('/movies'); // Navigate to your MoviePage path
  };

  const handleAboutClick = () => {
    navigate('/about'); // Navigate to AboutPage path
  };

  const handleMovieRecClick = () => {
    navigate('/movieRec'); // Navigate to AboutPage path
  };

  const handleTesterClick = () => {
    navigate('/'); // Navigate to AboutPage path
  };

  const posterPath = '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'; //Poster Pathway for avatar
  const imageSize = 'w200'; // Choose the appropriate image size

  const baseURL = 'https://image.tmdb.org/t/p/'; //base URL for any of the pathways

  const fullURL = baseURL + imageSize + posterPath;

  return (
    <div className="testerPageContainer">
      <div className="testerPageTaskBar">
        <button className="taskButton" onClick={handleMovieRecClick}>
          Movie Rec
        </button>
        <button className="taskButton" onClick={handleTesterClick}>
          back
        </button>
        <button className="taskButton" onClick={handleAboutClick}>
          About
        </button>
        <button className="taskButton" onClick={handleEnterClick}>
          Enter
        </button>{' '}
      </div>
      <div className="pictureContainer">
        <img
          className="normalProfile"
          src={fullURL}
          alt="MoviePoster"
          onClick={handleImageClick}
        ></img>
        {/* Popup */}
        {showPopup && (
          <Popup
            imageUrl={fullURL}
            title="Avatar"
            description="Blue People running around jumping on dragons and doing kinky things with their hair"
            onClose={handleClosePopup}
          />
        )}
      </div>
      <div className="movieRecContainer">
        <h1>Movie Recommendations (Raw JSON)</h1>
        {movies.map((movie, index) => (
          <div key={index}>
            <h2>{movie.name}</h2>
            <img
              src={`${baseURL}${imageSize}${movie.image}`}
              alt={movie.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TesterPage;
