import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaUserCircle } from 'react-icons/fa';
import './HomePage.css';

const testimonialsData = [
  { name: "Hamed Qanavizi", feedback: "He is the best of the best real estate agent that I have ever met!", role: "Past Client" },
  { name: "Inderraj Saini", feedback: "Dilpreet is an awesome person to work with and truly puts her clients first.", role: "Past Client" },
  { name: "Antonina Mendola", feedback: "Dilpreet helped us to find and purchase our home. We are very impressed with her hard work.", role: "Past Client" },
  { name: "John Doe", feedback: "Exceptional service and guidance throughout the home buying process.", role: "Past Client" },
  { name: "Jane Smith", feedback: "Dilpreet made our home selling experience seamless and stress-free.", role: "Past Client" },
  { name: "Albert Johnson", feedback: "Highly knowledgeable and committed to her clients' success.", role: "Past Client" },
  { name: "Emily White", feedback: "Gave us valuable advice and helped us find our dream home.", role: "Past Client" },
  { name: "Michael Green", feedback: "Dedicated and professional, couldn't have asked for a better agent.", role: "Past Client" },
  { name: "Sarah Brown", feedback: "Helped us through every step of selling our home.", role: "Past Client" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Refs for the Buying and Selling sections
  const buyingSectionRef = useRef(null);
  const sellingSectionRef = useRef(null);

  // Adjust handleStartBuying and handleStartSelling to navigate to the routes
  const handleStartBuying = () => {
    navigate('/buying');
  };

  const handleStartSelling = () => {
    navigate('/selling');
  };

  // Carousel control function
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % testimonialsData.length);
      setFade(false);
    }, 300);
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <div className="profile-photo">
            <img src="nothing.jpg" alt="Your Name" className="rounded-circle img-fluid" />
          </div>
          <h1 className="hero-name">Dilpreet Singh</h1>
          <p className="hero-title">Realtor <br /> eXp REALTY</p>
          <div className="hero-buttons">
            <Button variant="primary" className="hero-button" onClick={() => buyingSectionRef.current.scrollIntoView({ behavior: 'smooth' })}>Buying</Button>
            <Button variant="secondary" className="hero-button" onClick={() => sellingSectionRef.current.scrollIntoView({ behavior: 'smooth' })}>Selling</Button>
          </div>
        </Container>
      </div>

      {/* Buying a Home Section */}
      <div ref={buyingSectionRef} className="buying-section section-wrapper">
        <h2 className="section-title">BUYING A HOME</h2>
        <Container className="section-content">
          <div className="section-text">
            <h3>LOOKING TO BUY A HOME?</h3>
            <p>FIND YOUR NEXT HOME</p>
            <p>
              Buying a home can be very challenging, with bidding wars & bully offers. I spend time
              inspecting lots of homes to find the perfect fit. I use the best mortgage brokers and
              home inspectors to make sure it’s affordable and passes a stringent assessment of all
              the major components of the home.
            </p>
            <Button variant="primary" className="section-button" onClick={handleStartBuying}>Start</Button>
          </div>
          <div className="section-image">
            <img src="/public/interior2.jpg" alt="Buying a Home" />
          </div>
        </Container>
      </div>

      {/* Selling a Home Section */}
      <div ref={sellingSectionRef} className="selling-section section-wrapper">
        <h2 className="section-title">SELLING YOUR HOME</h2>
        <Container className="section-content">
          <div className="section-text">
            <h3>WHAT'S YOUR HOME WORTH?</h3>
            <p>FREE HOME EVALUATION</p>
            <p>
              I provide a complimentary detailed home evaluation which will help you determine the value of your
              home, the right time to sell, as well as the appreciation trends in your neighborhood. Even if you’re
              not considering selling your home today, an annual home evaluation is important in understanding your
              most valuable financial asset.
            </p>
            <Button variant="primary" onClick={handleStartSelling} className="section-button">Start</Button>
          </div>
          <div className="section-image">
            <img src="/public/interior2.jpg" alt="Selling a Home" />
          </div>
        </Container>
      </div>

      {/* Testimonials Section */}
      <Container className="testimonials-section">
        <h2 className="testimonials-title">TESTIMONIALS</h2>
        <div className={`testimonials-carousel ${fade ? 'fade-out' : 'fade-in'}`}>
          {testimonialsData.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
            <Card key={index} className="testimonial-card">
              <Card.Body>
                <Card.Text className="testimonial-feedback">{testimonial.feedback}</Card.Text>
                <Card.Title className="testimonial-name">{testimonial.name}</Card.Title>
                <Card.Subtitle className="testimonial-role">{testimonial.role}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="carousel-controls">
          <button className="carousel-control" onClick={handleNext}>&#9654;</button>
        </div>
      </Container>

      {/* Contact Us Form on the Right Side */}
      {/* <div className="contact-form-panel">
        <h5>Contact Us</h5>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group controlId="formMessage" className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4 w-100">
            Submit
          </Button>
        </Form>
      </div> */}
      {/* Contact Section */}
      <div className="contact-section">
        <Container className="contact-content">
          <FaUserCircle className="contact-user-icon" /> {/* User icon */}
          <h2 className="contact-phone">(226) 506-5862</h2>
          <h3 className="contact-name">Dilpreet Singh</h3>
          <p className="contact-details">
            REALTOR<br />
            eXp REALTY<br />
          </p>
          <div className="social-icons">
            <FaFacebook />
            <FaLinkedin />
            <FaInstagram />
            <FaYoutube />
          </div>
          <Button className="contact-button">CONTACT</Button>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
