import React from 'react';
import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
type AddProps = {
    onAddDestination: (
        id: number,
        des_name: string,
        des_distance: string,
        des_rating: number
    ) => void;
};
const AddDestination = (props: AddProps) => {
    const [destinationId, setDestinationId] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [destinationDistance, setDestinationDistance] = useState('');
    const [destinationRating, setDestinationRating] = useState('');


    const handleChangeDesId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setDestinationId(e.target.value);
    };

    const handleChangeDesName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setDestinationName(e.target.value);
    };

    const handleChangeDesDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setDestinationDistance(e.target.value);
    };

    const handleChangeDesRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setDestinationRating(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();
        // Setting the destiantion details
        props.onAddDestination((Number.parseFloat(destinationId)),destinationName, destinationDistance, (Number.parseFloat(destinationRating)));
        setDestinationId('');
        setDestinationName('');
        setDestinationDistance('');
        setDestinationRating('');
    };


    // Handler for taskItem
    


    return (
        <div className='container2'>
       
            
    


    <Form className='destinationForm' onSubmit={handleSubmit}  >

    <fieldset>
                <legend className='legend1'>Fill out the Form to add destinations</legend>
                
                {/* <two way data binding with value attribute /> */}
                {/* input for task title */}
               
                </fieldset>
    <Row className="g-2">
      <Col md>
        <FloatingLabel controlId="floatingInputGrid" label="Enter ID ">
          <Form.Control type='number'
                    value={destinationId}
                    onChange={handleChangeDesId}
                    placeholder='Enter Destination Id' required/>
        </FloatingLabel>
      </Col>
      </Row>
      <p>Onle enter the ID if you want to update the data in DB !</p><br></br>
      <Col md>
      <FloatingLabel controlId="floatingInputGrid" label="Enter  Name">
          <Form.Control type='text'
                    value={destinationName}
                    onChange={handleChangeDesName}
                    placeholder='Enter Destination Name' required/>
        </FloatingLabel>
       
      </Col>
    
    <br></br>
    
     
      <FloatingLabel
        controlId="floatingInput"
        label="Estimated Distance"
        className="mb-3"
      >
        <Form.Control type='text'
                    value={destinationDistance}
                    onChange={handleChangeDesDistance}
                    placeholder='Enter Distance'
                     required/>
      </FloatingLabel>
   
      <br></br>
      <FloatingLabel
        controlId="floatingInput"
        label="Ratings"
        className="mb-3"
      >
        <Form.Control
          type='text'
          value={destinationRating}
          onChange={handleChangeDesRating}
          placeholder='Enter Rating'
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

export default AddDestination;