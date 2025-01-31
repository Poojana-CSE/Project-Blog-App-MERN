import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeadMain.css';

const HeadMain = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="mainhead">
      <div className="mh">
        <div className="check">
          <h2 className='h'>Bloggy</h2>
        </div>
        <div className="mainheadelements">
          <ul className='mainhomeul'>
            <li className="mainhomepage" onClick={() => navigate('/')}>Home</li>
            <li className="mainhomepage" onClick={() => navigate('/CreateBlogPage')}>Create Blog</li>
            <li className="mainhomepage" onClick={() => navigate('/AllBlogs')}>Blogs</li>
            <li className="mainhomepage" onClick={() => navigate('/MyBlogPage')}>My Blogs</li>
            <li className="mainhomepage" onClick={() => navigate('/SubscribePage')}>Subscribe</li>
            <li className="mainhomepage" onClick={() => navigate('/ProfilePage')}>Profile</li>
          </ul> 
        </div>
      </div>
    </div>
    <hr />
    </div>
  );
};

export default HeadMain;