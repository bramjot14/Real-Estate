import React from 'react';

const Profile = ({ user }) => {
  if (!user) {
    return <p>You are not logged in. Please log in to view your profile.</p>;
  }

  // Check if the emails array exists and is not empty
  const email = user.emails && user.emails.length > 0 ? user.emails[0].value : 'Email not available';

  return (
    <div className="container mt-5">
      <h2>Profile Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
