import React, { useEffect, useState } from 'react';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './MyBlogPage.css';

const MyBlogPage = (AuthorPoojana) => {
  const Author = window.localStorage.getItem('author');
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: '',
    content: '',
    category: '',
    externalLink: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`https://blogpageserver.onrender.com/myblogs/${Author}`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs);
        } else {
          console.log('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [Author]);

  const deleteBlog = async () => {
    if (deleteUsername === blogToDelete.Author) {
      try {
        const response = await fetch(`https://blogpageserver.onrender.com/myblogs/delete/${blogToDelete._id}`, { method: 'DELETE' });
        if (response.ok) {
          setBlogs(blogs.filter(blog => blog._id !== blogToDelete._id));
          setAlertMessage('Blog deleted successfully');
        } else {
          setAlertMessage('Failed to delete blog');
        }
      } catch (error) {
        setAlertMessage('Error deleting blog');
        console.error('Error deleting blog:', error);
      }
    } else {
      setAlertMessage('Incorrect username. Blog deletion aborted.');
    }
    setBlogToDelete(null);
    setDeleteUsername('');
  };

  const startEditing = (blog) => {
    setEditBlog(blog._id);
    setUpdateData({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      externalLink: blog.externalLink || '',
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const updateBlog = async (id) => {
    try {
      const response = await fetch(`https://blogpageserver.onrender.com/myblogs/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        const result = await response.json();
        setBlogs(blogs.map(blog => (blog._id === id ? result.blog : blog)));
        setAlertMessage('Blog updated successfully');
        setEditBlog(null);
      } else {
        setAlertMessage('Failed to update blog');
      }
    } catch (error) {
      setAlertMessage('Error updating blog');
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="myblog-container" style={{ backgroundColor: 'white', color: 'black' }}>
      <HeadMain />
      <div className="myblog-my-blogs-container">
        
        {blogs.length > 0 ? (
          <ul className="myblog-blog-list">
            {blogs.map((blog) => (
              <li key={blog._id} className="myblog-blog-item">
                {editBlog === blog._id ? (
                  <div className="myblog-edit-form">
                    <input type="text" name="title" value={updateData.title} onChange={handleUpdateChange} placeholder="Title" />
                    <textarea name="content" value={updateData.content} onChange={handleUpdateChange} placeholder="Content"></textarea>
                    <input type="text" name="category" value={updateData.category} onChange={handleUpdateChange} placeholder="Category" />
                    <input type="text" name="externalLink" value={updateData.externalLink} onChange={handleUpdateChange} placeholder="External Link" />
                    <button className="myblog-save-button" onClick={() => updateBlog(blog._id)}>Save</button>
                    <button className="myblog-cancel-button" onClick={() => setEditBlog(null)}>Cancel</button>
                    {alertMessage && <div className="myblog-alert-message">{alertMessage}</div>}c
                  </div>
                ) : (
                  <>
                    <h3 className="myblog-blog-title">{blog.title}</h3>
                    <p className="myblog-blog-content">{blog.content}</p>
                    <p className="myblog-blog-category"><em>{blog.category}</em></p>
                    <p className="myblog-blog-Author">Author: {blog.Author}</p>
                    <p className="myblog-blog-date">Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                    {blog.externalLink && <p><a className="myblog-external-link" href={blog.externalLink} target="_blank" rel="noopener noreferrer">External Link</a></p>}
                    <button className="myblog-edit-button" onClick={() => startEditing(blog)}>Edit</button>
                    <br />
                    <button className="myblog-delete-button" onClick={() => setBlogToDelete(blog)}>Delete</button>
                    {blogToDelete && blogToDelete._id === blog._id && (
                      <div className="myblog-delete-modal">
                        <h4>Enter username to confirm deletion:</h4>
                        <input className='myblog-deletelabel' type="text" value={deleteUsername} onChange={(e) => setDeleteUsername(e.target.value)} placeholder="Username" />
                        <button className="myblog-confirm-delete" onClick={deleteBlog}>Confirm</button>
                        <button className="myblog-cancel-delete" onClick={() => setBlogToDelete(null)}>Cancel</button>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="myblog-no-blogs">No blogs found</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogPage;
