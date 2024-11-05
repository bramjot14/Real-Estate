// src/components/PropertyManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://real-estate-pyvy.onrender.com/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://real-estate-pyvy.onrender.com/api/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Property submitted successfully');
      setErrorMessage('');
      setTitle('');
      setLocation('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting property:', error);
      setErrorMessage('Error submitting property. Please check if the backend is correctly configured.');
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`https://real-estate-pyvy.onrender.com/api/properties/${propertyId}`);
      setSuccessMessage('Property deleted successfully!');
      setProperties(properties.filter((property) => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div>
      <h3>Property Management</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Property Title</label>
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
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Property Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Property</button>
      </form>

      {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
      {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}

      <h3 className="mt-5">Submitted Properties</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>
                {property.image_url ? (
                  <img
                    src={`https://real-estate-pyvy.onrender.com${property.image_url}`}
                    alt={property.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{property.location}</td>
              <td>{property.price}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(property.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyManagement;
