import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Navigation = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Travel Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/gallery">Gallery</Nav.Link>
          <Nav.Link href="/testimonials">Testimonials</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>  
          <Nav.Link href="/admin">Admin</Nav.Link>  
          
        </Nav>
        {auth.isLoggedIn ? (
          <>
           <NavDropdown title="User" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/favorite">Favorites</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
          </>
        )
        : (
          <>
          <NavDropdown title="User" id="collasible-nav-dropdown">
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Item href="#">Help</NavDropdown.Item>

          </NavDropdown>
          </>
        )} 
        {/* <Nav>
          <NavDropdown title="User" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/favorite">Favorites</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
      </Container>
    </Navbar>
  );
};
export default Navigation;