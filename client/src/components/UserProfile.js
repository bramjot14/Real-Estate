import React, { useState, useEffect } from 'react';

const UserProfile = ({ user, savedProperties = [] }) => {
  // State for user preferences
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: 'light',
  });

  // Handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle if the user is not logged in
  if (!user) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-5">User Profile</h2>
        <p className="text-center">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">User Profile</h2>

      {/* Profile Information */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <h4>Welcome, {user.displayName}</h4>
          <p>Email: {user.email}</p>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <h5>Manage Preferences</h5>
          <form>
            <div className="form-group mb-3">
              <label>Notifications</label>
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handlePreferenceChange}
              />
              <span className="ms-2">Enable Notifications</span>
            </div>
            <div className="form-group mb-3">
              <label>Theme</label>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handlePreferenceChange}
                className="form-control"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      {/* Saved Properties Section */}
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <h5>Your Saved Properties</h5>
          {savedProperties.length > 0 ? (
            <div className="row">
              {savedProperties.map((property) => (
                <div className="col-md-4 mb-4" key={property.id}>
                  <div className="card h-100">
                    <img
                      src={property.image}
                      className="card-img-top"
                      alt={property.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text">
                        <strong>Location:</strong> {property.location}<br />
                        <strong>Price:</strong> ${property.price.toLocaleString()}
                      </p>
                      <a href="#" className="btn btn-primary">View Details</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">You have no saved properties yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
