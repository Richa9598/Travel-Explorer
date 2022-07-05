import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Transportation from './Transportation';
import AddTransportation from './AddTransportation';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';

const { v4: uuidv4 } = require('uuid');

type TransportationType = {
    id: number;
    t_name: string;
    t_price: number;
    t_rating: number;
    t_description: string;
    t_capacity: number;
};

const TransportationPage = () => {
    const [transportation, setTransportations] = useState<TransportationType[]>([]);

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/transports'
            );
            // console.log(response);
            setTransportations(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const sendPostOrPutRequest = async (id: number, t_name: string, t_price: number, t_rating: number, t_description: string, t_capacity: number) => {
        
        var found: boolean = false;
        console.log("ID IS "+id);

        if(!isNaN(id)){
            console.log("Trying put");
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                console.log(axios.defaults.baseURL);
                const response = await axios.put(
                    '/transports/' + id,
                    { t_name: t_name, t_price: t_price, t_rating: t_rating, t_description: t_description, t_capacity: t_capacity }
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
                    '/transports',
                    { t_name: t_name, t_price: t_price, t_rating: t_rating, t_description: t_description, t_capacity: t_capacity }
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
                '/transports/' + id
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
            <AddTransportation onAddTransportation={sendPostOrPutRequest} />
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transport Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Rating</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                        {transportation.map((transportation) => (
                    <Transportation
                        onDelete={sendDeleteRequest} transportation={transportation} key={transportation.id} />
                ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


export default TransportationPage;
    