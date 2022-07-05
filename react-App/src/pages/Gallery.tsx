import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

import Hotel from './Hotel';
import AddHotel from './AddHotel';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';
import GallerySite from './GallerySite';

type DestinationType = {
    id: number;
    des_distance: string;
    des_name: string;
    des_rating: number;
};

const Gallery = () => {

    const [destinationIdName, setDestinationsIdName] = useState<DestinationType[]>([]);

    const getAllDestinations = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/destinations'
            );
            // console.log(response);
            setDestinationsIdName(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        // console.log("Using effect");
        getAllDestinations();
        
    }, []);
    return (
        <div>
            <div className='container'>
                {destinationIdName.map((des) => (
                    
                    <div>
                        <h1>{des.des_name}</h1>
                        <GallerySite des_id={des.id} key={des.id}/>
                    </div>
                   
                ))}
            </div>
        </div>
    )
}

export default Gallery;