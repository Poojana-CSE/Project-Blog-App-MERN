import React, { useEffect, useState } from 'react';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './AllBlogs.css';
import likeSound from '../Assests/drop.mp3';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blogs/`);
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleLike = (blogTitle) => {
    const audio = new Audio(likeSound);
    audio.play();
    alert(`You liked: ${blogTitle}`);
  };
  
  return (
    <div>
      <HeadMain />
      <div className="AllBlog-my-blogs-container">
        {blogs.length > 0 ? (
          <ul className="AllBlog-blog-list">
            {blogs.map((blog) => (
              <li key={blog._id} className="AllBlog-blog-item">
                <h3 className="AllBlog-blog-title">{blog.title}</h3>
                <p className="AllBlog-blog-content">{blog.content}</p>
                <p className="AllBlog-blog-category"><em>{blog.category}</em></p>
                <p className="AllBlog-blog-author">Author: {blog.author}</p>
                <p className="AllBlog-blog-date">Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                <button className="AllBlog-like-button" onClick={() => handleLike(blog.title)}>Like</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="AllBlog-no-blogs">No blogs found</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AllBlogs;