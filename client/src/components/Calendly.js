import React, { useEffect } from 'react';

const Calendly = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Schedule an Appointment</h2>
      <div className="calendly-inline-widget" data-url="https://calendly.com/sincerelysingh" style={{ minWidth: '320px', height: '630px' }}></div>
    </div>
  );
};

export default Calendly;
