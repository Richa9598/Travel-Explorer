import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Hotel from './Hotel';
import AddHotel from './AddHotel';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';

const { v4: uuidv4 } = require('uuid');

type HotelType = {
    id: number;
    hotel_name: string;
    hotel_rating: number;
    hotel_price: number;
    des_id: number;
};

const HotelPage = () => {
    const [hotel, setHotels] = useState<HotelType[]>([]);

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            const response = await axios.get(
                '/hotels'
            );
            setHotels(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendPostOrPutRequest = async (id: number, hotel_name: string, hotel_price: number, hotel_rating: number, des_id: number) => {
        
        var found: boolean = false;
        console.log("ID IS "+id);

        if(!isNaN(id)){
            console.log("Trying put");
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                console.log(axios.defaults.baseURL);
                const response = await axios.put(
                    '/hotels/' + id,
                    {hotel_name: hotel_name, hotel_price: hotel_price, hotel_rating: hotel_rating, des_id: des_id }
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                // console.log(axios.defaults.baseURL);
                const response = await axios.post(
                    '/hotels',
                    {hotel_name: hotel_name, hotel_price: hotel_price, hotel_rating: hotel_rating, des_id: des_id }
                );
                // console.log(response);
            } catch (err) {
                console.log(err);
            }
            
        }

        sendGetRequest();
    };

    const sendDeleteRequest = async (id: number) => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.delete(
                '/hotels/' + id
            );
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
        sendGetRequest();
    };


    useEffect(() => {
        // console.log("Using effect");
        sendGetRequest();
    }, []);
    return (
        <div>
            <NavigationAdmin />
            <AddHotel onAddHotel={sendPostOrPutRequest} />
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Desination ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                        {hotel.map((hotel) => (
                    <Hotel
                        onDelete={sendDeleteRequest} hotel={hotel} key={hotel.id} />
                ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


export default HotelPage;
    