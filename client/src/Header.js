import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="headpage">
      <div className="hp">
        <div className="heading">
          <h2>Bloggy</h2>
        </div>
        <div className="headelements">
          <ul className='ultagHeader'>
            <li className="homepage" onClick={() => navigate('/')}>Home</li>
            <li>
              <button  className='btn' onClick={() => navigate('/register')}>Sign Up</button>
            </li>
            <li>
            <button className='btn' onClick={() => navigate('/login')}>Get Started</button>
            </li>
          </ul> 
        </div>
      </div>
    </div>
    <hr />
    </div>
  );
};

export default Header;