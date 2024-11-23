import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const NavigationBar = ({ user, setUser }) => {
    const [showModal, setShowModal] = useState(false);
    const [expanded, setExpanded] = useState(false); // State for Navbar expansion

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleNavClick = () => {
        setExpanded(false); // Collapse the navbar
    };

    return (
        <Navbar
            bg="dark"
            expand="lg"
            collapseOnSelect
            className="custom-navbar"
            expanded={expanded} // Controlled by state
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    Singh's Realty
                </Navbar.Brand>

                {/* Toggle button for mobile view */}
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    onClick={() => setExpanded(expanded ? false : true)} // Toggle navbar expansion
                />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto custom-nav-links">
                        <Nav.Link as={Link} to="/" onClick={handleNavClick}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/mortgage-calculator" onClick={handleNavClick}>Mortgage Calculator</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" onClick={handleNavClick}>Blogs</Nav.Link>
                        <Nav.Link as={Link} to="/schedule" onClick={handleNavClick}>Schedule Appointment</Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={handleNavClick}>About Us/Our Team</Nav.Link>
                        <Nav.Link as={Link} to="/property-listings" onClick={handleNavClick}>Property Listings</Nav.Link>
                        {user && user.role === 'admin' && (
                            <Nav.Link as={Link} to="/admin/dashboard" onClick={handleNavClick}>
                                Admin Dashboard
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav className="ml-auto custom-nav-auth">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile" onClick={handleNavClick}>Profile</Nav.Link>
                                <Nav.Link href="https://real-estate-pyvy.onrender.com/logout">
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <Button className="nav-link-custom" onClick={handleLoginClick}>
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* Modal for Sign-In Options */}
            <Modal
                show={showModal}
                onHide={handleClose}
                className="custom-modal"
                backdrop="static"
            >
                <button className="custom-close-button" onClick={handleClose}>&times;</button>
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>Welcome back.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
