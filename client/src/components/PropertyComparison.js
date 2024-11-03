import React, { useState, useEffect } from 'react';

const PropertyComparison = () => {
  const [propertiesToCompare, setPropertiesToCompare] = useState([]);

  useEffect(() => {
    // Retrieve compare list from localStorage
    const savedCompareList = localStorage.getItem('compareList');
    if (savedCompareList) {
      setPropertiesToCompare(JSON.parse(savedCompareList));
    }
  }, []);

  if (propertiesToCompare.length === 0) {
    return <h3>No properties selected for comparison.</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Compare Properties</h2>
      <div className="row">
        {propertiesToCompare.map((property) => (
          <div className="col-md-4 mb-4" key={property.id}>
            <div className="card h-100">
              <img src={property.image} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {property.location}<br />
                  <strong>Price:</strong> ${property.price.toLocaleString()}<br />
                  <strong>Bedrooms:</strong> {property.bedrooms}<br />
                  <strong>Bathrooms:</strong> {property.bathrooms}<br />
                  <strong>Square Footage:</strong> {property.sqft} sqft
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyComparison;
