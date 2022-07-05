import { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';

// PAGES
import Home from './pages/Home';
// import News from './pages/News';
import About from './pages/About';
import Footer from './pages/Footer';
import Navigation from './pages/Navigation';
import Destinations from './pages/DestinationsPage';
import TransportationPage from './pages/TransportationPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
// import Gallery from './pages/Gallery';
import SitePage from './pages/SitePage';
import HotelPage from './pages/HotelPage';
import ListingsPage from './pages/ListingsPage';
import TripDetails from './pages/TripDetails';
import BookingsPage from './pages/BookingsPage';
import Profile from './pages/Profile';
import AuthContext from './context/AuthContext';
import ProtectedRoute from  './context/ProtectedRoute';
import Gallery from './pages/Gallery';
import Contact from './pages/ContactUsPage';
import TestimonialsPage from './pages/TestimonialsPage';

// The App which contains the login and data for the app
const App2 = () => {
  const[token,setToken]=useState();
  if(!token) {
  //return <Login setToken={setToken} />
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout:logout}}>
      <Navigation />
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='listings/:id' element={<ListingsPage/>}/>
            <Route path='listingDetail/:id' element={<TripDetails/>}/>
            <Route path='about' element={<About />} />
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='gallery' element={<Gallery/>} />
          
            {/* <Route path='gallery' element={<Gallery />} /> */}
            <Route path='login' element={<Login/> } />
            <Route path='destinations' element={<Destinations />} />
            <Route path='transportation' element={<TransportationPage />} />
            <Route path='site' element={<SitePage />} />
            <Route path='hotel' element={<HotelPage />} />
            <Route path='admin' element={<Admin />} />
            <Route path='profile' element={<Profile />} />
            <Route path='contact' element={<Contact />} />

          
            <Route path='testimonials' element={<TestimonialsPage />} />
            
            {/* <Route path='grocery' element={<GroceryApp />} /> */}
      </Routes>
      <Footer />
      </AuthContext.Provider>
    </div>
  );
}
export default App2;
