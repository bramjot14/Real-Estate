import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';  // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';  // Import compatibility fix

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],  // Size of the icon
  iconAnchor: [12, 41],  // Anchor point of the icon
  popupAnchor: [1, -34],  // Point from where the popup should open relative to the iconAnchor
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],  // Size of the shadow
});

const PropertyMap = ({ properties, selectedProperty }) => {

  // Function to center the map on the selected property
  const CenterMap = ({ selectedProperty }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedProperty) {
        map.flyTo([selectedProperty.lat, selectedProperty.lng], 14);  // Fly to the selected property with zoom level 14
      }
    }, [selectedProperty, map]);

    return null;
  };

  return (
    <div className="map-container" style={{ height: '500px', width: '100%' }}>
      <MapContainer center={[43.7, -79.42]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add markers for all properties */}
        {properties.map((property, index) => (
          <Marker 
            key={index} 
            position={[property.lat, property.lng]} 
            icon={customIcon}  // Use the custom icon
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: '100%', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                />
                <strong>{property.title}</strong><br />
                <strong>Price:</strong> ${property.price.toLocaleString()}<br />
                <strong>Type:</strong> {property.type}<br />
                <a href="#">More Details</a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Center the map on the selected property */}
        {selectedProperty && <CenterMap selectedProperty={selectedProperty} />}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
