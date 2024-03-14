import { useState } from 'react';
import React from 'react';
import '../styles/pages/TesterPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ImageInfo {
  imageUrl: string;
  title: string;
  description: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  // const [options, setOptions] = useState<string[]>([
  //   'Option 1',
  //   'Option 2',
  //   'Option 3',
  // ]);

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setShowDropdown(
      options.some((option) => option.toLowerCase().includes(value)),
    );
  };

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
    setShowDropdown(false);
  };

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
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {showDropdown && (
          <div className="dropdown">
            {options
              .filter((option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TesterPage;
