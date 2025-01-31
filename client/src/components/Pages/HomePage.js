import React from 'react';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './HomePage.css';

const HomePage = () => {

  return (
    <div>
      <HeadMain />
      <div className='HomePageClass'>
        <div className='welcomenote'>
          <h2 className='welcome'>Welcome To </h2>
          <h2 className='bloggy'>Bloggy!</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
