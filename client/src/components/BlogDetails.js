import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://real-estate-pyvy.onrender.com/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{blog.title}</h2>

      {/* Display the summary below the title */}
      <p className="text-center text-muted mb-3">{blog.summary}</p>

      {/* Display the image below the summary, in larger size */}
      {blog.image_url ? (
        <div className="text-center mb-4">
          <img
            src={`http://localhost:5002${blog.image_url}`}
            alt={blog.title}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} // Larger image size
          />
        </div>
      ) : (
        <div className="text-center mb-4">No Image Available</div>
      )}

      {/* Display the content below the image */}
      <div className="blog-content text-center">
        <p className="text-muted">
          By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
