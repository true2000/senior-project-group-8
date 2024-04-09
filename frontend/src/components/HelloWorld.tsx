import React from 'react';

const HelloWorld: React.FC = () => {
  const imageUrl =
    'https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg';

  return (
    <div>
      <img
        src={imageUrl}
        alt="Movie Poster"
        style={{ maxWidth: '50%', height: 'auto' }}
      />
    </div>
  );
};

export default HelloWorld;
