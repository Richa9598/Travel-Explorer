import React from 'react';
import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
type AddProps = {
    onAddTransportation: (
        id: number,
        t_name: string,
        t_price: number,
        t_rating: number,
        t_description: string,
        t_capacity: number,
    ) => void;
};
const AddTransportation = (props: AddProps) => {
    const [transportationId, setTransportationId] = useState('');
    const [transportationName, setTransportationName] = useState('');
    const [transportationPrice, setTransportationPrice] = useState('');
    const [transportationRating, setTransportationRating] = useState('');
    const [transportationDescription, setTransportationDescription] = useState('');
    const [transportationCapacity, setTransportationCapacity] = useState('');


    const handleChangeTransportId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationId(e.target.value);
    };

    const handleChangeTransportName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationName(e.target.value);
    };

    const handleChangeTransportPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationPrice(e.target.value);
    };

    const handleChangeTransportRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationRating(e.target.value);
    };

    const handleChangeTransportDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationDescription(e.target.value);
    };

    const handleChangeTransportCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setTransportationCapacity(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();
        // Setting the destiantion details
        props.onAddTransportation((Number.parseFloat(transportationId)),transportationName,(Number.parseFloat(transportationPrice)),(Number.parseFloat(transportationRating)),transportationDescription,(Number.parseFloat(transportationCapacity)));
        setTransportationId('');
        setTransportationName('');
        setTransportationPrice('');
        setTransportationRating('');
        setTransportationDescription('');
        setTransportationCapacity('');
    };


    // Handler for taskItem
    


    return (
        <div className='container5'>
       
            
    


        <Form className='transportationForm' onSubmit={handleSubmit}  >
    
        <fieldset>
                    <legend className='legend1'>Manage Transportations</legend>
                    
                    {/* <two way data binding with value attribute /> */}
                    {/* input for task title */}
                   
                    </fieldset>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Enter transportation ID ">
              <Form.Control type='number'
                    value={transportationId}
                    onChange={handleChangeTransportId}
                    placeholder='Enter Transportation Id'/>
            </FloatingLabel>
          </Col>
          </Row>
          <p>Onle enter the ID if you want to update the data in DB !</p><br></br>
          <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Enter transportation Name">
              <Form.Control type='text'
                    value={transportationName}
                    onChange={handleChangeTransportName}
                    placeholder='Enter Transportation Name' required/>
            </FloatingLabel>
           
          </Col>
        
        <br></br>
        
         
          <FloatingLabel
            controlId="floatingInput"
            label="Transportation Price"
            className="mb-3"
          >
            <Form.Control type='number'
                    value={transportationPrice}
                    onChange={handleChangeTransportPrice}
                    placeholder='Enter Transportation Price'
                         required/>
          </FloatingLabel>
       
          <br></br>
          <FloatingLabel
            controlId="floatingInput"
            label="Ratings"
            className="mb-3"
          >
            <Form.Control
              type='number'
              value={transportationRating}
              onChange={handleChangeTransportRating}
              placeholder='Enter Transportation Ratings'
              required
            />
          </FloatingLabel>
    
          <br></br>
         
          <FloatingLabel
            controlId="floatingInput"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              type='text'
              value={transportationDescription}
              onChange={handleChangeTransportDescription}
              placeholder='Enter Transportation Description'
              required
            />
          </FloatingLabel>
          <br></br>
         
          <FloatingLabel
            controlId="floatingInput"
            label="Capacity"
            className="mb-3"
          >
            <Form.Control
              type='number'
              value={transportationCapacity}
              onChange={handleChangeTransportCapacity}
              placeholder='Enter Transportation Capacity'
              required
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

export default AddTransportation;