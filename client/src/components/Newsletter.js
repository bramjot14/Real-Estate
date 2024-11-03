// src/components/Newsletter.js
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate storing the email (you can later connect it to a backend API)
    console.log(`Subscribed email: ${email}`);
    setSubscribed(true);
  };

  return (
    <div className="newsletter-container mt-5">
      <h3>Subscribe to Our Newsletter</h3>
      {subscribed ? (
        <div className="alert alert-success">Thank you for subscribing!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
