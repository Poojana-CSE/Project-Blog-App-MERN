import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './ProfilePage.css';

const ProfilePage = ({ profilename }) => {
  const navigate = useNavigate();

  return (
    <div className="propage-container">
      <HeadMain className="propage-headmain" />
      <h2 className="propage-heading">Welcome, {profilename}</h2>
      <button 
        className="propage-portfolio-button" 
        onClick={() => window.open('https://poojana-cse.github.io/PortFolio/', '_blank')}
      >
        Portfolio
      </button>
      <br/>
      <button 
        className="propage-logout-button" 
        onClick={() => navigate('/IndexPage')}
      >
        Logout
      </button>
      <Footer className="propage-footer" />
    </div>
  );
};

export default ProfilePage;
