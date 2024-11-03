import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './SellingPage.css';

const SellingPage = () => {
  return (
    <div className="selling-page">
      <Container className="selling-content">
        <h1>WHAT’S YOUR HOME WORTH?</h1>
        <p>
          I provide a complimentary detailed home evaluation which will help you determine the value of your
          home, the right time to sell, as well as the appreciation trends in your neighborhood. Even if you’re
          not considering selling your home today, an annual home evaluation is important in understanding your
          most valuable financial asset.
        </p>
        <p>
          For more information, complete the form below and I will prepare you a detailed home evaluation report!
        </p>

        <Form className="evaluation-form">
          <h3>DETAILS OF MY HOME:</h3>

          <Form.Group controlId="formAddress">
            <Form.Label>Address*</Form.Label>
            <Form.Control type="text" placeholder="Enter your address" />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City*</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" />
          </Form.Group>

          <Form.Group controlId="formProvince">
            <Form.Label>Province*</Form.Label>
            <Form.Select>
              <option>--Please choose an option--</option>
              <option>Ontario</option>
              <option>British Columbia</option>
              <option>Alberta</option>
              <option>Quebec</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formPostalCode">
            <Form.Label>Postal Code*</Form.Label>
            <Form.Control type="text" placeholder="Enter postal code" />
          </Form.Group>

          <Form.Group controlId="formBedrooms">
            <Form.Label>Number Of Bedrooms*</Form.Label>
            <Form.Control type="number" placeholder="Enter number of bedrooms" />
          </Form.Group>

          <Form.Group controlId="formBathrooms">
            <Form.Label>Number Of Bathrooms*</Form.Label>
            <Form.Control type="number" placeholder="Enter number of bathrooms" />
          </Form.Group>

          <Form.Group controlId="formSellingTimeline">
            <Form.Label>I'm Planning On Selling*</Form.Label>
            <Form.Select>
              <option>--Please choose an option--</option>
              <option>Within 3 months</option>
              <option>Within 6 months</option>
              <option>Within a year</option>
              <option>Not sure</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formAdditionalInfo">
            <Form.Label>Additional Information</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Provide any additional details" />
          </Form.Group>

          <h3>MY CONTACT INFORMATION:</h3>

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
            <Form.Control type="text" placeholder="Enter your phone number" />
          </Form.Group>

          <Form.Group controlId="formContactMethod">
            <Form.Label>Preferred Method of Contact</Form.Label>
            <div className="contact-method-options">
              <Form.Check type="radio" label="Email" name="contactMethod" />
              <Form.Check type="radio" label="Phone" name="contactMethod" />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            SEND
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SellingPage;
