import React, { PureComponent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";


type Props = {};

type TripDetailsProps = {

    listing: {
        trip: number;
        des_id: number;
        des_name: string;
        des_distance: number;
        des_rating: number;
        hotel_name: string;
        hotel_rating: number;
        hotel_price: number;
        t_name: string;
        t_price: number;
        t_rating: number;
        t_description: string;
        t_capacity: number;
        site_name: string;
        site_description: string;
        site_rating: number;
        site_price: number;
        img_url: string;
    }
};


const ImageGallery = (tripImg: TripDetailsProps) => {

    const handleImage = (url: string) => {
        console.log(url);
        return require('../' + url);
    }

    return (
        <Carousel.Item>
            <img
            className="d-block w-100"
                src={handleImage(tripImg.listing.img_url)}
                alt="First slide"
            />
         </Carousel.Item>

    );
};

export default ImageGallery;