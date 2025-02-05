import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './CreateBlogPage.css';

const CreateBlogPage = ({ author }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Controls form visibility
  const [successMessage, setSuccessMessage] = useState(''); // Stores the success message
  const navigate = useNavigate();
  console.log(author);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author || !category) {
      alert('Please fill all the required fields');
      return;
    }

    const blogData = {
      title,
      content,
      author,
      category,
      externalLink,
    };

    try {
      const response = await fetch('https://blogpageserver.onrender.com/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage('Your Blog has Been Posted');
        setFormVisible(false); // Hide the form after successful post
        setTimeout(() => {
          navigate('/MyBlogPage'); // Navigate to MyBlogPage after 2 seconds
        }, 6000);
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('There was an error creating your blog. Please try again.');
    }
  };

  return (
    <div className="create-blog-container">
      <HeadMain className="headmain" />
      <div className={`create-form ${!formVisible ? 'fade-out' : ''}`}>
        <h2 className="createblogheading">Create Blog</h2>
        {formVisible ? (
          <form onSubmit={handleSubmit} className="createblogform">
            <div className="form-group">
              <label className="createbloglabel">Title</label>
              <input
                type="text"
                className="createbloginput createbloginput-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='Upto 20 Characters'
              />
            </div>
            <div className="form-group">
              <label className="createbloglabel">Content</label>
              <textarea
                className="createbloginput createbloginput-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="createbloglabel">Category</label>
              <input
                type="text"
                className="createbloginput"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="createbloglabel">External Link (optional)</label>
              <input
                type="text"
                className="createbloginput createbloginput-link"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
              />
            </div>
            <button type="submit" className="createblogsubmitbtn">
              Post Blog
            </button>
          </form>
        ) : (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
