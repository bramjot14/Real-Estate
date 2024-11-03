import React, { useState, useEffect } from 'react';

const PropertyReview = ({ propertyId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);  // State to store all reviews for this property

  // Load existing reviews for this property from localStorage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const propertyReviews = storedReviews.filter(
      (review) => review.propertyId === propertyId
    );
    setReviews(propertyReviews);
  }, [propertyId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate storing the review in localStorage (this should be stored in a database in production)
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const newReview = {
      propertyId,
      rating,
      review,
      submittedAt: new Date(),
    };

    // Add the new review to the existing list and save it
    localStorage.setItem('reviews', JSON.stringify([...storedReviews, newReview]));

    // Update the reviews state to reflect the newly added review
    setReviews((prevReviews) => [...prevReviews, newReview]);

    // Clear the form and show submission message
    setReview('');
    setRating(0);
    setSubmitted(true);
  };

  return (
    <div className="property-review-container mt-5">
      <h3>Leave a Review for This Property</h3>

      {/* Show the form for submitting a new review */}
      {submitted ? (
        <div className="alert alert-success">Thank you! Your review has been submitted.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            >
              <option value="0">Select a rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="review">Your Review</label>
            <textarea
              id="review"
              className="form-control"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
        </form>
      )}

      {/* Display Existing Reviews for the Property */}
      <div className="mt-5">
        <h4>Reviews for this Property</h4>
        {reviews.length > 0 ? (
          reviews.map((reviewItem, index) => (
            <div key={index} className="border p-3 mb-3">
              <p><strong>Rating:</strong> {reviewItem.rating} / 5</p>
              <p>{reviewItem.review}</p>
              <p className="text-muted"><small>Submitted on {new Date(reviewItem.submittedAt).toLocaleDateString()}</small></p>
            </div>
          ))
        ) : (
          <p>No reviews for this property yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default PropertyReview;
