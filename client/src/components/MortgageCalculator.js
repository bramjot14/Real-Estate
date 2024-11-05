import React from 'react';

const MortgageCalculator = () => {
  return (
    <div style={{ padding: '20px' }}>
      <iframe
        src="https://real-estate-pyvy.onrender.com/mortgage-calculator" // Adjust this URL to point to your backend's EJS route
        style={{
          width: '100%',
          height: '1000px', // Adjust the height as per your content
          border: 'none',
        }}
        title="Mortgage Calculator"
      />
    </div>
  );
};

export default MortgageCalculator;
