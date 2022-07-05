import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Destination from './Destination';
import AddDestination from './AddDestination';
import { Console } from 'console';
import NavigationAdmin from './NavigationAdmin';
import { Table } from 'react-bootstrap';
import BookingsPage from './BookingsPage';

const { v4: uuidv4 } = require('uuid');




const Profile = () => {
    
    const cardShadowPadding = {
        marginTop: "20px",
        padding: "40px",
        fontFamily: "Arial",
        boxShadow: "5px 5px 10px #888888"
    };

    useEffect(() => {
    }, []);
    return (
        <div>
            <div className='container' style={cardShadowPadding}>
                <h1>Saransh Agarwal</h1>
                <h3>Born on Oct 21, 1996</h3>
                <h3>Lives in Toronto</h3>
                <h3>Likes hiking</h3>
            </div>
            <BookingsPage />
        </div>
    );
};


export default Profile;