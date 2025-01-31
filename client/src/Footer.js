import React from 'react';
import './Footer.css';
import Insta from './components/Assests/Insta.jpeg';
import LinkedIn from './components/Assests/Linkedin.jpeg';
import GitHub from './components/Assests/Github.jpeg'; // Ensure consistent folder naming

const Footer = () => {
  return (
    <div className='footDiv'>
      <hr />
      <div className='connect'>
        <a className='imglink' href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
          <img className='photo' src={Insta} alt='Instagram Profile' />
        </a>
        <a className='imglink' href='https://github.com' target='_blank' rel='noopener noreferrer'>
          <img className='photo' src={GitHub} alt='GitHub Profile' />
        </a>
        <a className='imglink' href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
          <img className='photo' src={LinkedIn} alt='LinkedIn Profile' />
        </a>
      </div>
      <div className='footer-text'>
        <marquee behavior="scroll" direction="left">All Rights Reserved &copy; 2025</marquee>
      </div>
    </div>
  );
};

export default Footer;
