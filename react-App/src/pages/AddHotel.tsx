import React from 'react';
import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
type AddProps = {
    onAddHotel: (
        id: number,
        hotel_name: string,
        hotel_rating: number,
        hotel_price: number,
        des_id: number,
    ) => void;
};
const AddHotel = (props: AddProps) => {
    const [hotelId, setHotelId] = useState('');
    const [hotelName, setHotelName] = useState('');
    const [hotelRating, setHotelRating] = useState('');
    const [hotelPrice, setHotelPrice] = useState('');
    const [hotelDesID, setHotelDesID] = useState('');

    const handleChangehotelId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setHotelId(e.target.value);
    };

    const handleChangehotelName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setHotelName(e.target.value);
    };

    const handleChangehotelRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setHotelRating(e.target.value);
    };

    const handleChangehotelPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setHotelPrice(e.target.value);
    };

    const handleChangehotelDesID = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setHotelDesID(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();
        // Setting the destiantion details
        props.onAddHotel((Number.parseFloat(hotelId)),hotelName,(Number.parseFloat(hotelPrice)),(Number.parseFloat(hotelRating)),(Number.parseFloat(hotelDesID)));
        setHotelId('');
        setHotelName('');
        setHotelRating('');
        setHotelPrice('');
        setHotelDesID('');
    };


    // Handler for taskItem
    


    return (
        <div className='container4'>
              

        <Form className='hotelForm' onSubmit={handleSubmit}  >
    
        <fieldset>
                    <legend className='legend1'>Fill out the Form to add new Hotels</legend>
                    
                    {/* <two way data binding with value attribute /> */}
                    {/* input for task title */}
                   
                    </fieldset>
                    <br></br>
    
                    <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Enter hotel ID">
              <Form.Control type='number'
                    value={hotelId}
                    onChange={handleChangehotelId}
                    placeholder='Enter hotel Id' />
            </FloatingLabel>
          </Col>
          <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Enter Destination ID">
              <Form.Control type='number'
                    value={hotelDesID}
                    onChange={handleChangehotelId}
                    placeholder='Enter Destination ID'
                    min="0" required/>
            </FloatingLabel>
           
          </Col>
        </Row>
        <br></br>
        
        
        <FloatingLabel controlId="floatingInputGrid" label="Enter Hotel Name" className="mb-3">
              <Form.Control type='text'
                    value={hotelName}
                    onChange={handleChangehotelName}
                    placeholder='Enter Hotel Name' required/>
            </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Hotel Price"
            className="mb-3"
          >
            <Form.Control type='number'
                    value={hotelPrice}
                    onChange={handleChangehotelPrice}
                    placeholder='Enter Price for hotel rooms'
                         required/>
          </FloatingLabel>
       
          <FloatingLabel
            controlId="floatingInput"
            label="Ratings of Hotel"
            className="mb-3"
          >
            <Form.Control
             type='number'
             value={hotelRating}
             onChange={handleChangehotelRating}
             placeholder='Enter Site Ratings'
            />
          </FloatingLabel>
    
          
         
          <Button variant="primary" type="submit" className='button1'>
            Add Hotels
          </Button>
        </Form>
        
          
            </div>
    );
};

export default AddHotel;