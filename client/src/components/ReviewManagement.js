import React, { useState, useEffect } from 'react';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from localStorage (simulate fetching from server)
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Manage Property Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="list-group">
          {reviews.map((review, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Property ID:</strong> {review.propertyId}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>Submitted At:</strong> {new Date(review.submittedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewManagement;
