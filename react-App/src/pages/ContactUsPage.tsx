import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ContactUs from './ContactUs';
import AddContactUs from './AddContactUs';

const { v4: uuidv4 } = require('uuid');

type ContactType = {
    id: number,
        contact_name: string,
        contact_country: string,
        contact_email: string,
        contact_feadback: string,
};

const ContactUSPage = () => {
    const [contact, setContact] = useState<ContactType[]>([]);

    const sendGetRequest = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:3000'
            // console.log(axios.defaults.baseURL);
            const response = await axios.get(
                '/contact'
            );
            // console.log(response);
            setContact(response.data);
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const sendPostOrPutRequest = async (id: number,contact_name: string,contact_country: string,contact_email: string,contact_feadback: string,) => {
        
        var found: boolean = false;
        console.log("ID IS "+id);

        if(!isNaN(id)){
            console.log("POSTING")
            console.log("Trying put");
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                console.log(axios.defaults.baseURL);
                const response = await axios.put(
                    '/contact/' + id,
                    { contact_name: contact_name, contact_country: contact_country, contact_email: contact_email, contact_feadback: contact_feadback}
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("POSTING")
            try {
                axios.defaults.baseURL = 'http://localhost:3000'
                // console.log(axios.defaults.baseURL);
                const response = await axios.post(
                    '/contact',
                    { contact_name: contact_name, contact_country: contact_country, contact_email: contact_email, contact_feadback: contact_feadback }
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
                '/contact/' + id
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
            <AddContactUs onAddContact={sendPostOrPutRequest} />
            <div>
                {/* <button onClick={sendPutRequest}>Update Post</button>*/}
                {contact.map((contact) => (
                    <ContactUs
                        onDelete={sendDeleteRequest} contact={contact} key={contact.id} />
                ))}
            </div>
        </div>
    );
};


export default ContactUSPage;
    