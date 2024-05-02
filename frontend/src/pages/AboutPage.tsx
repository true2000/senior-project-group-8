import React from 'react';

import '../styles/pages/AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="aboutPageContainer">
      <div className="aboutHeaderContainer">
        <h1 className="aboutHeader">Welcome to the group</h1>
      </div>

      <div className="purposeContainer">
        <h2>
          Purpose: We are a group of students at the University of Tulsa, and
          this is our senior project. We put together our passion for movies and
          decided to help others with a resource to find what they may be
          missing out on. So please grab some popcorn and enjoy our site and
          your next movie!
        </h2>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/lukePhoto.png')}
          alt="image"
        />
        <div className="text">
          <h1>Luke Lambert</h1>
          <p>
            Luke is a Junior Computer Science and Mathematics student athlete on
            the track and cross country team at TU. Favorite book: A Short
            History of Nearly Everything by Bill Bryson. Favorite class at TU:
            Algorithms. Best TU memory: Competing at the NCAA Division One
            national championship where the University of Tulsa came 9th place.{' '}
          </p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/ryanPhoto.jpg')}
          alt="image"
        />
        <div className="text">
          <h1>Ryan Nock</h1>
          <p>
            Ryan is a Senior Computer Science student at TU. Favorite class at
            TU: Senior Software. Favorite book: Generative Deep Learning by
            David Foster. Favorite class at TU: Senior Software. Favourite
            Movie: Interstellar by Christopher Nolan.
          </p>
        </div>
      </div>

      <div className="introductionProfile">
        <img
          className="image"
          src={require('../styles/images/paulsPhoto.jpg')}
          alt="image"
        />
        <div className="text">
          <h1>Paul Richnow</h1>
          <p>
            Paul is a Senior Computer Science student athlete member of the TU
            Mens soccer Program. Favorite books: Eragon Series by Christopher
            Paolini. Favorite class at TU: Senior Software. Favourite Movie:
            District 9 by Neill Blomkamp.
          </p>
        </div>
      </div>
      <div>
        <div className="introductionProfileFinal">
          <img
            className="imageDev"
            src={require('../styles/images/devinPhoto.JPG')}
            alt="image"
          />
          <div className="text">
            <h1>Devin Pattison</h1>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
