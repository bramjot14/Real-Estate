import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './components/Navbar';
import Blogs from './components/Blogs';
import Home from './components/Home';
import LatestNews from './components/LatestNews';
import MarketInsights from './components/MarketInsights';
import Profile from './components/Profile';
import MortgageCalculator from './components/MortgageCalculator';
import ContactForm from './components/ContactForm'; 
import Calendly from './components/Calendly';  
import PropertyListings from './components/PropertyListings'; 
import ReviewManagement from './components/ReviewManagement'; 
import UserProfile from './components/UserProfile'; 
import Newsletter from './components/Newsletter';
import PropertyComparison from './components/PropertyComparison'; 
import AdminDashboard from './components/AdminDashboard';
import BlogDetails from './components/BlogDetails';
import BuyingPage from './components/BuyingPage';
import SellingPage from './components/SellingPage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Added
import './App.css';

function App() {
  const [user, setUser] = useState(null);  // State for user
  const [savedProperties, setSavedProperties] = useState([]);  // State for saved properties

  const API_URL = process.env.REACT_APP_API_URL || 'https://real-estate-pyvy.onrender.com';

  useEffect(() => {
    axios.get(`${API_URL}/api/current_user`, { withCredentials: true })
      .then(response => {
        console.log('User received in frontend:', response.data.user);
        setUser(response.data.user);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
  }, []);
  
  
  // Function to save properties
  const handleSaveProperty = (property) => {
    const isAlreadySaved = savedProperties.some(saved => saved.id === property.id);
    if (!isAlreadySaved) {
      setSavedProperties([...savedProperties, property]);
    } else {
      alert('Property is already saved.');
    }
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar user={user} />  {/* Pass user to NavigationBar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/market-insights" element={<MarketInsights />} />
          <Route path="/profile" element={<UserProfile user={user} savedProperties={savedProperties} />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/contact" element={<ContactForm />} /> 
          <Route path="/schedule" element={<Calendly />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/compare" element={<PropertyComparison />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/buying" element={<BuyingPage />} />
          <Route path="/selling" element={<SellingPage />} />

          {/* Admin Dashboard route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Pass user object to PropertyListings along with handleSaveProperty */}
          <Route
            path="/property-listings"
            element={
              <PropertyListings
                user={user}
                savedProperties={savedProperties || []}
                handleSaveProperty={handleSaveProperty}
              />
            }
          />

          {/* Admin-only route for managing reviews */}
          <Route
            path="/admin/reviews"
            element={user && user.role === 'admin' ? <ReviewManagement /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
