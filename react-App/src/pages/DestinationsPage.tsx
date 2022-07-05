import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Destination from './Destination';
import AddDestination from './AddDestination';
import { Console } from 'console';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';

const { v4: uuidv4 } = require('uuid');


type DestinationType = {
    id: number;
    des_distance: string;
    des_name: string;
    des_rating: number;
};

const Destinations = () => {
    const [destination, setDestinations] = useState<DestinationType[]>([]);

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/destinations'
            );
            // console.log(response);
            setDestinations(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };


    const sendPostOrPutRequest = async (id: number, des_name: string, des_distance: string, des_rating: number) => {

        var found: boolean = false;
        console.log(id);

        if (!isNaN(id)) {
            console.log("Trying put");
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                console.log(axios.defaults.baseURL);
                const response = await axios.put(
                    '/destinations/' + id,
                    { des_name: des_name, des_distance: des_distance, des_rating: des_rating }
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
                    '/destinations',
                    { des_name: des_name, des_distance: des_distance, des_rating: des_rating }
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
                '/destinations/' + id
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
            <AddDestination onAddDestination={sendPostOrPutRequest} />
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Detination Name</th>
                            <th>Distance</th>
                            <th>Rating</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                        {destination.map((destination) => (
                            <Destination
                                onDelete={sendDeleteRequest} destination={destination} key={destination.id} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


export default Destinations;