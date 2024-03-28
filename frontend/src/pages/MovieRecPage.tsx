import React, { useEffect, useState } from 'react';

const MovieRecPage = () => {
  type Movie = {
    name: string;
    image: string;
  };
  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://127.0.0.1:5000/movies');
      const data = await res.json();
      setMoviesData(data.movies);
    };

    getData();
  }, []);

  return (
    <div>
      {moviesData.map((movie, index) => (
        <div key={index} className="movieRecContainer">
          <h1>Name: {movie.name}</h1>
          <img src={movie.image} alt={movie.name} />
        </div>
      ))}
    </div>
  );
};
export default MovieRecPage;
