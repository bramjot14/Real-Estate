import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'This real estate agency helped me find my dream home. Their service was excellent!',
      date: 'July 20, 2023',
    },
    {
      name: 'Jane Smith',
      feedback: 'I had a great experience selling my house with this agency. Highly recommended!',
      date: 'August 15, 2023',
    },
    {
      name: 'Bob Johnson',
      feedback: 'Very professional team! I got a great deal on my new home.',
      date: 'September 5, 2023',
    },
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [testimonials.length]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>What Our Clients Say</h2>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} pause="hover" controls={false} indicators={false}>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <div className="testimonial-item text-center mx-auto" style={{ maxWidth: '700px', padding: '20px' }}>
              <div className="card p-4 testimonial-card shadow">
                <div className="card-body">
                  <h5 className="card-title text-primary" style={{ fontWeight: 'bold' }}>{testimonial.name}</h5>
                  <p className="card-text text-secondary" style={{ fontStyle: 'italic' }}>{testimonial.feedback}</p>
                  <p className="card-text">
                    <small className="text-muted">{testimonial.date}</small>
                  </p>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
