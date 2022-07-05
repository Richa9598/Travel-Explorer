import React from 'react';
import { useState } from 'react';
import { Col, FloatingLabel, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type AddProps = {
    onAddContact: (
        id: number,
        contact_name: string,
        contact_country: string,
        contact_email: string,
        contact_feadback: string,
        
    ) => void;
};
const AddContactUs = (props: AddProps) => {
    const [contactId, setContactId] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactCountry, setContactCountry] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactFeedback, setContactFeedback] = useState('');
    


    const handleChangeContacttId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setContactId(e.target.value);
    };

    const handleChangeContactName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setContactName(e.target.value);
    };

    const handleChangeContactCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setContactCountry(e.target.value);
    };

    const handleChangeContactEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        
        setContactEmail(e.target.value);
       // setContactEmail(email);
    };

    const handleChangeContactFeedback = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setContactFeedback(e.target.value);
    };

    


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();
        // Setting the destiantion details
        props.onAddContact((Number.parseFloat(contactId)),contactName,contactCountry,contactEmail,contactFeedback);
        setContactId('');
        setContactName('');
        setContactCountry('');
        setContactEmail('');
        setContactFeedback('');
        console.log("FUNCTION CALLED")

       
    };


    // Handler for taskItem
    


    return (
      <div className='container1'>
       
            
    


    <Form className='contactform'onSubmit={handleSubmit}  >

    <fieldset>
                <legend className='legend1'>Contact Us Form</legend>
                <p>Be free to cpontact us, We won't share your information</p>
                {/* <two way data binding with value attribute /> */}
                {/* input for task title */}
               
                </fieldset>
    <Row className="g-2">
      <Col md>
        <FloatingLabel controlId="floatingInputGrid" label="Enter Name">
          <Form.Control type="text" placeholder="Enter Name" value={contactName}
                    onChange={handleChangeContactName} required/>
        </FloatingLabel>
      </Col>
      <Col md>
      <FloatingLabel controlId="floatingInputGrid" label="Enter Country Name">
          <Form.Control type="text" placeholder="Enter Country Name" value={contactCountry}
                    onChange={handleChangeContactCountry} required/>
        </FloatingLabel>
       
      </Col>
    </Row>
    <br></br>
    
     
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Enter Email Address" value={contactEmail}
                    onChange={handleChangeContactEmail} 
                     required/>
      </FloatingLabel>
   
      <br></br>
      <FloatingLabel controlId="floatingTextarea2" label="Feedbacks">
        <Form.Control
          as="textarea"
          type="text" placeholder="Enter Your Feedback" required value={contactFeedback}
          onChange={handleChangeContactFeedback}
          style={{ height: '100px' }}
        />
      </FloatingLabel>

      <br></br>
      <Button variant="primary" type="submit" className='button1'>
        Submit
      </Button>
    </Form>
    
      
        </div>
    );
};

export default AddContactUs;

function setEmailError(arg0: string) {
  throw new Error('Function not implemented.');
}
