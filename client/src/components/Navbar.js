import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple, faTwitter, faEnvelope } from '@fortawesome/free-brands-svg-icons';

const NavigationBar = ({ user, setUser }) => {
      const [showModal, setShowModal] = useState(false);

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
  return (
    <Navbar bg="dark" expand="lg" collapseOnSelect className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          Singh's Realty
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Centered main links */}
          <Nav className="mx-auto custom-nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/mortgage-calculator">Mortgage Calculator</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/schedule">Schedule Appointment</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us/Our Team</Nav.Link>
            <Nav.Link as={Link} to="/property-listings">Property Listings</Nav.Link>
            <Nav.Link as={Link} to="/admin/dashboard" className="nav-link-custom">Admin Dashboard</Nav.Link>
          </Nav>

          {/* Right-aligned user-related links */}
          <Nav className="ml-auto custom-nav-auth">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">Profile</Nav.Link>
                {user.role === 'admin' && 
                  (
                  <>
                    {/* <Nav.Link as={Link} to="/admin/reviews" className="nav-link-custom">Manage Reviews</Nav.Link> */}
                    <Nav.Link as={Link} to="/admin/dashboard" className="nav-link-custom">Admin Dashboard</Nav.Link>
                  </>
                )}
                <Nav.Link href="https://real-estate-pyvy.onrender.com/logout" className="nav-link-custom">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Button className="nav-link-custom" onClick={handleLoginClick}>Login</Button> 
                // <Nav.Link href="https://real-estate-pyvy.onrender.com/auth/google" className="nav-link-custom">Login with Google</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
{/* Modal for Sign-In Options */}
            <Modal
    show={showModal}
    onHide={handleClose}
    className="custom-modal"
    backdrop="static" /* Use the static backdrop to ensure proper blur effect */
>
    <button className="custom-close-button" onClick={handleClose}>&times;</button>
    <Modal.Header className="custom-modal-header">
        <Modal.Title>Welcome back.</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* Sign-In Buttons with Icons */}
        <a href="https://real-estate-pyvy.onrender.com/auth/google" className="custom-auth-button">
            <FontAwesomeIcon icon={faGoogle} className="auth-icon" />
            Sign in with Google
        </a>
        <a href="https://real-estate-pyvy.onrender.com/auth/facebook" className="custom-auth-button">
            <FontAwesomeIcon icon={faFacebook} className="auth-icon" />
            Sign in with Facebook
        </a>
        <a href="https://real-estate-pyvy.onrender.com/auth/twitter" className="custom-auth-button">
            <FontAwesomeIcon icon={faTwitter} className="auth-icon" />
            Sign in with Twitter
        </a>
        {/* <a href="mailto:example@example.com" className="custom-auth-button">
            <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
            Sign in with Email
        </a> */}
    </Modal.Body>
</Modal>
    </Navbar>
  );
};

export default NavigationBar;





// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import "./Navbar.css";

// const NavigationBar = ({ user, setUser }) => {

//   return (
//     <Navbar bg="dark" expand="lg" collapseOnSelect className="custom-navbar">
//       <Container>
//         <Navbar.Brand href="/" className="navbar-brand-custom">
//           Singh's Realty
//         </Navbar.Brand>

//         {/* Toggle button for mobile view */}
//         <Navbar.Toggle aria-controls="navbar-nav" />

//         <Navbar.Collapse id="navbar-nav">
//           {/* Centered main links */}
//           <Nav className="mx-auto custom-nav-links">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/mortgage-calculator">Mortgage Calculator</Nav.Link>
//             <Nav.Link href="/blogs">Blogs</Nav.Link>
//             <Nav.Link href="/schedule">Schedule Appointment</Nav.Link>
//             <Nav.Link href="/about">About Us/Our Team</Nav.Link>
//             <Nav.Link href="/property-listings">Property Listings</Nav.Link>
//           </Nav>

//           {/* Right-aligned user-related links */}
//           <Nav className="ml-auto custom-nav-auth">
//             {user ? (
//               <>
//                 <Nav.Link href="/profile" className="nav-link-custom">Profile</Nav.Link>

//                 {user.role === 'admin' && (
//                   <>
//                     {/* <Nav.Link href="/admin/reviews" className="nav-link-custom">Manage Reviews</Nav.Link> */}
//                     <Nav.Link href="/admin/dashboard" className="nav-link-custom">Admin Dashboard</Nav.Link>
//                   </>
//                 )}

//                 <Nav.Link href="https://real-estate-pyvy.onrender.com/logout" className='nav-link-custom'>Logout</Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link href="https://real-estate-pyvy.onrender.com/auth/google" className="nav-link-custom">Login with Google</Nav.Link>
//                 <Nav.Link href="/signup" className="nav-link-custom">Sign Up</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar; 
