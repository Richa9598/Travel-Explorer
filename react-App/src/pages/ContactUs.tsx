import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'reactstrap';

type ContactUsProps = {
    contact: {
        id: number,
        contact_name: string,
        contact_country: string,
        contact_email: string,
        contact_feadback: string,
        
    };
    onDelete: (id: number) => void;
};
const Contact = (contact: ContactUsProps) => {
    
console.log(contact.contact.id);
    // console.log(destination);
    return (
        
        <Row xs={1} md={3} className="g-4">
            <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{contact.contact.id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{contact.contact.contact_name}</Card.Subtitle>
          <Card.Text>
          From : {contact.contact.contact_country} <br></br>
          
          Email : {contact.contact.contact_email} <br></br>
          Feedback : {contact.contact.contact_feadback} <br></br>
          </Card.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Card.Link href="#">Reply</Card.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button // className='remove-task'
                          onClick={() => contact.onDelete(contact.contact.id)} // onClick handler to handle task by id
                      >Delete</Button>
        </Card.Body>
      </Card>
      </Col>
      </Row>

        
    );
};

export default Contact;