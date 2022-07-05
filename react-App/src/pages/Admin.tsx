import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';


function Admin() {
    return (
        <><Nav fill variant="tabs" defaultActiveKey="/admin" className='AdminNav'>
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
        <div className='container6'>
            <br></br><br></br>
        <h1> Welcome Home Admin !!!!</h1>
        <br></br><br></br>
        <h3>You can edit, add, and delete data from your database in this admin page...!!!!!</h3>
        </div></>

    );
}

export default Admin;

