import React from 'react';
import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
type AddProps = {
    onAddSite: (
        id: number,
        site_name: string,
        site_description: string,
        site_rating: number,
        site_price: number,
        des_id: number,
        img_url: string,
    ) => void;
};
const AddSite = (props: AddProps) => {
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [siteRating, setSiteRating] = useState('');
    const [sitePrice, setSitePrice] = useState('');
    const [siteDesID, setSiteDesID] = useState('');
    const [siteImageurl, setSiteImageurl] = useState('');


    const handleChangesiteId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteId(e.target.value);
    };

    const handleChangesiteName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteName(e.target.value);
    };

    const handleChangesiteDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteDescription(e.target.value);
    };

    const handleChangesiteRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteRating(e.target.value);
    };

    const handleChangesitePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSitePrice(e.target.value);
    };

    const handleChangesiteDesID = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteDesID(e.target.value);
    };

    const handleChangesiteImageurl = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setSiteImageurl(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();
        // Setting the destiantion details
        props.onAddSite((Number.parseFloat(siteId)),siteName,siteDescription,(Number.parseFloat(sitePrice)),(Number.parseFloat(siteRating)),(Number.parseFloat(siteDesID)),siteImageurl);
        setSiteId('');
        setSiteName('');
        setSiteDescription('');
        setSiteRating('');
        setSitePrice('');
        setSiteDesID('');
        setSiteImageurl('');
    };


    // Handler for taskItem
    


    return (
        <div className='container3'>
              

    <Form className='siteForm' onSubmit={handleSubmit}  >

    <fieldset>
                <legend className='legend1'>Fill out the Form to add sites</legend>
                
                {/* <two way data binding with value attribute /> */}
                {/* input for task title */}
               
                </fieldset>

                <Row className="g-2">
      <Col md>
        <FloatingLabel controlId="floatingInputGrid" label="Enter ID">
          <Form.Control type='number'
                    value={siteId}
                    onChange={handleChangesiteId}
                    placeholder='Enter Site Id' />
        </FloatingLabel>
      </Col>
      <Col md>
      <FloatingLabel controlId="floatingInputGrid" label="Enter Destination ID">
          <Form.Control type='number'
          value={siteDesID}
          onChange={handleChangesiteDesID}
          placeholder='Enter Destination ID'
          min="0" required/>
        </FloatingLabel>
       
      </Col>
    </Row>
    <br></br>
    
    
    <FloatingLabel controlId="floatingInputGrid" label="Enter Site Name" className="mb-3">
          <Form.Control type='text'
                    value={siteName}
                    onChange={handleChangesiteName}
                    placeholder='Enter Site Name' required/>
        </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Site Description"
        className="mb-3"
      >
        <Form.Control type='text'
                    value={siteDescription}
                    onChange={handleChangesiteDescription}
                    placeholder='Enter Site Description'
                     required/>
      </FloatingLabel>
   
      <FloatingLabel
        controlId="floatingInput"
        label="Price for the site"
        className="mb-3"
      >
        <Form.Control
          type='number'
          value={sitePrice}
          onChange={handleChangesitePrice}
          placeholder='Enter Site Price'
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Ratings"
        className="mb-3"
      >
        <Form.Control
          type='number'
          value={siteRating}
          onChange={handleChangesiteRating}
          placeholder='Enter Site Ratings'
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Image URL"
        className="mb-3"
      >
        <Form.Control
          type='text'
          value={siteImageurl}
          onChange={handleChangesiteImageurl}
          placeholder='Enter Image Url'
        />
      </FloatingLabel>

      

     

      

      <br></br>
      <Button variant="primary" type="submit" className='button1'>
        Add Site
      </Button>
    </Form>
    
      
        </div>
    );
};

export default AddSite;