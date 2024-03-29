import { useEffect, useRef, useState } from 'react';
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
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ movies: Movie[] }>(
          `http://127.0.0.1:5000/movies?page=${page}`,
        );
        const newMovies = response.data.movies;
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        if (newMovies.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
      setIsLoading(false);
    };

    if (hasMore) {
      fetchMovies();
    }
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClosingPopup = () => {
    setSelectedMovie(null);
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
      <div>
        {' '}
        <h1>Movie Recommendations (Raw JSON)</h1>
      </div>
      <div className="movieRecContainer">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <img
              src={movie.image}
              alt={movie.name}
              onClick={() => handleMovieClick(movie)}
            />
          </div>
        ))}
        {selectedMovie && (
          <div className="popup">
            <button onClick={handleClosingPopup}>Close</button>
            <h2>{selectedMovie.name}</h2>
            <img src={selectedMovie.image} alt={selectedMovie.name} />
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
      <div>
        <h1>
          Testing what it would look like if we were to bring in another genre
          or so
        </h1>
      </div>
      <div className="movieRecContainer">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <img
              src={movie.image}
              alt={movie.name}
              onClick={() => handleMovieClick(movie)}
            />
          </div>
        ))}
        {selectedMovie && (
          <div className="popup">
            <button onClick={handleClosingPopup}>Close</button>
            <h2>{selectedMovie.name}</h2>
            <img src={selectedMovie.image} alt={selectedMovie.name} />
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
    </div>
  );
};

export default TesterPage;
