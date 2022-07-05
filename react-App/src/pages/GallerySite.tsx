import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

import Hotel from './Hotel';
import AddHotel from './AddHotel';
import NavigationAdmin from './NavigationAdmin';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';

type SiteProps = {

    id: number;
    site_name: string;
    site_description: string;
    site_rating: number;
    site_price: number;
    des_id: number;
    img_url: string;


};

type DesProp = {
    des_id: number;
}


const GallerySite = (des: DesProp) => {

    const [desImages, setDestinationImages] = useState<SiteProps[]>([]);

    const handleImage = (url: string) => {
        // console.log(url);
        return require('../' + url);
    }

    const getAllSitesPhotosByDesId = async (id: number) => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/sites/' + id
            );
            console.log(response);
            setDestinationImages(response.data);
            console.log(desImages);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        console.log("Using effect");
        // setDestinationId(des); 
        console.log(des);
        getAllSitesPhotosByDesId(des.des_id);
    }, []);
    return (
        <div style={{marginTop:"20px", marginBottom:"20px"}}>
            <Container>
                <Row xs={1} md={4} className="g-4">
                    {desImages.map((site) => (
                        <Col>
                            <Card>
                                <Card.Img style={{ height: '10rem' }} variant="top" src={handleImage(site.img_url)} />
                        
                                <Card.Title style={{padding:"10px"}}>{site.site_name}</Card.Title>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default GallerySite;