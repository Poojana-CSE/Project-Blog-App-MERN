import React from 'react';
import './Post.css';
import Poojana from './components/Assests/Poojana.jpg';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Post = () => {
  const navigate = useNavigate();  // Initialize navigate

  // Function to handle button click and navigate to login page
  const handleStartClick = () => {
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className='postDiv'>
      <div className='contentDiv'>
        <div className='titleDiv'>
          <h2>Poojana's</h2>
          <h2>Stories & Ideas</h2>
          <div className='textDiv'>
            <h4>A Source To Read And Explore...</h4>
          </div>
          <div className='btnDiv'>
            <button className='startBtn' onClick={handleStartClick}>Lets Start</button>
          </div>
        </div>
        <div className='imgDiv'>
          <img className='myImg' src={Poojana} alt='Poojana' />
        </div>
      </div>
    </div>
  );
};

export default Post;