import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);

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
  }, []); // Empty dependency array ensures this runs once when component is mounted

  return (
    <div className="container mt-5">
      <h2>Property Listings</h2>
      <div className="row">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col-md-6 mb-4" key={property.id}>
              <div className="card d-flex flex-row">
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">Location: {property.location}</p>
                  <p className="card-text">Price: ${property.price}</p>
                </div>
                {/* Display the image on the right */}
                {property.image_url && (
                  <img
                    src={`https://real-estate-pyvy.onrender.com${property.image_url}`}  // Ensure correct path
                    alt={property.title}
                    style={{ width: '150px', height: 'auto' }}
                    className="ms-3"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps components

// const PropertyListings = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/properties');
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Google Maps container style
//   const containerStyle = {
//     width: '100%',
//     height: '300px'
//   };

//   // Default map center (can be set to a specific city or region)
//   const defaultCenter = {
//     lat: 43.65, // Example latitude
//     lng: -79.38 // Example longitude
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Property Listings</h2>
//       <div className="row">
//         {properties.length > 0 ? (
//           properties.map((property) => (
//             <div className="col-md-6 mb-4" key={property.id}>
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">{property.title}</h5>
//                   <p className="card-text">Location: {property.location}</p>
//                   <p className="card-text">Price: ${property.price.toLocaleString()}</p>

//                   {/* Google Maps Section */}
//                   {property.latitude && property.longitude ? (
//                     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                       <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={{ lat: property.latitude, lng: property.longitude }} // Use property coordinates
//                         zoom={13}
//                       >
//                         <Marker
//                           position={{ lat: property.latitude, lng: property.longitude }} // Set marker position
//                         />
//                       </GoogleMap>
//                     </LoadScript>
//                   ) : (
//                     <p>Location data not available for this property.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No properties available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyListings;

















// import React, { useState, useEffect } from 'react';
// import PropertyReview from './PropertyReview';
// import PropertyMap from './PropertyMap';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const PropertyListings = ({ user, handleSaveProperty, savedProperties = [] }) => {  
//   // State for properties fetched from the backend
//   const [properties, setProperties] = useState([]);

//   // Fetch properties from the backend
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/properties');
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };
//     fetchProperties();
//   }, []); 

//   // State for filters
//   const [locationFilter, setLocationFilter] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [minBedrooms, setMinBedrooms] = useState('');
//   const [maxBedrooms, setMaxBedrooms] = useState('');
//   const [minBathrooms, setMinBathrooms] = useState('');
//   const [maxBathrooms, setMaxBathrooms] = useState('');
//   const [minSqft, setMinSqft] = useState('');
//   const [maxSqft, setMaxSqft] = useState('');

//   // State for the selected property
//   const [selectedProperty, setSelectedProperty] = useState(null); 

//   // State for comparison
//   const [compareList, setCompareList] = useState([]);

//   // Check if a property is saved
//   const isPropertySaved = (propertyId) => {
//     return savedProperties.some(saved => saved.id === propertyId);
//   };

//   // Smart Filtering Logic
//   const filteredProperties = properties.filter((property) => {
//     const matchesLocation =
//       locationFilter === '' || property.location.toLowerCase().includes(locationFilter.toLowerCase());

//     const matchesPrice =
//       (minPrice === '' || property.price >= parseInt(minPrice)) &&
//       (maxPrice === '' || property.price <= parseInt(maxPrice));

//     const matchesType = typeFilter === '' || property.type === typeFilter;

//     const matchesBedrooms =
//       (minBedrooms === '' || property.bedrooms >= parseInt(minBedrooms)) &&
//       (maxBedrooms === '' || property.bedrooms <= parseInt(maxBedrooms));

//     const matchesBathrooms =
//       (minBathrooms === '' || property.bathrooms >= parseInt(minBathrooms)) &&
//       (maxBathrooms === '' || property.bathrooms <= parseInt(maxBathrooms));

//     const matchesSqft =
//       (minSqft === '' || property.sqft >= parseInt(minSqft)) &&
//       (maxSqft === '' || property.sqft <= parseInt(maxSqft));

//     return matchesLocation && matchesPrice && matchesType && matchesBedrooms && matchesBathrooms && matchesSqft;
//   });

//   // Handle clicking on a property card
//   const handlePropertyClick = (property) => {
//     setSelectedProperty(property); 
//   };

//   // Handle adding/removing properties for comparison
//   const handleCompareToggle = (property) => {
//     if (compareList.includes(property)) {
//       setCompareList(compareList.filter(p => p.id !== property.id));
//     } else {
//       setCompareList([...compareList, property]);
//     }
//   };

//   // Save the comparison list to localStorage before navigating to the comparison page
//   const handleCompareClick = () => {
//     if (compareList.length > 0) {
//       localStorage.setItem('compareList', JSON.stringify(compareList));
//     }
//   };

//   // Auto-scroll to map view when a property is clicked
//   useEffect(() => {
//     if (selectedProperty) {
//       const mapSection = document.getElementById('map-section');
//       mapSection?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [selectedProperty]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-5">Property Listings</h2>

//       {/* Filter Section */}
//       <div className="row mb-4">
//         {/* Location Filter */}
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Filter by location"
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//           />
//         </div>

//         {/* Price Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row mb-4">
//         {/* Type Filter */}
//         <div className="col-md-4">
//           <select
//             className="form-control"
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//           >
//             <option value="">All Property Types</option>
//             <option value="House">House</option>
//             <option value="Condo">Condo</option>
//             <option value="Bungalow">Bungalow</option>
//           </select>
//         </div>

//         {/* Bedrooms Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Bedrooms"
//             value={minBedrooms}
//             onChange={(e) => setMinBedrooms(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Bedrooms"
//             value={maxBedrooms}
//             onChange={(e) => setMaxBedrooms(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row mb-4">
//         {/* Bathrooms Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Bathrooms"
//             value={minBathrooms}
//             onChange={(e) => setMinBathrooms(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Bathrooms"
//             value={maxBathrooms}
//             onChange={(e) => setMaxBathrooms(e.target.value)}
//           />
//         </div>

//         {/* Square Footage Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Sqft"
//             value={minSqft}
//             onChange={(e) => setMinSqft(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4 mt-2">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Sqft"
//             value={maxSqft}
//             onChange={(e) => setMaxSqft(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="mb-5" id="map-section">
//         <h3 className="text-center mb-3">Map View</h3>
//         <PropertyMap properties={filteredProperties} selectedProperty={selectedProperty} /> 
//       </div>

//       {/* Property Listing */}
//       <div className="row">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div className="col-md-4 mb-4" key={property.id}>
//               <div className={`card h-100 ${selectedProperty?.id === property.id ? 'border-primary' : ''}`} onClick={() => handlePropertyClick(property)}>
//                 <img src={property.image_url ? `http://localhost:5002${property.image_url}` : property.image} className="card-img-top" alt={property.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{property.title}</h5>
//                   <p className="card-text">
//                     <strong>Location:</strong> {property.location}
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ${property.price.toLocaleString()}
//                   </p>
//                   <p className="card-text">
//                     <strong>Type:</strong> {property.type}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bedrooms:</strong> {property.bedrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bathrooms:</strong> {property.bathrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Square Footage:</strong> {property.sqft} sqft
//                   </p>
//                   <a href="#" className="btn btn-primary">
//                     View Details
//                   </a>

//                   {/* Save Property Button */}
//                   {user && (
//                     <button
//                       className="btn btn-secondary mt-2"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleSaveProperty(property);
//                       }}
//                       disabled={isPropertySaved(property.id)} 
//                     >
//                       {isPropertySaved(property.id) ? 'Saved' : 'Save Property'}
//                     </button>
//                   )}

//                   {/* Compare Property Checkbox */}
//                   {user && (
//                     <div className="form-check mt-3">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={compareList.includes(property)}
//                         onChange={() => handleCompareToggle(property)}
//                       />
//                       <label className="form-check-label">
//                         Compare
//                       </label>
//                     </div>
//                   )}

//                   {/* Review option if user is not admin */}
//                   {user && user.role !== 'admin' && (
//                     <PropertyReview propertyId={property.id} />
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <p className="text-center">No properties match your criteria.</p>
//           </div>
//         )}
//       </div>

//       {/* Compare Button */}
//       {compareList.length > 0 && (
//         <div className="text-center mt-5">
//           <Link 
//             to={{
//               pathname: '/compare',
//             }} 
//             onClick={handleCompareClick}
//             className="btn btn-primary"
//           >
//             Compare Selected Properties ({compareList.length})
//           </Link>
//         </div>
//       )}

//       {/* Saved Properties */}
//       {user && savedProperties.length > 0 && (
//         <div className="row mt-5">
//           <h3 className="text-center mb-3">Saved Properties</h3>
//           {savedProperties.map((property) => (
//             <div className="col-md-4 mb-4" key={property.id}>
//               <div className="card h-100">
//                 <img src={property.image_url ? `http://localhost:5002${property.image_url}` : property.image} className="card-img-top" alt={property.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{property.title}</h5>
//                   <p className="card-text">
//                     <strong>Location:</strong> {property.location}
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ${property.price.toLocaleString()}
//                   </p>
//                   <p className="card-text">
//                     <strong>Type:</strong> {property.type}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bedrooms:</strong> {property.bedrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bathrooms:</strong> {property.bathrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Square Footage:</strong> {property.sqft} sqft
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyListings;

























// import React, { useState, useEffect } from 'react';
// import PropertyReview from './PropertyReview';
// import PropertyMap from './PropertyMap';  // Import the PropertyMap component
// import { Link } from 'react-router-dom';  // Import Link for navigation

// const PropertyListings = ({ user, handleSaveProperty, savedProperties = [] }) => {  // Receive props from App.js

//   // Sample property data with additional attributes
//   const properties = [
//     {
//       id: 1,
//       title: 'Modern Family Home',
//       location: 'Brampton, Ontario',
//       price: 700000,
//       type: 'House',
//       bedrooms: 4,
//       bathrooms: 3,
//       sqft: 2500,
//       lat: 43.7, lng: -79.42,  // Coordinates for the map
//       image: 'https://via.placeholder.com/300x200',
//     },
//     {
//       id: 2,
//       title: 'Luxury Condo in Downtown',
//       location: 'Toronto, Ontario',
//       price: 950000,
//       type: 'Condo',
//       bedrooms: 2,
//       bathrooms: 2,
//       sqft: 1200,
//       lat: 43.65, lng: -79.38,
//       image: 'https://via.placeholder.com/300x200',
//     },
//     {
//       id: 3,
//       title: 'Cozy Bungalow',
//       location: 'Mississauga, Ontario',
//       price: 600000,
//       type: 'Bungalow',
//       bedrooms: 3,
//       bathrooms: 2,
//       sqft: 1800,
//       lat: 43.6, lng: -79.5,
//       image: 'https://via.placeholder.com/300x200',
//     },
//   ];

//   // State for filters
//   const [locationFilter, setLocationFilter] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [minBedrooms, setMinBedrooms] = useState('');
//   const [maxBedrooms, setMaxBedrooms] = useState('');
//   const [minBathrooms, setMinBathrooms] = useState('');
//   const [maxBathrooms, setMaxBathrooms] = useState('');
//   const [minSqft, setMinSqft] = useState('');
//   const [maxSqft, setMaxSqft] = useState('');

//   // State for the selected property
//   const [selectedProperty, setSelectedProperty] = useState(null); // Track the selected property

//   // State for comparison
//   const [compareList, setCompareList] = useState([]);

//   // ** Define isPropertySaved function **
//   const isPropertySaved = (propertyId) => {
//     return savedProperties.some(saved => saved.id === propertyId);
//   };

//   // Smart Filtering Logic
//   const filteredProperties = properties.filter((property) => {
//     const matchesLocation =
//       locationFilter === '' || property.location.toLowerCase().includes(locationFilter.toLowerCase());

//     const matchesPrice =
//       (minPrice === '' || property.price >= parseInt(minPrice)) &&
//       (maxPrice === '' || property.price <= parseInt(maxPrice));

//     const matchesType = typeFilter === '' || property.type === typeFilter;

//     const matchesBedrooms =
//       (minBedrooms === '' || property.bedrooms >= parseInt(minBedrooms)) &&
//       (maxBedrooms === '' || property.bedrooms <= parseInt(maxBedrooms));

//     const matchesBathrooms =
//       (minBathrooms === '' || property.bathrooms >= parseInt(minBathrooms)) &&
//       (maxBathrooms === '' || property.bathrooms <= parseInt(maxBathrooms));

//     const matchesSqft =
//       (minSqft === '' || property.sqft >= parseInt(minSqft)) &&
//       (maxSqft === '' || property.sqft <= parseInt(maxSqft));

//     return matchesLocation && matchesPrice && matchesType && matchesBedrooms && matchesBathrooms && matchesSqft;
//   });

//   // Function to handle clicking on a property card
//   const handlePropertyClick = (property) => {
//     setSelectedProperty(property);  // Set the selected property
//   };

//   // Function to handle adding/removing properties to compare
//   const handleCompareToggle = (property) => {
//     if (compareList.includes(property)) {
//       setCompareList(compareList.filter(p => p.id !== property.id));
//     } else {
//       setCompareList([...compareList, property]);
//     }
//   };

//   // Save the comparison list to localStorage before navigating to the comparison page
//   const handleCompareClick = () => {
//     if (compareList.length > 0) {
//       localStorage.setItem('compareList', JSON.stringify(compareList));
//     }
//   };

//   // Auto-scroll to map view when a property is clicked
//   useEffect(() => {
//     if (selectedProperty) {
//       const mapSection = document.getElementById('map-section');
//       mapSection?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [selectedProperty]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-5">Property Listings</h2>

//       {/* Filter Section */}
//       <div className="row mb-4">
//         {/* Location Filter */}
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Filter by location"
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//           />
//         </div>

//         {/* Price Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row mb-4">
//         {/* Type Filter */}
//         <div className="col-md-4">
//           <select
//             className="form-control"
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//           >
//             <option value="">All Property Types</option>
//             <option value="House">House</option>
//             <option value="Condo">Condo</option>
//             <option value="Bungalow">Bungalow</option>
//           </select>
//         </div>

//         {/* Bedrooms Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Bedrooms"
//             value={minBedrooms}
//             onChange={(e) => setMinBedrooms(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Bedrooms"
//             value={maxBedrooms}
//             onChange={(e) => setMaxBedrooms(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row mb-4">
//         {/* Bathrooms Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Bathrooms"
//             value={minBathrooms}
//             onChange={(e) => setMinBathrooms(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Bathrooms"
//             value={maxBathrooms}
//             onChange={(e) => setMaxBathrooms(e.target.value)}
//           />
//         </div>

//         {/* Square Footage Filters */}
//         <div className="col-md-4">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Sqft"
//             value={minSqft}
//             onChange={(e) => setMinSqft(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4 mt-2">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Sqft"
//             value={maxSqft}
//             onChange={(e) => setMaxSqft(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="mb-5" id="map-section">
//         <h3 className="text-center mb-3">Map View</h3>
//         <PropertyMap properties={filteredProperties} selectedProperty={selectedProperty} />  {/* Pass selected property */}
//       </div>

//       {/* Property Listing */}
//       <div className="row">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div className="col-md-4 mb-4" key={property.id}>
//               <div className={`card h-100 ${selectedProperty?.id === property.id ? 'border-primary' : ''}`} onClick={() => handlePropertyClick(property)}>
//                 <img src={property.image} className="card-img-top" alt={property.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{property.title}</h5>
//                   <p className="card-text">
//                     <strong>Location:</strong> {property.location}
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ${property.price.toLocaleString()}
//                   </p>
//                   <p className="card-text">
//                     <strong>Type:</strong> {property.type}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bedrooms:</strong> {property.bedrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bathrooms:</strong> {property.bathrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Square Footage:</strong> {property.sqft} sqft
//                   </p>
//                   <a href="#" className="btn btn-primary">
//                     View Details
//                   </a>

//                   {/* Save Property Button */}
//                   {user && (
//                     <button
//                       className="btn btn-secondary mt-2"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent card click event
//                         handleSaveProperty(property);
//                       }}
//                       disabled={isPropertySaved(property.id)}  // Disable if already saved
//                     >
//                       {isPropertySaved(property.id) ? 'Saved' : 'Save Property'}
//                     </button>
//                   )}

//                   {/* Compare Property Checkbox */}
//                   {user && (
//                     <div className="form-check mt-3">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={compareList.includes(property)}
//                         onChange={() => handleCompareToggle(property)}
//                       />
//                       <label className="form-check-label">
//                         Compare
//                       </label>
//                     </div>
//                   )}

//                   {/* Show review submission option only if the user is not an admin */}
//                   {user && user.role !== 'admin' && (
//                     <PropertyReview propertyId={property.id} />
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <p className="text-center">No properties match your criteria.</p>
//           </div>
//         )}
//       </div>

//       {/* Compare Button */}
//       {compareList.length > 0 && (
//         <div className="text-center mt-5">
//           <Link 
//             to={{
//               pathname: '/compare',
//             }} 
//             onClick={handleCompareClick}  // Call handleCompareClick to save compareList in localStorage
//             className="btn btn-primary"
//           >
//             Compare Selected Properties ({compareList.length})
//           </Link>
//         </div>
//       )}

//       {/* Display saved properties */}
//       {user && savedProperties.length > 0 && (
//         <div className="row mt-5">
//           <h3 className="text-center mb-3">Saved Properties</h3>
//           {savedProperties.map((property) => (
//             <div className="col-md-4 mb-4" key={property.id}>
//               <div className="card h-100">
//                 <img src={property.image} className="card-img-top" alt={property.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{property.title}</h5>
//                   <p className="card-text">
//                     <strong>Location:</strong> {property.location}
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ${property.price.toLocaleString()}
//                   </p>
//                   <p className="card-text">
//                     <strong>Type:</strong> {property.type}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bedrooms:</strong> {property.bedrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Bathrooms:</strong> {property.bathrooms}
//                   </p>
//                   <p className="card-text">
//                     <strong>Square Footage:</strong> {property.sqft} sqft
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyListings;
