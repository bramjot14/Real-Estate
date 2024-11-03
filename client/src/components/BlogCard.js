import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.summary}</p> {/* Display blog summary */}
        <p className="text-muted">By {blog.author}, {new Date(blog.created_at).toLocaleDateString()}</p>
        <Link to={`/blog/${blog.id}`} className="btn btn-primary">
  Read More
</Link>

      </div>
    </div>
  );
};

export default BlogCard;
