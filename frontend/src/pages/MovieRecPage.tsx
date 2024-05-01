import '../styles/pages/MovieRecPage.css';
import MovieGenreLists from '../components/MovieGenreLists';

const MovieRecPage = () => {
  return (
    <div className="movieRecPageContainer">
      <div className="movieRecHeader">
        <h1>Find Your Favorite Movies</h1>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Action</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Action_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Adventure</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Adventure_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Crime</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Crime_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Drama</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Drama_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Family</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Family_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Horror</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Horror_top_50_movies.csv" />
        </div>
      </div>
      <div className="genreScrollContatiner">
        <div className="genreHeader">
          {' '}
          <h1>Science Fiction</h1>
        </div>
        <div className="movieRecContainer">
          <MovieGenreLists csvFilePath="/genreList/Science Fiction_top_50_movies.csv" />
        </div>
      </div>
    </div>
  );
};

export default MovieRecPage;
