import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationAdmin = () => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/admin">
            <Nav.Item>
                <Nav.Link href="/destinations">Destinations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/site">Sites</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/hotel">Hotels</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/transportation">Transportations</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
export default NavigationAdmin;