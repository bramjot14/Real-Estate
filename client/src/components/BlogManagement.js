// src/components/BlogManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState(''); 
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://real-estate-pyvy.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://real-estate-pyvy.onrender.com/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Blog submitted successfully');
      setErrorMessage('');
      setTitle('');
      setSummary('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      setErrorMessage('Error submitting blog. Please check if the backend is correctly configured.');
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://real-estate-pyvy.onrender.com/api/blogs/${blogId}`);
      setSuccessMessage('Blog deleted successfully!');
      setBlogs(blogs.filter((blog) => blog.id !== blogId)); // Remove deleted blog from list
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <h3>Blog Management</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="summary" className="form-label">Blog Summary</label>
          <input
            type="text"
            className="form-control"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Blog Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Blog Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Blog</button>
      </form>

      {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
      {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}

      <h3 className="mt-5">Submitted Blogs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>
                {blog.image_url ? (
                  <img
                    src={`https://real-estate-pyvy.onrender.com${blog.image_url}`}
                    alt={blog.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{blog.author}</td>
              <td>{new Date(blog.created_at).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogManagement;
