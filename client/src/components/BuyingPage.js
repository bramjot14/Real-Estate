import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './BuyingPage.css';

const BuyingPage = () => {
  return (
<div className="buying-hero">
    <div className="buying-hero-overlay"></div>
    <div className="buying-hero-content">
        <h1 className="buying-hero-title">BUYING</h1>
        <p className="buying-hero-subtitle">Find Your Next Home</p>
    </div>
      <Container className="buying-content">
        <h2>Looking to Buy a Home?</h2>
        <p>
          Buying a home can be very challenging, with bidding wars & bully offers. I spend time
          inspecting lots of homes to find the perfect fit. I use the best mortgage brokers and
          home inspectors to make sure it’s affordable and passes a stringent assessment of all
          the major components of the home.
        </p>

        {/* Contact Form */}
        <Form className="buying-form">
          <p className="form-info">
            For more information, complete the form below, and I will help you find your next home!
          </p>

          <h3>What I'm Looking For:</h3>
          <Form.Group controlId="formPriceRange">
            <Form.Label>Price Range*</Form.Label>
            <Form.Control type="text" placeholder="Enter price range" />
          </Form.Group>

          <Form.Group controlId="formBedrooms">
            <Form.Label>Number of Bedrooms*</Form.Label>
            <Form.Control type="number" placeholder="Enter number of bedrooms" />
          </Form.Group>

          <Form.Group controlId="formNeighbourhood">
            <Form.Label>Preferred Neighbourhood*</Form.Label>
            <Form.Control type="text" placeholder="Enter preferred neighbourhood" />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description of the Home I'm Looking For</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Describe the ideal home" />
          </Form.Group>

          <h3>My Contact Information:</h3>
          <Form.Group controlId="formName">
            <Form.Label>Name*</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone*</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address*</Form.Label>
            <Form.Control type="text" placeholder="Enter your address" />
          </Form.Group>

          <Form.Group controlId="formContactMethod">
            <Form.Label>Preferred Method of Contact</Form.Label>
            <div className="contact-method-options">
              <Form.Check type="radio" label="Email" name="contactMethod" />
              <Form.Check type="radio" label="Phone" name="contactMethod" />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="form-submit-button">
            Send
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default BuyingPage;
