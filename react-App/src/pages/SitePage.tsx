import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Site from './Site';
import AddSite from './AddSite';
import { Console } from 'console';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';

const { v4: uuidv4 } = require('uuid');


type SiteType = {
    id: number,
    site_name: string,
    site_description: string,
    site_rating: number,
    site_price: number,
    des_id: number,
    img_url: string,
};

const Sites = () => {
    const [site, setSites] = useState<SiteType[]>([]);

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/sites'
            );
            // console.log(response);
            setSites(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };


    const sendPostOrPutRequest = async (id: number, site_name: string, site_description: string, site_rating: number, site_price: number, des_id: number, img_url: string,) => {

        var found: boolean = false;
        console.log(id);

        if(!isNaN(id)){
            console.log("Trying put");
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                console.log(axios.defaults.baseURL);
                const response = await axios.put(
                    '/sites/' + id,
                    { site_name: site_name, site_description: site_description, site_rating: site_rating, site_price: site_price }
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
                    '/sites',
                    { site_name: site_name, site_description: site_description, site_rating: site_rating, site_price: site_price }
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
                '/sites/' + id
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
            <AddSite onAddSite={sendPostOrPutRequest} />
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Site Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Desination ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                        {site.map((site) => (
                    <Site
                        onDelete={sendDeleteRequest} site={site} key={site.id} />
                ))}
                    </tbody>
                </Table>
            </div>

        </div>
    );
};


export default Sites;